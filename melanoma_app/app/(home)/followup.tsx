import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, InteractionManager } from "react-native";

import { EditButton, SaveButton } from "@/components/button";
import LesionsOverview from "@/components/home/followup/lesionsOverview";
import RemainderCarousel from "@/components/home/followup/remainderCarousel";
import Loading from "@/components/loading";
import Section from "@/components/section";
import { useUser } from "@/contexts/userContext";
import { lesionFromInterface } from "@/models/lesion";
import { reminderFromInterface } from "@/models/reminder";
import { useGetUserQuery } from "@/services/melanomaApi";
import Styles from "@/styles";

const Followup = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const { data, isLoading } = useGetUserQuery(user?.id ?? 0);

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
      // setRemainders(getRemainders());
    });

    return () => task.cancel();
  }, [navigation, isEditing]);

  const Remainders = () => {
    const reminders = (data?.reminders ?? []).map((reminder) =>
      reminderFromInterface(reminder)
    );
    return RemainderCarousel({ reminders });
  };

  const Lesions = () => {
    const lesions = (data?.lesions ?? []).map((ilesion) => {
      return lesionFromInterface(ilesion, user);
    });
    return LesionsOverview({ lesions, isEditing });
  };

  if (isLoading) {
    return <Loading />;
  }

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
