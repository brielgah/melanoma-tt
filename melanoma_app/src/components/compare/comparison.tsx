import { ScrollView, StyleSheet, Text, View } from "react-native";

import ZoomeableImage from "../zoomeableImage";

import { default as ComparisonModel } from "@/models/comparison";
import Styles from "@/styles";
import ComparisonOptions from "@/utils/ComparisonOptions";

interface ComparisonProps {
  comparison?: ComparisonModel;
  activeOption: ComparisonOptions;
}

const Comparison = (props: ComparisonProps) => {
  if (props.comparison === undefined) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  let activeImage = "";
  if (props.activeOption === ComparisonOptions.BEFORE) {
    activeImage = props.comparison.beforePhoto;
  }
  if (props.activeOption === ComparisonOptions.AFTER) {
    activeImage = props.comparison.afterPhoto;
  }
  if (props.activeOption === ComparisonOptions.COMPARISON) {
    activeImage = props.comparison.comparisonPhoto;
  }

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.imageContainer}>
        <ZoomeableImage image={activeImage} />
      </View>
      <ScrollView style={styles.bodyContainer}>
        <View style={[styles.valuesContainer, Styles.cardBorder]}>
          <View style={styles.valueRow}>
            <Text style={Styles.textBody}>
              {props.comparison.parameterName + " anterior:"}
            </Text>
            <Text style={Styles.textBody}>
              {props.comparison.beforeParameterValue.toFixed(5)}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={Styles.textBody}>
              {props.comparison.parameterName + " posterior:"}
            </Text>
            <Text style={Styles.textBody}>
              {props.comparison.afterParameterValue.toFixed(5)}
            </Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={Styles.textBody}>Cambio registrado:</Text>
            <Text style={Styles.textBody}>
              {(
                props.comparison.afterParameterValue -
                props.comparison.beforeParameterValue
              ).toFixed(5)}
            </Text>
          </View>
        </View>
        <View style={[styles.descriptionContainer, Styles.cardBorder]}>
          <Text style={Styles.textBody}>
            {"Descripción: " + props.comparison.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
  valuesContainer: {
    padding: 10,
    margin: 10,
  },
  descriptionContainer: {
    padding: 10,
    margin: 10,
  },
  valueRow: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    ...Styles.horizontalContainer,
  },
});

export default Comparison;
