import { View, StyleSheet } from "react-native";

import AccountSettings from "@/components/home/settings/accountSettings";
import SettingsOptions from "@/components/home/settings/settingsOptions";
import Section from "@/components/section";
import Styles from "@/styles";

const Settings = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.bodyContainer}>
        <View style={Styles.flexContainer}>
          <Section title="Ajustes de la cuenta" body={AccountSettings} />
        </View>
        <View style={styles.settingsSection}>
          <Section title="Ajustes de la aplicación" body={SettingsOptions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 10,
  },
  settingsSection: {
    flex: 2,
  },
});

export default Settings;
