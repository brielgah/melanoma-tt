import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import Remainder from "./remainder";
import { default as RemainderModel } from "../../../models/remainder";

interface RemainderCarouselProps {
  remainders: RemainderModel[];
}

const RemainderCarousel = (props: RemainderCarouselProps) => {
  const remainders = props.remainders.sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date < b.date ? -1 : 1;
  });
  const renderRemainder = ({ item }: ListRenderItemInfo<RemainderModel>) => {
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

export default RemainderCarousel;
