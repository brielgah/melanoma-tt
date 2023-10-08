import { useLocalSearchParams } from "expo-router";

import { TutorialSlider } from "@/components/help/tutorial";
import { getTutorials } from "@/utils/helpData";

const Tutorial = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tutorialIndex = Number(id || "0");
  const tutorial = getTutorials();
  const { steps } = tutorial[tutorialIndex];

  return <TutorialSlider tutorials={steps} />;
};

export default Tutorial;
