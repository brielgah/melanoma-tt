import { View } from "react-native";

import ImageGetter from "@/components/prediagnosis/imageGetter";
import Section from "@/components/section";
import Styles from "@/styles";

const Prediagnosis = () => {
  const ImageGetterBody = () => {
    return ImageGetter();
  };

  return (
    <View style={Styles.flexContainer}>
      <Section title="Nueva foto" body={ImageGetterBody} />
    </View>
  );
};

export default Prediagnosis;
