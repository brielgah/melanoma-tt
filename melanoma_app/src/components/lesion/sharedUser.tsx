import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ConfirmationModal from "../confirmationModal";
import Loading from "../loading";

import { useUser } from "@/contexts/userContext";
import Lesion from "@/models/lesion";
import User from "@/models/user";
import { useDeleteDoctorAssociationMutation } from "@/services/melanomaApi";
import Styles from "@/styles";

interface SharedUserProps {
  parentLesion: Lesion;
  user: Partial<User>;
}

const SharedUser = (props: SharedUserProps) => {
  const [isDeleteModalVisible, setDeleteIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateIsModalVisible] = useState(false);
  const message =
    `${props.user.userName}${props.user.hasWritePermission ? " " : " no "}` +
    "tiene permiso para modificar las notas de las fotos. " +
    `¿Deseas ${props.user.hasWritePermission ? "quitar" : "dar"} el permiso?`;
  const { user } = useUser();
  const [deleteDoctorAssociationTrigger, { isLoading }] =
    useDeleteDoctorAssociationMutation();

  const stopSharing = () => {
    deleteDoctorAssociationTrigger({
      userId: user?.id ?? 0,
      doctorUserName: props.user.userName ?? "",
      lesionId: props.parentLesion.id,
    });
  };

  return (
    <View style={[styles.container]}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TouchableOpacity onPress={() => setUpdateIsModalVisible(false)}>
            <Text style={Styles.textBody}>{props.user.userName}</Text>
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
            message={`¿Dejar de compartir lesión con: ${props.user.userName}?`}
            onConfirmation={stopSharing}
            onCancel={() => setDeleteIsModalVisible(false)}
          />
        </>
      )}
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
