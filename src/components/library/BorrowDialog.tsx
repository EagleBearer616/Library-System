import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BorrowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (borrowerName: string) => void;
  bookTitle: string;
}

export const BorrowDialog = ({ isOpen, onClose, onConfirm, bookTitle }: BorrowDialogProps) => {
  const [borrowerName, setBorrowerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (borrowerName.trim()) {
      onConfirm(borrowerName.trim());
      setBorrowerName('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Book: <span className="font-medium">{bookTitle}</span>
          </p>
          
          <div>
            <Label htmlFor="borrower">Borrower Name</Label>
            <Input
              id="borrower"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder="Enter borrower's name"
              required
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Confirm Borrow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};