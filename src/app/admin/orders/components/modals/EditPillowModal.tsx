"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { FormattedPillowOrder } from "@/lib/supabase";

interface EditPillowModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: FormattedPillowOrder;
  onSave: (updatedOrder: FormattedPillowOrder) => void;
}

const statusOptions = [
  "Processing",
  "On the Way",
  "Delivered",
  "Cancelled",
  "Pending",
  "In Progress",
  "Completed"
];

const fabricOptions = [
  "Memory Foam",
  "Cotton",
  "Latex",
  "Gel",
  "Feather",
  "Down",
  "Polyester",
  "Bamboo",
  "Silk"
];

export default function EditPillowModal({ isOpen, onClose, order, onSave }: EditPillowModalProps) {
  const [formData, setFormData] = useState<FormattedPillowOrder>({
    orderNumber: "",
    customer: "",
    email: "",
    pillowType: "",
    status: "Processing",
    fabric: "",
    date: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when order changes
  useEffect(() => {
    if (order && isOpen) {
      setFormData({
        orderNumber: order.orderNumber || "",
        customer: order.customer || "",
        email: order.email || "",
        pillowType: order.pillowType || "",
        status: order.status || "Processing",
        fabric: order.fabric || "",
        date: order.date || "",
      });
      setErrors({});
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required";
    }
    if (!formData.pillowType.trim()) {
      newErrors.pillowType = "Pillow type is required";
    }
    if (!formData.fabric.trim()) {
      newErrors.fabric = "Fabric type is required";
    }
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSave(formData);
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: keyof FormattedPillowOrder, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: "" }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Pillow Order</h2>
          <button 
            onClick={handleClose} 
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Order Information</h3>
            
            {/* Order Number (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
              <input
                type="text"
                value={formData.orderNumber}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => handleChange("customer", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.customer ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter customer name"
              />
              {errors.customer && (
                <p className="text-red-500 text-xs mt-1">{errors.customer}</p>
              )}
            </div>

            {/* Pillow Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pillow Type & Quantity *</label>
              <input
                type="text"
                value={formData.pillowType}
                onChange={(e) => handleChange("pillowType", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.pillowType ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Memory Foam Pillow x 2"
              />
              {errors.pillowType && (
                <p className="text-red-500 text-xs mt-1">{errors.pillowType}</p>
              )}
            </div>

            {/* Order Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Product Details</h3>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Fabric Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Type *</label>
              <select
                value={formData.fabric}
                onChange={(e) => handleChange("fabric", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.fabric ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select fabric type</option>
                {fabricOptions.map((fabric) => (
                  <option key={fabric} value={fabric}>{fabric}</option>
                ))}
              </select>
              {errors.fabric && (
                <p className="text-red-500 text-xs mt-1">{errors.fabric}</p>
              )}
            </div>

            {/* Additional Info Box */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-900 mb-2">Order Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Customer:</strong> {formData.customer || "Not specified"}</p>
                <p><strong>Product:</strong> {formData.pillowType || "Not specified"}</p>
                <p><strong>Material:</strong> {formData.fabric || "Not specified"}</p>
                <p><strong>Status:</strong> {formData.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}