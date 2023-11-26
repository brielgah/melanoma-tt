import { router, useNavigation } from "expo-router";
import { Text, View } from "react-native";

import Button from "../button";
import { LogoutButtonIcon } from "../icons";

import ColorPallete from "@/colorPallete";
import { useUser } from "@/contexts/userContext";
import Styles from "@/styles";

const Logout = () => {
  const { setUser } = useUser();
  const navigation = useNavigation();
  const logout = () => {
    setUser(null);
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
    router.replace({ pathname: "/" });
  };

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
          onPress={logout}
        />
      </View>
    </View>
  );
};

export default Logout;
