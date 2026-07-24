import React, { useState } from 'react';
import { Star, User, Calendar } from 'lucide-react';

export function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!review) return null;

  const { author, author_details, content, created_at } = review;
  const rating = author_details?.rating;
  const dateStr = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const wordLimit = 320;
  const shouldTruncate = content.length > wordLimit;
  const displayedContent = isExpanded || !shouldTruncate
    ? content
    : `${content.substring(0, wordLimit)}...`;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 sm:p-6 mb-4 glass-card">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
            {author_details?.avatar_path ? (
              <img
                src={
                  author_details.avatar_path.startsWith('/http')
                    ? author_details.avatar_path.substring(1)
                    : `${import.meta.env.VITE_TMDB_IMAGE_URL}/w45${author_details.avatar_path}`
                }
                alt={author}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none'; // Fallback to user icon
                }}
              />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-200">{author}</h4>
            <div className="flex items-center text-[11px] text-zinc-500 mt-0.5">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>{dateStr}</span>
            </div>
          </div>
        </div>

        {rating !== null && rating !== undefined && (
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{rating}/10</span>
          </div>
        )}
      </div>

      <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
        {displayedContent}
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-brand-primary hover:text-white mt-3 block cursor-pointer transition-colors focus:outline-none"
        >
          {isExpanded ? 'Read Less' : 'Read Full Review'}
        </button>
      )}
    </div>
  );
}

export default ReviewCard;
