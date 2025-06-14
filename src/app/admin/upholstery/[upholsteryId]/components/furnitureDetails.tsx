import Image from "next/image";

interface FurnitureOrder {
  furnitureImage: string;
  furnitureType: string;
  fabricSource: string;
  dimensions: string;
  leadTime: string;
  upholsteryFeatures: string;
  priorityQuote: string;
}

export default function FurnitureDetails({ order }: { order: FurnitureOrder }) {
  return (
    <div className="flex gap-12 font-poppins">
      <Image
        src={order.furnitureImage}
        alt="Furniture"
        width={256}
        height={256}
        className="w-72 h-72 rounded-2xl object-cover bg-slate-100"
      />
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 flex-1 text-[18px]">
        {[
          ["Furniture Type", order.furnitureType],
          ["Fabric Source", order.fabricSource],
          ["Dimensions", order.dimensions],
          ["Lead Time", order.leadTime],
          ["Upholstery Features", order.upholsteryFeatures],
          ["Priority Quote", order.priorityQuote],
        ].map(([label, value], idx) => (
          <div key={idx}>
            <div className="text-gray-400 ">{label}</div>
            <div className="py-3">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
