import { Book } from '@/types/library';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Trash2, User, Calendar } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

export const BookCard = ({ book, onEdit, onDelete, onBorrow, onReturn }: BookCardProps) => {
  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'borrowed': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'reserved': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
          <Badge className={getStatusColor(book.status)}>
            {book.status}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{book.author}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>{book.category} • {book.publishedYear}</span>
        </div>
        
        <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
        
        {book.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
        )}
        
        {book.status === 'borrowed' && book.borrowedBy && (
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Borrowed by: {book.borrowedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Due: {book.dueDate}</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(book)}>
          <Edit className="w-4 h-4" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={() => onDelete(book.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
        
        {book.status === 'available' && (
          <Button size="sm" onClick={() => onBorrow(book.id)}>
            Borrow
          </Button>
        )}
        
        {book.status === 'borrowed' && (
          <Button size="sm" onClick={() => onReturn(book.id)}>
            Return
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};