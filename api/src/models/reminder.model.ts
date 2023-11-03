import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user.model';
import Lesion from './lesion.model';

@Table
export default class Reminder extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @ForeignKey(() => User)
  @Column
    idUser!: number;

  @ForeignKey(() => Lesion)
  @Column
    idLesion!: number;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  @Column
    targetTimeStamp?: Date;

  @BelongsTo(() => User)
    user!: User;
}
