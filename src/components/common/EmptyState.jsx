import { Database, Undo2 } from 'lucide-react';
import Button from '../ui/Button';

export function EmptyState({
  title = 'No movies found',
  message = 'Try adjusting your search criteria, removing filters, or adding titles to your collections.',
  icon: Icon = Database,
  actionText,
  onActionClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-full mb-5 text-zinc-500">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-8 leading-relaxed">
        {message}
      </p>
      {actionText && onActionClick && (
        <Button onClick={onActionClick} variant="outline" className="flex items-center space-x-2">
          <Undo2 className="w-4 h-4" />
          <span>{actionText}</span>
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
