import LazyImage from '../common/LazyImage';
import { User } from 'lucide-react';

export function CastCard({ member }) {
  if (!member) return null;

  const { name, character, profile_path } = member;
  const avatarUrl = profile_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w185${profile_path}`
    : null;

  return (
    <div className="flex flex-col items-center text-center bg-zinc-900/30 border border-zinc-800/40 rounded-2xl p-4 w-36 sm:w-40 shrink-0 hover:bg-zinc-900/80 transition-all select-none">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border border-zinc-800 bg-zinc-950 shadow-md">
        {avatarUrl ? (
          <LazyImage
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
            placeholderClassName="w-full h-full"
            wrapperClassName="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
            <User className="w-10 h-10" />
          </div>
        )}
      </div>

      <h4 className="text-xs font-bold text-zinc-100 line-clamp-1 w-full">{name}</h4>
      
      <p className="text-[10px] text-zinc-500 font-semibold mt-1 line-clamp-1 w-full">
        as {character || 'Unknown'}
      </p>
    </div>
  );
}

export default CastCard;
