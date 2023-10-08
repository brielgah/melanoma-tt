import Photo from "./photo";
import User from "./user";

export default class Lesion {
  id: number;
  name: string;
  photos: Photo[];
  sharedWithUsers: User[];
  userIsOwner: boolean;
  ownerUsername?: string;
  userHasWriteNotesPermission: boolean;

  constructor(
    id: number,
    name: string,
    photos: Photo[],
    ownerUsername?: string,
    sharedWithUsers?: User[],
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

  getLastUpdatedLabel() {
    let minDate = new Date(0);
    this.photos.forEach((photo: Photo) => {
      if (minDate < photo.createdOn) {
        minDate = photo.createdOn;
      }
    });
    return minDate.toLocaleDateString();
  }

  getFirstPhoto() {
    return this.photos[0];
  }
}
