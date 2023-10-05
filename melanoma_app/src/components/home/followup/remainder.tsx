import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { default as RemainderModel } from "../../../models/remainder";
import Styles from "../../../styles";
import ConfirmationModal from "../../confirmationModal";

import ColorPallete from "@/colorPallete";

interface RemainderProps {
  remainder: RemainderModel;
}

const Remainder = (props: RemainderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const isOverdue = props.remainder.date <= new Date();

  return (
    <View style={[styles.container, isOverdue ? styles.warningStyle : {}]}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={Styles.textBody}>{props.remainder.getLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
      <ConfirmationModal
        visible={isModalVisible}
        message={`Es hora de agregar un nuevo registro a ${props.remainder.lesion}`}
        confirmationTitle="Descartar"
        cancelTitle="Aplazar"
        onCancel={() => setIsModalVisible(false)}
      />
      <ConfirmationModal
        visible={isDeleteModalVisible}
        message="¿Estas seguro que deseas descartar el recordatorio?"
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    ...Styles.horizontalContainer,
    ...Styles.cardBorder,
  },
  warningStyle: {
    borderColor: ColorPallete.skyblue.normal,
    borderWidth: 3,
    // backgroundColor: ColorPallete.orange.ligth,
  },
});

export default Remainder;
