export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'reserved';
  publishedYear: number;
  description?: string;
  borrowedBy?: string;
  borrowedDate?: string;
  dueDate?: string;
}

export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  reservedBooks: number;
}