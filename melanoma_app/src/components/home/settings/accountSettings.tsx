import { View } from "react-native";

import { DeleteAccountIcon, LogoutIcon, PasswordIcon } from "../../icons";
import { SettingOptionLink } from "../../settings/settingOption";

import Styles from "@/styles";
import SettingsOptions from "@/utils/SettingsOptions";

const AccountSettings = () => {
  return (
    <View style={Styles.cardBorder}>
      <SettingOptionLink
        name="Cambiar contraseña"
        option={SettingsOptions.ChangePassword}
        icon={PasswordIcon}
      />
      <SettingOptionLink
        name="Cerrar sesión"
        option={SettingsOptions.Logout}
        icon={LogoutIcon}
      />
      <SettingOptionLink
        name="Borrar cuenta"
        option={SettingsOptions.DeleteAccount}
        icon={DeleteAccountIcon}
      />
    </View>
  );
};

export default AccountSettings;
