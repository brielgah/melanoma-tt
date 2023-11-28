import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AddRemainderModal from "./addRemainderModal";

import Button from "@/components/button";
import { AddRemainderIcon } from "@/components/icons";
import { useUser } from "@/contexts/userContext";
import { lesionFromInterface } from "@/models/lesion";
import { useGetUserQuery } from "@/services/melanomaApi";
import Styles from "@/styles";

const RemainderBody = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useUser();
  const { data } = useGetUserQuery(user?.id ?? 0);
  const lesions = (data?.lesions ?? []).map((lesion) =>
    lesionFromInterface(lesion, user)
  );

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
        lesions={lesions}
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
