import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import ColorPallete from "../colorPallete";

export const LogoutButtonIcon = () => {
  return <MaterialIcons name="logout" size={20} color="white" />;
};

export const DeleteAccountButtonIcon = () => {
  return <MaterialIcons name="delete" size={20} color="white" />;
};

export const AddPhotoIcon = () => {
  return <MaterialIcons name="add-photo-alternate" size={20} color="white" />;
};

export const AddRemainderIcon = () => {
  return <MaterialIcons name="add-alert" size={20} color="white" />;
};

export const CompareIcon = () => {
  return <MaterialIcons name="compare" size={20} color="white" />;
};

export const ShareIcon = () => {
  return <FontAwesome name="share-square-o" size={20} color="white" />;
};

export const LogoutIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <MaterialIcons
        style={styles.centeredIcon}
        name="logout"
        size={13}
        color="white"
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.pink.normal}
      />
    </View>
  );
};

export const DeleteAccountIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <MaterialIcons
        style={styles.centeredIcon}
        name="delete"
        size={13}
        color="white"
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.orange.normal}
      />
    </View>
  );
};

export const PasswordIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <MaterialCommunityIcons
        style={styles.centeredIcon}
        name="form-textbox-password"
        size={13}
        color="white"
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.blue.normal}
      />
    </View>
  );
};

export const NotificationIcon = () => {
  return (
    <Ionicons
      name="notifications-circle"
      size={24}
      color={ColorPallete.orange.normal}
    />
  );
};

export const PrivacyIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <Ionicons
        name="shield"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.blue.normal}
      />
    </View>
  );
};

export const SecurityIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <Entypo
        name="lock-open"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.pink.normal}
      />
    </View>
  );
};

export const InfoIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <MaterialIcons
        name="info-outline"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.green.normal}
      />
    </View>
  );
};

export const NotificationCardIcon = () => {
  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color={ColorPallete.skyblue.dark}
    />
  );
};

export const PhotoCardIcon = () => {
  return <FontAwesome name="photo" size={24} color={ColorPallete.green.dark} />;
};

export const PrediagnosisCardIcon = () => {
  return (
    <FontAwesome name="search" size={24} color={ColorPallete.orange.dark} />
  );
};

export const FollowupCardIcon = () => {
  return (
    <MaterialCommunityIcons
      name="file-search-outline"
      size={25}
      color={ColorPallete.pink.dark}
    />
  );
};

const styles = StyleSheet.create({
  relativeContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  centeredIcon: {
    position: "absolute",
    zIndex: 99,
  },
});
