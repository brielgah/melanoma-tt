import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { default as ReminderModel } from "../../../models/reminder";
import Styles from "../../../styles";
import ConfirmationModal from "../../confirmationModal";

import ColorPallete from "@/colorPallete";
import Loading from "@/components/loading";
import {
  useDeleteReminderMutation,
  useDiscardReminderMutation,
} from "@/services/melanomaApi";

interface RemainderProps {
  remainder: ReminderModel;
}

const Remainder = (props: RemainderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteReminderTrigger, { isLoading }] = useDeleteReminderMutation();
  const [discardReminderTrigger, { isLoading: isDiscardLoading }] =
    useDiscardReminderMutation();
  const isOverdue = props.remainder.date <= new Date();

  const deleteReminder = () => {
    deleteReminderTrigger(props.remainder.id);
    setIsDeleteModalVisible(false);
    setIsModalVisible(false);
  };

  const discardReminder = () => {
    discardReminderTrigger(props.remainder.id);
    setIsDeleteModalVisible(false);
    setIsModalVisible(false);
  };

  if (isLoading || isDiscardLoading) {
    return <Loading />;
  }

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
        onConfirmation={discardReminder}
        onCancel={() => setIsModalVisible(false)}
      />
      <ConfirmationModal
        visible={isDeleteModalVisible}
        message="¿Estas seguro que deseas eliminar el recordatorio?"
        onConfirmation={deleteReminder}
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
