interface NoResultsMessageProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export function NoResultsMessage({ searchTerm, onClearSearch }: NoResultsMessageProps) {
  return (
    <div className="text-center py-8">
      <div className="text-gray-500 text-lg">
        No results found for &quot;{searchTerm}&quot;
      </div>
      <button
        onClick={onClearSearch}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
      >
        Clear Search
      </button>
    </div>
  );
}