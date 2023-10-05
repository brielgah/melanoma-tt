import { ListRenderItemInfo, StyleSheet, FlatList } from "react-native";

import SharedUser from "./sharedUser";

import Lesion from "@/models/lesion";
import User from "@/models/user";

interface SharedCarouselProps {
  parentLesion: Lesion;
  users: User[];
}

const SharedCarousel = (props: SharedCarouselProps) => {
  const renderUser = ({ item }: ListRenderItemInfo<User>) => {
    return <SharedUser parentLesion={props.parentLesion} user={item} />;
  };

  return (
    <FlatList
      data={props.users}
      renderItem={renderUser}
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

export default SharedCarousel;
