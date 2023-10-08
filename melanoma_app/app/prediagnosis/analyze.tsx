import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

import ImageLoading from "@/components/imageLoading";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";

const Analyze = () => {
  const { currentPictureMedia } = useCurrentPictureMedia();

  useEffect(() => {
    setTimeout(() => {
      router.replace({
        pathname: "/prediagnosis/result",
      });
    }, 3000);
  }, []);

  if (!currentPictureMedia.uri) {
    console.error("No picture media provided");

    return (
      <View>
        <Text>Error: No se pudo obtener la foto</Text>
      </View>
    );
  }

  return (
    <ImageLoading
      image={{ uri: currentPictureMedia.uri }}
      message="Estamos analizando su foto, por favor espere..."
    />
  );
};

export default Analyze;
