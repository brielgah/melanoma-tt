import { Button, Modal, View } from "react-native";

import ImageGetter from "../../prediagnosis/imageGetter";

import Styles from "@/styles";

interface AddPhotoSelectorProps {
  visible: boolean;
  onCancel: () => void;
}

const AddPhotoSelector = (props: AddPhotoSelectorProps) => {
  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <ImageGetter />
      </View>
      <Button title="cancelar" onPress={props.onCancel} />
    </Modal>
  );
};

export default AddPhotoSelector;
