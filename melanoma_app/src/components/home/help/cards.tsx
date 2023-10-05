import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Styles from "../../../styles";

interface InfoCardProps {
  title: string;
  icon: React.ElementType;
  backgroundColor: string;
  tutorialId: number;
}

export const InfoCard = (props: InfoCardProps) => {
  const bgColor = {
    backgroundColor: props.backgroundColor,
  };
  const Icon = props.icon;

  return (
    <Link
      href={{
        pathname: "/help/tutorial/[id]",
        params: {
          id: props.tutorialId,
        },
      }}
      asChild
      style={[style.infoCardContainer, bgColor]}
    >
      <TouchableOpacity>
        <View>
          <Icon />
          <Text style={[Styles.textCaption, style.separator]}>Acerca de</Text>
          <Text style={Styles.textBold}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

interface QuestionCardProps {
  title: string;
  body: string;
  questionId: number;
}

export const QuestionCard = (props: QuestionCardProps) => {
  return (
    <Link
      href={{
        pathname: "/help/[id]",
        params: {
          id: props.questionId,
        },
      }}
      asChild
      style={[Styles.cardBorder, style.questionCardContainer]}
    >
      <TouchableOpacity>
        <View>
          <Text style={Styles.textBold}>{props.title}</Text>
          <Text style={[Styles.textBody, style.separator]} numberOfLines={3}>
            {props.body}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const style = StyleSheet.create({
  infoCardContainer: {
    padding: 10,
    borderRadius: 10,
  },
  separator: {
    marginTop: 10,
  },
  questionCardContainer: {
    padding: 20,
  },
});
