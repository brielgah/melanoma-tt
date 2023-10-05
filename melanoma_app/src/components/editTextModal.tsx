import { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";

import Button from "./button";

import Styles from "@/styles";

interface TextEditModalProps {
  value: string;
  visible: boolean;
  onCancel: () => void;
}

const TextEditModal = (props: TextEditModalProps) => {
  const [value, setValue] = useState(props.value);

  const onCancel = () => {
    setValue(props.value);
    props.onCancel();
  };

  return (
    <Modal animationType="slide" hardwareAccelerated visible={props.visible}>
      <View style={styles.container}>
        <View style={[Styles.cardBorder, styles.textContainer]}>
          <TextInput
            style={styles.textInput}
            multiline
            onChangeText={setValue}
            value={value}
          />
        </View>
        <View
          style={[
            Styles.horizontalContainer,
            Styles.buttonsBottomContainer,
            styles.buttons,
          ]}
        >
          <Button title="Guardar" />
          <Button title="Cancelar" onPress={onCancel} color="black" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  buttons: {
    position: "relative",
  },
  textInput: {
    flex: 1,
    textAlignVertical: "top",
  },
});

export default TextEditModal;
