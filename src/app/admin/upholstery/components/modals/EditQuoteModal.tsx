"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";


interface UpholsteryQuote {
  id?: string;
  customer: string;
  furniture: string;
  status: string;
  priority: string | boolean;
  date: string;
  order_number?: string;
  // Add FurnitureOrder fields
  furnitureImage?: string;
  furnitureType?: string;
  fabricSource?: string;
  dimensions?: string;
  leadTime?: string;
  upholsteryFeatures?: string;
  priorityQuote?: string;
}

interface EditQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: UpholsteryQuote;
  onSave: (updatedQuote: UpholsteryQuote) => void;
}

const statusOptions = [
  "Pending",
  "In Progress", 
  "Completed",
  "Cancelled",
  "On Hold"
];

export default function EditQuoteModal({ isOpen, onClose, quote, onSave }: EditQuoteModalProps) {
  const [formData, setFormData] = useState<UpholsteryQuote>({
    id: "",
    customer: "",
    furniture: "",
    status: "Pending",
    priority: false,
    date: "",
    order_number: "",
    furnitureImage: "",
    furnitureType: "",
    fabricSource: "",
    dimensions: "",
    leadTime: "",
    upholsteryFeatures: "",
    priorityQuote: "No",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  // const [imagePreview, setImagePreview] = useState<string>("");

  // Initialize form data when quote changes
  useEffect(() => {
    if (quote && isOpen) {
      const isPriority = quote.priority === "yes" || quote.priority === true || quote.priority === "Yes";
      setFormData({
        id: quote.id || "",
        customer: quote.customer || "",
        furniture: quote.furniture || "",
        status: quote.status || "Pending",
        priority: isPriority,
        date: quote.date || "",
        order_number: quote.order_number || "",
        furnitureImage: quote.furnitureImage || "",
        furnitureType: quote.furnitureType || quote.furniture || "",
        fabricSource: quote.fabricSource || "",
        dimensions: quote.dimensions || "",
        leadTime: quote.leadTime || "",
        upholsteryFeatures: quote.upholsteryFeatures || "",
        priorityQuote: quote.priorityQuote || (isPriority ? "Yes" : "No"),
      });
      // setImagePreview(quote.furnitureImage || "");
      setErrors({});
    }
  }, [quote, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required";
    }
    if (!formData.furnitureType?.trim()) {
      newErrors.furnitureType = "Furniture type is required";
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
        const updatedQuote: UpholsteryQuote = {
          ...quote,
          ...formData,
          furniture: formData.furnitureType || formData.furniture,
          priority: formData.priority ? "yes" : "no",
          priorityQuote: formData.priority ? "Yes" : "No"
        };
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSave(updatedQuote);
      } catch (error) {
        console.error("Error saving quote:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: keyof UpholsteryQuote, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: "" }));
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const result = reader.result as string;
  //       setImagePreview(result);
  //       handleChange("furnitureImage", result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Quote Details</h2>
          <button 
            onClick={handleClose} 
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
            
            {/* Quote ID (Read-only) */}
            {formData.id && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote ID</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
            )}

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

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
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

            {/* Order Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
              <input
                type="text"
                value={formData.order_number}
                onChange={(e) => handleChange("order_number", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Optional order number"
              />
            </div>

            {/* Priority Quote */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="priority"
                checked={Boolean(formData.priority)}
                onChange={(e) => handleChange("priority", e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                Priority Quote
              </label>
            </div>
          </div>

          {/* Right Column - Furniture Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Furniture Details</h3>

            {/* Furniture Image */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furniture Image</label>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <SupabaseImage
                      src={imagePreview}
                      alt="Furniture preview"
                      width={300}
                      height={200}
                      fallback={IMAGES.furniture}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        handleChange("furnitureImage", "");
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">No image uploaded</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div> */}

            {/* Furniture Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Furniture Type *</label>
              <input
                type="text"
                value={formData.furnitureType}
                onChange={(e) => handleChange("furnitureType", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.furnitureType ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Sofa, Chair, Ottoman"
              />
              {errors.furnitureType && (
                <p className="text-red-500 text-xs mt-1">{errors.furnitureType}</p>
              )}
            </div>

            {/* Fabric Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Source</label>
              <input
                type="text"
                value={formData.fabricSource}
                onChange={(e) => handleChange("fabricSource", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., Customer provided, Store selection"
              />
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., 180cm x 90cm x 85cm"
              />
            </div>

            {/* Lead Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time</label>
              <input
                type="text"
                value={formData.leadTime}
                onChange={(e) => handleChange("leadTime", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., 2-3 weeks"
              />
            </div>

            {/* Upholstery Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upholstery Features</label>
              <textarea
                value={formData.upholsteryFeatures}
                onChange={(e) => handleChange("upholsteryFeatures", e.target.value)}
                disabled={isLoading}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., Button tufting, nail head trim, etc."
              />
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