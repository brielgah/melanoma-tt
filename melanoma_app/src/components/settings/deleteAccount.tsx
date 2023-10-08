import { Text, View } from "react-native";

import Button from "../button";
import { DeleteAccountButtonIcon } from "../icons";

import Styles from "@/styles";

const DeleteAccount = () => {
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
        />
      </View>
    </View>
  );
};

export default DeleteAccount;
