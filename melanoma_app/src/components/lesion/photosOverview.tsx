import { FlatList, ListRenderItemInfo, View } from "react-native";

import PhotoItem from "./photoItem";
import { default as PhotoModel } from "../../models/photo";
import Styles from "../../styles";

interface PhotosOverviewProps {
  photos: PhotoModel[];
  isEditing: boolean;
}

const PhotosOverview = (props: PhotosOverviewProps) => {
  const renderPhoto = ({ item }: ListRenderItemInfo<PhotoModel>) => {
    return <PhotoItem photo={item} isEditing={props.isEditing} />;
  };

  const gap = () => {
    return <View style={Styles.gap} />;
  };

  return (
    <View style={Styles.flexContainer}>
      <FlatList
        data={props.photos}
        renderItem={renderPhoto}
        contentContainerStyle={Styles.scrollContainer}
        ItemSeparatorComponent={gap}
      />
    </View>
  );
};

export default PhotosOverview;
