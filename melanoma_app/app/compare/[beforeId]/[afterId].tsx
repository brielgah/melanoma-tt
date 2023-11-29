import { Picker } from "@react-native-picker/picker";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ColorPallete from "@/colorPallete";
import Button from "@/components/button";
import Comparison from "@/components/compare/comparison";
import Loading from "@/components/loading";
import { comparisonResultFromInterface } from "@/models/comparison";
import { usePostCompareQuery } from "@/services/melanomaApi";
import Styles from "@/styles";
import ComparisonOptions from "@/utils/ComparisonOptions";
import ComparisonParameters from "@/utils/ComparisonParameters";

const CompareImages = () => {
  const params = useLocalSearchParams<{ beforeId: string; afterId: string }>();
  const [activeComparisonOption, setActiveComparisonOption] = useState(
    ComparisonOptions.COMPARISON
  );
  const [activeComparisonParameter, setActiveComparisonParameter] = useState(
    ComparisonParameters.ASYMMETRY
  );
  const navigator = useNavigation();
  const { data, isLoading } = usePostCompareQuery({
    before: params.beforeId + ".jpg",
    after: params.afterId + ".jpg",
  });

  const comparisons = comparisonResultFromInterface(data);

  useEffect(() => {
    navigator.setOptions({
      title: `Comparar evolución`,
    });
  }, [navigator]);

  if (isLoading) {
    return <Loading />;
  }

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
          comparison={comparisons.get(activeComparisonParameter)}
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
