"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import CustomerInfo from "@/components/customerInfo";
import { IMAGES } from "@/constants/image";
import OrderStatusDropdown from "../../upholstery/[upholsteryId]/components/orderStatus";
import VendorModal from "../../upholstery/[upholsteryId]/components/assignVendorModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FabricOption, getFabricOptionById } from "@/services/fibric";

export default function FabricPage() {
  const params = useParams();
  const fabricId = Array.isArray(params?.fabricsId)
    ? params.fabricsId[0]
    : params?.fabricsId;

  const [fabric, setFabric] = useState<FabricOption | null>(null);
  const [status, setStatus] = useState("Active");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFabric() {
      if (!fabricId) {
        setError("No fabric ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fabricData = await getFabricOptionById(parseInt(fabricId));

        if (fabricData) {
          setFabric(fabricData);
          setStatus(fabricData.isactive ? "Active" : "Inactive");
        } else {
          setError("Fabric not found");
        }
      } catch (err) {
        console.error("Error fetching fabric:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch fabric");
      } finally {
        setLoading(false);
      }
    }

    fetchFabric();
  }, [fabricId]);

  // Mock customer data (since fabric_options doesn't have customer info)
  const mockCustomer = {
    name: "Craft Queue Admin",
    email: "admin@craftqueue.com",
    phone: "+1-555-0123",
    address: "Admin Dashboard",
    avatar: IMAGES.avatar,
  };

  // Status color mapping
  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner message="Loading fabric details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <Link
            href="/admin/fabrics"
            className="text-blue-500 underline mt-2 inline-block"
          >
            Back to Fabrics
          </Link>
        </div>
      </div>
    );
  }

  if (!fabric) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <p>Fabric not found</p>
          <Link
            href="/admin/fabrics"
            className="text-blue-500 underline mt-2 inline-block"
          >
            Back to Fabrics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/fabrics"
            className="mr-2 text-gray-800 hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft className="inline mr-1" />
            <span className="text-xl ">Fabric Orders</span>
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
          customer={mockCustomer}
          onAssignVendor={() => setShowVendorModal(true)}
        />
      </div>

      {/* Fabric Details */}
      <div className="flex gap-10 py-6">
        <Image
          src={ IMAGES.fabric}
          alt={fabric.option_name}
          width={384}
          height={384}
          className="w-80 h-80 rounded-2xl object-cover bg-slate-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = IMAGES.fabric;
          }}
        />
        <div className="grid grid-cols-2 gap-x-14 gap-y-10 font-poppins text-[18px] tracking-[1]">
          <div>
            <div className="text-gray-500">Fabric Name</div>
            <div className="text-secondary py-3">{fabric.option_name}</div>
          </div>
          <div>
            <div className="text-gray-500">Fabric ID</div>
            <div className="text-secondary py-3">
              #{fabric.id.toString().padStart(6, "0")}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Fabric Type</div>
            <div className="text-secondary py-3">{fabric.fabric_type}</div>
          </div>
          <div>
            <div className="text-gray-500">Markup Percentage</div>
            <div className="text-secondary py-3">
              {fabric.markup_percentage}%
            </div>
          </div>
          <div>
            <div className="text-gray-500">Current Status</div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                fabric.isactive
              )}`}
            >
              {fabric.isactive ? "Active" : "Inactive"}
            </span>
          </div>
          <div>
            <div className="text-gray-500">Created Date</div>
            <div className="text-secondary py-3">
              {new Date(fabric.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500">Image URL</div>
            <div className="text-secondary py-3 break-all text-sm">
              {fabric.image_url || "No image URL provided"}
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Modal */}
      {showVendorModal && (
        <VendorModal onClose={() => setShowVendorModal(false)} />
      )}
    </div>
  );
}
