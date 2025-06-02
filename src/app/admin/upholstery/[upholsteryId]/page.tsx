"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

// Components


// Constants (replace with your real imports)
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "./components/orderStatus";
import Tabs from "./components/orderTaps";
import FurnitureDetails from "./components/furnitureDetails";
import OrdersTrack from "./components/orderTracker";
import VendorModal from "./components/assignVendorModal";
import CustomerInfo from "@/components/customerInfo";

const ORDER_STEPS = [
  {
    label: "Pick up",
    date: "12 April, 20",
    sub: "Islamabad, PK",
    active: true,
    img: IMAGES.furniture,
  },
  {
    label: "Dispatched",
    date: "13 April, 20",
    sub: "Islamabad, PK",
    active: false,
    img: IMAGES.furniture,
  },
  {
    label: "In Transit",
    date: "14 April, 20",
    sub: "Lahore, PK",
    active: false,
    img: IMAGES.furniture,
  },
  {
    label: "Delivered",
    date: "15 April, 20",
    sub: "Karachi, PK",
    active: false,
    img: IMAGES.furniture,
  },
];

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
  const [tab, setTab] = useState<"furniture" | "orderTrack">("furniture");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/upholstery"
            className="mr-2 text-gray-500 hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl font-semibold">Order Details</span>
          </Link>
          
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">
            Update Order Status
          </span>
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

      {/* Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
