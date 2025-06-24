"use client";
import { X, User, Package, Calendar, Palette, Hash } from "lucide-react";
import { FormattedPillowOrder } from "@/lib/supabase";

interface ViewPillowModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: FormattedPillowOrder;
}

export default function ViewPillowModal({ isOpen, onClose, order }: ViewPillowModalProps) {
  if (!isOpen) return null;

  // Helper function to get display value with fallback
  const getDisplayValue = (value: string | undefined | null): string => {
    return value && value !== "N/A" && value.trim() !== "" ? value : "Not specified";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Pillow Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Info */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">{order.customer}</h3>
              <p className="text-gray-600">Customer</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Order Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Order Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order Number</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(order.orderNumber)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pillow Type & Quantity</label>
                    <p className="text-gray-900 font-medium">{order.pillowType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order Date</label>
                    <p className="text-gray-900 font-medium">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fabric Type</label>
                    <p className="text-gray-900 font-medium">{order.fabric}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Details</h3>
              <div className="space-y-4">
                {/* Add more fields if available in FormattedPillowOrder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    {order.status}
                  </span>
                </div>

                {/* You can add more fields here if they exist in your FormattedPillowOrder type */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Order Summary</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Product:</strong> {order.pillowType}</p>
                    <p><strong>Material:</strong> {order.fabric}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}