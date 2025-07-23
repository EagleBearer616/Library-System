import { useState } from 'react';
import { Book } from '@/types/library';
import { useLibrary } from '@/hooks/useLibrary';
import { BookCard } from '@/components/library/BookCard';
import { BookForm } from '@/components/library/BookForm';
import { BorrowDialog } from '@/components/library/BorrowDialog';
import { LibraryStats } from '@/components/library/LibraryStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';

const Index = () => {
  const { books, addBook, updateBook, deleteBook, borrowBook, returnBook, getStats } = useLibrary();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [borrowingBookId, setBorrowingBookId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const stats = getStats();

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(books.map(book => book.category)));

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
    } else {
      addBook(bookData);
    }
    setEditingBook(undefined);
  };

  const handleBorrow = (bookId: string) => {
    setBorrowingBookId(bookId);
    setIsBorrowDialogOpen(true);
  };

  const handleBorrowConfirm = (borrowerName: string) => {
    borrowBook(borrowingBookId, borrowerName);
    setBorrowingBookId('');
  };

  const borrowingBook = books.find(b => b.id === borrowingBookId);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Library Management System</h1>
            <p className="text-muted-foreground">Manage your book inventory and track borrowings</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
        </div>

        <LibraryStats stats={stats} />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="borrowed">Borrowed</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-2">No books found</div>
            <p className="text-sm text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Add your first book to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={deleteBook}
                onBorrow={handleBorrow}
                onReturn={returnBook}
              />
            ))}
          </div>
        )}

        <BookForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBook(undefined);
          }}
          onSubmit={handleFormSubmit}
          book={editingBook}
        />

        <BorrowDialog
          isOpen={isBorrowDialogOpen}
          onClose={() => setIsBorrowDialogOpen(false)}
          onConfirm={handleBorrowConfirm}
          bookTitle={borrowingBook?.title || ''}
        />
      </div>
    </div>
  );
};

export default Index;
