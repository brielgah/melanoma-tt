import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import Button from "../../button";

import Alert from "@/Alert";
import { useUser } from "@/contexts/userContext";
import Lesion from "@/models/lesion";
import { usePostReminderMutation } from "@/services/melanomaApi";
import Styles from "@/styles";
import { MAX_REMAINDER_LENGHT } from "@/utils/constants";

interface AddRemainderModalProps {
  visible: boolean;
  onCancel: () => void;
  lesions: Lesion[];
}

const AddRemainderModal = (props: AddRemainderModalProps) => {
  const { user } = useUser();
  const lesions = props.lesions;
  const [selectedLesionId, setSelectedLesionId] = useState(
    lesions[0]?.id ?? -1
  );
  const [selectedDays, setSelectedDays] = useState(1);
  const [postReminderTrigger] = usePostReminderMutation();

  const lesionOptions = lesions.map((lesion) => {
    return (
      <Picker.Item label={lesion.name} value={lesion.id} key={lesion.id} />
    );
  });

  const dayOptions = [...Array(MAX_REMAINDER_LENGHT).keys()]
    .map((i) => i + 1)
    .map((val) => {
      return <Picker.Item label={`${val} días`} value={val} key={val} />;
    });

  const addReminder = () => {
    if (selectedLesionId === -1) {
      Alert("Error", "Lesión inválida");
      return;
    }
    const date = new Date();
    date.setDate(date.getDate() + selectedDays);
    postReminderTrigger({
      idUser: user?.id ?? 0,
      idLesion: selectedLesionId,
      reminder: {
        targetTimeStamp: date.toISOString(),
        cycleLength: selectedDays * 24,
      },
    });
    props.onCancel();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <View style={[Styles.cardBorder, Styles.modalContainer]}>
          <View style={styles.pickerContainer}>
            <View style={{ flex: 0.3 }}>
              <Text>Lesión:</Text>
            </View>
            <Picker
              style={Styles.flexContainer}
              selectedValue={selectedLesionId}
              onValueChange={setSelectedLesionId}
            >
              {lesionOptions}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <View style={{ flex: 0.3 }}>
              <Text>Recardar en:</Text>
            </View>
            <Picker
              style={Styles.flexContainer}
              selectedValue={selectedDays}
              onValueChange={setSelectedDays}
            >
              {dayOptions}
            </Picker>
          </View>
          <View style={[Styles.horizontalContainer, Styles.buttonsContainer]}>
            <Button title="Añadir" onPress={addReminder} />
            <Button
              title="Cancelar"
              onPress={() => props.onCancel()}
              color="black"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 10,
    width: "100%",
    ...Styles.horizontalContainer,
  },
});

export default AddRemainderModal;
