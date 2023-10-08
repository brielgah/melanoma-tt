import { Text, TextInput, View } from "react-native";

import Button from "../button";

import Styles from "@/styles";

const ChangePassword = () => {
  return (
    <View style={Styles.settingOptionCard}>
      <View style={Styles.formRow}>
        <Text style={Styles.inputLabel}>Contraseña nueva:</Text>

        <TextInput
          style={Styles.flexContainer}
          placeholder="Ingrese la nueva contraseña"
          autoComplete="password-new"
          secureTextEntry
        />
      </View>
      <View style={Styles.buttonsContainer}>
        <Button title="Cambiar contraseña" />
      </View>
    </View>
  );
};

export default ChangePassword;
