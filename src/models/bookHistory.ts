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
import { Book } from './book';

@Table({ tableName: 'book_histories', updatedAt: false })
export class BookHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Book)
  @Column(DataType.INTEGER)
  bookId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  version!: string;

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

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt!: Date;

  @BelongsTo(() => Book)
  book!: Book;
}
