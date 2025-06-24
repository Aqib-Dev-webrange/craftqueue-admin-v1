"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { updateUpholsteryOrder, updateOrderStatus } from "@/services/upholsteryOrders";

interface UpholsteryQuote {
  id: number;
  order_number: string;
  user_name: string | null;
  user_email: string | null;
  created_at: string;
  is_priority: boolean;
  order_status: Array<{
    date: string;
    status: string;
    location: string;
    is_active: boolean;
    description: string | null;
  }>;
  furniture_images: string[];
  order_type: string;
  // Navigation properties
  furniture_type?: { type_name: string };
  upholstery_feature?: { feature_name: string };
  fabric_type?: { option_name: string; fabric_type: string };
  lead_time?: { time_range: string };
  furniture_size?: { size_name: string; dimensions: string };
  price?: { total: number; breakdown: unknown };
  address?: Record<string, unknown>;
}

interface EditQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: UpholsteryQuote;
  onSave: (updatedQuote: UpholsteryQuote) => Promise<void>;
}


export default function EditQuoteModal({ isOpen, onClose, quote, onSave }: EditQuoteModalProps) {
  const [formData, setFormData] = useState({
    id: 0,
    order_number: "",
    customer: "",
    status: "pending",
    priority: false,
    date: "",
    furniture_type: "",
    fabric_type: "",
    lead_time: "",
    dimensions: "",
    total: 0,
    statusDescription: "",
    statusLocation: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when quote changes
  useEffect(() => {
    if (quote && isOpen) {
      // Safely handle order_status array
      const orderStatusArray = quote.order_status && Array.isArray(quote.order_status) ? quote.order_status : [];
      const currentStatus = orderStatusArray.find(s => s.is_active)?.status || "pending";
      const currentStatusEntry = orderStatusArray.find(s => s.is_active);
      
      // Fix date parsing - handle different date formats
      let formattedDate = "";
      try {
        if (quote.created_at) {
          // Handle ISO string or timestamp
          const dateObj = new Date(quote.created_at);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toISOString().split('T')[0];
          }
        }
      } catch (error) {
        console.warn("Date parsing error:", error);
        formattedDate = new Date().toISOString().split('T')[0]; // fallback to today
      }
      
      setFormData({
        id: quote.id,
        order_number: quote.order_number,
        customer: quote.user_name || "Unknown Customer",
        status: currentStatus,
        priority: quote.is_priority,
        date: formattedDate,
        furniture_type: quote.furniture_type?.type_name || "",
        fabric_type: quote.fabric_type ? `${quote.fabric_type.option_name} (${quote.fabric_type.fabric_type})` : "",
        lead_time: quote.lead_time?.time_range || "",
        dimensions: quote.furniture_size?.dimensions || "",
        total: quote.price?.total || 0,
        statusDescription: currentStatusEntry?.description || "",
        statusLocation: currentStatusEntry?.location || ""
      });
      setErrors({});
    }
  }, [quote, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Starting save process with formData:', formData);
        
        // Check if status changed
        const currentStatus = quote.order_status?.find(s => s.is_active)?.status;
        const statusChanged = currentStatus !== formData.status;
        
        console.log('Status check:', { currentStatus, newStatus: formData.status, statusChanged });

        if (statusChanged) {
          // Update status using the status update function
          console.log('Updating status...');
          await updateOrderStatus(
            formData.id.toString(),
            formData.status,
            formData.statusLocation || "Admin Update",
            formData.statusDescription || `Status updated to ${formData.status}`
          );
        }
        
        // Always update priority (separate call for safety)
        console.log('Updating priority...');
        await updateUpholsteryOrder(formData.id.toString(), {
          is_priority: formData.priority
        });

        // Create updated quote object for parent component
        const updatedQuote: UpholsteryQuote = {
          ...quote,
          is_priority: formData.priority,
          order_status: statusChanged ? [
            ...quote.order_status,
            {
              date: new Date().toISOString(),
              status: formData.status,
              location: formData.statusLocation || "Admin Update",
              is_active: true,
              description: formData.statusDescription || `Status updated to ${formData.status}`
            }
          ] : quote.order_status
        };

        console.log('Calling onSave with updated quote:', updatedQuote);
        await onSave(updatedQuote);
        
      } catch (error) {
        console.error("Detailed error saving quote:", error);
        
        // More specific error message
        let errorMessage = "Failed to save changes. Please try again.";
        if (error instanceof Error) {
          errorMessage = `Save failed: ${error.message}`;
        }
        
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Order Details</h2>
          <button 
            onClick={handleClose} 
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Single column layout since you don't want status management */}
        <div className="space-y-6">
          {/* Order Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Order Information</h3>
            
            {/* Order Number (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
              <input
                type="text"
                value={formData.order_number}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 font-mono"
              />
            </div>

            {/* Customer Name (Read-only for existing orders) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={formData.customer}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            {/* Order Date (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
              <input
                type="date"
                value={formData.date}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            {/* Priority - The only editable field */}
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
                Priority Order
              </label>
            </div>

            {/* Current Status Display (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
              <input
                type="text"
                value={formData.status.charAt(0).toUpperCase() + formData.status.slice(1).replace('_', ' ')}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>

            {/* Furniture Details (Read-only) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Product Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Furniture Type:</span>
                  <span className="font-medium">{formData.furniture_type || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fabric:</span>
                  <span className="font-medium">{formData.fabric_type || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lead Time:</span>
                  <span className="font-medium">{formData.lead_time || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">{formData.dimensions || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">${formData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Status History (Read-only display) */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Status History</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {/* Add proper null checks and array validation */}
                {quote.order_status && Array.isArray(quote.order_status) && quote.order_status.length > 0 ? (
                  quote.order_status.map((status, index) => {
                    let displayDate = "Invalid Date";
                    try {
                      if (status.date) {
                        const statusDate = new Date(status.date);
                        if (!isNaN(statusDate.getTime())) {
                          displayDate = statusDate.toLocaleDateString();
                        }
                      }
                    } catch (error) {
                      console.warn("Status date parsing error:", error);
                      displayDate = "Invalid Date";
                    }

                    return (
                      <div key={index} className="text-sm border-l-2 border-blue-200 pl-3">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-blue-800 capitalize">
                            {status.status ? status.status.replace('_', ' ') : 'Unknown Status'}
                          </span>
                          <span className="text-blue-600 text-xs">
                            {displayDate}
                          </span>
                        </div>
                        {status.description && (
                          <p className="text-blue-700 text-xs mt-1">{status.description}</p>
                        )}
                        <p className="text-blue-600 text-xs">{status.location || "No location"}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-blue-600 text-sm">No status history available</p>
                )}
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