import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import Photo from "../../models/photo";
import Styles from "../../styles";
import Button from "../button";

interface CompareSelectorProps {
  visible: boolean;
  onCancel: () => void;
  onCompareSelected: (
    beforeId: number | undefined,
    afterId: number | undefined
  ) => void;
  photos: Photo[];
}

const CompareSelector = (props: CompareSelectorProps) => {
  const [beforeImageId, setBeforeImageId] = useState<number | undefined>(
    undefined
  );
  const [afterImageId, setAfterImageId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const [firstPhoto] = props.photos;
    setBeforeImageId(firstPhoto?.localId);
    setAfterImageId(firstPhoto?.localId);
  }, [props.photos]);

  const options = props.photos.map((photo, index) => {
    return (
      <Picker.Item
        label={photo.createdOn.toLocaleString()}
        value={photo.localId}
        key={index}
      />
    );
  });

  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <View style={[Styles.cardBorder, Styles.modalContainer]}>
          <View style={styles.dropdownsContainer}>
            <View style={styles.pickerContainer}>
              <View style={Styles.flexContainer}>
                <Text>Antes:</Text>
              </View>
              <Picker
                style={styles.pickOption}
                onValueChange={setBeforeImageId}
                mode="dialog"
              >
                {options}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <View style={Styles.flexContainer}>
                <Text>Despues:</Text>
              </View>
              <Picker
                style={styles.pickOption}
                onValueChange={setAfterImageId}
                mode="dialog"
              >
                {options}
              </Picker>
            </View>
          </View>
          <View style={[Styles.horizontalContainer, Styles.buttonsContainer]}>
            <Button
              style={Styles.flexContainer}
              title="Comparar"
              onPress={() =>
                props.onCompareSelected(beforeImageId, afterImageId)
              }
            />
            <Button
              style={Styles.flexContainer}
              title="Cancelar"
              color="black"
              onPress={props.onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdownsContainer: {
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    ...Styles.horizontalContainer,
  },
  pickOption: {
    flex: 2.5,
  },
});

export default CompareSelector;
