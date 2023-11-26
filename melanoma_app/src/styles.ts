import { StyleSheet } from "react-native";

import ColorPallete from "./colorPallete";

const ContainerStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 5,
  },
  buttonsBottomContainer: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  topContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  photoContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    padding: 30,
    margin: 20,
  },
});

const BorderStyles = StyleSheet.create({
  cardBorder: {
    borderRadius: 10,
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 3,
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
  },
});

const TextStyles = StyleSheet.create({
  textCaption: {
    fontSize: 10,
    fontFamily: "Verdana",
    color: ColorPallete.text.ligthbg.body,
  },
  textWhite: {
    color: ColorPallete.text.darkbg.body,
  },
  textBody: {
    fontFamily: "Verdana",
    fontSize: 12,
    color: ColorPallete.text.ligthbg.body,
  },
  textBold: {
    fontFamily: "VerdanaBold",
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 24,
    fontFamily: "Roboto",
  },
});

const UtilStyles = StyleSheet.create({
  gap: {
    height: 10,
    width: 10,
  },
  formRow: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    ...ContainerStyles.horizontalContainer,
  },
  inputLabel: {
    marginRight: 5,
    ...TextStyles.textBody,
  },
  settingOptionCard: {
    padding: 10,
    ...BorderStyles.cardBorder,
    ...ContainerStyles.topContainer,
  },
});

export const MarkdownStyles = {
  tableHeader: {
    backgroundColor: ColorPallete.blue.ligth,
  },
};

const Styles = {
  ...ContainerStyles,
  ...BorderStyles,
  ...TextStyles,
  ...UtilStyles,
};

export default Styles;
