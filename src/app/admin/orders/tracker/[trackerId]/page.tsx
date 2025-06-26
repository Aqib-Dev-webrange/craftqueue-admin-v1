"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "@/app/admin/upholstery/[upholsteryId]/components/orderStatus";
import OrdersTrack from "@/app/admin/upholstery/[upholsteryId]/components/orderTracker";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { supabase } from "@/lib/supabase";

// --- Types ---
export interface Step {
  id: number;
  title: string;
  is_active: boolean;
  date?: string;
  location?: string;
}

interface OrderStatus {
  status: string;
  date: string;
  location: string;
  is_active: boolean;
  description: string | null;
}

interface Order {
  furnitureImage: string;
  productName: string;
  quoteId: string;
  priority: boolean;
  quoteTotal: string;
  shipTo: string;
  order_number: string;
  order_status: OrderStatus[];
}

// --- Page ---
export default function OrderTrakerDetail() {
  const { trackerId } = useParams<{ trackerId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      // Fetch the order by order_number (trackerId)
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", trackerId)
        .single();

      if (error || !data) {
        setError("Order not found");
        setOrder(null);
        setLoading(false);
        return;
      }

      // Map Supabase data to Order shape for OrdersTrack
      const mappedOrder: Order = {
        furnitureImage: data.furniture_images?.[0] || IMAGES.furniture,
        productName: data.order_type === "pillow" ? "Pillow" : "Upholstery",
        quoteId: `#${data.order_number}`,
        priority: !!data.is_priority,
        quoteTotal: "$0.00", // You can fetch price if needed
        shipTo: "", // You can fetch address if needed
        order_number: data.order_number,
        order_status: Array.isArray(data.order_status) ? data.order_status : [],
      };

      setOrder(mappedOrder);

      // Map order_status to steps
      const mappedSteps: Step[] = mappedOrder.order_status.map((s, idx) => ({
        id: idx + 1,
        title: s.status
          .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
          .replace(/_/g, " "),
        is_active: Boolean(s.is_active), // This is always boolean, so it's correct!
        date: s.date,
        location: s.location,
      }));
      setSteps(mappedSteps);

      // Set current status for dropdown
      const activeStatus = mappedOrder.order_status.find((s) => s.is_active)?.status || "";
      setStatus(activeStatus);

      setLoading(false);
    }
    fetchOrder();
  }, [trackerId]);

  if (loading) {
    return (
      <div className="container mx-auto p-2">
        <LoadingSpinner message="Processing ..." variant="dual" size="lg" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-gray-500">
          <p>{error || "Order not found"}</p>
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
              Track {order.productName} Order {order.quoteId.replace("#", "")}
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
      <OrdersTrack order={order} steps={steps} isShow={false} />

      {/* Vendor Modal */}
      {/* {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )} */}
    </div>
  );
}
