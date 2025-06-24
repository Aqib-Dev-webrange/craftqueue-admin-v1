"use client";
import { X, Palette, Tag, Percent, Calendar, Eye, EyeOff } from "lucide-react";
import { FabricOption } from "@/services/fibric";

interface ViewFabricModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: FabricOption;
}

export default function ViewFabricModal({ isOpen, onClose, fabric }: ViewFabricModalProps) {
  if (!isOpen) return null;

  // Helper function to get display value with fallback
  const getDisplayValue = (value: string | number | undefined | null): string => {
    if (value === null || value === undefined || value === "") {
      return "Not specified";
    }
    return value.toString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Fabric Details</h2>
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
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">{fabric.option_name}</h3>
              <p className="text-gray-600">{fabric.fabric_type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {fabric.isactive ? (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <Eye className="w-4 h-4" />
                Active
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <EyeOff className="w-4 h-4" />
                Inactive
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fabric Name</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(fabric.option_name)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fabric Type</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(fabric.fabric_type)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Percent className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Markup Percentage</label>
                    <p className="text-gray-900 font-medium">{fabric.markup_percentage}%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created Date</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(fabric.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Status & Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    fabric.isactive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {fabric.isactive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fabric ID</label>
                  <p className="text-gray-900 font-medium font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                    {fabric.id}
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-blue-900 mb-3">Fabric Summary</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{fabric.option_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{fabric.fabric_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Markup:</span>
                      <span className="font-medium">{fabric.markup_percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${fabric.isactive ? 'text-green-700' : 'text-red-700'}`}>
                        {fabric.isactive ? 'Active' : 'Inactive'}
                      </span>
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