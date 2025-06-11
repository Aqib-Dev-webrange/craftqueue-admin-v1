"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
} from "react-icons/fa";
import CustomerInfo from "@/components/customerInfo";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "../../upholstery/[upholsteryId]/components/orderStatus";
import VendorModal from "../../upholstery/[upholsteryId]/components/assignVendorModal";
import Image from "next/image";

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
      <div className="flex gap-10 p-6">
        <Image
          src={fabric.image}
          alt="Fabric"
          width={384}
          height={384}
          className="w-72 h-72 rounded-2xl object-cover bg-slate-100"
        />
        <div className="grid grid-cols-2 gap-x-14 gap-y-10 font-poppins font-semibold text-[18px] tracking-[1.2px]">
          <div>
            <div className="text-gray-500 py-2">Cotton Blend</div>
            <div className=" ">{fabric.blend}</div>
          </div>
          <div>
            <div className="text-gray-500 py-2">Shipment ID</div>
            <div className="">{fabric.shipmentId}</div>
          </div>
          <div>
            <div className="text-gray-500 py-2">Material Type</div>
            <div className="">{fabric.materialType}</div>
          </div>
          <div>
            <div className="text-gray-500 py-2">
              Order Reference ID
            </div>
            <div className="">{fabric.orderRef}</div>
          </div>
          <div>
            <div className="text-gray-500 py-2">Current Status</div>
            <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs">
              {fabric.status}
            </span>
          </div>
          <div>
            <div className="text-gray-500 py-2">Estimated Yardage</div>
            <div className="">{fabric.yardage}</div>
          </div>
          <div>
            <div className="text-gray-500 py-2">Price per Yard</div>
            <div className="">{fabric.price}</div>
          </div>
        </div>
        {showVendorModal && (
          <VendorModal onClose={() => setShowVendorModal(false)} />
        )}
      </div>
    </div>
  );
}
