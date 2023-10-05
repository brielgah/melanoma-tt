import { ScrollView, StyleSheet, View } from "react-native";

import ResultDescription from "@/components/prediagnosis/resultDescription";
import Section from "@/components/section";
import ZoomeableImage from "@/components/zoomeableImage";
import Styles from "@/styles";
import { getPrediagnosisResult } from "@/utils/testData";

const Result = () => {
  const result = getPrediagnosisResult();

  const Body = () => {
    return ResultDescription({ result });
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.imageContainer}>
        <ZoomeableImage
          style={styles.image}
          image={{ uri: result.segementedLesion.base64 }}
        />
      </View>
      <ScrollView style={styles.resultContainer}>
        <Section title="Resultados" body={Body} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
  },
});

export default Result;
