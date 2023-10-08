import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import ColorPallete from "../../colorPallete";
import Styles from "../../styles";

interface MenubarOptionProps {
  title: string;
  icon: string;
  onPress: () => void;
  onLongPress: () => void;
}

interface MenubarOptionIconProps {
  type: string;
}

const MenubarOptionIcon = (props: MenubarOptionIconProps) => {
  switch (props.type) {
    case "help":
      return (
        <Feather
          name="help-circle"
          size={25}
          color={ColorPallete.orange.ligth}
        />
      );
    case "followup":
      return (
        <MaterialCommunityIcons
          name="file-search-outline"
          size={25}
          color={ColorPallete.skyblue.ligth}
        />
      );
    case "add":
      return (
        <Ionicons
          name="add-circle-outline"
          size={25}
          color={ColorPallete.pink.ligth}
        />
      );
    case "settings":
      return (
        <AntDesign name="setting" size={25} color={ColorPallete.green.ligth} />
      );
    default:
      return <></>;
  }
};

const MenubarOption = (props: MenubarOptionProps) => {
  return (
    <View style={Styles.centeredContainer}>
      <TouchableOpacity
        style={Styles.centeredContainer}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        <MenubarOptionIcon type={props.icon} />
        <Text style={[Styles.textCaption, Styles.textWhite]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Menubar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const tabOptions = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label = (options.tabBarLabel ??
      options.title ??
      route.name) as string;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <MenubarOption
        title={label}
        onPress={onPress}
        onLongPress={onLongPress}
        icon={route.name}
        key={route.key}
      />
    );
  });

  return (
    <View style={[Styles.flexContainer, styles.container]}>
      <View style={[Styles.flexContainer, styles.dockContainer]}>
        {tabOptions}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 0.1,
  },
  dockContainer: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: ColorPallete.black.normal,
  },
});

export default Menubar;
