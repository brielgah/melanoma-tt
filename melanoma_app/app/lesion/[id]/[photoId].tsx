import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { EditButton } from "@/components/button";
import TextEditModal from "@/components/editTextModal";
import ImageDescription from "@/components/lesion/imageDescription";
import Section from "@/components/section";
import ZoomeableImage from "@/components/zoomeableImage";
import { LesionImages } from "@/utils/images";
import { getLesions } from "@/utils/testData";

const DetailedPhoto = () => {
  const params = useLocalSearchParams<{ id: string; photoId: string }>();
  const id = Number(params.id);
  const photoId = Number(params.photoId);
  const lesion = getLesions()[id];
  const photo = lesion.photos[photoId];
  const navigator = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (lesion.userHasWriteNotesPermission) {
      navigator.setOptions({
        headerRight: () => <EditButton onPress={() => setModalVisible(true)} />,
      });
    }
    navigator.setOptions({
      title: photo.createdOn.toLocaleString(),
    });
  }, [navigator]);

  const Body = () => {
    return ImageDescription({ description: photo.description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <ZoomeableImage
          style={styles.image}
          image={LesionImages[photo.localId]}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Section title="Notas" body={Body} />
      </View>
      <TextEditModal
        value={photo.description}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
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
