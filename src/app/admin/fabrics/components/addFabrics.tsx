"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface AddFabricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fabricData: FabricFormData) => void;
  loading?: boolean;
}

interface FabricFormData {
  fabric_type: string;
  option_name: string;
  image_url: string;
  markup_percentage: number;
  isactive: boolean;
}

type FabricFormErrors = Partial<Record<keyof FabricFormData, string>>;

export default function AddFabricModal({ isOpen, onClose, onSubmit, loading = false }: AddFabricModalProps) {
  const [formData, setFormData] = useState<FabricFormData>({
    fabric_type: "Classic Fabrics",
    option_name: "",
    image_url: "",
    markup_percentage: 0,
    isactive: true
  });

  const [errors, setErrors] = useState<FabricFormErrors>({});

  const handleInputChange = (field: keyof FabricFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FabricFormData, string>> = {};
    
    if (!formData.option_name.trim()) newErrors.option_name = "Fabric name is required";
    if (!formData.image_url.trim()) newErrors.image_url = "Image URL is required";
    if (formData.markup_percentage < 0) newErrors.markup_percentage = "Markup percentage cannot be negative";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      fabric_type: "Classic Fabrics",
      option_name: "",
      image_url: "",
      markup_percentage: 0,
      isactive: true
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl text-gray-900">Add New Fabric</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Fabric Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fabric Type *
              </label>
              <select
                value={formData.fabric_type}
                onChange={(e) => handleInputChange("fabric_type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="Classic Fabrics">Classic Fabrics</option>
                <option value="Premium Fabrics">Premium Fabrics</option>
                <option value="Luxury Fabrics">Luxury Fabrics</option>
              </select>
            </div>

            {/* Option Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fabric Name *
              </label>
              <input
                type="text"
                value={formData.option_name}
                onChange={(e) => handleInputChange("option_name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.option_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter fabric name (e.g., Cotton Blend, Velvet)"
                disabled={loading}
              />
              {errors.option_name && <p className="text-red-500 text-xs mt-1">{errors.option_name}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.image_url ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/images/fabric.jpg"
                disabled={loading}
              />
              {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
            </div>

            {/* Markup Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Markup Percentage *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.markup_percentage}
                onChange={(e) => handleInputChange("markup_percentage", parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.markup_percentage ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter markup percentage (e.g., 15.00)"
                disabled={loading}
              />
              {errors.markup_percentage && <p className="text-red-500 text-xs mt-1">{errors.markup_percentage}</p>}
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isactive"
                checked={formData.isactive}
                onChange={(e) => handleInputChange("isactive", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="isactive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Fabric"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}