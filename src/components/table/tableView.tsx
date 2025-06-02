"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  /** 
   * Optional: Provide a function that returns a URL string for navigation.
   * If set, the cell value will be wrapped in a <Link>.
   */
  link?: (row: T) => string;
}

interface TableViewProps<T> {
  listTitle: string;
  columns: Column<T>[];
  data: T[];
  /** Optional: Provide a function that returns a URL string for the whole row */
  rowLink?: (row: T) => string;
}

export function TableView<T>({ listTitle, columns, data, rowLink }: TableViewProps<T>) {
  const router = useRouter();

  const handleRowClick = (row: T) => {
    if (rowLink) {
      router.push(rowLink(row));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-6 border shadow-sm">
      <h1 className="font-semibold text-gray-500 mb-2 text-sm sm:text-base">{listTitle}</h1>
      
      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="min-w-max px-3 sm:px-0">
          <table className="w-full min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="border-b">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`text-left py-2 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-sm sm:text-lg whitespace-nowrap ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={`last:border-b-0 hover:bg-gray-50 transition ${rowLink ? "cursor-pointer" : ""}`}
                  style={{
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#e5e7eb",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "none",
                  }}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((col, j) => {
                    let cellContent =
                      typeof col.accessor === "function"
                        ? col.accessor(row)
                        : (row as any)[col.accessor];

                    // If a link function is provided, wrap the cell content in a Link
                    if (col.link) {
                      cellContent = (
                        <Link 
                          href={col.link(row)} 
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                        >
                          {cellContent}
                        </Link>
                      );
                    }

                    return (
                      <td key={j} className="py-2 sm:py-4 px-2 sm:px-4 align-middle text-sm sm:text-base whitespace-nowrap">
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm sm:text-base">No data available</p>
        </div>
      )}
    </div>
  );
}