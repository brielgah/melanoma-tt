import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../../../colorPallete";
import {
  default as LesionModel,
  getFirstPhoto,
  getLastUpdatedLabel,
} from "../../../models/lesion";
import Styles from "../../../styles";
import { Images } from "../../../utils/images";

import ConfirmationModal from "@/components/confirmationModal";
import Loading from "@/components/loading";
import {
  useDeleteLesionMutation,
  useGetPhotoQuery,
} from "@/services/melanomaApi";

interface LesionProps {
  lesion: LesionModel;
  isEditing: boolean;
}

const LesionItem = (props: LesionProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLesionTrigger, result] = useDeleteLesionMutation();
  const thumbnail = getFirstPhoto(props.lesion);
  const { data: photo } = useGetPhotoQuery(thumbnail?.id ?? -1);

  const getPhotoPreview = () => {
    if (props.lesion.photos.length === 0) return Images.noImage;
    return photo?.image.data ?? Images.loading;
  };

  const deleteLesion = () => {
    deleteLesionTrigger(props.lesion.id);
  };

  if (result.isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[Styles.photoContainer, styles.customPhotoContainer]}>
        <Image
          source={getPhotoPreview()}
          style={styles.image}
          contentFit="cover"
          contentPosition="center"
          responsivePolicy="live"
        />
      </View>
      <View style={styles.overviewContainer}>
        <Text style={Styles.textBody}>{props.lesion.name}</Text>
        <Text
          style={Styles.textCaption}
        >{`${props.lesion.photos.length} fotos`}</Text>
        {props.lesion.ownerUsername ? (
          <View style={styles.sharedBadge}>
            <Text
              style={Styles.textCaption}
            >{`Compartido por: ${props.lesion.ownerUsername}`}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.dateContainer}>
        <Text style={Styles.textBody}>{getLastUpdatedLabel(props.lesion)}</Text>
      </View>
      <View style={styles.iconContainer}>
        {props.isEditing ? (
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => setIsModalVisible(true)}
          >
            <Entypo name="cross" size={20} color="red" />
          </TouchableOpacity>
        ) : (
          <Link
            href={{
              pathname: "/lesion/[id]/",
              params: {
                id: props.lesion.id,
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
      <ConfirmationModal
        visible={isModalVisible}
        message="¿Etás seguro que deseas eliminar la lesión? Esta operación no se puede deshacer"
        onConfirmation={deleteLesion}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};

LesionItem.defaultProps = {
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
    padding: 10,
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
  dateContainer: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 5,
  },
  iconContainer: {
    flex: 0.5,
    alignItems: "flex-end",
  },
  sharedBadge: {
    backgroundColor: ColorPallete.black.ligth,
    padding: 2,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
});

export default LesionItem;
