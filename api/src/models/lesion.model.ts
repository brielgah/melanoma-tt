import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Photo from './photo.model';
import User from './user.model';

@Table
export default class Lesion extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    name!: string;

  @ForeignKey(() => User)
  @Column
    idUser!: number;

  @HasMany(() => Photo)
    photos!: Photo[];

  @BelongsTo(() => User)
    user!: User;
}
