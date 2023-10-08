import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Image, ImageContentFit, ImageSource } from "expo-image";
import { ViewStyle } from "react-native";

import Styles from "@/styles";

interface ZoomeableImageProps {
  image: ImageSource;
  style?: ViewStyle;
  contentFit?: ImageContentFit;
}

const ZoomeableImage = (props: ZoomeableImageProps) => {
  return (
    <ReactNativeZoomableView
      maxZoom={10}
      minZoom={0.5}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders
    >
      <Image
        source={props.image}
        style={Styles.photoContainer}
        contentFit={props.contentFit ?? "contain"}
        contentPosition="center"
        responsivePolicy="live"
      />
    </ReactNativeZoomableView>
  );
};

export default ZoomeableImage;
