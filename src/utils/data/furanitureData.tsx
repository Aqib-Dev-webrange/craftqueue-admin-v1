import ActionDropdown from "@/app/admin/components/actionDropdown";
import { Column } from "@/components/table/tableView";

export const upholsteryQuotes = [
  {
    customer: "Emily R.",
    furniture: "Sofa",
    status: "In Transit",
    priority: "Yes",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    furniture: "Chair",
    status: "In Transit",
    priority: "Yes",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    furniture: "Table",
    status: "In Transit",
    priority: "Yes",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    furniture: "Bed Frame",
    status: "In Transit",
    priority: "Yes",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    furniture: "Ottoman",
    status: "In Transit",
    priority: "Yes",
    date: "05/05/2025",
  },
];

export const pillowOrders = [
  {
    customer: "Emily R.",
    pillowType: "Memory Foam",
    status: "In Transit",
    fabric: "Cotton Blend",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    pillowType: "Feather Down",
    status: "In Transit",
    fabric: "Linen",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    pillowType: "Gel Infused",
    status: "In Transit",
    fabric: "Velvet",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    pillowType: "Latex",
    status: "In Transit",
    fabric: "Microfiber",
    date: "05/05/2025",
  },
  {
    customer: "Emily R.",
    pillowType: "Buckwheat",
    status: "In Transit",
    fabric: "Bamboo Fabric",
    date: "05/05/2025",
  },
];

export const fabricManagement = [
  {
    identifier: "Satin Fabric",
    type: "COM",
    status: "In Transit",
    tracking: "12345678901",
  },
  {
    identifier: "Cotton Fabric",
    type: "COM",
    status: "In Transit",
    tracking: "12345678901",
  },
  {
    identifier: "Linen Fabric",
    type: "COM",
    status: "In Transit",
    tracking: "12345678901",
  },
  {
    identifier: "Wool Fabric",
    type: "COM",
    status: "In Transit",
    tracking: "12345678901",
  },
  {
    identifier: "Polyester Fabric",
    type: "COM",
    status: "In Transit",
    tracking: "12345678901",
  },
];

export const bookings = [
  {
    client: "Emily R.",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  },
  {
    client: "Emily R.",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  },
  {
    client: "Emily R.",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  },
  {
    client: "Emily R.",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  },
  {
    client: "Emily R.",
    type: "Consultation",
    datetime: "05/05 - 05:45 PM",
  },
];

// COLUMS

export const pillowOrdersColumns: Column<{
  customer: string;
  pillowType: string;
  status: string;
  fabric: string;
  date: string;
}>[] = [
  {
    header: "Customer Name",
    accessor: "customer",
    // link: (row) => `/admin/pillows/${encodeURIComponent(row.customer)}`,
  },
  {
    header: "Pillow Type & Qty",
    accessor: "pillowType",
    // link: (row) => `/admin/pillows/${encodeURIComponent(row.pillowType)}`,
  },
  {
    header: "Status",
    accessor: (row) => (
      <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
        {row.status}
      </span>
    ),
  },
  { header: "Fabric Type", accessor: "fabric" },
  { header: "Order Date", accessor: "date" },
  {
    header: "Actions",
    accessor: (row) => (
      <ActionDropdown
        onEdit={() => handleEditPillow(row)}
        onClear={() => handleClearPillow(row)}
      />
    ),
  },
];

export const fabricManagementColumns: Column<{
  identifier: string;
  type: string;
  status: string;
  tracking: string;
}>[] = [
  {
    header: "Fabric Identifier",
    accessor: "identifier",
    // link: (row) => `/admin/fabrics/${encodeURIComponent(row.identifier)}`,
  },
  { header: "Type (COM/Process)", accessor: "type" },
  {
    header: "Status",
    accessor: (row) => (
      <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
        {row.status}
      </span>
    ),
  },
  { header: "Tracking Number", accessor: "tracking" },
  {
    header: "Actions",
    accessor: (row) => (
      <ActionDropdown
        onEdit={() => handleEditFabric(row)}
        onClear={() => handleClearFabric(row)}
      />
    ),
  },
];

export const bookingsColumns: Column<{
  client: string;
  type: string;
  datetime: string;
}>[] = [
  {
    header: "Client Name",
    accessor: "client",
    // link: (row) => `/admin/bookings/${encodeURIComponent(row.client)}`,
  },
  { header: "Booking Type", accessor: "type" },
  { header: "Date/Time", accessor: "datetime" },
  {
    header: "Actions",
    accessor: (row) => (
      <ActionDropdown
        onEdit={() => handleEditBooking(row)}
        onClear={() => handleClearBooking(row)}
      />
    ),
  },
];

export const upholsteryQuotesColumns: Column<typeof upholsteryQuotes[0]>[] = [
  {
    header: "Customer Name",
    accessor: "customer",
    // link: (row) => `/admin/upholstrey/${encodeURIComponent(row.customer)}`,
  },
  { header: "Furniture Type", accessor: "furniture" },
  {
    header: "Status",
    accessor: (row) => (
      <span className="bg-orange-100 text-[#FF8800] px-2 py-1 rounded text-xs font-semibold">
        {row.status}
      </span>
    ),
  },
  { header: "Priority Quote", accessor: "priority" },
  { header: "Date", accessor: "date" },
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

// Handler functions (add these to your component that uses the tables)
const handleEdit = (row: typeof upholsteryQuotes[0]) => {
  console.log("Edit upholstery quote:", row);
  // Add edit logic here
};

const handleClear = (row: typeof upholsteryQuotes[0]) => {
  console.log("Clear upholstery quote:", row);
  // Add clear logic here
};
const handleEditPillow = (row: typeof pillowOrders[0]) => {
  console.log("Edit pillow order:", row);
  // Add edit logic here
};
const handleClearPillow = (row: typeof pillowOrders[0]) => {
  console.log("Clear pillow order:", row);
  // Add clear logic here
};

const handleEditFabric = (row: typeof fabricManagement[0]) => {
  console.log("Edit fabric management:", row);
  // Add edit logic here
};

const handleClearFabric = (row: typeof fabricManagement[0]) => {
  console.log("Clear fabric management:", row);
  // Add clear logic here
};

const handleEditBooking = (row: typeof bookings[0]) => {
  console.log("Edit booking:", row);
  // Add edit logic here
};

const handleClearBooking = (row: typeof bookings[0]) => {
  console.log("Clear booking:", row);
  // Add clear logic here
};
