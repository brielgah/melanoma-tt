import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import Remainder from "./remainder";
import { default as ReminderModel } from "../../../models/reminder";

interface ReminderCarouselProps {
  reminders: ReminderModel[];
}

const ReminderCarousel = (props: ReminderCarouselProps) => {
  const remainders = props.reminders.sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date < b.date ? -1 : 1;
  });
  const renderRemainder = ({ item }: ListRenderItemInfo<ReminderModel>) => {
    return <Remainder remainder={item} />;
  };

  return (
    <FlatList
      data={remainders}
      renderItem={renderRemainder}
      contentContainerStyle={styles.container}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default ReminderCarousel;
