"use client";
import { useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import {
  upholsteryQuotes,
  upholsteryQuotesColumns,
} from "@/utils/data/furanitureData";

export default function UpholsteryPage() {
  const [search, setSearch] = useState("");

  // Generate search suggestions from upholstery data
  const searchSuggestions = [
    ...new Set([
      ...upholsteryQuotes.map((quote) => quote.customer),
      ...upholsteryQuotes.map((quote) => quote.furniture || ""),
      // ...upholsteryQuotes.map((quote) => quote.fabric || ""), // Removed: 'fabric' does not exist
      ...upholsteryQuotes.map((quote) => quote.status || ""),
      // Add common search terms
      "Sofa",
      "Chair",
      "Ottoman",
      "Leather",
      "Fabric",
      "Cotton",
      "Pending",
      "Approved",
      "Completed",
      "In Progress",
    ].filter(Boolean)), // Remove empty strings
  ];

  // Filter quotes based on search
  const filteredQuotes = upholsteryQuotes.filter((quote) =>
    Object.values(quote).some((value) =>
      value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSearch = (value: string) => {
    console.log("Searching upholstery quotes for:", value);
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <div className="container mx-auto p-2 ">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-[24px] font-dmSans ">Upholstery Quotes</h2>

        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search "
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClear}
            suggestions={searchSuggestions}
            onSuggestionClick={setSearch}
            size="md"
            debounceMs={300}
            className="w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl">
        <TableView
          listTitle="List of all submitted quotes"
          columns={upholsteryQuotesColumns}
          data={filteredQuotes}
          rowLink={(row) => `/admin/upholstery/${encodeURIComponent(row.customer)}`}
        />
      </div>
    </div>
  );
}
