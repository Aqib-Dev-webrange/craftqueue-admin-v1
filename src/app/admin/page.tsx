"use client";
import { useEffect, useState } from "react";
import StatusCard from "./components/statusCard";
import BookingsTable from "./bookings/components/Bookings";
import Orders from "./orders/components/pillowOrder";
import FabricPage from "./fabrics/components/FabricsTable";
import UpholsteryTable from "./upholstery/components/UpholstreyTable";
import { supabase } from "@/lib/supabase";

const statusLabels = [
  "New Quotes Submitted",
  "Fabrics Awaiting Confirmation",
  // "Fabric Received",
  "In Production",
  "Finishing",
  "Ready for Delivery",
  "Delivered",
];

export default function Dashboard() {
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("order_status");
      if (error) return;

      // Count orders by their current (active) status
      const counts: Record<string, number> = {};
      for (const label of statusLabels) counts[label] = 0;

      (data || []).forEach((order) => {
        const activeStatus = Array.isArray(order.order_status)
          ? order.order_status.find((s) => s.is_active)
          : null;
        if (activeStatus && statusLabels.includes(activeStatus.status)) {
          counts[activeStatus.status] += 1;
        }
      });
      setStatusCounts(counts);
    }
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4 ">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {statusLabels.map((label) => (
          <StatusCard
            key={label}
            label={label.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
            count={statusCounts[label] || 0}
          />
        ))}
      </div>

      {/* Upholstery Quotes - Show 3 initially */}
      <div>
        <UpholsteryTable show={false} />
      </div>

      {/* Pillow Orders - Show 4 initially */}
      <div>
        <Orders show={false} />
      </div>

      {/* Fabric Management - Show 2 initially */}
      <div>
        <FabricPage show={false} />
      </div>

      {/* Bookings - Show 6 initially */}
      <div>
        <BookingsTable show={false} />
      </div>
    </div>
  );
}