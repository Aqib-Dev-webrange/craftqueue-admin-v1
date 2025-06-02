"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CustomerInfo from "@/components/customerInfo";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "../../upholstery/[upholsteryId]/components/orderStatus";
import VendorModal from "../../upholstery/[upholsteryId]/components/assignVendorModal";

export default function FabricPage() {
  const [status, setStatus] = useState("Pending");
  const [showVendorModal, setShowVendorModal] = useState(false);

  const fabric = {
    customer: {
      name: "Adidas",
      email: "max@kt.com",
      phone: "+92316-456262",
      address: "6659 Joe Cape, Mexico",
      avatar: IMAGES.avatar,
    },
    image: IMAGES.fabric,
    blend: "Linen Fabric",
    materialType: "Manufacturing Process",
    shipmentId: "#1234567890",
    orderRef: "#1234567890",
    status: "On Route",
    yardage: "Estimated Yardage",
    price: "$48",
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/fabrics"
            className="mr-2 text-gray-500 hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl font-semibold">Fabric Order Details</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">Update Order Status</span>
          <OrderStatusDropdown status={status} onChange={setStatus} />
        </div>
      </div>

      {/* Customer Info */}
      <div className="border-b mx-2">
        <CustomerInfo
          customer={fabric.customer}
          onAssignVendor={() => setShowVendorModal(true)}
        />
      </div>

      {/* Fabric Details */}
      <div className="grid grid-cols-3 gap-2 items-start mt-8">
        <img
          src={fabric.image}
          alt="Fabric"
          className="w-96 h-96 rounded-2xl object-cover bg-slate-100"
        />
        <div className="col-span-2 grid grid-cols-2  gap-y-4">
          <div>
            <div className="text-gray-400 font-semibold">Cotton Blend</div>
            <div className="font-bold text-lg">{fabric.blend}</div>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">Shipment ID</div>
            <div className="font-bold text-lg">{fabric.shipmentId}</div>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">Material Type</div>
            <div className="font-bold text-lg">{fabric.materialType}</div>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">
              Order Reference ID
            </div>
            <div className="font-bold text-lg">{fabric.orderRef}</div>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">Current Status</div>
            <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
              {fabric.status}
            </span>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">Estimated Yardage</div>
            <div className="font-bold text-lg">{fabric.yardage}</div>
          </div>
          <div>
            <div className="text-gray-400 font-semibold">Price per Yard</div>
            <div className="font-bold text-lg">{fabric.price}</div>
          </div>
        </div>
        {showVendorModal && (
          <VendorModal onClose={() => setShowVendorModal(false)} />
        )}
      </div>
    </div>
  );
}
