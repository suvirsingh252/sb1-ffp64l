import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
    </div>
  );
}