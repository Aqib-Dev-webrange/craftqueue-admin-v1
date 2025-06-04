"use client"
import { useState } from "react";
import { TableView, Column } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import ActionDropdown from "../components/actionDropdown";

type Booking = {
  customer: string;
  type: string;
  datetime: string;
};

const bookings: Booking[] = [
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
  { customer: "Emily R.", type: "Consultation", datetime: "05/05 – 05:45 PM" },
];

const bookingsColumns: Column<Booking>[] = [
  { header: "Customer Name", accessor: "customer" },
  { header: "Booking Type", accessor: "type" },
  { header: "Date/Time", accessor: "datetime" },
  {
    header: "Actions",
    accessor: (row) => (
          <ActionDropdown
            onEdit={() => handleEdit(row)}
            onClear={() => handleClear(row)}
          />
        ),
  },
];

const handleEdit = (row: Booking) => {
  console.log("Edit booking:", row);
  // Implement your edit logic here
}

const handleClear = (row: Booking) => {
  console.log("Clear booking:", row);
  // Implement your clear logic here
};

export default function BookingsPage() {
  const [search, setSearch] = useState("");

  // Generate suggestions from existing data
  const searchSuggestions = [
    ...new Set([
      ...bookings.map(b => b.customer),
      ...bookings.map(b => b.type),
      "Consultation",
      "Pickup",
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
    // You can add additional search logic here if needed
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-2">
        <h1 className="text-2xl  font-bold">Upholstery Bookings</h1>
        
        <div className="w-full sm:w-72">
          <SearchInput
            placeholder="Search bookings, customers..."
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClear}
            suggestions={searchSuggestions}
            onSuggestionClick={setSearch}
            size="md"
            debounceMs={300}
            className="w-full"
          />
        </div>
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