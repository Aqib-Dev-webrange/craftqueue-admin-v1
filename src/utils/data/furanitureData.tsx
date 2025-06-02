import { BsThreeDots } from "react-icons/bs";
import { Column } from "@/components/table/tableView"; // adjust the import path if needed

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
    link: (row) => `/admin/pillows/${encodeURIComponent(row.customer)}`,
  },
  {
    header: "Pillow Type & Qty",
    accessor: "pillowType",
    link: (row) => `/admin/pillows/${encodeURIComponent(row.pillowType)}`,
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
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
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
    link: (row) => `/admin/fabrics/${encodeURIComponent(row.identifier)}`,
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
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
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
    link: (row) => `/admin/bookings/${encodeURIComponent(row.client)}`,
  },
  { header: "Booking Type", accessor: "type" },
  { header: "Date/Time", accessor: "datetime" },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    ),
  },
];

export const upholsteryQuotesColumns: Column<typeof upholsteryQuotes[0]>[] = [
  {
    header: "Customer Name",
    accessor: "customer",
    link: (row) => `/admin/upholstrey/${encodeURIComponent(row.customer)}`,
  },
  { header: "Furniture Type", accessor: "furniture" },
  {
    header: "Status",
    accessor: (row) => (
      <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
        {row.status}
      </span>
    ),
  },
  { header: "Priority Quote", accessor: "priority" },
  { header: "Date", accessor: "date" },
  {
    header: "Actions",
    accessor: () => (
      <button className="p-1 rounded hover:bg-gray-100">
        <BsThreeDots className="text-gray-400" />
      </button>
    ),
  },
];
