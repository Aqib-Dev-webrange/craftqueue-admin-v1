"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "@/app/admin/upholstery/[upholsteryId]/components/orderStatus";
import OrdersTrack from "@/app/admin/upholstery/[upholsteryId]/components/orderTracker";
import VendorModal from "@/app/admin/upholstery/[upholsteryId]/components/assignVendorModal";

// Define the Step interface to match what OrdersTrack expects
interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  location?: string;
}

// Convert your existing data to match the Step interface
const ORDER_STEPS: Step[] = [
  {
    id: 1,
    title: "Quote Submitted",
    date: "April 12, 2020",
    status: "completed",
    location: "Islamabad, Pk",
  },
  {
    id: 2,
    title: "Fabric Confirmed",
    date: "April 13, 2020",
    status: "completed",
    location: "Lahore, Pk",
  },
  {
    id: 3,
    title: "Fabric Received",
    date: "April 14, 2020",
    status: "completed",
    location: "Karachi, Pk",
  },
  {
    id: 4,
    title: "In Production",
    date: "April 14, 2020",
    status: "current",
    location: "Faisalabad, Pk",
  },
  {
    id: 5,
    title: "Finishing",
    date: "April 14, 2020",
    status: "pending",
    location: "Multan, Pk",
  },
  {
    id: 6,
    title: "Ready for Delivery",
    date: "April 14, 2020",
    status: "pending",
    location: "Peshawar, Pk",
  },
  {
    id: 7,
    title: "Delivered",
    date: "April 15, 2020",
    status: "pending",
    location: "Quetta, Pk",
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
            <span className="font-inter text-[18px] font-semibold ">Track Pillow Order</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-inter font-medium text-[16px] text-[#484C5D]">
            Update Order Status
          </span>
          <OrderStatusDropdown status={status} onChange={setStatus} />
        </div>
      </div>
      
      <OrdersTrack order={order} steps={ORDER_STEPS} />
      
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
