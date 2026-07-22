
export function LoadingSpinner({ size = 'md', className = '' }) {
  const getSizes = () => {
    switch (size) {
      case 'lg':
        return 'w-12 h-12 border-4';
      case 'sm':
        return 'w-6 h-6 border-2';
      default:
        return 'w-9 h-9 border-3';
    }
  };

  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-brand-primary border-r-transparent border-b-zinc-800 border-l-zinc-800 ${getSizes()}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

export default LoadingSpinner;
