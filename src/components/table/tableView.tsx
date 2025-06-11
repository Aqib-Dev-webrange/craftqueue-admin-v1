"use client";
import React, { useState } from "react";
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
  /** Optional: Initial number of rows to show before "View More" */
  initialRowCount?: number;
  /** Optional: Custom "View More" button text */
  viewMoreText?: string;
  /** Optional: Custom "Show Less" button text */
  showLessText?: string;
}

export function TableView<T>({ 
  listTitle, 
  columns, 
  data, 
  rowLink, 
  initialRowCount = 5,
  viewMoreText = "View More",
  showLessText = "Show Less"
}: TableViewProps<T>) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  // Determine which data to display
  const displayData = showAll ? data : data.slice(0, initialRowCount);
  const hasMoreRows = data.length > initialRowCount;

  const handleRowClick = (row: T) => {
    if (rowLink) {
      router.push(rowLink(row));
    }
  };

  const getCellContent = (row: T, col: Column<T>) => {
    if (typeof col.accessor === "function") {
      return col.accessor(row);
    }
    
    // Type-safe property access, cast to React.ReactNode
    const value = row[col.accessor] as React.ReactNode;
    return value;
  };

  return (
    <div className="bg-white rounded-xl p-3 sm:p-6 border shadow-sm">
      <h1 className="font-poppins text-gray-800 mb-2 text-sm sm:text-[18px]">{listTitle}</h1>
      
      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="min-w-max px-3 sm:px-0">
          <table className="w-full min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="border-b">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`text-left py-2 sm:py-4 px-2 sm:px-4 text-gray-500 font-poppins text-[12px] tracking-[1.2] ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, i) => (
                <tr
                  key={i}
                  className={`last:border-b-0 hover:bg-gray-50 text-[13px] transition ${rowLink ? "cursor-pointer" : ""}`}
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
                    let cellContent = getCellContent(row, col);

                    // If a link function is provided, wrap the cell content in a Link
                    if (col.link) {
                      cellContent = (
                        <Link 
                          href={col.link(row)} 
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                          className="hover:underline"
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

      {/* View More/Show Less Button */}
      {hasMoreRows && (
        <div className="mt-4 text-center border-t pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 rounded-md font-medium hover:text-primary/80 transition-colors"
          >
            {showAll ? showLessText : viewMoreText}
          </button>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm sm:text-base">No data available</p>
        </div>
      )}
    </div>
  );
}