import { ImageSource } from "expo-image";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import ZoomeableImage from "./zoomeableImage";

import ColorPallete from "@/colorPallete";
import Styles from "@/styles";

interface ImageLoadingProps {
  image: ImageSource;
  message: string;
}

const ImageLoading = (props: ImageLoadingProps) => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.photoContainer}>
        <ZoomeableImage
          contentFit="cover"
          style={styles.image}
          image={props.image}
        />
      </View>
      <View style={styles.statusContainer}>
        <Text style={[Styles.textBody, Styles.textWhite]}>{props.message}</Text>
        <ActivityIndicator size="large" color={ColorPallete.blue.normal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  statusContainer: {
    bottom: 0,
    position: "absolute",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#00000099",
    padding: 10,
    borderRadius: 10,
  },
});

export default ImageLoading;
