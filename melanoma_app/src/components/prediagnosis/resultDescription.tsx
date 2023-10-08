import { StyleSheet, Text, View } from "react-native";

import PrediagnosisResult from "@/models/prediagnosisResult";
import Styles from "@/styles";

interface ResultDescriptionProps {
  result: PrediagnosisResult;
}

const ResultDescription = (props: ResultDescriptionProps) => {
  return (
    <View style={styles.result}>
      <Text
        style={Styles.textBody}
      >{`Probabilidad de cáncer de melanoma: ${props.result.probability}`}</Text>
      <Text
        style={[Styles.textBody, { marginTop: 10 }]}
      >{`Descripción: ${props.result.description}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    padding: 10,
    ...Styles.cardBorder,
  },
});

export default ResultDescription;
