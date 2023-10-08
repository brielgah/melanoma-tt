import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ColorPallete from "../colorPallete";

interface SubtitleProps {
  title: string;
}

const Subtitle = (props: SubtitleProps) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Roboto",
    color: ColorPallete.text.ligthbg.subtitle,
  },
});

export default Subtitle;
