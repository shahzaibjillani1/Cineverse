import { useState } from 'react';
import { Film } from 'lucide-react';

export function LazyImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  wrapperClassName = '',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 shimmer dark:shimmer light:shimmer-light ${placeholderClassName}`} />
      )}

      {hasError ? (
        <div className={`absolute inset-0 bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center p-4 text-center ${placeholderClassName}`}>
          <Film className="w-8 h-8 text-zinc-600 mb-2" />
          <span className="text-[10px] text-zinc-500 font-semibold truncate max-w-full">
            {alt || 'No Image Available'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}

export default LazyImage;
