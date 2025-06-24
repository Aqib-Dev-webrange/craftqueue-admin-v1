"use client";
import { useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NoResultsMessage } from "@/components/ui/NoResultsMessage";
import { useUpholsteryData } from "@/hooks/useUpholsteryData";
import { generateSearchSuggestions } from "@/utils/searchSuggestions";
import ActionDropdown from "../../components/actionDropdown";
import ViewQuoteModal from "./modals/ViewQuoteModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

interface UpholsteryQuote {
  id?: string;
  customer: string;
  furniture: string;
  status: string;
  priority: string | boolean;
  date: string;
  order_number?: string;
  // furnitureImage?: string;
  // furnitureType?: string;
  // fabricSource?: string;
  // dimensions?: string;
  // leadTime?: string;
  // upholsteryFeatures?: string;
  // priorityQuote?: string;

}

// Define the Column type if not imported from a library
type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

export default function UpholsteryTable({ show = true }: { show: boolean }) {
  const [search, setSearch] = useState("");
  const { upholsteryQuotes, loading, error } = useUpholsteryData();
  
  // Modal states
  const [selectedQuote, setSelectedQuote] = useState<UpholsteryQuote | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Action handlers
  const handleView = (row: UpholsteryQuote) => {
    setSelectedQuote(row);
    setShowViewModal(true);
  };


  const handleDelete = (row: UpholsteryQuote) => {
    setSelectedQuote(row);
    setShowDeleteModal(true);
  };

  const upholsteryQuotesColumns: Column<UpholsteryQuote>[] = [
    {
      header: "Customer Name",
      accessor: "customer",
    },
    { header: "Furniture Type", accessor: "furniture" },
    {
      header: "Status",
      accessor: (row) => (
        <span className="bg-orange-100 text-[#FF8800] px-2 py-1 rounded text-xs font-semibold">
          {row.status}
        </span>
      ),
    },
    {
      header: "Priority Quote",
      accessor: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.priority === "yes" || row.priority === true || row.priority === "Yes"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.priority === "yes" || row.priority === true || row.priority === "Yes"
            ? "Yes"
            : "No"}
        </span>
      ),
    },
    { header: "Date", accessor: "date" },
    {
      header: "Actions",
      accessor: (row) => (
        <ActionDropdown
          onView={() => handleView(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

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
          Error loading upholstery quotes: {error}
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
          {!loading && (
            <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredQuotes.length} quotes
            </span>
          )}
        </div>

        {show && (
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Search quotes, furniture, status..."
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
          <LoadingSpinner message="Loading quotes..." />
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

      {/* Modals */}
      {selectedQuote && (
        <>
          <ViewQuoteModal
            isOpen={showViewModal}
            onClose={() => setShowViewModal(false)}
            quote={selectedQuote}
          />
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            quote={selectedQuote}
            onConfirm={() => {
              // Handle quote deletion
              console.log("Quote deleted:", selectedQuote);
              setShowDeleteModal(false);
              // You would typically remove from state/refetch data here
            }}
          />
        </>
      )}
    </div>
  );
}




