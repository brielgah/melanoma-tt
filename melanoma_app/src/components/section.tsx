import { StyleSheet, View } from "react-native";

import Subtitle from "./subtitle";
import Styles from "../styles";

interface SectionProps {
  title: string;
  body: React.ElementType;
}

const Section = (props: SectionProps) => {
  const Body = props.body;

  return (
    <View style={[Styles.flexContainer, styles.container]}>
      <View>
        <Subtitle title={props.title} />
      </View>
      <View style={styles.bodyContainer}>
        <Body />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  debug: {
    backgroundColor: "red",
  },
  container: {
    margin: 10,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 10,
  },
});

export default Section;
