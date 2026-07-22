
export function GenreBadge({ name, className = '' }) {
  if (!name) return null;

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold text-zinc-300 bg-zinc-900/80 border border-zinc-800 rounded-full select-none hover:border-zinc-700 transition-colors ${className}`}
    >
      {name}
    </span>
  );
}

export default GenreBadge;
