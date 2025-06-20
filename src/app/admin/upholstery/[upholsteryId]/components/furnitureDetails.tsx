"use client";
import { SupabaseImage } from "@/components/ui/SupabaseImage";
import { IMAGES } from "@/constants/image";

interface FurnitureOrder {
  furnitureImage: string;
  furnitureType: string;
  fabricSource: string;
  dimensions: string;
  leadTime: string;
  upholsteryFeatures: string;
  priorityQuote: string;
}

interface FurnitureDetailsProps {
  order: FurnitureOrder;
}

export default function FurnitureDetails({ order }: FurnitureDetailsProps) {
  // Helper function to get display value with fallback
  const getDisplayValue = (value: string | undefined | null): string => {
    return value && value !== "N/A" && value.trim() !== "" ? value : "Not specified";
  };

  // Function to format priority quote with styling
  const formatPriorityQuote = (priority: string) => {
    const isHighPriority = priority === "Yes" || priority === "true" ;
    return (
      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
        isHighPriority 
          ? 'bg-red-100 text-red-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {isHighPriority ? "High " : "Normal"}
      </span>
    );
  };

  const furnitureDetailsData = [
    ["Furniture Type", getDisplayValue(order.furnitureType)],
    ["Fabric Source", getDisplayValue(order.fabricSource)],
    ["Dimensions", getDisplayValue(order.dimensions)],
    ["Lead Time", getDisplayValue(order.leadTime)],
    ["Upholstery Features", getDisplayValue(order.upholsteryFeatures)],
    ["Priority Quote", null], // Special handling for priority
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 font-poppins">
      {/* Image Section */}
      <div className="w-full lg:w-72 h-72 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
        <SupabaseImage
          src={order.furnitureImage}
          alt={`${order.furnitureType || 'Furniture'} image`}
          width={288}
          height={288}
          fallback={IMAGES.furniture}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 flex-1 text-[18px]">
        {furnitureDetailsData.map(([label, value], idx) => (
          <div key={idx} className="min-h-[4rem]">
            <div className="text-gray-400 font-medium mb-2">{label}</div>
            <div className="py-2">
              {label === "Priority Quote" ? (
                formatPriorityQuote(order.priorityQuote)
              ) : value === "Not specified" ? (
                <span className="text-gray-500 italic">{value}</span>
              ) : (
                <span className="text-gray-900 break-words">{value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
