import { Tabs } from "expo-router";

import ColorPallete from "@/colorPallete";
import Menubar from "@/components/home/menubar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={Menubar}
      sceneContainerStyle={{ backgroundColor: ColorPallete.background.ligthbg }}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: "Roboto",
          color: ColorPallete.text.ligthbg.title,
        },
      }}
    >
      <Tabs.Screen
        name="followup"
        options={{
          tabBarLabel: "Seguimiento",
          title: "Seguimiento de lesiones",
        }}
      />
      <Tabs.Screen name="help" options={{ title: "Ayuda" }} />
      <Tabs.Screen
        name="add"
        options={{ title: "Agregar nueva foto", tabBarLabel: "Agregar" }}
      />
      <Tabs.Screen name="settings" options={{ title: "Ajustes" }} />
    </Tabs>
  );
};

export default TabLayout;
