import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { SettingBoolOption, SettingPickOption } from "./settingOption";
import Button from "../button";
import Loading from "../loading";

import { DefaultAppConfig } from "@/models/appConfig";
import Styles from "@/styles";
import { APP_CONFIG, MAX_REMAINDER_LENGHT } from "@/utils/constants";

const Notifications = () => {
  const [shouldActivateNotifications, setShouldActivateNotifications] =
    useState(false);
  // const [shouldRenewNotifications, setShouldRenewNotifications] =
  //   useState(false);
  const [shouldCreateNotifications, setShouldCreateNotifications] =
    useState(false);
  const [cycleLength, setCycleLength] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dayOptions = [...Array(MAX_REMAINDER_LENGHT).keys()].map((val) => {
    return {
      label: `${val + 1} dias`,
      value: val + 1,
    };
  });

  const loadConfig = async () => {
    const appConfigString = await AsyncStorage.getItem(APP_CONFIG);
    let config = DefaultAppConfig;
    if (appConfigString !== null) {
      config = JSON.parse(appConfigString);
    }
    setShouldActivateNotifications(config.enableReminders);
    setShouldCreateNotifications(config.shouldCreateReminderOnNewLesion);
    setCycleLength(config.reminderCycleLength);
    setIsLoading(false);
  };

  const saveConfig = async () => {
    const config = {
      enableReminders: shouldActivateNotifications,
      shouldCreateReminderOnNewLesion: shouldCreateNotifications,
      reminderCycleLength: cycleLength,
    };
    const appConfigString = JSON.stringify(config);
    setIsLoading(true);
    await AsyncStorage.setItem(APP_CONFIG, appConfigString);
    setIsLoading(false);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={Styles.settingOptionCard}>
      <SettingBoolOption
        name="Activar notificaciones en el telefono"
        value={shouldActivateNotifications}
        onChange={setShouldActivateNotifications}
      />
      {/* <SettingBoolOption */}
      {/*   name="Renovar automaticamente los recordatorios" */}
      {/*   value={shouldRenewNotifications} */}
      {/*   onChange={setShouldRenewNotifications} */}
      {/* /> */}
      <SettingBoolOption
        name="Crear recordatorio para las nuevas lesiones en seguimiento"
        value={shouldCreateNotifications}
        onChange={setShouldCreateNotifications}
      />
      <SettingPickOption
        name="Los nuevos recordatorios avisan en:"
        dataOptions={dayOptions}
        enabled={shouldCreateNotifications}
        onValueChange={setCycleLength}
      />
      <Button title="Guardar" onPress={saveConfig} />
    </View>
  );
};

export default Notifications;
