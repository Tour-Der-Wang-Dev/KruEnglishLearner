import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <div 
        className={cn(
          'animate-spin border-4 border-primary border-t-transparent rounded-full',
          sizeClasses[size]
        )}
        aria-label="Loading"
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  );
}

interface PageLoadingProps {
  text?: string;
}

export function PageLoading({ text = "Loading..." }: PageLoadingProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

interface SectionLoadingProps {
  text?: string;
  className?: string;
}

export function SectionLoading({ text, className }: SectionLoadingProps) {
  return (
    <div className={cn('py-12 flex items-center justify-center', className)}>
      <LoadingSpinner size="md" text={text} />
    </div>
  );
}