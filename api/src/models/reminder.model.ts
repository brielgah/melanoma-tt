import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './user.model';
import Lesion from './lesion.model';

@Table
export default class Reminder extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    idUser!: number;

  // In hours
  @Column
    cycleLength!: number;

  @BelongsTo(() => User, { foreignKey: 'idUser', targetKey: 'id' })
    user!: User;

  @Column
    idLesion!: number;

  @BelongsTo(() => Lesion, { foreignKey: 'idLesion', targetKey: 'id' })
    lesion!: Lesion;

  @CreatedAt
    creationDate?: Date;

  @UpdatedAt
    updatedOn?: Date;

  @DeletedAt
    deletionDate?: Date;

  @Column
    targetTimeStamp?: Date;
}
