"use client";
import { statusData } from "@/utils/data/statusData";
import StatusCard from "./components/statusCard";
import Header from "@/components/header";
import OverviewCard from "./components/overviewCard";
import OrderStatusDonut from "./components/orderDonut";
import BarChart from "./components/barChart";
import { TableView } from "@/components/table/tableView";
import { BsThreeDots } from "react-icons/bs";
import { bookings, bookingsColumns, fabricManagement, fabricManagementColumns, pillowOrders, pillowOrdersColumns, upholsteryQuotes } from "@/utils/data/furanitureData";


// Example data for upholsteryQuotes

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

const columns: Column<typeof upholsteryQuotes[0]>[] = [
  { header: "Customer Name", accessor: "customer" },
  { header: "Furniture Type", accessor: "furniture" },
  {
    header: "Status",
    accessor: row => (
      <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
        {row.status}
      </span>
    )
  },
  { header: "Priority Quote", accessor: "priority" },
  { header: "Date", accessor: "date" },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    )
  },
];

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
        <h2 className="text-xl font-semibold mb-2">Upholstery Quotes</h2>
        <TableView
          listTitle="List of all submitted quotes"
          columns={columns}
          data={upholsteryQuotes}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Pillow Orders</h2>
        <TableView
          listTitle="List of All Pillow Orders"
          columns={pillowOrdersColumns}
          data={pillowOrders}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Fabric Management</h2>
        <TableView
          listTitle="List of All Fabric Entries"
          columns={fabricManagementColumns}
          data={fabricManagement}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Bookings</h2>
        <TableView
          listTitle="List of All Bookings & Consultations"
          columns={bookingsColumns}
          data={bookings}
        />
      </div>
    </div>
  );
}