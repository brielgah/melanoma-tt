import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../../colorPallete";
import { default as PhotoModel } from "../../models/photo";
import Styles from "../../styles";
import Loading from "../loading";

import {
  useDeletePhotoMutation,
  useGetPhotoQuery,
} from "@/services/melanomaApi";
import { Images } from "@/utils/images";

interface PhotoItemProps {
  photo: PhotoModel;
  isEditing: boolean;
}

const PhotoItem = (props: PhotoItemProps) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [deletePhotoTrigger, { isLoading }] = useDeletePhotoMutation();
  const { data: photo } = useGetPhotoQuery(props.photo.id);

  const deletePhoto = () => {
    deletePhotoTrigger(props.photo.id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[Styles.photoContainer, styles.customPhotoContainer]}>
        <Image
          source={photo?.image.data ?? Images.loading}
          style={styles.image}
          contentFit="cover"
          contentPosition="center"
          responsivePolicy="live"
        />
      </View>
      <View style={styles.overviewContainer}>
        <Text style={Styles.textBody}>
          {props.photo.createdOn.toLocaleString()}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {props.isEditing ? (
          <TouchableOpacity style={styles.touchContainer}>
            <Entypo name="cross" size={20} color="red" onPress={deletePhoto} />
          </TouchableOpacity>
        ) : (
          <Link
            href={{
              pathname: "/lesion/[id]/[photoId]",
              params: {
                id,
                photoId: props.photo.id,
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.touchContainer}>
              <Entypo
                name="chevron-thin-right"
                size={20}
                color={ColorPallete.border.dark}
              />
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
};

PhotoItem.defaultProps = {
  isEditing: false,
};

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    ...Styles.horizontalContainer,
    ...Styles.cardBorder,
  },
  customPhotoContainer: {
    maxWidth: 100,
  },
  overviewContainer: {
    flex: 3,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  iconContainer: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 5,
  },
});

export default PhotoItem;
