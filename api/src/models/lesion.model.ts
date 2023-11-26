import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import Photo from './photo.model';
import User from './user.model';
import PatientRelationship from './patientRelationship.model';
import Reminder from './reminder.model';

@Table
export default class Lesion extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    name!: string;

  @ForeignKey(() => User)
  @Column
    idUser!: number;

  @HasMany(() => Photo)
    photos!: Photo[];

  @BelongsTo(() => User, { foreignKey: 'idUser' })
    owner!: User;

  @HasMany(() => Reminder)
    reminders?: Reminder[];

  @BelongsToMany(() => User, {
    through: { model: () => PatientRelationship },
    foreignKey: 'lesionId',
    sourceKey: 'id',
    as: 'sharedWithUsers',
  })
    sharedWithUsers?: User[];
}
