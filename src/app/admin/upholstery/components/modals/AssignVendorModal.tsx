"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface AssignVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: { customer: string; furniture: string };
  onAssign: (vendorId: string) => void;
}

const vendors = [
  { id: "1", name: "ABC Upholstery Services", rating: 4.8 },
  { id: "2", name: "Elite Furniture Repair", rating: 4.5 },
  { id: "3", name: "Custom Craft Solutions", rating: 4.9 },
  { id: "4", name: "Premium Upholstery Co.", rating: 4.6 },
];

export default function AssignVendorModal({ isOpen, onClose, quote, onAssign }: AssignVendorModalProps) {
  const [selectedVendor, setSelectedVendor] = useState("");

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedVendor) {
      onAssign(selectedVendor);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Vendor</h2>
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
              Quote: {quote.customer} - {quote.furniture}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vendor
            </label>
            <div className="space-y-2">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center">
                  <input
                    type="radio"
                    id={vendor.id}
                    name="vendor"
                    value={vendor.id}
                    checked={selectedVendor === vendor.id}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="mr-3"
                  />
                  <label htmlFor={vendor.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span>{vendor.name}</span>
                      <span className="text-sm text-yellow-600">⭐ {vendor.rating}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
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
            onClick={handleAssign}
            disabled={!selectedVendor}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Vendor
          </button>
        </div>
      </div>
    </div>
  );
}