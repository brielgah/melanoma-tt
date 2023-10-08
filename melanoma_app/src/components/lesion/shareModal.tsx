import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox } from "react-native-elements";

import Button from "../button";

import ColorPallete from "@/colorPallete";
import Styles from "@/styles";

interface ShareModalProps {
  visible: boolean;
  onCancel: () => void;
}

const ShareModal = (props: ShareModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <View style={[Styles.cardBorder, Styles.modalContainer]}>
          <View style={styles.inputContainer}>
            <Text style={Styles.textBody}>Usuario:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="¿Con quién deseas compartir?"
            />
          </View>
          <View style={styles.inputContainer}>
            <CheckBox
              title="Brindar permiso para modificar las notas de las fotos"
              titleProps={{ style: Styles.textBody }}
              containerStyle={styles.checkboxInput}
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </View>
          <View style={[Styles.buttonsContainer, Styles.horizontalContainer]}>
            <Button title="Compartir" />
            <Button
              title="Cancelar"
              onPress={() => props.onCancel()}
              color="black"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    ...Styles.horizontalContainer,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 3,
    marginLeft: 3,
    backgroundColor: ColorPallete.black.ligth,
  },
  checkboxInput: {
    flex: 1,
    width: "100%",
  },
});

export default ShareModal;
