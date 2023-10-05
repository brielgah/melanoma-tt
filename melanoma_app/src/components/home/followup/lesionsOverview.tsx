import { FlatList, ListRenderItemInfo, View } from "react-native";

import LesionItem from "./lesionItem";
import { default as LesionModel } from "../../../models/lesion";
import Styles from "../../../styles";

interface LesionsOverviewProps {
  lesions: LesionModel[];
  isEditing: boolean;
}

const LesionsOverview = (props: LesionsOverviewProps) => {
  const renderLesion = ({ item }: ListRenderItemInfo<LesionModel>) => {
    return <LesionItem lesion={item} isEditing={props.isEditing} />;
  };

  const gap = () => {
    return <View style={Styles.gap} />;
  };

  return (
    <View style={Styles.flexContainer}>
      <FlatList
        data={props.lesions}
        renderItem={renderLesion}
        contentContainerStyle={Styles.scrollContainer}
        ItemSeparatorComponent={gap}
      />
    </View>
  );
};

export default LesionsOverview;
