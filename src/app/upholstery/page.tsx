"use client";
import { TableView } from "@/components/table/tableView";
import {
  upholsteryQuotes,
  upholsteryQuotesColumns,
} from "@/utils/data/furanitureData";

export default function UpholsteryPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-6">Upholstery Quotes</h2>
      <TableView
        listTitle="List of all submitted quotes"
        columns={upholsteryQuotesColumns}
        data={upholsteryQuotes}
      />
    </div>
  );
}
