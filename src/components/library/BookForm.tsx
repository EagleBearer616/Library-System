import { useState } from 'react';
import { Book } from '@/types/library';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  book?: Book;
}

export const BookForm = ({ isOpen, onClose, onSubmit, book }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    category: book?.category || '',
    status: book?.status || 'available' as Book['status'],
    publishedYear: book?.publishedYear || new Date().getFullYear(),
    description: book?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    if (!book) {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        status: 'available',
        publishedYear: new Date().getFullYear(),
        description: ''
      });
    }
  };

  const categories = ['Fiction', 'Non-Fiction', 'Technology', 'Science', 'History', 'Biography', 'Romance', 'Mystery', 'Fantasy', 'Other'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="year">Published Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.publishedYear}
              onChange={(e) => setFormData(prev => ({ ...prev, publishedYear: parseInt(e.target.value) }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {book ? 'Update' : 'Add'} Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};