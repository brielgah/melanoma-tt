import { Picker } from "@react-native-picker/picker";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ColorPallete from "@/colorPallete";
import Button from "@/components/button";
import Comparison from "@/components/compare/comparison";
import Styles from "@/styles";
import ComparisonOptions from "@/utils/ComparisonOptions";
import ComparisonParameters from "@/utils/ComparisonParameters";
import { getComparison } from "@/utils/testData";

const ComparisonParametersLabels = new Map([
  [ComparisonParameters.ASYMMETRY, "Porcentage de asimetría"],
  [ComparisonParameters.BORDER, "Porcentage de rugosidad"],
  [ComparisonParameters.COLOR, "Histograma"],
  [ComparisonParameters.DIAMETER, "Diametro"],
]);

const CompareImages = () => {
  const params = useLocalSearchParams<{ beforeId: string; afterId: string }>();
  const [activeComparisonOption, setActiveComparisonOption] = useState(
    ComparisonOptions.COMPARISON
  );
  const [activeComparisonParameter, setActiveComparisonParameter] = useState(
    ComparisonParameters.ASYMMETRY
  );
  const navigator = useNavigation();

  const comparison = getComparison(
    Number(params.beforeId),
    Number(params.afterId),
    ComparisonParametersLabels.get(activeComparisonParameter) || "default"
  );

  useEffect(() => {
    navigator.setOptions({
      title: `Comparando ${comparison.beforePhoto.createdOn.toLocaleString()} y ${comparison.afterPhoto.createdOn.toLocaleString()}`,
    });
  }, [navigator]);

  return (
    <View style={Styles.flexContainer}>
      <Picker
        style={[Styles.cardBorder, styles.picker]}
        mode="dropdown"
        selectedValue={activeComparisonParameter}
        onValueChange={(itemValue, _index) =>
          setActiveComparisonParameter(Number(itemValue))
        }
      >
        <Picker.Item label="Asimetría" value={ComparisonParameters.ASYMMETRY} />
        <Picker.Item label="Borde" value={ComparisonParameters.BORDER} />
        <Picker.Item label="Color" value={ComparisonParameters.COLOR} />
        <Picker.Item label="Diametro" value={ComparisonParameters.DIAMETER} />
      </Picker>
      <View style={styles.bodyContainer}>
        <Comparison
          activeOption={activeComparisonOption}
          comparison={comparison}
        />
      </View>
      <View
        style={[
          Styles.buttonsBottomContainer,
          Styles.horizontalContainer,
          styles.buttonsContainer,
        ]}
      >
        <Button
          style={styles.button}
          title="Antes"
          color={
            activeComparisonOption === ComparisonOptions.BEFORE
              ? ColorPallete.skyblue.dark
              : ColorPallete.blue.dark
          }
          onPress={() => setActiveComparisonOption(ComparisonOptions.BEFORE)}
        />
        <Button
          style={styles.button}
          title="Comparación"
          color={
            activeComparisonOption === ComparisonOptions.COMPARISON
              ? ColorPallete.skyblue.dark
              : ColorPallete.blue.dark
          }
          onPress={() =>
            setActiveComparisonOption(ComparisonOptions.COMPARISON)
          }
        />
        <Button
          style={styles.button}
          title="Despues"
          color={
            activeComparisonOption === ComparisonOptions.AFTER
              ? ColorPallete.skyblue.dark
              : ColorPallete.blue.dark
          }
          onPress={() => setActiveComparisonOption(ComparisonOptions.AFTER)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    padding: 10,
  },
  bodyContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    borderRadius: 0,
    margin: 0,
  },
  buttonsContainer: {
    position: "relative",
  },
});

export default CompareImages;
