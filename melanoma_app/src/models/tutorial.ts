import { ImageSource } from "expo-image";

export interface ITutorialStep {
  title: string;
  body: string;
  backgroundColor: string;
  image: ImageSource;
}

export default interface ITutorial {
  id: number;
  title: string;
  color: string;
  icon: string;
  steps: ITutorialStep[];
}
