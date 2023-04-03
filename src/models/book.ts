import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'books' })
export class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  author!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  yearOfPublication!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  genres!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  rating!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt!: Date;
}
