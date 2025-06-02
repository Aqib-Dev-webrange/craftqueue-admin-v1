"use client";
import {
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import { IMAGES } from "@/constants/image";
import CustomerInfo from "@/components/customerInfo";
import { useState } from "react";
import VendorModal from "../../upholstery/[upholsteryId]/components/assignVendorModal";

export default function OrderDetail() {
  // In a real app, fetch data using the upholsteryId param
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/upholstery"
            className="mr-2 text-gray-500 hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl font-semibold">Pillow Order Details</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Update Order Status</span>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
            {order.status}
          </span>
        </div>
      </div>
      <div className="border-b mx-2">
        <CustomerInfo
          customer={order.customer}
          onAssignVendor={() => setShowVendorModal(true)}
        />
      </div>

      <div className="grid grid-cols-3 gap-8 p-4">
        <div>
          <div className="text-gray-400 font-semibold">Type</div>
          <div className="font-bold text-lg">{order.type}</div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold">Date & Time</div>
          <div className="font-bold text-lg">{order.datetime}</div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold">Address</div>
          <div className="font-bold text-lg">{order.customer.country}</div>
        </div>
      </div>
      {showVendorModal && (
                <VendorModal onClose={() => setShowVendorModal(false)} />
              )}
    </div>
  );
}
