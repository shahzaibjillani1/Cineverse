import { Star } from 'lucide-react';

export function RatingBadge({ rating, size = 'sm', className = '' }) {
  const score = rating || 0;
  
  const getColorClass = () => {
    if (score >= 7.5) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (score >= 5.5) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    return 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  const getSizes = () => {
    switch (size) {
      case 'lg':
        return 'px-3 py-1.5 text-sm gap-1.5 border';
      case 'md':
        return 'px-2.5 py-1 text-xs gap-1 border';
      default:
        return 'px-2 py-0.5 text-[11px] gap-0.5 border';
    }
  };

  return (
    <div
      className={`inline-flex items-center font-bold rounded-full ${getColorClass()} ${getSizes()} ${className}`}
    >
      <Star className={`fill-current ${size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
      <span>{score.toFixed(1)}</span>
    </div>
  );
}

export default RatingBadge;
