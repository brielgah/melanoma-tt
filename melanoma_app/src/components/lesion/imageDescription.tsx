import { ScrollView, StyleSheet, Text } from "react-native";

import Styles from "@/styles";

interface ImageDescriptionProps {
  description: string;
}

const ImageDescription = (props: ImageDescriptionProps) => {
  return (
    <ScrollView style={[Styles.cardBorder, styles.photoDescription]}>
      <Text style={[Styles.textBody, styles.textDescription]}>
        {props.description}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photoDescription: {
    padding: 10,
  },
  textDescription: {
    marginBottom: 15,
  },
});

export default ImageDescription;
