"use client";
import { TableView } from "@/components/table/tableView";
import { IMAGES } from "@/constants/image";
import Image from "next/image";

// You can place this in a shared types file
export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface OrderRow {
  orderId: string;
  productImg: string;
  productName: string;
  sellerLogo: string;
  sellerName: string;
  customerImg: string;
  customerName: string;
  amount: string | number;
  profit: string | number;
  // Add other fields as needed
}

const columns: Column<OrderRow>[] = [
  { header: "Order id", accessor: "orderId", className: "font-bold" },
  {
    header: "Products",
    accessor: (row: OrderRow) => (
      <div className="flex items-center gap-2">
        <Image src={row.productImg} alt="" width={36} height={36} className="rounded-lg bg-gray-100" />
        <span>{row.productName}</span>
      </div>
    ),
  },
  {
    header: "Seller",
    accessor: (row: OrderRow) => (
      <div className="flex items-center gap-2">
        <Image src={row.sellerLogo} alt="" width={36} height={36} className="bg-white" />
        <span>{row.sellerName}</span>
      </div>
    ),
  },
  {
    header: "Customer",
    accessor: (row: OrderRow) => (
      <div className="flex items-center gap-2">
        <Image src={row.customerImg} alt="" width={36} height={36} className="rounded-full" />
        <span className="font-semibold">{row.customerName}</span>
      </div>
    ),
  },
  { header: "Amount", accessor: "amount" },
  { header: <>Profit <span className="text-xs text-gray-400">(16%)</span></>, accessor: "profit" },
  {
    header: "Order Status",
    accessor: () => (
      <span className="bg-pink-50 text-pink-500 px-3 py-1 rounded-lg font-semibold flex items-center gap-2 w-fit">
        <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
        Status
      </span>
    ),
  },
];

const data = [
  {
    orderId: "#6548",
    productImg: IMAGES.product,
    productName: "Sherpa Sleeve",
    sellerLogo: IMAGES.brand,
    sellerName: "Zara",
    customerImg: IMAGES.customer,
    customerName: "Frank Grimes",
    amount: "$654",
    profit: "$154",
    status: "Status",
  },
  {
    orderId: "#6549",
    productImg: IMAGES.product,
    productName: "Sherpa Sleeve",
    sellerLogo: IMAGES.brand,
    sellerName: "Zara",
    customerImg: IMAGES.customer,
    customerName: "Frank Grimes",
    amount: "$654",
    profit: "$154",
    status: "Status",
  },
  {
    orderId: "#6550",
    productImg: IMAGES.product,
    productName: "Sherpa Sleeve",
    sellerLogo: IMAGES.brand,
    sellerName: "Zara",
    customerImg: IMAGES.customer,
    customerName: "Frank Grimes",
    amount: "$654",
    profit: "$154",
    status: "Status",
  },
  {
    orderId: "#6551",
    productImg: IMAGES.product,
    productName: "Sherpa Sleeve",
    sellerLogo: IMAGES.brand,
    sellerName: "Zara",
    customerImg: IMAGES.customer,
    customerName: "Frank Grimes",
    amount: "$654",
    profit: "$154",
    status: "Status",
  },
  {
    orderId: "#6552",
    productImg: IMAGES.product,
    productName: "Sherpa Sleeve",
    sellerLogo: IMAGES.brand,
    sellerName: "Zara",
    customerImg: IMAGES.customer,
    customerName: "Frank Grimes",
    amount: "$654",
    profit: "$154",
    status: "Status",
  },
  // ...repeat or map your real data here
];
export default function Orders() {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4">
        <h1 className="text-3xl font-bold py-4">Order Details</h1>
        <TableView columns={columns} data={data} />
      </div>
    </div>
  );
}