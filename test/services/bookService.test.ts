import { MockedObject, mocked } from 'jest-mock';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Book, BookHistory, User } from '../../src/models';
import bookService from '../../src/services/bookService';

const mockedBook = mocked(Book);
const mockedBookHistory = mocked(BookHistory);

const bookInput = {
  title: 'Test Book',
  author: 'John Doe',
  yearOfPublication: 2021,
  rating: 4.5,
  genres: 'Fiction',
  description: 'A test book for testing purposes',
};

let createdBook: Book | undefined;
let updatedBook: Book | undefined;
let mockSequelize: MockedObject<Sequelize> | undefined;

describe('BookService', () => {
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

    createdBook = Book.build({
      ...bookInput,
      userId: 1,
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    });

    updatedBook = Book.build({
      ...createdBook.dataValues,
      title: 'Updated Book',
    });

    jest.mock('../../src/models/book');
    jest.mock('../../src/models/bookHistory');
    jest.mock('../../src/services/bookHistoryService');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a book', async () => {
    jest.spyOn(mockedBook, 'create').mockResolvedValueOnce(createdBook);

    const result = await bookService.createBook(bookInput, createdBook!.userId);
    expect(result).toEqual(createdBook);
    expect(Book.create).toHaveBeenCalledWith({ ...bookInput, userId: createdBook!.userId });
  });

  it('should update a book', async () => {
    const transaction = mocked(new Transaction(mockSequelize!, {}));

    jest.spyOn(mockedBook, 'findOne').mockResolvedValueOnce(createdBook!);
    jest.spyOn(mockSequelize!, 'transaction').mockResolvedValueOnce(transaction);
    jest.spyOn(transaction, 'commit').mockResolvedValueOnce();
    jest.spyOn(mockedBookHistory, 'count').mockResolvedValueOnce(0);
    jest.spyOn(mockedBookHistory, 'create').mockResolvedValueOnce(true);
    jest.spyOn(createdBook!, 'update').mockResolvedValueOnce(updatedBook!);

    const result = await bookService.updateBook(createdBook!, 1);
    expect(result).toEqual(updatedBook);
    expect(Book.findOne).toHaveBeenCalledWith({
      where: { id: createdBook?.id, userId: createdBook?.userId },
    });
    expect(BookHistory.create).toHaveBeenCalled();
  });

  it('should delete a book', async () => {
    const userId = 1;
    const bookId = 1;

    jest.spyOn(mockedBook, 'findOne').mockResolvedValueOnce(createdBook!);
    jest.spyOn(createdBook!, 'destroy').mockResolvedValueOnce();

    const result = await bookService.deleteBook(bookId, userId);
    expect(result).toEqual(true);
    expect(Book.findOne).toHaveBeenCalledWith({ where: { id: bookId, userId } });
  });
});
