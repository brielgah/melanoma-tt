import { AutoIncrement, BelongsTo, Column, CreatedAt, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './user';

@Table
export class Reminder extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  @BelongsTo(() => User)
    user!: User;
}
