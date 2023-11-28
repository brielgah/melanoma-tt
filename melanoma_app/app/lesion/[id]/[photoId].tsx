import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { EditButton } from "@/components/button";
import TextEditModal from "@/components/editTextModal";
import ImageDescription from "@/components/lesion/imageDescription";
import Loading from "@/components/loading";
import Section from "@/components/section";
import ZoomeableImage from "@/components/zoomeableImage";
import { useUser } from "@/contexts/userContext";
import { lesionFromInterface } from "@/models/lesion";
import { photoFromInterface } from "@/models/photo";
import {
  useGetLesionQuery,
  useGetPhotoQuery,
  usePatchPhotoMutation,
} from "@/services/melanomaApi";

const DetailedPhoto = () => {
  const params = useLocalSearchParams<{ id: string; photoId: string }>();
  const id = Number(params.id);
  const photoId = Number(params.photoId);
  const { user } = useUser();
  const { data: lesionData, isLoading: isLesionLoading } =
    useGetLesionQuery(id);
  const { data: photoData, isLoading: isPhotoLoading } =
    useGetPhotoQuery(photoId);
  const lesion = lesionFromInterface(lesionData, user);
  const photo = photoFromInterface(photoData);
  const navigator = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [pathLesionTrigger, { isLoading: isUpdateLoading }] =
    usePatchPhotoMutation();

  useEffect(() => {
    if (lesion.userHasWriteNotesPermission) {
      navigator.setOptions({
        headerRight: () => <EditButton onPress={() => setModalVisible(true)} />,
      });
    }
    navigator.setOptions({
      title: photo.createdOn.toLocaleString(),
    });
  }, [navigator, lesionData, photoData]);

  const updatePhotoDescription = (val: string) => {
    pathLesionTrigger({
      id: photo.id,
      description: val,
    });
    setModalVisible(false);
  };

  const Body = () => {
    return ImageDescription({ description: photo.description });
  };

  if (isLesionLoading || isPhotoLoading || isUpdateLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <ZoomeableImage style={styles.image} image={photo.image.data} />
      </View>
      <View style={styles.descriptionContainer}>
        <Section title="Notas" body={Body} />
      </View>
      <TextEditModal
        value={photo.description}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={updatePhotoDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    flex: 2,
  },
  descriptionContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default DetailedPhoto;
