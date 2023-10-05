import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AddRemainderModal from "./addRemainderModal";

import Button from "@/components/button";
import { AddRemainderIcon } from "@/components/icons";
import Styles from "@/styles";

const RemainderBody = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={[Styles.centeredContainer, Styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card, { width: "100%" }]}>
        <Text>
          Agrega un recordatorio para que puedas llevar tu seguimiento de manera
          constante y puntual
        </Text>
        <Button
          style={{ marginTop: 10 }}
          title="Agregar recordatorio"
          onPress={() => setIsModalVisible(true)}
          icon={AddRemainderIcon}
        />
      </View>
      <AddRemainderModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});

export default RemainderBody;
