import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/button";
import { AddPhotoIcon } from "@/components/icons";
import { useUser } from "@/contexts/userContext";
import { lesionFromInterface } from "@/models/lesion";
import { useGetUserQuery } from "@/services/melanomaApi";
import Styles from "@/styles";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";
import { NEW_LESION_ID } from "@/utils/constants";

const LesionBody = () => {
  const { user } = useUser();
  const { data } = useGetUserQuery(user?.id ?? 0);
  const lesions = (data?.lesions ?? []).map((lesion) =>
    lesionFromInterface(lesion, user)
  );
  const [selectedLesionId, setSelectedLesionId] = useState(NEW_LESION_ID);

  const options = lesions.map((lesion) => {
    return (
      <Picker.Item label={lesion.name} value={lesion.id} key={lesion.id} />
    );
  });

  return (
    <View style={[Styles.centeredContainer, Styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card, { width: "100%" }]}>
        <Text>
          Toma una foto nueva para agregarla a tu registro de la lesión
          seleccionada, llevar un seguimiento de las lesiones sospechosas es
          importante para detectar el cáncer de melanoma en etapas tempranas
        </Text>
        <View style={styles.pickerContainer}>
          <View style={{ flex: 0.3 }}>
            <Text>Lesión:</Text>
          </View>
          <Picker
            style={Styles.flexContainer}
            selectedValue={selectedLesionId}
            onValueChange={setSelectedLesionId}
          >
            <Picker.Item label="Nueva lesión" value={NEW_LESION_ID} />
            {options}
          </Picker>
        </View>
        <Button
          style={{ marginTop: 10 }}
          title="Agregar foto a la lesión seleccionada"
          onPress={() =>
            router.push({
              pathname: "/photo/",
              params: {
                redirect: PhotoRedirectOptions.LESION,
                lesionId: selectedLesionId,
              },
            })
          }
          icon={AddPhotoIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 10,
    width: "100%",
    ...Styles.horizontalContainer,
  },
  card: {
    padding: 10,
  },
});

export default LesionBody;
