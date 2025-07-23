import { LibraryStats as Stats } from '@/types/library';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Clock, Archive } from 'lucide-react';

interface LibraryStatsProps {
  stats: Stats;
}

export const LibraryStats = ({ stats }: LibraryStatsProps) => {
  const statItems = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      title: 'Available',
      value: stats.availableBooks,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Borrowed',
      value: stats.borrowedBooks,
      icon: Clock,
      color: 'text-orange-500'
    },
    {
      title: 'Reserved',
      value: stats.reservedBooks,
      icon: Archive,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};