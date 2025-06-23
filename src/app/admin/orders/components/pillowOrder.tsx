"use client";
import { useEffect, useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { pillowOrdersColumns } from "@/utils/data/furanitureData";
import {
  formatPillowOrders,
  getPillowOrders,
  FormattedPillowOrder,
} from "@/lib/supabase";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Orders({ show }: { show: boolean }) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<FormattedPillowOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const raw = await getPillowOrders();
        const formatted = formatPillowOrders(raw);
        setOrders(formatted);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch orders"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.pillowType.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase()) ||
      order.fabric.toLowerCase().includes(search.toLowerCase()) ||
      order.date.toLowerCase().includes(search.toLowerCase())
  );

  const searchSuggestions = [
    ...new Set([
      ...orders.map((o) => o.customer),
      ...orders.map((o) => o.pillowType),
      ...orders.map((o) => o.status),
      ...orders.map((o) => o.fabric),
    ]),
    "Memory Foam",
    "Cotton",
    "Latex",
    "Gel",
    "Feather",
    "On the Way",
    "Processing",
    "Delivered",
    "Cancelled",
  ];

  // if (loading) {
  //   return (
  //     <div className="container mx-auto p-2">
  //       <LoadingSpinner message="Loading pillow orders..." />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="container mx-auto p-2">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-2">
              Error loading orders
            </div>
            <div className="text-gray-600">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-[24px] font-dmSans font-semibold">Pillow Orders</h1>
        {show && (
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Search..."
              value={search}
              onChange={setSearch}
              onSearch={() => {}}
              onClear={() => setSearch("")}
              suggestions={searchSuggestions}
              onSuggestionClick={setSearch}
              size="md"
              debounceMs={300}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl">
        {loading ? (
          <LoadingSpinner message="Loading orders..." />
        ) : (
          <TableView
            listTitle="Overview of All Pillow Orders"
            columns={pillowOrdersColumns}
            data={filteredOrders}
            rowLink={(row) =>
              `/admin/orders/${encodeURIComponent(row.orderNumber)}`
            }
          />
        )}
      </div>

      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filteredOrders.length} order
          {filteredOrders.length !== 1 ? "s" : ""} for &quot;{search}&quot;
          {filteredOrders.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for customer names, pillow types, status, or fabric
            </span>
          )}
        </div>
      )}
    </div>
  );
}
