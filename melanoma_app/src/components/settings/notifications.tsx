import { useState } from "react";
import { View } from "react-native";

import { SettingBoolOption, SettingPickOption } from "./settingOption";

import Styles from "@/styles";
import { MAX_REMAINDER_LENGHT } from "@/utils/constants";

const Notifications = () => {
  const [shouldActivateNotifications, setShouldActivateNotifications] =
    useState(false);
  const [shouldRenewNotifications, setShouldRenewNotifications] =
    useState(false);
  const [shouldCreateNotifications, setShouldCreateNotifications] =
    useState(false);
  const dayOptions = [...Array(MAX_REMAINDER_LENGHT).keys()].map((val) => {
    return {
      label: `${val + 1} dias`,
      value: val + 1,
    };
  });

  return (
    <View style={Styles.settingOptionCard}>
      <SettingBoolOption
        name="Activar notificaciones en el telefono"
        value={shouldActivateNotifications}
        onChange={setShouldActivateNotifications}
      />
      <SettingBoolOption
        name="Renovar automaticamente los recordatorios"
        value={shouldRenewNotifications}
        onChange={setShouldRenewNotifications}
      />
      <SettingBoolOption
        name="Crear recordatorio para las nuevas lesiones en seguimiento"
        value={shouldCreateNotifications}
        onChange={setShouldCreateNotifications}
      />
      <SettingPickOption
        name="Los nuevos recordatorios avisan en:"
        dataOptions={dayOptions}
        enabled={shouldCreateNotifications}
      />
    </View>
  );
};

export default Notifications;
