export default class Photo {
  id: number;
  name: string;
  createdOn: Date;
  localId: number;
  description: string;

  constructor(
    id: number,
    name: string,
    localId: number,
    createdOn: Date,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.createdOn = createdOn;
    this.localId = localId;
    this.description = description;
  }
}
