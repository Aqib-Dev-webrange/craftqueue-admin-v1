"use client";
import { statusData } from "@/utils/data/statusData";
import StatusCard from "./components/statusCard";
import Header from "@/components/header";
import OverviewCard from "./components/overviewCard";
import OrderStatusDonut from "./components/orderDonut";
import BarChart from "./components/barChart";
import { TableView } from "@/components/table/tableView";
import { BsThreeDots } from "react-icons/bs";
import { bookings, bookingsColumns, fabricManagement, fabricManagementColumns, pillowOrders, pillowOrdersColumns, upholsteryQuotes, upholsteryQuotesColumns } from "@/utils/data/furanitureData";


export default function Dashboard() {
  const user = {
    name: "Jack Jonson",
    role: "Admin",
    avatarUrl: "/images/avatar.jpg", // stored in /public/images
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusData.map((item, index) => (
          <StatusCard
            key={index}
            // icon={item.icon}
            label={item.label}
            count={item.count}
            // color={item.color}
          />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold p-4">Upholstery Quotes</h2>
        <TableView
          listTitle="List of all submitted quotes"
          columns={upholsteryQuotesColumns}
          data={upholsteryQuotes}
          rowLink={(row) => `/admin/upholstery/${encodeURIComponent(row.customer)}`}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold p-4">Pillow Orders</h2>
        <TableView
          listTitle="List of all pillow orders"
          columns={pillowOrdersColumns}
          data={pillowOrders}
          rowLink={(row) => `/admin/orders/${encodeURIComponent(row.customer)}`}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold p-4">Fabric Management</h2>
        <TableView
          listTitle="List of all fabric entries"
          columns={fabricManagementColumns}
          data={fabricManagement}
          rowLink={(row) => `/admin/fabrics/${encodeURIComponent(row.identifier)}`}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold p-4">Bookings</h2>
        <TableView
          listTitle="All Client Consultations & Pickups"
          columns={bookingsColumns}
          data={bookings}
          rowLink={(row) => `/admin/bookings/${encodeURIComponent(row.client)}`}
        />
      </div>
    </div>
  );
}