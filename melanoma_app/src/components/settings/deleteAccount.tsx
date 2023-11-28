import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import Button from "../button";
import ConfirmationModal from "../confirmationModal";
import { DeleteAccountButtonIcon } from "../icons";

import { useUser } from "@/contexts/userContext";
import { useDeleteUserMutation } from "@/services/melanomaApi";
import Styles from "@/styles";

const DeleteAccount = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useUser();
  const [deleteUserTrigger] = useDeleteUserMutation();

  const deleteUser = () => {
    deleteUserTrigger(user?.id ?? 0).then((data) => {
      router.replace({ pathname: "/" });
    });
  };

  return (
    <View style={Styles.settingOptionCard}>
      <Text style={Styles.textBody}>
        ¿Estas seguro que deseas borrar tu cuenta? Todos tus datos serán
        eliminados. Esta acción no se puede deshacer
      </Text>
      <View style={Styles.buttonsContainer}>
        <Button
          title="Eliminar cuenta"
          icon={DeleteAccountButtonIcon}
          color="red"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <ConfirmationModal
        visible={isModalVisible}
        message="¿Estas seguro que deseas eliminar tu cuenta?"
        onConfirmation={deleteUser}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default DeleteAccount;
