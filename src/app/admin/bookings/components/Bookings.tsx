"use client"
import { useState } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import ActionDropdown from "../../components/actionDropdown";

type Booking = {
  customer: string;
  type: string;
  datetime: string;
};

const bookings: Booking[] = [
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
  { customer: "John D.", type: "Pickup", datetime: "05/06 – 02:30 PM" },
  { customer: "Sarah M.", type: "Consultation", datetime: "05/07 – 10:15 AM" },
  { customer: "Mike B.", type: "Delivery", datetime: "05/08 – 04:00 PM" },
  { customer: "Lisa K.", type: "Consultation", datetime: "05/09 – 01:45 PM" },
];

export default function BookingsTable({ show = true }: { show?: boolean }) {
  const [search, setSearch] = useState("");

  // Define booking action handlers inside the component
  const handleView = (row: Booking) => {
    console.log("Viewing booking:", row);
    // Implement view logic here
  };
  const handleDelete = (row: Booking) => {
    console.log("Deleting booking:", row);
    // Implement delete logic here
  };

  // Define columns inside component to access the handlers
  const bookingsColumns: Column<Booking>[] = [
    { header: "Customer Name", accessor: "customer" },
    { header: "Booking Type", accessor: "type" },
    { header: "Date/Time", accessor: "datetime" },
    {
      header: "Actions",
      accessor: (row) => (
        <ActionDropdown
          onView={() => handleView(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

  // Generate suggestions from existing data
  const searchSuggestions = [
    ...new Set([
      ...bookings.map(b => b.customer),
      ...bookings.map(b => b.type),
      "Consultation",
      "Pickup",
      "Delivery",
      "Emily R.",
      "Today",
      "Tomorrow"
    ])
  ];

  const filtered = bookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      b.datetime.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleClearSearch = () => {
    setSearch("");
    console.log("Search cleared");
  };

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-2">
        <h1 className="text-[24px] font-dmSans font-semibold">Upholstery Bookings</h1>
        {show && (
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Search..."
              value={search}
              onChange={setSearch}
              onSearch={handleSearch}
              onClear={handleClearSearch}
              suggestions={searchSuggestions}
              onSuggestionClick={setSearch}
              size="sm"
              debounceMs={300}
              className="w-full"
            />
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <TableView
          listTitle="All Client Consultations & Pickups"
          columns={bookingsColumns}
          data={filtered}
          rowLink={(row) => `/admin/bookings/${encodeURIComponent(row.customer)}`}
        />
      </div>
    </div>
  );
}