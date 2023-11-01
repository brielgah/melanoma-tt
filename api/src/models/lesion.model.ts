import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import Photo from './photo.model';

@Table
export default class Lesion extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    name!: string;

  @HasMany(() => Photo)
    photos!: Photo[];
}
