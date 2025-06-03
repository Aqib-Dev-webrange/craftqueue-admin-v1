"use client";
import { useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { BsThreeDots } from "react-icons/bs";

// You can place this in a shared types file
export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

// interface OrderRow {
//   orderId: string;
//   productImg: string;
//   productName: string;
//   sellerLogo: string;
//   sellerName: string;
//   customerImg: string;
//   customerName: string;
//   amount: string | number;
//   profit: string | number;
//   // Add other fields as needed
// }


type PillowOrder = {
  customer: string;
  pillowType: string;
  status: string;
  fabric: string;
  date: string;
};

const pillowOrders: PillowOrder[] = [
  {
    customer: "Emily R.",
    pillowType: "Memory Foam Pillow",
    status: "On the Way",
    fabric: "Cotton Blend",
    date: "06/15/2025",
  },
  {
    customer: "John D.",
    pillowType: "Cotton Pillow",
    status: "Processing",
    fabric: "Polyester",
    date: "06/14/2025",
  },
  {
    customer: "Sarah M.",
    pillowType: "Latex Pillow",
    status: "Delivered",
    fabric: "Silk",
    date: "06/13/2025",
  },
  {
    customer: "Mike B.",
    pillowType: "Gel Pillow",
    status: "On the Way",
    fabric: "Linen",
    date: "06/12/2025",
  },
  {
    customer: "Lisa K.",
    pillowType: "Feather Pillow",
    status: "Cancelled",
    fabric: "Microfiber",
    date: "06/11/2025",
  },
];

const pillowOrdersColumns: Column<PillowOrder>[] = [
  { header: "Customer Name", accessor: "customer" },
  { header: "Pillow Type & Qty", accessor: "pillowType" },
  {
    header: "Status",
    accessor: (row) => {
      const statusColors = {
        "On the Way": "bg-blue-100 text-blue-600",
        "Processing": "bg-yellow-100 text-yellow-600",
        "Delivered": "bg-green-100 text-green-600",
        "Cancelled": "bg-red-100 text-red-600",
      };
      
      return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status as keyof typeof statusColors] || "bg-gray-100 text-gray-600"}`}>
          {row.status}
        </span>
      );
    },
  },
  { header: "Fabric Type", accessor: "fabric" },
  { header: "Order Date", accessor: "date" },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    ),
  },
];

export default function Orders() {
  const [search, setSearch] = useState("");

  // Generate search suggestions from the data
  const searchSuggestions = [
    ...new Set([
      ...pillowOrders.map(order => order.customer),
      ...pillowOrders.map(order => order.pillowType),
      ...pillowOrders.map(order => order.status),
      ...pillowOrders.map(order => order.fabric),
      "Memory Foam",
      "Cotton",
      "Latex",
      "Gel",
      "Feather",
      "On the Way",
      "Processing",
      "Delivered",
      "Cancelled"
    ])
  ];

  // Filter orders based on search
  const filteredOrders = pillowOrders.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.pillowType.toLowerCase().includes(search.toLowerCase()) ||
    order.status.toLowerCase().includes(search.toLowerCase()) ||
    order.fabric.toLowerCase().includes(search.toLowerCase()) ||
    order.date.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    console.log("Searching orders for:", value);
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Pillow Orders</h1>
        
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search orders, customers, status..."
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
          listTitle="Overview of All Pillow Orders"
          columns={pillowOrdersColumns}
          data={filteredOrders}
          rowLink={(row) => `/admin/orders/${encodeURIComponent(row.customer)}`}
        />
      </div>

      {/* Search Results Info */}
      {/* {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} for "{search}"
          {filteredOrders.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for customer names, pillow types, status, or fabric types
            </span>
          )}
        </div>
      )} */}
    </div>
  );
}