"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "@/app/admin/upholstery/[upholsteryId]/components/orderStatus";
import OrdersTrack from "@/app/admin/upholstery/[upholsteryId]/components/orderTracker";


const ORDER_STEPS = [
  {
    label: "Quote Submitted",
    date: "April 12, 2020",
    sub: "Lahore, PK",
    active: true,
    img: IMAGES.furniture,
  },
  {
    label: "Fabric Confirmed",
    date: "April 13, 2020",
    sub: "Lahore, PK",
    active: true,
    img: IMAGES.furniture,
  },
  {
    label: "Fabric Received",
    date: "April 14, 2020",
    sub: "Lahore, PK",
    active: true,
    img: IMAGES.furniture,
  },
  {
    label: "In Production",
    date: "April 14, 2020",
    sub: "Lahore, PK",
    active: false,
    img: IMAGES.furniture,
  },
  {
    label: "Finishing",
    date: "April 14, 2020",
    sub: "Lahore, PK",
    active: false,
    img: IMAGES.furniture,
  },
  {
    label: "Ready for Delivery",
    date: "April 14, 2020",
    sub: "Lahore, PK",
    active: false,
    img: IMAGES.furniture,
  },
  {
    label: "Delivered",
    date: "April 15, 2020",
    sub: "Lahore, PK",
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
            href="/orders/tracker"
            className="mr-2 text-gray-500 hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl font-semibold">Track Pillow Order </span>
          </Link>
          
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">
            Update Order Status
          </span>
          <OrderStatusDropdown status={status} onChange={setStatus} />
        </div>
      </div>
      <OrdersTrack order={order} steps={ORDER_STEPS}/> 
    </div>
  );
}
