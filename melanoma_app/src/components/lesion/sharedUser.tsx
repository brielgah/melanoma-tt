import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ConfirmationModal from "../confirmationModal";

import Lesion from "@/models/lesion";
import User from "@/models/user";
import Styles from "@/styles";

interface SharedUserProps {
  parentLesion: Lesion;
  user: User;
}

const SharedUser = (props: SharedUserProps) => {
  const [isDeleteModalVisible, setDeleteIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateIsModalVisible] = useState(false);
  const message =
    `${props.user.username}${props.user.hasWritePermission ? " " : " no "}` +
    "tiene permiso para modificar las notas de las fotos. " +
    `¿Deseas ${props.user.hasWritePermission ? "quitar" : "dar"} el permiso?`;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => setUpdateIsModalVisible(true)}>
        <Text style={Styles.textBody}>{props.user.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDeleteIsModalVisible(true)}>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
      <ConfirmationModal
        visible={isUpdateModalVisible}
        message={message}
        onCancel={() => setUpdateIsModalVisible(false)}
      />
      <ConfirmationModal
        visible={isDeleteModalVisible}
        message={`¿Dejar de compartir lesión con: ${props.user.username}?`}
        onCancel={() => setDeleteIsModalVisible(false)}
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
  modalContainer: {
    padding: 30,
    margin: 20,
  },
});

export default SharedUser;
