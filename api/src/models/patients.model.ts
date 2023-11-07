import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

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
