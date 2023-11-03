import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import User from './user.model';

@Table
export default class Patients extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  // @Unique
  // @Column(DataType.VIRTUAL)
  // user!: User;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  // @HasMany(() => User)
  // patients!: User[];
}
