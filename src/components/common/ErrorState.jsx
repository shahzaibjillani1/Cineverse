import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

export function ErrorState({
  title = 'Failed to load content',
  message = 'There was an issue communicating with the movie server. Please check your network connection and try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-full mb-5 text-brand-primary">
        <AlertCircle className="w-10 h-10 animate-pulse" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-md mb-8 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
