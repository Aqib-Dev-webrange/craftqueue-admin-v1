"use client";
import { statusData } from "@/utils/data/statusData";
import StatusCard from "./components/statusCard";
import UpholsteryPage from "./upholstery/page";
import Orders from "./orders/page";
import FabricPage from "./fabrics/page";
import BookingsPage from "./bookings/page";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 ">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {statusData.map((item, index) => (
          <StatusCard
            key={index}
            label={item.label}
            count={item.count}
          />
        ))}
      </div>

      {/* Upholstery Quotes - Show 3 initially */}
      <div>
        <UpholsteryPage show={false} />
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
        <BookingsPage show={false} />
      </div>
    </div>
  );
}