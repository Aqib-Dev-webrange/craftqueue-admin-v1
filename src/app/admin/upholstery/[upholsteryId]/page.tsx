"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "./components/orderStatus";
import FurnitureDetails from "./components/furnitureDetails";
import OrdersTrack from "./components/orderTracker";
import VendorModal from "./components/assignVendorModal";
import CustomerInfo from "@/components/customerInfo";
import Tabs from "./components/orderTaps";

// Define proper types
interface Step {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
  date?: string;
  location?: string;
}

const ORDER_STEPS: Step[] = [
  { id: 1, title: "Pick up", status: "completed", date: "12 April, 25", location: "Islamabad, Pk" },
  { id: 2, title: "Dispatched", status: "completed", date: "13 April, 25", location: "Islamabad, Pk" },
  { id: 3, title: "Dispatched", status: "current", date: "14 April, 25", location: "Islamabad, Pk" },
  { id: 4, title: "Dispatched", status: "pending", date: "15 April, 25", location: "Islamabad, Pk" },
];

// Define tab type
type TabType = "furniture" | "orderTrack";

export default function UpholsteryOrderDetail() {
const order = {
    customer: {
      name: "Adidas",
      email: "max@kt.com",
      phone: "+92316-456262",
      address: "6659 Joe Cape, Mexico",
      avatar: IMAGES.avatar,
    },
    status: "Pending",
    furnitureImage: IMAGES.furniture,
    furnitureType: "Sofa",
    fabricSource: "Imported Fabric",
    dimensions: "8L x 4W",
    leadTime: "10 days",
    upholsteryFeatures: "Water-resistant, Cushion Foam",
    priorityQuote: "Yes",
    quoteId: "#12345",
    quoteTotal: "$1,250",
    shipTo: "House Number 2345, 516 Chandler Groves, New Mexico",
    priority: true,
    productName: "Sofa Reupholstery",
  };

  const [status, setStatus] = useState(order.status);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [tab, setTab] = useState<TabType>("furniture");

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
          <OrderStatusDropdown status={status} onChange={setStatus} />
        </div>
      </div>

      {/* Customer Info */}
      <CustomerInfo
        customer={order.customer}
        onAssignVendor={() => setShowVendorModal(true)}
      />

      {/* Tabs */}
      <Tabs current={tab} onChange={setTab} />

      {/* Tab Content */}
      {tab === "furniture" && <FurnitureDetails order={order} />}
      {tab === "orderTrack" && <OrdersTrack order={order} steps={ORDER_STEPS} />}
      {/* <OrderCard order={order}/> */}
      {/* Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
