import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
// import { CheckBox } from "react-native-elements";

import Button from "../button";
import Loading from "../loading";

import ColorPallete from "@/colorPallete";
import { useUser } from "@/contexts/userContext";
import Lesion from "@/models/lesion";
import { usePostDoctorAssociationMutation } from "@/services/melanomaApi";
import Styles from "@/styles";

interface ShareModalProps {
  visible: boolean;
  parentLesion: Lesion;
  onCancel: () => void;
}

const ShareModal = (props: ShareModalProps) => {
  // const [isChecked, setIsChecked] = useState(false);
  const [doctorUserName, setDoctorUserName] = useState("");
  const { user } = useUser();
  const [postDoctorAssociationTrigger, result] =
    usePostDoctorAssociationMutation();

  const shareLesion = () => {
    const userName = doctorUserName.trim();
    postDoctorAssociationTrigger({
      userId: user?.id ?? 0,
      doctorUserName: userName,
      lesionId: props.parentLesion.id,
    });
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
          {result.isSuccess ? <Text>Compartido correctamente</Text> : <></>}
          {result.isLoading ? <Loading /> : <></>}
          {result.isError ? (
            <Text>
              No se pudo compartir la lesión, verifica que el usuario sea
              correcto.
            </Text>
          ) : (
            <></>
          )}
          <View style={styles.inputContainer}>
            <Text style={Styles.textBody}>Usuario:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="¿Con quién deseas compartir?"
              onChangeText={setDoctorUserName}
            />
          </View>
          {/* <View style={styles.inputContainer}> */}
          {/*   <CheckBox */}
          {/*     title="Brindar permiso para modificar las notas de las fotos" */}
          {/*     titleProps={{ style: Styles.textBody }} */}
          {/*     containerStyle={styles.checkboxInput} */}
          {/*     checked={isChecked} */}
          {/*     onPress={() => setIsChecked(!isChecked)} */}
          {/*   /> */}
          {/* </View> */}
          <View style={[Styles.buttonsContainer, Styles.horizontalContainer]}>
            <Button title="Compartir" onPress={shareLesion} />
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
  inputContainer: {
    width: "100%",
    ...Styles.horizontalContainer,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 3,
    marginLeft: 3,
    backgroundColor: ColorPallete.black.ligth,
  },
  checkboxInput: {
    flex: 1,
    width: "100%",
  },
});

export default ShareModal;
