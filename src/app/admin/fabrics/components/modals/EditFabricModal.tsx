"use client";
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { FabricOption } from "@/services/fibric";

interface EditFabricModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: FabricOption;
  onSave: (updatedFabric: FabricOption) => void;
}

const fabricTypes = [
  "Classic Fabrics",
  "Premium Fabrics",
  "Luxury Fabrics",
  "Cotton Blend",
  "Linen",
  "Velvet",
  "Leather",
  "Silk",
  "Polyester",
  "Wool",
  "Microfiber"
];

export default function EditFabricModal({ isOpen, onClose, fabric, onSave }: EditFabricModalProps) {
  const [formData, setFormData] = useState<FabricOption>({
    id: 0,
    option_name: "",
    fabric_type: "",
    image_url: "",
    markup_percentage: "0",
    isactive: true,
    created_at: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when fabric changes
  useEffect(() => {
    if (fabric && isOpen) {
      setFormData({
        id: fabric.id,
        option_name: fabric.option_name || "",
        fabric_type: fabric.fabric_type || "",
        image_url: fabric.image_url || "",
        markup_percentage: String(fabric.markup_percentage ?? "0"),
        isactive: fabric.isactive ?? true,
        created_at: fabric.created_at || ""
      });
      setErrors({});
    }
  }, [fabric, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.option_name.trim()) {
      newErrors.option_name = "Fabric name is required";
    }
    if (!formData.fabric_type.trim()) {
      newErrors.fabric_type = "Fabric type is required";
    }
    const markupValue = Number(formData.markup_percentage);
    if (markupValue < 0) {
      newErrors.markup_percentage = "Markup percentage cannot be negative";
    }
    if (markupValue > 1000) {
      newErrors.markup_percentage = "Markup percentage seems too high";
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
        console.error("Error saving fabric:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: keyof FabricOption, value: string | number | boolean) => {
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
          <h2 className="text-2xl font-semibold">Edit Fabric</h2>
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
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
            
            {/* Fabric ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric ID</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 font-mono text-sm"
              />
            </div>

            {/* Fabric Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Name *</label>
              <input
                type="text"
                value={formData.option_name}
                onChange={(e) => handleChange("option_name", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.option_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter fabric name"
              />
              {errors.option_name && (
                <p className="text-red-500 text-xs mt-1">{errors.option_name}</p>
              )}
            </div>

            {/* Fabric Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Type *</label>
              <select
                value={formData.fabric_type}
                onChange={(e) => handleChange("fabric_type", e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                  errors.fabric_type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select fabric type</option>
                {fabricTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.fabric_type && (
                <p className="text-red-500 text-xs mt-1">{errors.fabric_type}</p>
              )}
            </div>

            {/* Created Date (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <input
                type="text"
                value={new Date(formData.created_at).toLocaleDateString()}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Pricing & Status</h3>

            {/* Markup Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Markup Percentage *</label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.markup_percentage}
                  onChange={(e) => handleChange("markup_percentage", parseFloat(e.target.value) || 0)}
                  disabled={isLoading}
                  min="0"
                  max="1000"
                  step="0.1"
                  className={`w-full px-3 py-2 pr-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
                    errors.markup_percentage ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.0"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
              {errors.markup_percentage && (
                <p className="text-red-500 text-xs mt-1">{errors.markup_percentage}</p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isactive"
                checked={formData.isactive}
                onChange={(e) => handleChange("isactive", e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="isactive" className="text-sm font-medium text-gray-700">
                Active Status
              </label>
            </div>

            {/* Preview Box */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-900 mb-3">Preview</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{formData.option_name || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{formData.fabric_type || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Markup:</span>
                  <span className="font-medium">{formData.markup_percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${formData.isactive ? 'text-green-700' : 'text-red-700'}`}>
                    {formData.isactive ? 'Active' : 'Inactive'}
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