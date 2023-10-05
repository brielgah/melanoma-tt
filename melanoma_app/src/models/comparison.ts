import Photo from "./photo";

export default class Comparison {
  beforePhoto: Photo;
  comparisonPhoto: Photo;
  afterPhoto: Photo;
  description: string;
  parameterName: string;
  beforeParameterValue: number;
  afterParameterValue: number;

  constructor(
    beforePhoto: Photo,
    comparisonPhoto: Photo,
    afterPhoto: Photo,
    description: string,
    parameterName: string,
    beforeParameterValue: number,
    afterParameterValue: number
  ) {
    this.beforePhoto = beforePhoto;
    this.comparisonPhoto = comparisonPhoto;
    this.afterPhoto = afterPhoto;
    this.description = description;
    this.parameterName = parameterName;
    this.beforeParameterValue = beforeParameterValue;
    this.afterParameterValue = afterParameterValue;
  }
}
