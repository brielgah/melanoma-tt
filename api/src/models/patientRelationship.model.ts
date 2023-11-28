import {
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  Column,
} from 'sequelize-typescript';
import User from './user.model';
import Lesion from './lesion.model';

@Table
export default class PatientRelationship extends Model {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
    doctorId!: number;

  @ForeignKey(() => Lesion)
  @PrimaryKey
  @Column
    lesionId!: number;
}
