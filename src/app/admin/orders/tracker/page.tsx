"use client";
import { useState, useEffect } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import ActionDropdown from "../../components/actionDropdown";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getPillowOrdersForTracker, PillowOrderTracker } from "@/services/orderTracker";


type TrackerOrder = {
  customer: string;
  category: string;
  quote: string;
  progress: string;
  fabric: string;
  total: number;
  priority: boolean;
  date: string;
};

// Transform pillow order data to match the tracker format
const transformOrderData = (order: PillowOrderTracker): TrackerOrder => ({
  customer: order.user_name || "Unknown Customer",
  category: order.upholstery_feature?.feature_name || "Pillow",
  quote: order.order_number,
  progress: order.order_status?.[0]?.status || "Unknown",
  fabric: order.fabric_type?.option_name || "Unknown Fabric",
  total: order.price?.total || 0,
  priority: order.is_priority,
  date: new Date(order.created_at).toLocaleDateString()
});

const textileColumns: Column<TrackerOrder>[] = [
  {
    header: "Customer Name",
    accessor: "customer",
  },
  { 
    header: "Category", 
    accessor: "category" 
  },
  { 
    header: "Quote Identifier", 
    accessor: "quote" 
  },
  {
    header: "Fabric Type",
    accessor: "fabric",
  },

  {
    header: "Current Progress",
    accessor: (row) => {
      const progressColors = {
        "pending": "bg-yellow-100 text-yellow-600",
        "processing": "bg-blue-100 text-blue-600",
        "completed": "bg-green-100 text-green-600",
        "cancelled": "bg-red-100 text-red-600",
        "on route": "bg-purple-100 text-purple-600",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            progressColors[row.progress.toLowerCase() as keyof typeof progressColors] ||
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
    accessor: (row) => (
      <ActionDropdown
        onEdit={() => handleEdit(row)}
        onClear={() => handleClear(row)}
      />
    ),
  },
];

const handleEdit = (row: TrackerOrder) => {
  console.log("Edit order:", row);
};

const handleClear = (row: TrackerOrder) => {
  console.log("Clear order:", row);
};

export default function OrderTrackerManager() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<TrackerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const pillowOrders = await getPillowOrdersForTracker();
        const transformedOrders = pillowOrders.map(transformOrderData);
        setOrders(transformedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Generate search suggestions from real order data
  const searchSuggestions = [
    ...new Set([
      ...orders.map((order) => order.customer).filter(Boolean),
      ...orders.map((order) => order.category).filter(Boolean),
      ...orders.map((order) => order.quote).filter(Boolean),
      ...orders.map((order) => order.progress).filter(Boolean),
      ...orders.map((order) => order.fabric).filter(Boolean),
      // Add common terms
      "Velvet",
      "Cotton",
      "Linen",
      "Pillow",
      "Cushion",
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
    ]),
  ];

  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase()) ||
      o.quote.toLowerCase().includes(search.toLowerCase()) ||
      o.progress.toLowerCase().includes(search.toLowerCase()) ||
      o.fabric.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    console.log("Searching textile orders for:", value);
  };

  const handleClearSearch = () => {
    setSearch("");
    console.log("Textile order search cleared");
  };

  if (error) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-[24px] font-dmSans font-semibold">
          Order Tracker Manager ({orders.length})
        </h1>

        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search orders..."
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClearSearch}
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner message="Loading orders..." />
          </div>
        ) : (
          <TableView
          listTitle={`Textile Management (${filtered.length})`}
          columns={textileColumns}
          data={filtered}
          rowLink={(row) => `/admin/orders/tracker/${row.quote.toLowerCase()}`}
        />
        )}
        
      </div>

      {/* Search Results Info */}
      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filtered.length} order{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
          {filtered.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for customer names, fabric types, quote IDs, or progress status
            </span>
          )}
        </div>
      )}
    </div>
  );
}
