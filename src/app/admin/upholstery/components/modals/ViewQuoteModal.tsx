"use client";
import { X, User, Flag } from "lucide-react";
import { SupabaseImage } from "@/components/ui/SupabaseImage";
import { IMAGES } from "@/constants/image";

interface UpholsteryQuote {
  id?: string;
  customer: string;
  furniture: string;
  status: string;
  priority: string | boolean;
  date: string;
  order_number?: string;
  furnitureImage?: string;
  furnitureType?: string;
  fabricSource?: string;
  dimensions?: string;
  leadTime?: string;
  upholsteryFeatures?: string;
  priorityQuote?: string;
}

interface ViewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: UpholsteryQuote;
}

export default function ViewQuoteModal({ isOpen, onClose, quote }: ViewQuoteModalProps) {
  if (!isOpen) return null;

  const isPriority = quote.priority === "yes" || quote.priority === true || quote.priority === "Yes";
  
  // Helper function to get display value with fallback
  const getDisplayValue = (value: string | undefined | null): string => {
    return value && value !== "N/A" && value.trim() !== "" ? value : "Not specified";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Quote Details</h2>
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
              <h3 className=" text-xl">{quote.customer}</h3>
              <p className="text-gray-600">Customer</p>
            </div>
          </div>
          {isPriority && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              <Flag className="w-4 h-4" />
              Priority Quote
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {/* <Package className="w-5 h-5 text-gray-500 mt-1" /> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Furniture Type</label>
                    <p className="text-gray-900 font-medium">{getDisplayValue(quote.furnitureType || quote.furniture)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {/* <Calendar className="w-5 h-5 text-gray-500 mt-1" /> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-gray-900 font-medium">{quote.date}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    {quote.status}
                  </span>
                </div>

                {quote.order_number && (
                  <div className="flex items-start gap-3">
                    {/* <Hash className="w-5 h-5 text-gray-500 mt-1" /> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Number</label>
                      <p className="text-gray-900 font-medium">{quote.order_number}</p>
                    </div>
                  </div>
                )}

                {quote.id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quote ID</label>
                    <p className="text-gray-900 font-medium">{quote.id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Furniture Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg  text-gray-900 mb-4 border-b pb-2">Furniture Details</h3>
              
              {/* Furniture Image */}
              {quote.furnitureImage && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furniture Image</label>
                  <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                    <SupabaseImage
                      src={quote.furnitureImage}
                      alt={`${quote.furnitureType || 'Furniture'} image`}
                      width={400}
                      height={256}
                      fallback={IMAGES.furniture}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {/* <Palette className="w-5 h-5 text-gray-500 mt-1" /> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fabric Source</label>
                    <p className={`font-medium ${getDisplayValue(quote.fabricSource) === 'Not specified' ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                      {getDisplayValue(quote.fabricSource)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {/* <Ruler className="w-5 h-5 text-gray-500 mt-1" /> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                    <p className={`font-medium ${getDisplayValue(quote.dimensions) === 'Not specified' ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                      {getDisplayValue(quote.dimensions)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {/* <Clock className="w-5 h-5 text-gray-500 mt-1" /> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lead Time</label>
                    <p className={`font-medium ${getDisplayValue(quote.leadTime) === 'Not specified' ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                      {getDisplayValue(quote.leadTime)}
                    </p>
                  </div>
                </div>

                {quote.upholsteryFeatures && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upholstery Features</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className={`text-sm ${getDisplayValue(quote.upholsteryFeatures) === 'Not specified' ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                        {getDisplayValue(quote.upholsteryFeatures)}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isPriority 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isPriority ? "High Priority" : "Normal Priority"}
                  </span>
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