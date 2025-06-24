"use client";
import { X, User, Package, Hash, Palette, DollarSign, Calendar, Flag, BarChart3 } from "lucide-react";

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

interface ViewTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: TrackerOrder;
}

export default function ViewTrackerModal({ isOpen, onClose, order }: ViewTrackerModalProps) {
  if (!isOpen) return null;

  // Helper function to get display value with fallback
  const getDisplayValue = (value: string | number | undefined | null): string => {
    if (value === null || value === undefined || value === "") {
      return "Not specified";
    }
    return value.toString();
  };

  // Get progress color
  const getProgressColor = (progress: string) => {
    const progressColors = {
      "pending": "bg-yellow-100 text-yellow-800",
      "processing": "bg-blue-100 text-blue-800",
      "completed": "bg-green-100 text-green-800",
      "cancelled": "bg-red-100 text-red-800",
      "on route": "bg-purple-100 text-purple-800",
    };
    return progressColors[progress.toLowerCase() as keyof typeof progressColors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Order Tracking Details</h2>
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
              <p className="text-gray-600">Order #{order.quote}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {order.priority && (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <Flag className="w-4 h-4" />
                Priority
              </div>
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(order.progress)}`}>
              <BarChart3 className="w-4 h-4 mr-1" />
              {order.progress}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Order Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quote Identifier</label>
                    <p className="text-gray-900 font-medium font-mono">{order.quote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(order.category)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fabric Type</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(order.fabric)}</p>
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
                  <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <p className="text-gray-900 font-medium text-lg">
                      ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Status */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Progress & Status</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getProgressColor(order.progress)}`}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {order.progress}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    order.priority 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <Flag className="w-4 h-4 mr-2" />
                    {order.priority ? 'High Priority' : 'Normal Priority'}
                  </div>
                </div>

                {/* Progress Timeline Visual */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Progress Timeline</h4>
                  <div className="space-y-2">
                    {['Pending', 'Processing', 'On Route', 'Completed'].map((status) => {
                      const isActive = status.toLowerCase() === order.progress.toLowerCase();
                      const isPassed = ['pending', 'processing', 'on route'].indexOf(order.progress.toLowerCase()) > 
                                      ['pending', 'processing', 'on route'].indexOf(status.toLowerCase());
                      
                      return (
                        <div key={status} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            isActive ? 'bg-blue-500' :
                            isPassed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span className={`text-sm ${
                            isActive ? 'font-medium text-blue-700' :
                            isPassed ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3">Order Summary</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <div className="flex justify-between">
                      <span>Customer:</span>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Product:</span>
                      <span className="font-medium">{order.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fabric:</span>
                      <span className="font-medium">{order.fabric}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium">{order.progress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
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