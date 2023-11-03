import { Table, Column, Model, HasMany, AutoIncrement, Unique, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { User } from './user.model';
@Table
export class Patients extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Unique
    user!: User;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  @HasMany(() => User)
    patients!: User[];
}
