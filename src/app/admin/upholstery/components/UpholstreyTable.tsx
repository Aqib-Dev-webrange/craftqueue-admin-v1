"use client";
import { useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { upholsteryQuotesColumns } from "@/utils/data/furanitureData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NoResultsMessage } from "@/components/ui/NoResultsMessage";
import { useUpholsteryData } from "@/hooks/useUpholsteryData";
import { generateSearchSuggestions } from "@/utils/searchSuggestions";

export default function UpholsteryTable({ show = true }: { show: boolean }) {
  const [search, setSearch] = useState("");
  const { upholsteryQuotes, loading, error } = useUpholsteryData();

  // Filter quotes based on search
  const filteredQuotes = upholsteryQuotes.filter((quote) =>
    Object.values(quote).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Generate search suggestions from actual data
  const searchSuggestions = generateSearchSuggestions(upholsteryQuotes);

  const handleSearch = (value: string) => {
    console.log("Searching upholstery quotes for:", value);
  };

  const handleClear = () => {
    setSearch("");
  };

  if (error) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center py-8 text-red-500">
          Error loading upholstery orders: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-[24px] font-dmSans">Upholstery Quotes</h1>
          {/* {!loading && (
            <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredQuotes.length} orders
            </span>
          )} */}
        </div>

        {show && (
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Search orders, furniture, status..."
              value={search}
              onChange={setSearch}
              onSearch={handleSearch}
              onClear={handleClear}
              suggestions={searchSuggestions}
              onSuggestionClick={setSearch}
                size="sm"
            debounceMs={300}
            className="w-full"
            disabled={loading}
          />
        </div>
        )}
      </header>
      {/* Main Content */}
      <main className="bg-white rounded-2xl">
        {loading ? (
          <LoadingSpinner message="Processing ..." />
        ) : (
          <TableView
            listTitle="List of all submitted quotes"
            columns={upholsteryQuotesColumns}
            data={filteredQuotes}
            rowLink={(row) =>
              `/admin/upholstery/${encodeURIComponent(
                row.id || row.order_number || row.customer
              )}`
            }
          />
        )}
      </main>

      {/* No Results */}
      {!loading && search && filteredQuotes.length === 0 && (
        <NoResultsMessage searchTerm={search} onClearSearch={() => setSearch("")} />
      )}
    </div>
  );
}
