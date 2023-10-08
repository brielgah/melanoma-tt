import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ColorPallete from "../colorPallete";

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: "Roboto",
    color: ColorPallete.text.ligthbg.title,
  },
});

export default Title;
