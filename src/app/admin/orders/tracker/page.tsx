"use client";
import { useState } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";

type TextileOrder = {
  customer: string;
  category: string;
  quote: string;
  progress: string;
};

const textileOrders: TextileOrder[] = [
  {
    customer: "Velvet Fabric",
    category: "Reupholstery",
    quote: "COM-001",
    progress: "On Route",
  },
  {
    customer: "Cotton Fabric",
    category: "Cushion",
    quote: "COM-002",
    progress: "On Route",
  },
  {
    customer: "Linen Fabric",
    category: "Reupholstery",
    quote: "COM-003",
    progress: "On Route",
  },
  {
    customer: "Denim Fabric",
    category: "Cushion",
    quote: "COM-004",
    progress: "On Route",
  },
  {
    customer: "Canvas Fabric",
    category: "Cushion",
    quote: "COM-005",
    progress: "On Route",
  },
];

const textileColumns: Column<TextileOrder>[] = [
  {
    header: "Customer Name",
    accessor: "customer",
  },
  { header: "Project Category", accessor: "category" },
  { header: "Quote Identifier", accessor: "quote" },
  {
    header: "Current Progress",
    accessor: (row) => {
      const progressColors = {
        "On Route": "bg-yellow-100 text-yellow-600",
        Processing: "bg-blue-100 text-blue-600",
        Delivered: "bg-green-100 text-green-600",
        Cancelled: "bg-red-100 text-red-600",
        Completed: "bg-purple-100 text-purple-600",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            progressColors[row.progress as keyof typeof progressColors] ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {row.progress}
        </span>
      );
    },
  },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    ),
  },
];

export default function OrderTrackerManager() {
  const [search, setSearch] = useState("");

  // Generate search suggestions from textile order data
  const searchSuggestions = [
    ...new Set([
      ...textileOrders.map((order) => order.customer),
      ...textileOrders.map((order) => order.category),
      ...textileOrders.map((order) => order.quote),
      ...textileOrders.map((order) => order.progress),
      // Add common textile and order terms
      "Velvet",
      "Cotton",
      "Linen",
      "Denim",
      "Canvas",
      "Silk",
      "Wool",
      "Reupholstery",
      "Cushion",
      "Curtain",
      "Upholstery",
      "COM-",
      "On Route",
      "Processing",
      "Delivered",
      "Completed",
      "Cancelled",
    ]),
  ];

  const filtered = textileOrders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase()) ||
      o.quote.toLowerCase().includes(search.toLowerCase()) ||
      o.progress.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    console.log("Searching textile orders for:", value);
  };

  const handleClear = () => {
    console.log("Textile order search cleared");
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl  font-bold">
          Order Tracker Manager
        </h1>

        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search orders, fabrics, quotes..."
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClear}
            suggestions={searchSuggestions}
            onSuggestionClick={setSearch}
            size="sm"
            debounceMs={300}
            className="w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl">
        <TableView
          listTitle="Textile Management"
          columns={textileColumns}
          data={filtered}
          rowLink={(row) => `/admin/orders/tracker/${row.quote.toLowerCase()}`}
        />
      </div>

      {/* Search Results Info */}
      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filtered.length} order
          {filtered.length !== 1 ? "s" : ""} for "{search}"
          {filtered.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for fabric types, project categories, quote IDs, or
              progress status
            </span>
          )}
        </div>
      )}
    </div>
  );
}
