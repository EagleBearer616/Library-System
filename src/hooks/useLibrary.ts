import { useState } from 'react';
import { Book } from '@/types/library';
import { useToast } from '@/hooks/use-toast';

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    status: 'available',
    publishedYear: 1925,
    description: 'A classic American novel set in the Jazz Age'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    status: 'borrowed',
    publishedYear: 1960,
    borrowedBy: 'John Doe',
    borrowedDate: '2024-01-15',
    dueDate: '2024-02-15'
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    category: 'Technology',
    status: 'available',
    publishedYear: 2008,
    description: 'A handbook of agile software craftsmanship'
  }
];

export const useLibrary = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const { toast } = useToast();

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString()
    };
    setBooks(prev => [...prev, newBook]);
    toast({
      title: 'Book Added',
      description: `"${book.title}" has been added to the library.`
    });
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updates } : book
    ));
    toast({
      title: 'Book Updated',
      description: 'Book information has been updated successfully.'
    });
  };

  const deleteBook = (id: string) => {
    const book = books.find(b => b.id === id);
    setBooks(prev => prev.filter(book => book.id !== id));
    toast({
      title: 'Book Deleted',
      description: `"${book?.title}" has been removed from the library.`
    });
  };

  const borrowBook = (id: string, borrowerName: string) => {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    
    updateBook(id, {
      status: 'borrowed',
      borrowedBy: borrowerName,
      borrowedDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0]
    });
  };

  const returnBook = (id: string) => {
    updateBook(id, {
      status: 'available',
      borrowedBy: undefined,
      borrowedDate: undefined,
      dueDate: undefined
    });
  };

  const getStats = () => {
    const total = books.length;
    const available = books.filter(b => b.status === 'available').length;
    const borrowed = books.filter(b => b.status === 'borrowed').length;
    const reserved = books.filter(b => b.status === 'reserved').length;
    
    return { totalBooks: total, availableBooks: available, borrowedBooks: borrowed, reservedBooks: reserved };
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getStats
  };
};