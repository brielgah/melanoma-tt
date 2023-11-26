import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";

import Alert from "@/Alert";
import ColorPallete from "@/colorPallete";
import Button, { EditButton, SaveButton } from "@/components/button";
import { AddPhotoIcon, CompareIcon, ShareIcon } from "@/components/icons";
import CompareSelector from "@/components/lesion/compareSelector";
import PhotosOverview from "@/components/lesion/photosOverview";
import ShareModal from "@/components/lesion/shareModal";
import SharedCarousel from "@/components/lesion/sharedCarousel";
import Loading from "@/components/loading";
import Section from "@/components/section";
import { useUser } from "@/contexts/userContext";
import { lesionFromInterface } from "@/models/lesion";
import { default as PhotoModel } from "@/models/photo";
import {
  useGetLesionQuery,
  usePatchLesionMutation,
} from "@/services/melanomaApi";
import Styles from "@/styles";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";

const LesionDetail = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesionIndex = Number(id);
  const { data, isLoading } = useGetLesionQuery(lesionIndex);
  const navigation = useNavigation();
  const lesion = lesionFromInterface(data, user);
  const [photos, setPhotos] = useState<PhotoModel[]>(
    Platform.select({
      web: lesion.photos,
      default: [],
    })
  );
  const [name, setName] = useState(
    lesion.userIsOwner ? lesion.name : `${lesion.ownerUsername}: ${lesion.name}`
  );
  const [isEditing, setIsEditing] = useState(false);
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [patchLesionTrigger] = usePatchLesionMutation();

  const compareImages = (
    beforeImageId: number | undefined,
    afterImageId: number | undefined
  ) => {
    if (beforeImageId === undefined || afterImageId === undefined) {
      Alert("Error", "Selecciona dos fotos para comparar");
      return;
    }

    setCompareModalVisible(false);
    router.push({
      pathname: "/compare/[beforeId]/[afterId]",
      params: {
        beforeId: beforeImageId,
        afterId: afterImageId,
      },
    });
  };

  const addPhoto = () => {
    router.push({
      pathname: "/photo/",
      params: {
        redirect: PhotoRedirectOptions.LESION,
        lesionId: id,
      },
    });
  };

  const updateLesion = () => {
    patchLesionTrigger({ id: lesion.id, name });
    setIsEditing(false);
  };

  useEffect(() => {
    setName(
      lesion.userIsOwner
        ? lesion.name
        : `${lesion.ownerUsername}: ${lesion.name}`
    );
    setPhotos(lesion.photos);
  }, [data]);

  useEffect(() => {
    if (lesion.userIsOwner) {
      navigation.setOptions({
        headerRight: () =>
          isEditing ? (
            <SaveButton onPress={updateLesion} />
          ) : (
            <EditButton onPress={() => setIsEditing(true)} />
          ),
      });
    }
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          style={[Styles.textTitle, styles.blackColor]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
      ),
    });

    const unsubscribe = navigation.addListener("transitionEnd", (_e) => {
      setPhotos(lesion.photos);
    });

    return unsubscribe;
  }, [navigation, isEditing, name, data]);

  const Photos = () => {
    return PhotosOverview({ photos, isEditing });
  };

  const SharedUsers = () => {
    return SharedCarousel({
      users: lesion.sharedWithUsers,
      parentLesion: lesion,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={Styles.flexContainer}>
      {lesion.userIsOwner && (
        <View style={styles.sharedUsersContainer}>
          <Section title="Compartido con" body={SharedUsers} />
        </View>
      )}
      <View style={styles.photosContainer}>
        <Section title="Fotos" body={Photos} />
      </View>
      {!isEditing ? (
        <View
          style={[
            Styles.horizontalContainer,
            Styles.buttonsBottomContainer,
            { position: "relative" },
          ]}
        >
          <Button
            style={Styles.flexContainer}
            title="Comparar"
            color={ColorPallete.pink.dark}
            onPress={() => setCompareModalVisible(true)}
            icon={CompareIcon}
          />
          {lesion.userIsOwner && (
            <Button
              style={Styles.flexContainer}
              title="Agregar"
              color={ColorPallete.green.dark}
              onPress={addPhoto}
              icon={AddPhotoIcon}
            />
          )}
          {lesion.userIsOwner && (
            <Button
              style={Styles.flexContainer}
              title="Compartir"
              color={ColorPallete.skyblue.dark}
              onPress={() => setShareModalVisible(true)}
              icon={ShareIcon}
            />
          )}
        </View>
      ) : (
        <></>
      )}
      <CompareSelector
        onCancel={() => setCompareModalVisible(false)}
        photos={photos}
        visible={compareModalVisible}
        onCompareSelected={compareImages}
      />
      <ShareModal
        parentLesion={lesion}
        visible={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photosContainer: {
    flex: 1,
  },
  sharedUsersContainer: {
    flex: 0.2,
  },
  blackColor: {
    color: "black",
  },
});

export default LesionDetail;
