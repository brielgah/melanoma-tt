import type Photo from './photo';

export default interface Lesion {
  id: number;
  name: string;
  photos: Photo[];
}
