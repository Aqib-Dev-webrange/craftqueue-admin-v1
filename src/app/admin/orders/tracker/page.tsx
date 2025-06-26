"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import ActionDropdown from "../../components/actionDropdown";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ViewTrackerModal from "./components/modals/ViewTrackerModal";
import DeleteTrackerModal from "./components/modals/DeleteTrackerModal";

// Define your Order interface at the top (already present)
interface Order {
  user_name?: string;
  order_number?: string;
  order_type?: string;
  order_status?: { status?: string; is_active?: boolean }[];
  fabric_type_id?: string;
  fabric_option?: {
    id?: string | number;
    fabric_type?: string;
    option_name?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

function toTrackerOrder(order: Order) {
  return {
    id: String(order.id ?? ""),
    customer: (order.user_name as string) || "N/A",
    category: (order.order_type as string) || "N/A",
    quote: (order.order_number as string) || "N/A",
    progress: (order.progress as string) || "pending",
    fabric: (order.fabric as string) || "N/A",
    total: typeof order.total === "number" ? order.total : 0,
    priority: !!order.is_priority,
    date: (order.created_at as string) || "",
    orderNumber: (order.order_number as string) || "",
    rawData: order,
  };
}

export default function OrderTrackerManager() {
  const [search, setSearch] = useState("");
  // Use Order | null for selectedOrder
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Use Order[] for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(
          `*, fabric_option:fabric_type_id (
    id,
    fabric_type,
    option_name
  )`
        )
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
        setOrders([]);
      } else {
        setOrders(data || []);
        setError(null);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  // Transform and filter for table
  const filtered = orders
    .filter(
      (o) =>
        (o.user_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (o.order_number || "").toLowerCase().includes(search.toLowerCase()) ||
        (o.order_type || "").toLowerCase().includes(search.toLowerCase()) ||
        (Array.isArray(o.order_status) &&
          o.order_status.some((s: { status?: string; is_active?: boolean }) =>
            (s.status || "").toLowerCase().includes(search.toLowerCase())
          ))
    )
    .map((order) => ({
      ...order,
      customer: order.user_name || "N/A",
      category: order.order_type || "N/A",
      quote: order.order_number,
      progress: Array.isArray(order.order_status)
        ? order.order_status.find(
            (s: { status?: string; is_active?: boolean }) => s.is_active
          )?.status || "pending"
        : "pending",
      fabric: order.fabric_option
        ? `${order.fabric_option.fabric_type || ""}${
            order.fabric_option.fabric_type && order.fabric_option.option_name
              ? " - "
              : ""
          }${order.fabric_option.option_name || ""}` || "N/A"
        : "N/A",
    }));

  const textileColumns: Column<Order>[] = [
    { header: "Customer Name", accessor: "customer" },
    { header: "Category", accessor: "category" },
    { header: "Quote Identifier", accessor: "quote" },
    { header: "Fabric Type", accessor: "fabric" },
    {
      header: "Current Progress",
      accessor: (row: Order) => {
        const progressColors: Record<
          "pending" | "processing" | "completed" | "cancelled" | "on route",
          string
        > = {
          pending: "bg-yellow-100 text-yellow-600",
          processing: "bg-blue-100 text-blue-600",
          completed: "bg-green-100 text-green-600",
          cancelled: "bg-red-100 text-red-600",
          "on route": "bg-purple-100 text-purple-600",
        };
        const progressValue =
          typeof row.progress === "string" ? row.progress : "";
        const progressKey =
          progressValue.toLowerCase() as keyof typeof progressColors;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              progressColors[progressKey] || "bg-gray-100 text-gray-600"
            }`}
          >
            {typeof row.progress === "string" ? row.progress : ""}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: (row: Order) => (
        <ActionDropdown
          onView={() => {
            setSelectedOrder(row);
            setShowViewModal(true);
          }}
          onDelete={() => {
            setSelectedOrder(row);
            setShowDeleteModal(true);
          }}
        />
      ),
    },
  ];

  const searchSuggestions: string[] = [
    ...new Set(
      [
        ...orders.map((order) => order.user_name),
        ...orders.map((order) => order.order_type),
        ...orders.map((order) => order.order_number),
        ...orders.flatMap((order) =>
          Array.isArray(order.order_status)
            ? order.order_status.map(
                (s: { status?: string; is_active?: boolean }) => s.status
              )
            : []
        ),
        "Velvet",
        "Cotton",
        "Linen",
        "Pillow",
        "Cushion",
        "Pending",
        "Processing",
        "Completed",
        "Cancelled",
      ].filter((s): s is string => typeof s === "string" && !!s)
    ),
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const handleClearSearch = () => setSearch("");

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
        <div className="flex items-center gap-4">
          <h1 className="text-[24px] font-dmSans font-semibold">
            Order Tracker Manager
          </h1>
          {!loading && (
            <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-0.5 rounded">
              {filtered.length} orders
            </span>
          )}
        </div>
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search orders..."
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClearSearch}
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner message="Loading orders..." />
          </div>
        ) : (
          <TableView
            listTitle={`Order Tracking Overview`}
            columns={textileColumns}
            data={filtered}
            rowLink={(row) => `/admin/orders/tracker/${row.order_number}`}
          />
        )}
      </div>
      {/* Search Results Info */}
      {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filtered.length} order{filtered.length !== 1 ? "s" : ""} for
          &quot;{search}&quot;
          {filtered.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for customer names, fabric types, quote IDs, or
              progress status
            </span>
          )}
        </div>
      )}
      {/* Modals */}
      {selectedOrder && (
        <>
          <ViewTrackerModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedOrder(null);
            }}
            order={toTrackerOrder(selectedOrder)}
          />
          <DeleteTrackerModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedOrder(null);
            }}
            order={toTrackerOrder(selectedOrder)}
            onConfirm={() => {
              setOrders((prev) =>
                prev.filter(
                  (o) => o.order_number !== selectedOrder.order_number
                )
              );
              setShowDeleteModal(false);
              setSelectedOrder(null);
            }}
          />
        </>
      )}
    </div>
  );
}
