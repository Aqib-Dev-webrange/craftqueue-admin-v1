"use client";
import { useState } from "react";
import Image from "next/image";
import OrderCard from "@/app/admin/orders/tracker/[trackerId]/components/orderCard";
import Stepper from "./stepper";
import { supabase } from "@/lib/supabase";

interface Order {
  furnitureImage: string;
  productName: string;
  quoteId: string;
  priority: boolean;
  quoteTotal: string;
  shipTo: string;
  order_number: string;
  order_status: {
    status: string;
    date: string;
    location: string;
    is_active: boolean;
    description: string | null;
  }[];
}

interface Step {
  id: number;
  title: string;
  is_active: boolean;
  date?: string;
  location?: string;
}

interface OrdersTrackProps {
  order: Order;
  steps: Step[];
}

const fixedStatuses = [
  "pending",
  "confirm fabric",
  "fabric received",
  "in production",
  "finishing",
  "ready for delivery",
  "delivered",
];

export default function OrdersTrack({ order, steps }: OrdersTrackProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [location, setLocation] = useState("");

  const validSteps = steps.filter(step => typeof step.id !== "undefined" && step.title);

  async function handleUpdateStatus() {
    if (!selectedStatus || !location) {
      alert("Please select a status and enter a location.");
      return;
    }

    const updatedStatus = order.order_status.map((s) => ({
      ...s,
      is_active: s.status === selectedStatus,
    }));

    const now = new Date().toISOString();
    const existing = updatedStatus.find((s) => s.status === selectedStatus);
    if (!existing) {
      updatedStatus.push({
        status: selectedStatus,
        date: now,
        location,
        is_active: true,
        description: null,
      });
    } else {
      existing.date = now;
      existing.location = location;
      existing.is_active = true;
    }

    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: updatedStatus })
        .eq("order_number", order.order_number);

      if (error) throw error;
      alert("Order status updated!");
      setShowStatusModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    }
  }

  return (
    <div className="">
      <div className="flex gap-8 items-center justify-between mb-6">
        <div className="flex flex-col gap-2 font-poppins">
          <span className="text-[24px] font-medium">Order Dispatched</span>
          <span className="font-[16px] text-gray-500 text-lg">
            Order ID {order.quoteId}
          </span>
        </div>
        <Image
          src={order.furnitureImage}
          alt="Furniture"
          width={400}
          height={400}
          className="w-16 h-16 rounded-lg bg-slate-100 object-cover"
        />
      </div>

      {validSteps.length > 0 && <Stepper steps={validSteps} />}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowStatusModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 font-medium"
        >
          Order Status
        </button>
      </div>

      <OrderCard order={order} />

      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Update Order Status</h3>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select status</option>
              {fixedStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Location (e.g. Warehouse A)"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
