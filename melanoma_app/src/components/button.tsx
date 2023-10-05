import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { Fragment } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ViewStyle,
  View,
} from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";

interface BaseButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const EditButton = (props: BaseButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.editButton, props.style]}
      onPress={() => props.onPress?.()}
    >
      <Feather name="edit" size={24} color={ColorPallete.orange.normal} />
    </TouchableOpacity>
  );
};

export const SaveButton = (props: BaseButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.editButton, props.style]}
      onPress={() => props.onPress?.()}
    >
      <FontAwesome name="save" size={24} color={ColorPallete.green.normal} />
    </TouchableOpacity>
  );
};

interface ButtonProps extends BaseButtonProps {
  title: string;
  color: string;
  icon?: React.ElementType;
}

const Button = (props: ButtonProps) => {
  const bgColor = { backgroundColor: props.color };
  const Icon = props.icon ?? Fragment;
  const margin = props.icon !== undefined ? { marginRight: 10 } : {};

  return (
    <TouchableOpacity
      style={[bgColor, styles.container, props.style]}
      onPress={() => props.onPress?.()}
    >
      <View style={[Styles.horizontalContainer, styles.hCenterContainer]}>
        <Text style={[Styles.textBody, Styles.textWhite, styles.text, margin]}>
          {props.title}
        </Text>
        <Icon />
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  color: ColorPallete.blue.dark,
};

const styles = StyleSheet.create({
  editButton: {
    ...Platform.select({
      web: {
        marginHorizontal: 16,
      },
    }),
  },
  text: {
    // width: "100%",
    textAlign: "center",
  },
  container: {
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    margin: 1,
  },
  hCenterContainer: {
    alignSelf: "center",
  },
});

export default Button;
