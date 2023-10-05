import { Platform, Alert as NativeAlert } from "react-native";

const alertPolyfill = (title: string, description: string) => {
  window.confirm([title, description].filter(Boolean).join("\n"));
};

const Alert = Platform.OS === "web" ? alertPolyfill : NativeAlert.alert;

export default Alert;
