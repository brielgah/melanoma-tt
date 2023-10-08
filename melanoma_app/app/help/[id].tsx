import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

import QuestionBody from "@/components/help/QuestionBody";
import Section from "@/components/section";
import Styles from "@/styles";
import { getQuestions } from "@/utils/helpData";

const HelpAnswer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionIndex = Number(id || "0");
  const questions = getQuestions();
  const question = questions[questionIndex];

  const Body = () => {
    return QuestionBody({ question });
  };

  return (
    <ScrollView style={Styles.flexContainer}>
      <Section title={question.title} body={Body} />
    </ScrollView>
  );
};

export default HelpAnswer;
