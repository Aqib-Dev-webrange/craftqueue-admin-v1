"use client";
import { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";

interface TrackerOrder {
  id?: string;
  customer: string;
  category: string;
  quote: string;
  progress: string;
  fabric: string;
  total: number;
  priority: boolean;
  date: string;
  orderNumber: string;
  rawData?: unknown;
}

interface DeleteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: TrackerOrder;
  onConfirm: () => void;
}

export default function DeleteTrackerModal({ isOpen, onClose, order, onConfirm }: DeleteTrackerModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-600">Delete Order</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-900 font-medium mb-2">
              Are you sure you want to delete this order from tracking?
            </p>
            <p className="text-gray-600 text-sm">
              This action cannot be undone. All tracking data for this order will be permanently removed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Order Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900 font-mono">{order.quote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium text-gray-900">{order.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900">{order.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fabric:</span>
                <span className="font-medium text-gray-900">{order.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-gray-900">{order.progress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <span className={`font-medium ${order.priority ? 'text-red-600' : 'text-gray-600'}`}>
                  {order.priority ? 'High Priority' : 'Normal'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">{order.date}</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium">Warning:</p>
                <p>Deleting this order will remove:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>All tracking history and progress updates</li>
                  <li>Order status and timeline information</li>
                  <li>Customer communication records</li>
                  <li>Financial and pricing data</li>
                </ul>
                <p className="mt-2 font-medium">Consider updating the status to &quot;Cancelled&quot; instead.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}