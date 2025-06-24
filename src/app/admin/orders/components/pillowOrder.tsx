"use client";
import { useEffect, useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import {
  formatPillowOrders,
  getPillowOrders,
  FormattedPillowOrder,
} from "@/lib/supabase";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ActionDropdown from "../../components/actionDropdown";
import ViewPillowModal from "./modals/ViewPillowModal";
import EditPillowModal from "./modals/EditPillowModal";
import DeletePillowModal from "./modals/DeletePillowModal";

// Define the Column type
type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

export default function Orders({ show }: { show: boolean }) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<FormattedPillowOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<FormattedPillowOrder | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Action handlers
  const handleView = (row: FormattedPillowOrder) => {
    setSelectedOrder(row);
    setShowViewModal(true);
  };

  const handleEdit = (row: FormattedPillowOrder) => {
    setSelectedOrder(row);
    setShowEditModal(true);
  };

  const handleDelete = (row: FormattedPillowOrder) => {
    setSelectedOrder(row);
    setShowDeleteModal(true);
  };

  // Handle order update
  const handleSaveOrder = async (updatedOrder: FormattedPillowOrder) => {
    try {
      // Update local state optimistically
      const updatedOrders = orders.map(order => 
        order.orderNumber === updatedOrder.orderNumber ? updatedOrder : order
      );
      setOrders(updatedOrders);
      setShowEditModal(false);
      setSelectedOrder(null);
      
      console.log("Order updated successfully:", updatedOrder);
      // Here you would make the API call to update the order
      // await updatePillowOrderAPI(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  // Handle order deletion
  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;

    try {
      // Remove from local state optimistically
      const updatedOrders = orders.filter(order => 
        order.orderNumber !== selectedOrder.orderNumber
      );
      setOrders(updatedOrders);
      setShowDeleteModal(false);
      setSelectedOrder(null);
      
      console.log("Order deleted successfully:", selectedOrder);
      // Here you would make the API call to delete the order
      // await deletePillowOrderAPI(selectedOrder.orderNumber);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const pillowOrdersColumns: Column<FormattedPillowOrder>[] = [
    {
      header: "Customer Name",
      accessor: "customer",
    },
    {
      header: "Pillow Type & Qty",
      accessor: "pillowType",
    },
    {
      header: "Status",
      accessor: (row) => (
        <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
          {row.status}
        </span>
      ),
    },
    { header: "Fabric Type", accessor: "fabric" },
    { header: "Order Date", accessor: "date" },
    {
      header: "Actions",
      accessor: (row) => (
        <ActionDropdown
          onView={() => handleView(row)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

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
        <div className="flex items-center gap-4">
          <h1 className="text-[24px] font-dmSans font-semibold">Pillow Orders</h1>
          {!loading && (
            <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredOrders.length} orders
            </span>
          )}
        </div>
        {show && (
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Search orders"
              value={search}
              onChange={setSearch}
              onSearch={() => {}}
              onClear={() => setSearch("")}
              suggestions={searchSuggestions}
              onSuggestionClick={setSearch}
              size="sm"
              debounceMs={300}
              className="w-full"
              disabled={loading}
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

      {search && filteredOrders.length === 0 && !loading && (
        <div className="mt-4 text-center py-8 text-gray-500">
          <p>No orders found for &quot;{search}&quot;</p>
          <p className="text-sm mt-1">Try searching for customer names, pillow types, status, or fabric</p>
        </div>
      )}

      {/* Modals */}
      {selectedOrder && (
        <>
          <ViewPillowModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
          />
          <EditPillowModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
            onSave={handleSaveOrder}
          />
          <DeletePillowModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}
