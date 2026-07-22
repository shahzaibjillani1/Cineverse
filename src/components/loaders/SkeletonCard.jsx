
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-2 h-full overflow-hidden select-none">
      <div className="aspect-[2/3] w-full rounded-lg shimmer dark:shimmer" />

      <div className="space-y-2 p-1">
        <div className="h-4 w-3/4 rounded shimmer dark:shimmer" />
        <div className="flex items-center space-x-2">
          <div className="h-3 w-1/4 rounded shimmer dark:shimmer" />
          <div className="h-3 w-1/3 rounded shimmer dark:shimmer" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
