
import { BookDocument } from '../models/Book.js';

export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: BookDocument;
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number | null;
}
export interface IBookDocument {
    bookId?: String
    authors: string
    description: String
    title?: String
    image: String
    link: String
  }