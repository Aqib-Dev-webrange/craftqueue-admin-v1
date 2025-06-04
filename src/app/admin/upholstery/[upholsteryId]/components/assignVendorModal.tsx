'use client';
import React, { useState } from 'react';

interface VendorModalProps {
  onClose: () => void;
  onAssign?: (vendorId: string) => void;
}

interface Vendor {
  id: string;
  name: string;
}

const vendors: Vendor[] = [
  { id: '', name: 'No Vendor' },
  { id: 'vendor-1', name: 'Vendor 1' },
  { id: 'vendor-2', name: 'Vendor 2' },
  { id: 'vendor-3', name: 'Premium Upholstery Co.' },
  { id: 'vendor-4', name: 'Classic Furniture Works' },
];

export default function VendorModal({ onClose, onAssign }: VendorModalProps) {
  const [selectedVendor, setSelectedVendor] = useState('');

  const handleAssign = () => {
    if (onAssign) {
      onAssign(selectedVendor);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl px-6 py-4 min-w-[400px] max-w-md w-full shadow-2xl relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-semibold text-lg text-gray-800">Assign Vendor to Order</h1>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="absolute left-0 top-12 h-[1px] bg-gray-200 w-full"/>

        {/* Vendor Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vendor
          </label>
          <div className='border border-gray-200 rounded-lg overflow-hidden p-2'>
<select 
            className="rounded-lg w-full  focus:outline-none "
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
