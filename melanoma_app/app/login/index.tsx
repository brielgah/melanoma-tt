import { Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";

import ColorPallete from "@/colorPallete";
import LoginMenu from "@/components/login/loginForm";
import { useUser } from "@/contexts/userContext";
import Styles from "@/styles";

const Login = () => {
  const { user } = useUser();

  if (user?.id === undefined) {
    return (
      <View style={styles.container}>
        <LoginMenu />
      </View>
    );
  }
  return <Redirect href="/(home)/followup" />;
};

const styles = StyleSheet.create({
  container: {
    ...Styles.centeredContainer,
    backgroundColor: ColorPallete.blue.dark,
  },
});

export default Login;
