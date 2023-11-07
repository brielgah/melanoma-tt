import {
  AfterFind,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Lesion from './lesion.model';
import Image from './image';
import { downloadImage } from '../adapters/blobStorage';

@Table
export default class Photo extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    name!: string;

  @Column
    description!: string;

  @CreatedAt
    createdAt!: Date;

  @Column
    blobName!: string;

  @ForeignKey(() => Lesion)
  @Column
    lesionId!: number;

  @BelongsTo(() => Lesion)
    lesion!: Lesion;

  @Column(DataType.VIRTUAL)
    image!: Image;

  @AfterFind
  static async setImage(instance: Photo) {
    const image = await downloadImage(instance.blobName);
    instance.image = image;
  }
}
