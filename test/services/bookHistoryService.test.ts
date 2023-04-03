import BookHistoryService from '../../src/services/bookHistoryService';
import { Book, BookHistory, User } from '../../src/models';
import { mocked, MockedObject } from 'jest-mock';
import { Sequelize } from 'sequelize-typescript';

const mockedBookHistory = mocked(BookHistory);
const mockedBook = mocked(Book);

const bookHistoryInput = {
  bookId: 1,
  title: 'Test Book',
  author: 'John Doe',
  genres: 'Comedy',
  rating: 5.5,
  yearOfPublication: 1994,
  description: 'A test book for testing purposes',
};

let mockSequelize: MockedObject<Sequelize> | undefined;
let book: Book | undefined;
let bookHistory: BookHistory | undefined;

describe('BookHistoryService', () => {
  beforeAll(async () => {
    mockSequelize = mocked(
      new Sequelize({
        dialect: 'postgres',
        storage: ':memory:',
        models: [Book, BookHistory, User],
        logging: false,
      }),
    );

    jest.mock('../../src/database/database', () => {
      mockSequelize;
    });
    book = Book.build({
      ...bookHistoryInput,
      userId: 1
    });
    bookHistory = BookHistory.build({
      ...bookHistoryInput,
    });

    jest.mock('../../src/models/book');
    jest.mock('../../src/models/bookHistory');
    jest.mock('../../src/services/bookHistoryService');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a book history', async () => {
    const version = 1;

    jest.spyOn(mockedBookHistory, 'count').mockResolvedValueOnce(version - 1);
    jest.spyOn(mockedBookHistory, 'create').mockResolvedValueOnce({ ...bookHistoryInput, version });

    const result = await BookHistoryService.createBookHistory(bookHistoryInput);
    expect(result).toEqual({ ...bookHistoryInput, version });
    expect(mockedBookHistory.create).toHaveBeenCalledWith({ ...bookHistoryInput, version });
  });

  it('should get book history', async () => {
    const bookId = 1;
    const limit = 10;
    const offset = 0;
    const userId = 1;

    const bookHistoryRecords = [bookHistory!, bookHistory!];

    jest.spyOn(mockedBookHistory, 'findAll').mockResolvedValueOnce(bookHistoryRecords);
    jest.spyOn(mockedBook, 'findOne').mockResolvedValueOnce(book!);

    const result = await BookHistoryService.getBookHistory(bookId, userId, limit, offset);
    expect(result).toEqual(bookHistoryRecords);
    expect(mockedBookHistory.findAll).toHaveBeenCalledWith({
      where: { bookId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  });

  it('should get the latest book version', async () => {
    const bookId = 1;

    jest.spyOn(mockedBookHistory, 'findOne').mockResolvedValueOnce(bookHistory!);

    const result = await BookHistoryService.getLatestBookVersion(bookId);
    expect(result).toEqual(bookHistory);
    expect(mockedBookHistory.findOne).toHaveBeenCalledWith({
      where: { bookId },
      order: [['createdAt', 'DESC']],
    });
  });

  it('should get a specific book version', async () => {
    const bookId = 1;
    const version = 1;

    jest.spyOn(mockedBookHistory, 'findOne').mockResolvedValueOnce(bookHistory!);

    const result = await BookHistoryService.getBookVersion(bookId, version);
    expect(result).toEqual(bookHistory);
    expect(mockedBookHistory.findOne).toHaveBeenCalledWith({
      where: { bookId, version },
      order: [['createdAt', 'DESC']],
    });
  });
});
