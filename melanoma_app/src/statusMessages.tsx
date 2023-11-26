import { StyleSheet, Text, View } from "react-native";

import ColorPallete from "./colorPallete";

interface StatusMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: StatusMessageProps) => {
  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: ColorPallete.error.ligth,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ColorPallete.error.dark,
  },
  errorText: {
    color: "black",
  },
});
