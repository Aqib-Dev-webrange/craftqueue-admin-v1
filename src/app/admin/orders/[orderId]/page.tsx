"use client";
import {
  FaArrowLeft
} from "react-icons/fa";
import Link from "next/link";
import { IMAGES } from "@/constants/image";
import CustomerInfo from "@/components/customerInfo";
import { useState } from "react";
import OrderStatusDropdown from "../../upholstery/[upholsteryId]/components/orderStatus";
import VendorModal from "../../upholstery/[upholsteryId]/components/assignVendorModal";

export default function Page() {
  // Data as array of objects for dynamic rendering
  const order = {
    customer: {
      name: "Nike",
      email: "emily@domain.com",
      phone: "+12345-678910",
      address: "1234 Maple Street, Canada",
      country: "Canada",
      avatar: IMAGES.avatar,
    },
    status: "Pending",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  };
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [status, setStatus] = useState(order.status);

  // Array for grid data
  const orderDetails = [
    {
      label: "Memory Foam",
      value: "Pillow Type",
      icon: null,
    },
    {
      label: "Cotton Blend",
      value: "Seating Type",
      icon: null,
    },
    {
      label: "Fabric Features",
      value: "Cabinet Type",
      icon: null,
    },
  ];

  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link
              href="/upholstery"
              className="mr-2 text-gray-500 hover:text-black flex items-center gap-2"
            >
              <FaArrowLeft className="inline mr-1" />
              <span className="text-xl font-semibold">
                Pillow Order Details
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">
              Update Order Status
            </span>
            <OrderStatusDropdown status={status} onChange={setStatus} />
          </div>
        </div>
      </div>

      <div className="border-b mx-2">
        <CustomerInfo
          customer={order.customer}
          onAssignVendor={() => setShowVendorModal(true)}
        />
      </div>

      <div className="grid grid-cols-3 gap-8 p-4">
        {orderDetails.map((item, idx) => (
          <div key={idx}>
            <div className="text-gray-400 font-semibold">{item.label}</div>
            <div className="font-bold text-lg flex items-center gap-2">
              {item.icon}
              {item.value}
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
