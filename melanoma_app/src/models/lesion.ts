import Photo, { IPhoto, photoFromInterface } from "./photo";
import User from "./user";

export default class Lesion {
  id: number;
  name: string;
  photos: Photo[];
  sharedWithUsers: Partial<User>[];
  userIsOwner: boolean;
  ownerUsername?: string;
  userHasWriteNotesPermission: boolean;

  constructor(
    id: number,
    name: string,
    photos: Photo[],
    ownerUsername?: string,
    sharedWithUsers?: Partial<User>[],
    userHasWriteNotesPermission?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.photos = photos;
    this.ownerUsername = ownerUsername;
    this.userIsOwner = ownerUsername === undefined;
    this.sharedWithUsers = sharedWithUsers ?? [];
    this.userHasWriteNotesPermission = this.userIsOwner
      ? true
      : userHasWriteNotesPermission ?? false;
  }
}

export function getLastUpdatedLabel(lesion: Lesion) {
  let minDate = new Date(0);
  lesion.photos.forEach((photo: Photo) => {
    if (minDate < photo.createdOn) {
      minDate = photo.createdOn;
    }
  });
  return minDate.toLocaleDateString();
}

export function getFirstPhoto(lesion: Lesion): Photo | undefined {
  return lesion.photos[0];
}

export interface ILesion {
  id: number;
  name: string;
  idUser: number;
  photos: IPhoto[];
  owner?: Partial<User>;
  userHasWriteNotesPermission?: boolean;
  sharedWithUsers?: Partial<User>[];
}

export function lesionFromInterface(
  lesion: ILesion | undefined | null,
  user: User | undefined | null
) {
  if (lesion === undefined || lesion == null) return new Lesion(0, "", []);
  const photos = (lesion.photos ?? []).map((photo) =>
    photoFromInterface(photo)
  );
  const ownerUsername =
    lesion.owner?.userName === user?.userName
      ? undefined
      : lesion.owner?.userName;
  return new Lesion(
    lesion.id,
    lesion.name,
    photos,
    ownerUsername,
    lesion.sharedWithUsers,
    lesion.userHasWriteNotesPermission
  );
}
