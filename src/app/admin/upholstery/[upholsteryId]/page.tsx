"use client";
import { useState, use } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import FurnitureDetails from "./components/furnitureDetails";
import OrdersTrack from "./components/orderTracker";
import VendorModal from "./components/assignVendorModal";
import CustomerInfo from "@/components/customerInfo";
import Tabs from "./components/orderTaps";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useUpholsteryOrderDetail } from "@/hooks/useUpholsteryOrderDetail";
import EditUpholsteryOrder from "./components/EditUpholsteryOrder";
import { supabase } from "@/lib/supabase";
import { RawUpholsteryOrder } from "@/types/upholstery";

interface Step {
  id: number;
  title: string;
  is_active: boolean;
  date?: string;
  location?: string;
}

type TabType = "furniture" | "orderTrack";

interface UpholsteryOrderDetailProps {
  params: Promise<{ upholsteryId: string }>;
}

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
  const { upholsteryId } = use(params);
  const { order, loading, error } = useUpholsteryOrderDetail(upholsteryId);

  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tab, setTab] = useState<TabType>("furniture");

  const fixedStatuses = [
    "pending",
    "confirm fabric",
    "fabric received",
    "in production",
    "finishing",
    "ready for delivery",
    "delivered",
  ];

  const orderSteps: Step[] = fixedStatuses.map((status, index) => {
    const match = order?.order_status?.find((s) => s.status === status);
    return {
      id: index,
      title: status.replace(/\b\w/g, (c) => c.toUpperCase()),
      is_active: match?.is_active || false,
      date: match?.date,
      location: match?.location,
    };
  });

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
          <div className="text-red-500 text-lg mb-4">{error || "Order not found"}</div>
          <Link href="/admin/upholstery" className="text-blue-600 hover:text-blue-800 underline">
            Back to Upholstery Orders
          </Link>
        </div>
      </div>
    );
  }

  const customer = {
    name: order.user_name || "N/A",
    email: order.user_email || "N/A",
    address: order.address?.address || "N/A",
    avatar: getValidImageUrl(order.created_user?.raw_user_meta_data?.profileImage, IMAGES.avatar),
  };

  const transformedOrder = {
    furnitureImage: getValidImageUrl(order.furniture_images?.[0], IMAGES.furniture),
    productName: `${order.furniture_type?.display_name || "Furniture"} Reupholstery`,
    quoteId: order.order_number || "N/A",
    priority: order.is_priority || false,
    quoteTotal: order.price?.total ? `$${order.price.total}` : "$0",
    shipTo: order.address?.address || "N/A",
    order_number: order.order_number || "N/A",
    order_status: order.order_status || [],
  };

  async function handleSave(updatedOrder: RawUpholsteryOrder): Promise<void> {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          is_priority: updatedOrder.is_priority,
          furniture_images: updatedOrder.furniture_images,
          price_id: updatedOrder.price?.id,
          furniture_size_id: updatedOrder.furniture_size?.id,
          fabric_type_id: updatedOrder.fabric_type?.id,
          upholstery_feature_id: updatedOrder.upholstery_feature?.id,
          lead_time_id: updatedOrder.lead_time?.id,
          address_id: updatedOrder.address?.id,
          updated_at: new Date().toISOString(),
        })
        .eq("order_number", updatedOrder.order_number);

      if (error) throw error;
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to save updated order:", err);
      alert("Failed to save changes");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 font-poppins">
        <div className="flex items-center gap-2">
          <Link href="/admin/upholstery" className="text-black flex items-center gap-2">
            <FaArrowLeft />
            <span className="text-xl font-semibold">Order Details</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-full font-medium"
          >
            Edit Order
          </button>

        </div>
      </div>

      <CustomerInfo customer={customer} onAssignVendor={() => setShowVendorModal(true)} />
      <Tabs current={tab} onChange={setTab} />
      {tab === "furniture" && (
  <FurnitureDetails
    order={{
      furnitureImage: getValidImageUrl(order.furniture_images?.[0], IMAGES.furniture),
      furnitureType: order.furniture_type?.display_name || "Not specified",
      fabricSource: order.fabric_type?.fabric_type || "Not specified",
      dimensions: order.furniture_size
        ? `${order.furniture_size.length} x ${order.furniture_size.width} x ${order.furniture_size.height}`
        : "Not specified",
      leadTime: order.lead_time?.lead_time_text || `${order.lead_time?.lead_time_days} days` || "Not specified",
      upholsteryFeatures: order.upholstery_feature?.feature_name || "Not specified",
      priorityQuote: order.is_priority ? "Yes" : "No",
    }}
  />
)}
      {tab === "orderTrack" && <OrdersTrack order={transformedOrder} steps={orderSteps} />}

      {showVendorModal && <VendorModal onClose={() => setShowVendorModal(false)} />}
      {showEditModal && order && (
        <EditUpholsteryOrder
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          order={order}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
