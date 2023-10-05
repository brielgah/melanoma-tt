import PictureMedia from "./pictureMedia";

export default class PrediagnosisResult {
  probability: number;
  description: string;
  segementedLesion: PictureMedia;

  constructor(
    probability: number,
    description: string,
    segmented: PictureMedia
  ) {
    this.probability = probability;
    this.description = description;
    this.segementedLesion = segmented;
  }
}
