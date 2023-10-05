import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AddPhotoSelector from "./addPhotoSelector";

import Button from "@/components/button";
import { AddPhotoIcon } from "@/components/icons";
import Styles from "@/styles";

const PrediagnosisBody = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[Styles.centeredContainer, Styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card]}>
        <Text>
          Toma una foto nueva o seleeciona dede tu galeria. La foto será
          analizada para detectar la posibilidad de cáncer de melanoma
        </Text>
        <Button
          onPress={() =>
            router.push({
              pathname: "/prediagnosis/",
            })
          }
          style={{ marginTop: 10 }}
          title="Agregar foto para evaluación"
          icon={AddPhotoIcon}
        />
      </View>
      <AddPhotoSelector
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});

export default PrediagnosisBody;
