import { Schema, model, type Document } from 'mongoose';

interface IBook extends Document {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}


const bookSchema = new Schema<IBook>({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

const Book = model<IBook>('Book', bookSchema);
export { type IBook, bookSchema };
export default Book;