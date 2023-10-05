import { Text, View } from "react-native";

import Button from "../button";
import { LogoutButtonIcon } from "../icons";

import ColorPallete from "@/colorPallete";
import Styles from "@/styles";

const Logout = () => {
  return (
    <View style={Styles.settingOptionCard}>
      <Text style={Styles.textBody}>
        ¿Estas seguro que deseas cerrar la sesión?
      </Text>
      <View style={Styles.buttonsContainer}>
        <Button
          title="Cerrar sesión"
          icon={LogoutButtonIcon}
          color={ColorPallete.pink.dark}
        />
      </View>
    </View>
  );
};

export default Logout;
