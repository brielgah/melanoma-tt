import {
  Model,
  Table,
  ForeignKey,
  Column,
  PrimaryKey,
} from 'sequelize-typescript';
import User from './user.model';

@Table
export default class PatientRelationship extends Model {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
    doctorId!: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
    patientId!: number;
}
