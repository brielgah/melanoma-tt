import { StyleSheet, View } from "react-native";

import Styles from "../../../styles";
import { default as Options } from "../../../utils/SettingsOptions";
import {
  InfoIcon,
  NotificationIcon,
  PrivacyIcon,
  SecurityIcon,
} from "../../icons";
import { SettingOptionLink } from "../../settings/settingOption";

const SettingsOptions = () => {
  return (
    <View style={styles.container}>
      <SettingOptionLink
        name="Notificaciones"
        option={Options.Notification}
        icon={NotificationIcon}
      />
      <SettingOptionLink
        name="Privacidad"
        option={Options.Privacy}
        icon={PrivacyIcon}
      />
      <SettingOptionLink
        name="Seguridad"
        option={Options.Security}
        icon={SecurityIcon}
      />
      <SettingOptionLink name="About" option={Options.About} icon={InfoIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Styles.cardBorder,
  },
});

export default SettingsOptions;
