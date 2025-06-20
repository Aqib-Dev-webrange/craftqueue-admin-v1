"use client";
import { useState } from "react";
import { TableView } from "@/components/table/tableView";
import SearchInput from "@/components/ui/Input";
import { pillowOrders, pillowOrdersColumns } from "@/utils/data/furanitureData";

// You can place this in a shared types file
export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}


export default function Orders() {
  const [search, setSearch] = useState("");

  // Generate search suggestions from the data
  const searchSuggestions = [
    ...new Set([
      ...pillowOrders.map(order => order.customer),
      ...pillowOrders.map(order => order.pillowType),
      ...pillowOrders.map(order => order.status),
      ...pillowOrders.map(order => order.fabric),
      "Memory Foam",
      "Cotton",
      "Latex",
      "Gel",
      "Feather",
      "On the Way",
      "Processing",
      "Delivered",
      "Cancelled"
    ])
  ];

  // Filter orders based on search
  const filteredOrders = pillowOrders.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.pillowType.toLowerCase().includes(search.toLowerCase()) ||
    order.status.toLowerCase().includes(search.toLowerCase()) ||
    order.fabric.toLowerCase().includes(search.toLowerCase()) ||
    order.date.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    console.log("Searching orders for:", value);
  };

  const handleClear = () => {
    console.log("Search cleared");
  };

  return (
    <div className="container mx-auto p-2">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-[24px] font-dmSans font-semibold">Pillow Orders</h1>
        
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search..."
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

      {/* Table */}
      <div className="bg-white rounded-2xl">
        <TableView
          listTitle="Overview of All Pillow Orders"
          columns={pillowOrdersColumns}
          data={filteredOrders}
          rowLink={(row) => `/admin/orders/${encodeURIComponent(row.customer)}`}
        />
      </div>

      {/* Search Results Info */}
      {/* {search && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} for &quot;{search}&quot;
          {filteredOrders.length === 0 && (
            <span className="block mt-1 text-gray-500">
              Try searching for customer names, pillow types, status, or fabric types
            </span>
          )}
        </div>
      )} */}
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { TableView } from "@/components/table/tableView";
// import SearchInput from "@/components/ui/Input";
// import { pillowOrdersColumns } from "@/utils/data/furanitureData";
// import { formatPillowOrders, getPillowOrders } from "@/lib/supabase";

// export interface PillowOrder {
//   id: string; // Add this line
//   customer: string;
//   email: string;
//   pillowType: string;
//   fabric: string;
//   status: string;
//   date: string;
//   orderNumber: string; // Add this line
// }

// export default function Orders() {
//   const [search, setSearch] = useState("");
//   const [orders, setOrders] = useState<PillowOrder[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const raw = await getPillowOrders();
//       const formatted = formatPillowOrders(raw);
//       setOrders(formatted);
//     };
//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter(order =>
//     order.customer.toLowerCase().includes(search.toLowerCase()) ||
//     order.pillowType.toLowerCase().includes(search.toLowerCase()) ||
//     order.status.toLowerCase().includes(search.toLowerCase()) ||
//     order.fabric.toLowerCase().includes(search.toLowerCase()) ||
//     order.date.toLowerCase().includes(search.toLowerCase())
//   );

//   const searchSuggestions = [
//     ...new Set([
//       ...orders.map(o => o.customer),
//       ...orders.map(o => o.pillowType),
//       ...orders.map(o => o.status),
//       ...orders.map(o => o.fabric),
//     ]),
//     "Memory Foam", "Cotton", "Latex", "Gel", "Feather", "On the Way", "Processing", "Delivered", "Cancelled"
//   ];

//   return (
//     <div className="container mx-auto p-2">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//         <h1 className="text-[24px] font-dmSans font-semibold">Pillow Orders</h1>
//         <div className="w-full sm:w-80">
//           <SearchInput
//             placeholder="Search..."
//             value={search}
//             onChange={setSearch}
//             onSearch={() => {}}
//             onClear={() => setSearch("")}
//             suggestions={searchSuggestions}
//             onSuggestionClick={setSearch}
//             size="md"
//             debounceMs={300}
//             className="w-full"
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl">
//         <TableView
//           listTitle="Overview of All Pillow Orders"
//           columns={pillowOrdersColumns}
//           data={filteredOrders}
//           rowLink={(row) => `/admin/orders/${encodeURIComponent(row.orderNumber)}`}
//         />
//       </div>
//     </div>
//   );
// }
