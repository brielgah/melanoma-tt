import { FlatList, ListRenderItemInfo, View } from "react-native";

import { QuestionCard } from "./cards";
import Styles from "../../../styles";

import IQuestion from "@/models/question";

interface QuestionsProps {
  questions: IQuestion[];
}

const Questions = (props: QuestionsProps) => {
  const renderQuestion = ({ item }: ListRenderItemInfo<IQuestion>) => {
    return (
      <QuestionCard title={item.title} body={item.body} questionId={item.id} />
    );
  };

  const gap = () => {
    return <View style={Styles.gap} />;
  };

  return (
    <View style={Styles.flexContainer}>
      <FlatList
        data={props.questions}
        renderItem={renderQuestion}
        contentContainerStyle={Styles.scrollContainer}
        ItemSeparatorComponent={gap}
      />
    </View>
  );
};

export default Questions;
