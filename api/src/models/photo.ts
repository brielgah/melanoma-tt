import type Image from './image';

export default interface Photo {
  id: number;
  name: string;
  dateOfCreation: number;
  description: string;
  blobName: string;
  image: Image;
}
