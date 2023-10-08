import { StyleSheet, View } from "react-native";

import ColorPallete from "@/colorPallete";
import LoginForm from "@/components/login/loginForm";

const Login = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPallete.blue.dark,
  },
});

export default Login;
