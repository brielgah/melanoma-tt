import { CompareResponse } from "@/types/melanomaApiTypes";
import ComparisonParameters from "@/utils/ComparisonParameters";

export default class Comparison {
  beforePhoto: string;
  comparisonPhoto: string;
  afterPhoto: string;
  description: string;
  parameterName: string;
  beforeParameterValue: number;
  afterParameterValue: number;

  constructor(
    beforePhoto: string,
    comparisonPhoto: string,
    afterPhoto: string,
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

export function comparisonResultFromInterface(
  data: CompareResponse | undefined
) {
  if (data === undefined) {
    return new Map<ComparisonParameters, Comparison>();
  }
  const sym_before =
    (data.features.before.symetry[0] + data.features.before.symetry[1]) / 2;
  const sym_after =
    (data.features.after.symetry[0] + data.features.after.symetry[1]) / 2;
  const comparisonResult = new Map<ComparisonParameters, Comparison>([
    [
      ComparisonParameters.ASYMMETRY,
      new Comparison(
        data.imgs.before.symetry,
        data.imgs.compare.symetry,
        data.imgs.after.symetry,
        "Las lesiones de cáncer de melanoma suelen tener un alto porcentage de asimetría",
        "Porcentage de asimetría",
        sym_before,
        sym_after
      ),
    ],
    [
      ComparisonParameters.BORDER,
      new Comparison(
        data.imgs.before.roughness,
        data.imgs.compare.roughness,
        data.imgs.after.roughness,
        "Las lesiones de cáncer de melanoma suelen tener un alto índice de rugosidad",
        "Índice de rugosidad",
        data.features.before.roughness,
        data.features.after.roughness
      ),
    ],
    [
      ComparisonParameters.COLOR,
      new Comparison(
        data.imgs.before.color,
        data.imgs.compare.color,
        data.imgs.after.color,
        "Las lesiones de cáncer de melanoma suelen tener un color score entre 4-6",
        "Color score",
        data.features.before.color,
        data.features.after.color
      ),
    ],
    [
      ComparisonParameters.DIAMETER,
      new Comparison(
        data.imgs.before.roughness,
        data.imgs.compare.roughness,
        data.imgs.after.roughness,
        "Las lesiones de cáncer de melanoma suelen tener un diámetro igual o mayor a 6mm",
        "Diámetro",
        4,
        4
      ),
    ],
  ]);
  return comparisonResult;
}
