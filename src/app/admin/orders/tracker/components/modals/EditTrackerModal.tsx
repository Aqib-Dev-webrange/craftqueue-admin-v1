"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { TrackerOrder, EditTrackerModalProps } from "../../types/TrackerOrder";

const progressOptions = [
  "Pending",
  "Processing",
  "On Route", 
  "Completed",
  "Cancelled",
  "On Hold"
];

const categoryOptions = [
  "Pillow",
  "Cushion",
  "Upholstery",
  "Custom Order",
  "Fabric Sample"
];

const fabricOptions = [
  "Cotton",
  "Linen", 
  "Velvet",
  "Leather",
  "Silk",
  "Polyester",
  "Wool",
  "Memory Foam",
  "Down",
  "Feather"
];

export default function EditTrackerModal({ isOpen, onClose, order, onSave }: EditTrackerModalProps) {
  const [formData, setFormData] = useState<TrackerOrder>({
    id: "",
    customer: "",
    category: "",
    quote: "",
    progress: "Pending",
    fabric: "",
    total: 0,
    priority: false,
    date: "",
    orderNumber: "",
    rawData: undefined
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when order changes
  useEffect(() => {
    if (order && isOpen) {
      setFormData({
        id: order.id || "",
        customer: order.customer || "",
        category: order.category || "",
        quote: order.quote || "",
        progress: order.progress || "Pending",
        fabric: order.fabric || "",
        total: order.total || 0,
        priority: order.priority || false,
        date: order.date || "",
        orderNumber: order.orderNumber || order.quote || "",
        rawData: order.rawData
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
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    if (!formData.fabric.trim()) {
      newErrors.fabric = "Fabric type is required";
    }
    if (formData.total < 0) {
      newErrors.total = "Total amount cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Call the onSave function passed from parent
        await onSave(formData);
      } catch (error) {
        console.error("Error saving order:", error);
        alert("Failed to save order. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: keyof TrackerOrder, value: string | number | boolean) => {
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
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Order Tracking</h2>
          <button 
            onClick={handleClose} 
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Order Information</h3>
            
            {/* Quote ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote Identifier</label>
              <input
                type="text"
                value={formData.quote}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 font-mono"
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
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

            {/* Order Date (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
              <input
                type="text"
                value={formData.date}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {/* Right Column - Status & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Status & Pricing</h3>

            {/* Progress Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Progress Status</label>
              <select
                value={formData.progress}
                onChange={(e) => handleChange("progress", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              >
                {progressOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Total Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.total}
                  onChange={(e) => handleChange("total", parseFloat(e.target.value) || 0)}
                  disabled={isLoading}
                  min="0"
                  step="0.01"
                  className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                    errors.total ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.total && (
                <p className="text-red-500 text-xs mt-1">{errors.total}</p>
              )}
            </div>

            {/* Priority */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="priority"
                checked={formData.priority}
                onChange={(e) => handleChange("priority", e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                High Priority Order
              </label>
            </div>

            {/* Preview Box */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-900 mb-3">Order Preview</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-medium">{formData.customer || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{formData.category || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fabric:</span>
                  <span className="font-medium">{formData.fabric || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium">{formData.progress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">${formData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority:</span>
                  <span className={`font-medium ${formData.priority ? 'text-red-700' : 'text-gray-700'}`}>
                    {formData.priority ? 'High' : 'Normal'}
                  </span>
                </div>
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