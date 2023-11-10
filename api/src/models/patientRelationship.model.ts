import {
  Model,
  Table,
  ForeignKey,
  Column,
  // BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table
export default class PatientRelationship extends Model {
  @ForeignKey(() => User)
  @Column
    doctorId!: number;

  @ForeignKey(() => User)
  @Column
    patientId!: number;
}
