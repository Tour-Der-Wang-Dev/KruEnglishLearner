import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  className?: string;
}

export function TestimonialCard({ 
  name, 
  role, 
  content, 
  rating, 
  image, 
  className 
}: TestimonialCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              )}
            />
          ))}
        </div>
        
        <blockquote className="text-gray-700 italic">
          "{content}"
        </blockquote>
        
        <div className="flex items-center gap-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}