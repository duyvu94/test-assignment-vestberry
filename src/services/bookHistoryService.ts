import { Book, BookHistory } from '../models';

interface CreateBookHistoryInput {
  bookId: number;
  title: string;
  author: string;
  description?: string;
  yearOfPublication: number;
  rating: number;
  genres: string;
}

class BookHistoryService {
  async createBookHistory(input: CreateBookHistoryInput): Promise<BookHistory> {
    const version = (await BookHistory.count({ where: { bookId: input.bookId } })) + 1;
    return BookHistory.create({ ...input, version });
  }

  async getBookHistory(
    bookId: number,
    userId: number,
    limit: number,
    offset: number,
  ): Promise<BookHistory[] | null> {
    const book = await Book.findOne({
      where: { id: bookId, userId },
    });

    if (!book) return null;

    return BookHistory.findAll({
      where: { bookId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async getLatestBookVersion(bookId: number): Promise<BookHistory | null> {
    return BookHistory.findOne({
      where: { bookId },
      order: [['createdAt', 'DESC']],
    });
  }

  async getBookVersion(bookId: number, version: number): Promise<BookHistory | null> {
    return BookHistory.findOne({
      where: { bookId, version },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new BookHistoryService();
