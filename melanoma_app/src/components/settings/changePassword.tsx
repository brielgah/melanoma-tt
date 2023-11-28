import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import Button from "../button";
import Loading from "../loading";

import { useUser } from "@/contexts/userContext";
import { usePatchUserMutation } from "@/services/melanomaApi";
import Styles from "@/styles";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const [postUserTrigger, { isLoading }] = usePatchUserMutation();

  const updatePassword = () => {
    postUserTrigger({ id: user?.id, password });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={Styles.settingOptionCard}>
      <View style={Styles.formRow}>
        <Text style={Styles.inputLabel}>Contraseña nueva:</Text>

        <TextInput
          style={Styles.flexContainer}
          placeholder="Ingrese la nueva contraseña"
          onChangeText={setPassword}
          autoComplete="password-new"
          secureTextEntry
        />
      </View>
      <View style={Styles.buttonsContainer}>
        <Button title="Cambiar contraseña" onPress={updatePassword} />
      </View>
    </View>
  );
};

export default ChangePassword;
