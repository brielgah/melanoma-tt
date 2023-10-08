import { Fragment } from "react";
import { FlatList, ListRenderItemInfo, View, StyleSheet } from "react-native";

import { InfoCard } from "./cards";
import Styles from "../../../styles";
import { getTutorials } from "../../../utils/helpData";
import {
  FollowupCardIcon,
  NotificationCardIcon,
  PhotoCardIcon,
  PrediagnosisCardIcon,
} from "../../icons";

import ITutorial from "@/models/tutorial";

const getIcon = (name: string) => {
  switch (name) {
    case "notifications":
      return NotificationCardIcon;
    case "photos":
      return PhotoCardIcon;
    case "followup":
      return FollowupCardIcon;
    case "prediagnosis":
      return PrediagnosisCardIcon;
    default:
      return Fragment;
  }
};

interface TutorialsOverviewProps {
  searchFilter?: string;
}

const TutorialsOverview = (props: TutorialsOverviewProps) => {
  const Tutorials = getTutorials();
  const tutorials = Tutorials.filter((tutorial) => {
    if (props.searchFilter === undefined) return true;
    const label = tutorial.title.toLowerCase();
    return label.includes(props.searchFilter);
  });

  const renderCard = ({ item }: ListRenderItemInfo<ITutorial>) => {
    return (
      <InfoCard
        title={item.title}
        backgroundColor={item.color}
        icon={getIcon(item.icon)}
        tutorialId={item.id}
      />
    );
  };

  const gap = () => {
    return <View style={Styles.gap} />;
  };

  return (
    <View>
      <FlatList
        data={tutorials}
        renderItem={renderCard}
        contentContainerStyle={[Styles.scrollContainer, styles.center]}
        ItemSeparatorComponent={gap}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
  },
});

export default TutorialsOverview;
