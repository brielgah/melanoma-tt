import { ActivityIndicator, View } from "react-native";

import ColorPallete from "@/colorPallete";
import Styles from "@/styles";

const Loading = () => {
  return (
    <View style={Styles.centeredContainer}>
      <ActivityIndicator size="large" color={ColorPallete.blue.normal} />
    </View>
  );
};

export default Loading;
