"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "@/app/admin/upholstery/[upholsteryId]/components/orderStatus";
import OrdersTrack from "@/app/admin/upholstery/[upholsteryId]/components/orderTracker";
import VendorModal from "@/app/admin/upholstery/[upholsteryId]/components/assignVendorModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { 
  getPillowOrderByNumber, 
  PillowOrderTracker, 
  transformOrderToSteps,
  Step 
} from "@/services/orderTracker";

// Define OrderData interface
interface OrderData {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
  };
  status: string;
  furnitureImage: string;
  furnitureType: string;
  fabricSource: string;
  dimensions: string;
  leadTime: string;
  upholsteryFeatures: string;
  priorityQuote: string;
  quoteId: string;
  quoteTotal: string;
  shipTo: string;
  priority: boolean;
  productName: string;
}

// Transform Supabase order data to the format expected by OrdersTrack
const transformOrderData = (pillowOrder: PillowOrderTracker): OrderData => ({
  customer: {
    name: pillowOrder.user_name || "Unknown Customer",
    email: pillowOrder.user_email || "No Email",
    phone: "+92316-456262", // Default phone since not in data
    address: pillowOrder.address?.address || "No Address",
    avatar: pillowOrder.user_email ? `https://www.gravatar.com/avatar/${pillowOrder.user_email}?d=identicon` : ""
      } ,
  status: pillowOrder.order_status?.[0]?.status || "Pending",
  furnitureImage: IMAGES.furniture, // Default image
  furnitureType: "Pillow",
  fabricSource: pillowOrder.fabric_type?.fabric_type || "Unknown Fabric",
  dimensions: "Standard Size", // Default dimension since not in data
  leadTime: "2-3 weeks", // Default lead time since not in data
  upholsteryFeatures: pillowOrder.upholstery_feature?.description || "Standard Features",
  priorityQuote: pillowOrder.is_priority ? "Yes" : "No",
  quoteId: `#${pillowOrder.order_number}`,
  quoteTotal: `$${pillowOrder.price?.total?.toFixed(2) || '0.00'}`,
  shipTo: pillowOrder.address?.address || "No shipping address",
  priority: pillowOrder.is_priority,
  productName: `${pillowOrder.fabric_type?.option_name || 'Custom'} Pillow`,
});

export default function UpholsteryOrderDetail() {
  const params = useParams();
  const trackerId = Array.isArray(params?.trackerId)
    ? params.trackerId[0]
    : params?.trackerId;

  // Fix line 54: Use proper type annotation
  // const [pillowOrder, setPillowOrder] = useState<PillowOrderTracker | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [status, setStatus] = useState("Pending");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!trackerId) {
        setError("No tracker ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const orderData = await getPillowOrderByNumber(trackerId);

        if (orderData) {
          // setPillowOrder(orderData);
          const transformedOrder = transformOrderData(orderData);
          setOrder(transformedOrder);
          setStatus(transformedOrder.status);

          // Generate tracking steps based on order status
          const trackingSteps = transformOrderToSteps(orderData);
          setSteps(trackingSteps);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [trackerId]);

  if (loading) {
    return (
      <div className="container mx-auto p-2">
        <LoadingSpinner message="Processing ..." variant="dual" size="lg"/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <Link
            href="/admin/orders/tracker"
            className="text-blue-500 underline mt-2 inline-block"
          >
            Back to Order Tracker
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-gray-500">
          <p>Order not found</p>
          <Link
            href="/admin/orders/tracker"
            className="text-blue-500 underline mt-2 inline-block"
          >
            Back to Order Tracker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders/tracker"
            className="mr-2 text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="font-inter text-[18px] font-semibold">
              Track Pillow Order #{order.quoteId.replace('#', '')}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-inter font-medium text-[16px] text-[#484C5D]">
            Update Order Status
          </span>
          <OrderStatusDropdown status={status} onChange={setStatus} />
        </div>
      </div>

      

      {/* Order Tracking Component */}
      <OrdersTrack order={order} steps={steps} />

      {/* Vendor Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
