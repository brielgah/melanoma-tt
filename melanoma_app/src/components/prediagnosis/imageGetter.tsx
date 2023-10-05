import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Alert from "@/Alert";
import Button from "@/components/button";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";
import Styles from "@/styles";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";

const PhotoIcon = () => {
  return <MaterialIcons name="add-a-photo" size={24} color="white" />;
};

const GaleryIcon = () => {
  return <MaterialIcons name="photo-library" size={24} color="white" />;
};

const ImageGetter = () => {
  const { setCurrentPictureMedia } = useCurrentPictureMedia();
  const pickImage = async () => {
    const permisionResponse = await requestMediaLibraryPermissionsAsync();

    if (!permisionResponse.granted) {
      Alert(
        "Permiso necesario",
        "Se necesita acceder a la galería para continuar"
      );
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setCurrentPictureMedia({ uri: result.assets[0].uri });

    router.push({
      pathname: "/prediagnosis/analyze",
    });
  };

  const startCamera = async () => {
    const permisionResponse = await Camera.requestCameraPermissionsAsync();

    if (!permisionResponse.granted) {
      Alert(
        "Permiso necesario",
        "Se necesita acceder a la cámara para continuar"
      );
      return;
    }

    router.push({
      pathname: "/photo/",
      params: {
        redirect: PhotoRedirectOptions.PREDIAGNOSIS,
      },
    });
  };

  return (
    <View style={[Styles.centeredContainer, Styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card]}>
        <Text>Tomar foto nueva o seleccionar desde galería</Text>
        <View style={[Styles.horizontalContainer, Styles.buttonsContainer]}>
          <Button
            onPress={startCamera}
            style={Styles.flexContainer}
            title="Tomar foto"
            icon={PhotoIcon}
          />
          <Button
            onPress={pickImage}
            style={Styles.flexContainer}
            title="Seleccionar foto"
            icon={GaleryIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
});

export default ImageGetter;
