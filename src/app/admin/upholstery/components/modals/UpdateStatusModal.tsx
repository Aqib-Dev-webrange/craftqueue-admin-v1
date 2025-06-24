"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Quote {
  customer: string;
  status: string;
  // Add other fields as needed
}

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote;
  onUpdate: (newStatus: string) => void;
}

const statusOptions = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
  "On Hold"
];

export default function UpdateStatusModal({ isOpen, onClose, quote, onUpdate }: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(quote?.status || "");

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(selectedStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Status</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer: {quote.customer}
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status: {quote.status}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}