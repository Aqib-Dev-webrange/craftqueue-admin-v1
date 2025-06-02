"use client";
import { useState } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { BsThreeDots } from "react-icons/bs";

type Fabric = {
  name: string;
  type: string;
  status: string;
  shipment: string;
  furniture: string;
};

const allFabrics: Fabric[] = [
  { name: "Satin Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Chiffon Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Taffeta Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Velvet Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Georgette Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Crepe Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Organza Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Lace Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Net Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },
  { name: "Muslin Fabric", type: "COM", status: "On Route", shipment: "12345678901", furniture: "type of furniture" },

];

const fabricColumns: Column<Fabric>[] = [
  { header: "Polyester Fabric", accessor: "name" },
  { header: "Material Type (COM/Process)", accessor: "type" },
  {
    header: "Current Status",
    accessor: (row) => {
      const statusColors = {
        "On Route": "bg-yellow-100 text-yellow-600",
        "Delivered": "bg-green-100 text-green-600",
        "Processing": "bg-blue-100 text-blue-600",
        "Cancelled": "bg-red-100 text-red-600",
      };
      
      return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status as keyof typeof statusColors] || "bg-gray-100 text-gray-600"}`}>
          {row.status}
        </span>
      );
    },
  },
  { header: "Shipment ID", accessor: "shipment" },
  { header: "Type of Furniture", accessor: "furniture" },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    ),
  },
];

export default function FabricPage() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  // Generate search suggestions from fabric data
  const searchSuggestions = [
    ...new Set([
      ...allFabrics.map(fabric => fabric.name),
      ...allFabrics.map(fabric => fabric.type),
      ...allFabrics.map(fabric => fabric.status),
      // Add common fabric terms
      "Satin",
      "Chiffon", 
      "Taffeta",
      "Velvet",
      "Georgette",
      "Crepe",
      "Organza",
      "Lace",
      "Net",
      "Muslin",
      "Cotton",
      "Polyester",
      "Silk",
      "COM",
      "On Route",
      "Delivered",
      "Processing"
    ])
  ];

  const filtered = allFabrics.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.type.toLowerCase().includes(search.toLowerCase()) ||
      f.status.toLowerCase().includes(search.toLowerCase()) ||
      f.shipment.toLowerCase().includes(search.toLowerCase()) ||
      f.furniture.toLowerCase().includes(search.toLowerCase())
  );

  const visibleFabrics = filtered.slice(0, visibleCount);

  const handleSearch = (value: string) => {
    console.log("Searching fabrics for:", value);
    // Reset visible count when searching
    setVisibleCount(5);
  };

  const handleClear = () => {
    console.log("Fabric search cleared");
    setVisibleCount(5);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl  font-bold">Fabric Management</h1>
        
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search fabrics, types, status..."
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
          listTitle="Browse All Fabrics"
          columns={fabricColumns}
          data={visibleFabrics}
          rowLink={(row) => `/admin/fabrics/${encodeURIComponent(row.name)}`}
        />
        
        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-4 pb-4">
            <button
              className="px-6 py-2 rounded-lg bg-gray-100 font-semibold hover:bg-gray-200 transition-colors"
              onClick={() => setVisibleCount((c) => c + 5)}
            >
              Explore More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Search Results Info */}
      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filtered.length} fabric{filtered.length !== 1 ? 's' : ''} for "{search}"
          {filtered.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for fabric names, material types, or shipment status
            </span>
          )}
          {visibleCount < filtered.length && (
            <span className="block mt-1 text-blue-600">
              Showing {visibleCount} of {filtered.length} results
            </span>
          )}
        </div>
      )}
    </div>
  );
}