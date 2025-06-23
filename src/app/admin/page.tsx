"use client";
import { statusData } from "@/utils/data/statusData";
import StatusCard from "./components/statusCard";
import BookingsTable from "./bookings/components/Bookings";
import Orders from "./orders/components/pillowOrder";
import FabricPage from "./fabrics/components/FabricsTable";
import UpholsteryTable from "./upholstery/components/UpholstreyTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 ">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
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