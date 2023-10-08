import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ColorPallete from "@/colorPallete";
import Providers from "@/contexts/providers";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [areFontsLoaded] = useFonts({
    Verdana: require("@assets/fonts/Verdana.ttf"),
    VerdanaBold: require("@assets/fonts/verdanab.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Providers>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: ColorPallete.background.ligthbg },
          }}
        >
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen
            name="help/[id]"
            options={{ title: "Preguntas frecuentes" }}
          />
          <Stack.Screen
            name="help/tutorial/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="lesion/[id]/index" />
          <Stack.Screen name="lesion/[id]/[photoId]" />
          <Stack.Screen
            name="lesion/[id]/add"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="settings/[option]" />
          <Stack.Screen
            name="prediagnosis/index"
            options={{ title: "Nuevo prediagnóstico" }}
          />
          <Stack.Screen
            name="prediagnosis/analyze"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="prediagnosis/result"
            options={{ title: "Resultados" }}
          />
          <Stack.Screen name="photo/index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
        </Stack>
      </Providers>
    </SafeAreaProvider>
  );
};

export default RootLayout;
