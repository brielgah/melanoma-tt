import { ScrollView, StyleSheet, View } from "react-native";

import LesionBody from "@/components/home/add/lesionsBody";
import PrediagnosisBody from "@/components/home/add/prediagnosisBody";
import RemainderBody from "@/components/home/add/remainderBody";
import Section from "@/components/section";
import Styles from "@/styles";

const Add = () => {
  return (
    <ScrollView style={Styles.flexContainer}>
      <View style={styles.prediagnosisContainer}>
        <Section
          title="Agregar foto para prediagnóstico"
          body={PrediagnosisBody}
        />
      </View>
      <View style={styles.lesionContainer}>
        <Section title="Agregar foto a lesión" body={LesionBody} />
      </View>
      <View style={Styles.flexContainer}>
        <Section title="Agregar nuevo recordatorio" body={RemainderBody} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  prediagnosisContainer: {
    flex: 1,
  },
  lesionContainer: {
    flex: 1,
  },
});

export default Add;
