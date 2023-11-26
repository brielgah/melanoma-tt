import { Image } from "./pictureMedia";

export default class Photo {
  id: number;
  name: string;
  createdOn: Date;
  localId: number;
  description: string;
  image: Image;

  constructor(
    id: number,
    name: string,
    localId: number,
    createdOn: Date,
    description: string,
    image: Image
  ) {
    this.id = id;
    this.name = name;
    this.createdOn = createdOn;
    this.localId = localId;
    this.description = description;
    this.image = image;
  }
}

export interface IPhoto {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  lesionId: number;
  image: Image;
}

export function photoFromInterface(photo: IPhoto | null | undefined) {
  if (photo === undefined || photo === null) {
    return new Photo(0, "", 0, new Date(), "", { ext: "", name: "", data: "" });
  }
  return new Photo(
    photo.id,
    photo.name,
    0,
    new Date(photo.createdAt),
    photo.description,
    photo.image
  );
}
