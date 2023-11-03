import { Table, Column, Model, HasMany, AutoIncrement, Unique, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, DataType } from 'sequelize-typescript';
import Reminder from './reminder.model';

@Table
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    name!: string;

  @Column
    lastName!: string;

  @Column
    userName!: string;

  @Column(DataType.TEXT)
    hash!: string;

  @Column(DataType.TEXT)
    salt!: string;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  @HasMany(() => Reminder)
    reminders?: Reminder[];

  // @HasMany(() => User)
  //   patients?: User[];
}
