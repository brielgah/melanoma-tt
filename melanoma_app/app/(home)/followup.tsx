import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, InteractionManager } from "react-native";

import { EditButton, SaveButton } from "@/components/button";
import LesionsOverview from "@/components/home/followup/lesionsOverview";
import RemainderCarousel from "@/components/home/followup/remainderCarousel";
import Section from "@/components/section";
import Lesion from "@/models/lesion";
import Remainder from "@/models/remainder";
import Styles from "@/styles";
import { getLesions, getRemainders } from "@/utils/testData";

const Followup = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [lesions, setLesions] = useState<Lesion[]>([]);
  const [remainders, setRemainders] = useState<Remainder[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <SaveButton
            style={{ marginRight: 10 }}
            onPress={() => setIsEditing(false)}
          />
        ) : (
          <EditButton
            style={{ marginRight: 10 }}
            onPress={() => setIsEditing(true)}
          />
        ),
    });

    const task = InteractionManager.runAfterInteractions(() => {
      setLesions(getLesions());
      setRemainders(getRemainders());
    });

    return () => task.cancel();
  }, [navigation, isEditing]);

  const Remainders = () => {
    return RemainderCarousel({ remainders });
  };

  const Lesions = () => {
    return LesionsOverview({ lesions, isEditing });
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.bodyContainer}>
        <View style={styles.remaindersContainer}>
          <Section title="Recordatorios" body={Remainders} />
        </View>
        <View style={styles.lesionsContainer}>
          <Section title="En seguimiento" body={Lesions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 10,
  },
  menubarContainer: {
    flex: 1,
  },
  remaindersContainer: {
    flex: 1,
    maxHeight: 150,
  },
  lesionsContainer: {
    flex: 5,
  },
});

export default Followup;
