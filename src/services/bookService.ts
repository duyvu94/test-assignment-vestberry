import { Book } from '../models/book';
import { Op } from 'sequelize';
import bookHistoryService from './bookHistoryService';
import { sequelize } from '../database/database';
import { Transaction } from 'sequelize';
import { BookHistory } from '../models';

export interface CreateBookInput {
  title: string;
  author: string;
  yearOfPublication: number;
  rating: number;
  genres: string;
  description?: string;
}

export interface UpdateBookInput {
  id: number;
  title?: string;
  author?: string;
  description?: string;
  yearOfPublication?: number;
  rating?: number;
  genres?: string;
}

export interface RevertToVersionInput {
  id: number;
  version: number;
}

class BookService {
  async createBook(input: CreateBookInput, userId: number): Promise<Book> {
    return await Book.create({ ...input, userId });
  }

  async revertToversion(input: RevertToVersionInput, userId: number): Promise<Book | null> {
    const book = await Book.findOne({ where: { id: input.id, userId } });

    if (!book) return null;

    const bookHistory = await bookHistoryService.getBookVersion(input.id, input.version);

    if (!bookHistory) return null;
    return this.updateBook({ ...bookHistory.dataValues, id: book.id }, userId);
  }

  async updateBook(input: UpdateBookInput, userId: number): Promise<Book | null> {
    const book = await Book.findOne({ where: { id: input.id, userId } });

    if (!book) {
      return null;
    }

    let transaction: Transaction | undefined;
    let updatedBook: Book | undefined;
    const version = (await BookHistory.count({ where: { bookId: input.id } })) + 1;

    try {
      // Start a new transaction
      transaction = await sequelize.transaction();

      updatedBook = await book.update({ ...input, userId }, { transaction });

      await BookHistory.create(
        {
          bookId: book.id,
          title: updatedBook.title,
          author: updatedBook.author,
          yearOfPublication: updatedBook.yearOfPublication,
          rating: updatedBook.rating,
          genres: updatedBook.genres,
          description: updatedBook.description,
          version,
        },
        { transaction },
      );

      // Commit the transaction if both updates are successful
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        // Roll back the transaction if an error occurred
        await transaction.rollback();
      }
      throw error;
    }

    return updatedBook;
  }

  async deleteBook(id: number, userId: number): Promise<boolean> {
    const book = await Book.findOne({ where: { id, userId } });

    if (!book) {
      return false;
    }

    await book.destroy();
    return true;
  }

  async findBooksByTitleOrAuthor(search: string, limit: number, offset: number) {
    return Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { author: { [Op.iLike]: `%${search}%` } },
        ],
      },
      limit,
      offset,
      order: [['id', 'ASC']],
    });
  }
}

export default new BookService();
