export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  cover: string;
  genre: string;
  year: number;
  pages: number;
  isbn: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
