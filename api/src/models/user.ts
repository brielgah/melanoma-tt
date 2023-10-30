import { Table, Column, Model, HasMany, AutoIncrement, Unique, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import {Image} from './image';
import {Reminder} from './reminder';
@Table
export class User extends Model {

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

  @Column
  password!: string;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;

  @DeletedAt
  deletionDate?: Date;

  @HasMany(() => Image)
  images?: Image[];

  @HasMany(() => Reminder)
  reminders?: Reminder[];

  @HasMany(() => User)
  patients?: User[];
}