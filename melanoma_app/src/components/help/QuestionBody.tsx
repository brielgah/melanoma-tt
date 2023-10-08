import { StyleSheet, Text, View } from "react-native";

import MarkdownView from "../markdownView";

import IQuestion from "@/models/question";
import Styles from "@/styles";

interface QuestionBodyProps {
  question: IQuestion;
}

const QuestionBody = (props: QuestionBodyProps) => {
  return (
    <View style={[Styles.cardBorder, style.bodyContainer]}>
      {props.question.markdownFile ? (
        <MarkdownView
          source="Cargando..."
          asset={props.question.markdownFile}
        />
      ) : (
        <Text>{props.question.body}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  bodyContainer: {
    padding: 20,
  },
});

export default QuestionBody;
