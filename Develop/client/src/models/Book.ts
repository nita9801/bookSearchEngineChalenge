// Define the Book type
export interface Book {
  bookId: string;
  authors?: string[];
  description?: string;
  title: string;
  image?: string;
  link?: string;
}
 export interface GoogleAPIBook {
  id: string;
  volumeInfo: {
    authors?: string[];
    title: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}