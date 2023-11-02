<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7d2ac03 (Changing Image model)
export default interface Image {
  name: string;
  ext: string;
  data: string;
<<<<<<< HEAD
}
=======
import { AutoIncrement, BelongsTo, Column, CreatedAt, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import {User} from './user';
@Table
export class Image extends Model {

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
  user!:User;

=======
>>>>>>> 7d2ac03 (Changing Image model)
}
>>>>>>> ba1630f (Add ORM)
