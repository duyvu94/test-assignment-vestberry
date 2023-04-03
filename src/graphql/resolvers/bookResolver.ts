import bookService, {
  CreateBookInput,
  RevertToVersionInput,
  UpdateBookInput,
} from '../../services/bookService';
import bookHistoryService from '../../services/bookHistoryService';
import { Context, RootValue } from '../types/types';
import { GraphQLError } from 'graphql';
import { Book, BookHistory } from '../../models';

const bookResolver = {
  Mutation: {
    async createBook(_: RootValue, input: CreateBookInput, context: Context): Promise<Book> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }
      return bookService.createBook(input, context.user.id);
    },

    async revertToVersion(
      _: RootValue,
      input: RevertToVersionInput,
      context: Context,
    ): Promise<Book | null> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }
      const book = bookService.revertToversion(input, context.user.id);
      if (!book) {
        throw new GraphQLError('Failed to revert! The book may not belong to you!');
      }
      return book;
    },

    async updateBook(_: RootValue, input: UpdateBookInput, context: Context): Promise<Book | null> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }

      const book = await bookService.updateBook(input, context.user.id);
      if (!book) {
        throw new GraphQLError('Failed to update! The book may not belong to you!');
      }
      return book;
    },

    async deleteBook(rootValue: RootValue, { id }: any, context: Context): Promise<boolean> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }
      return await bookService.deleteBook(id, context.user.id);
    },
  },
  Query: {
    async findBooks(rootValue: RootValue, { keyword, limit, offset }: any): Promise<Book[]> {
      const books = await bookService.findBooksByTitleOrAuthor(keyword, limit, offset);
      return books;
    },

    async getLatestBookVersion(_: RootValue, { id }: any, context: Context): Promise<BookHistory> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }
      const bookHistory = await bookHistoryService.getLatestBookVersion(id);
      if (!bookHistory) {
        throw new GraphQLError('The book do not exist or you may not be the owner!');
      }

      return bookHistory;
    },

    async getBookHistory(
      _: RootValue,
      { id, limit, offset }: any,
      context: Context,
    ): Promise<BookHistory[]> {
      if (!context.isAuth) {
        throw new GraphQLError('User is not authenticated');
      }
      const bookHistories = await bookHistoryService.getBookHistory(
        id,
        context.user.id,
        limit,
        offset,
      );
      if (!bookHistories) {
        throw new GraphQLError('The book do not exist or your are not the owner!');
      }

      return bookHistories;
    },
  },
};

export default bookResolver;
