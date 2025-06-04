"use client";
import { statusData } from "@/utils/data/statusData";
import StatusCard from "./components/statusCard";
import { TableView } from "@/components/table/tableView";
import { bookings, bookingsColumns, fabricManagement, fabricManagementColumns, pillowOrders, pillowOrdersColumns, upholsteryQuotes, upholsteryQuotesColumns } from "@/utils/data/furanitureData";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <h2 className="text-xl font-semibold py-4">Upholstery Quotes</h2>
        <TableView
          listTitle="List of all submitted quotes"
          columns={upholsteryQuotesColumns}
          data={upholsteryQuotes}
          rowLink={(row) => `/admin/upholstery/${encodeURIComponent(row.customer)}`}
          initialRowCount={4}
          viewMoreText="View More"
          showLessText="Show Less"
        />
      </div>

      {/* Pillow Orders - Show 4 initially */}
      <div>
        <h2 className="text-xl font-semibold py-4">Pillow Orders</h2>
        <TableView
          listTitle="List of all pillow orders"
          columns={pillowOrdersColumns}
          data={pillowOrders}
          rowLink={(row) => `/admin/orders/${encodeURIComponent(row.customer)}`}
          initialRowCount={4}
          viewMoreText="View More"
          showLessText="Show Less"
        />
      </div>

      {/* Fabric Management - Show 2 initially */}
      <div>
        <h2 className="text-xl font-semibold py-4">Fabric Management</h2>
        <TableView
          listTitle="List of all fabric entries"
          columns={fabricManagementColumns}
          data={fabricManagement}
          rowLink={(row) => `/admin/fabrics/${encodeURIComponent(row.identifier)}`}
          initialRowCount={4}
          viewMoreText="View More"
          showLessText="Show Less"
        />
      </div>

      {/* Bookings - Show 6 initially */}
      <div>
        <h2 className="text-xl font-semibold py-4">Bookings</h2>
        <TableView
          listTitle="All Client Consultations & Pickups"
          columns={bookingsColumns}
          data={bookings}
          rowLink={(row) => `/admin/bookings/${encodeURIComponent(row.client)}`}
          initialRowCount={4}
          viewMoreText="View More"
          showLessText="Show Less"
        />
      </div>
    </div>
  );
}