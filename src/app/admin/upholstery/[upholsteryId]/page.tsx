"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "./components/orderStatus";
import FurnitureDetails from "./components/furnitureDetails";
import OrdersTrack from "./components/orderTracker";
import VendorModal from "./components/assignVendorModal";
import CustomerInfo from "@/components/customerInfo";
import Tabs from "./components/orderTaps";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useUpholsteryOrderDetail } from "@/hooks/useUpholsteryOrderDetail";
import { transformOrderStatus } from "@/utils/dataTransforms";

// Define proper types
interface Step {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
  date?: string;
  location?: string;
}

// Define tab type
type TabType = "furniture" | "orderTrack";

interface UpholsteryOrderDetailProps {
  params: Promise<{
    upholsteryId: string;
  }>;
}

// Helper function to validate and get image URL
function getValidImageUrl(imageUrl: string | undefined, fallback: string): string {
  if (!imageUrl) return fallback;
  
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return fallback;
  }
}

export default function UpholsteryOrderDetail({ params }: UpholsteryOrderDetailProps) {
  // Unwrap params using React.use()
  const { upholsteryId } = use(params);
  
  const { order, loading, error, updateStatus } = useUpholsteryOrderDetail(upholsteryId);
  
  const [status, setStatus] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [tab, setTab] = useState<TabType>("furniture");

  // Update local status when order data changes
  useEffect(() => {
    if (order) {
      const currentStatus = order.order_status?.find((s) => s.is_active)?.status || "pending";
      setStatus(currentStatus);
    }
  }, [order]);

  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    try {
      setStatus(newStatus);
      await updateStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert status on error
      if (order) {
        const currentStatus = order.order_status?.find((s) => s.is_active)?.status || "pending";
        setStatus(currentStatus);
      }
    }
  };

  // Transform order status to steps
  const orderSteps: Step[] = transformOrderStatus(order?.order_status || []);

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner message="Loading order details..." />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-4">
            {error || "Order not found"}
          </div>
          <Link
            href="/admin/upholstery"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Upholstery Orders
          </Link>
        </div>
      </div>
    );
  }

  // Transform the raw order data to match component expectations
  const transformedOrder = {
    customer: {
      name: order.user_name || "N/A",
      email: order.user_email || "N/A",
      // phone: order.created_user?.phone || "N/A",
      address: order.address?.address || "N/A",
      avatar: getValidImageUrl(
        order.created_user?.raw_user_meta_data?.profileImage, 
        IMAGES.avatar
      ),
    },
    status: status,
    furnitureImage: getValidImageUrl(
      order.furniture_images?.[0], 
      IMAGES.furniture
    ),
    furnitureType: order.furniture_type?.display_name || order.furniture_type?.name || "N/A",
    fabricSource: order.fabric_type?.fabric_type || "N/A",
    dimensions: order.furniture_size 
      ? `${order.furniture_size.length}L x ${order.furniture_size.width}W x ${order.furniture_size.height}H`
      : "N/A",
    leadTime: order.lead_time?.lead_time_text || `${order.lead_time?.lead_time_days} days` || "N/A",
    upholsteryFeatures: order.upholstery_feature?.feature_name || "N/A",
    priorityQuote: order.is_priority ? "Yes" : "No",
    quoteId: order.order_number || "N/A",
    quoteTotal: order.price?.total ? `$${order.price.total}` : "$0",
    shipTo: order.address?.address || "N/A",
    priority: order.is_priority || false,
    productName: `${order.furniture_type?.display_name || "Furniture"} Reupholstery`,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 font-poppins">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/upholstery"
            className="mr-2 text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl font-semibold">Order Details</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">Update Order Status</span>
          <OrderStatusDropdown 
            status={status} 
            onChange={handleStatusChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Customer Info */}
      <CustomerInfo
        customer={transformedOrder.customer}
        onAssignVendor={() => setShowVendorModal(true)}
      />

      {/* Tabs */}
      <Tabs current={tab} onChange={setTab} />

      {/* Tab Content */}
      {tab === "furniture" && <FurnitureDetails order={transformedOrder} />}
      {tab === "orderTrack" && <OrdersTrack order={transformedOrder} steps={orderSteps} />}

      {/* Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}