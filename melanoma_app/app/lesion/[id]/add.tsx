import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

import ImageLoading from "@/components/imageLoading";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";
import { NEW_LESION_ID } from "@/utils/constants";

const Add = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { currentPictureMedia } = useCurrentPictureMedia();

  useEffect(() => {
    const lesionId = Number(params.id) === NEW_LESION_ID ? 0 : params.id;
    setTimeout(() => {
      router.replace({
        pathname: "/lesion/[id]/",
        params: {
          id: lesionId,
        },
      });
    }, 3000);
  }, []);

  if (!currentPictureMedia.uri) {
    console.error("No picture media provided");
    return (
      <View>
        <Text>Error: no se pudo obtener la foto</Text>
      </View>
    );
  }

  return (
    <ImageLoading
      image={{ uri: currentPictureMedia.uri }}
      message="Añadiendo la foto"
    />
  );
};

export default Add;
