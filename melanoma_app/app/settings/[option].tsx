import { useLocalSearchParams, useNavigation } from "expo-router";
import { Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import ChangePassword from "@/components/settings/changePassword";
import DeleteAccount from "@/components/settings/deleteAccount";
import Logout from "@/components/settings/logout";
import Notifications from "@/components/settings/notifications";
import { SettingMarkdownOption } from "@/components/settings/settingOption";
import SettingsOptions from "@/utils/SettingsOptions";
import MarkdownFiles from "@/utils/markdowns";

const optionMap = new Map([
  [SettingsOptions.ChangePassword, ChangePassword],
  [SettingsOptions.Logout, Logout],
  [SettingsOptions.DeleteAccount, DeleteAccount],
  [SettingsOptions.Notification, Notifications],
  [
    SettingsOptions.Privacy,
    () => SettingMarkdownOption({ asset: MarkdownFiles.privacy }),
  ],
  [
    SettingsOptions.Security,
    () => SettingMarkdownOption({ asset: MarkdownFiles.security }),
  ],
  [
    SettingsOptions.About,
    () => SettingMarkdownOption({ asset: MarkdownFiles.about }),
  ],
]);

const Setting = () => {
  const params = useLocalSearchParams<{ option: string; title?: string }>();
  const option = Number(params.option);
  const OptionBody = optionMap.get(option) ?? Fragment;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <OptionBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default Setting;
