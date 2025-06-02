import Image from "next/image";

export default function FurnitureDetails({ order }: any) {
  return (
    <div className="flex gap-12">
      <Image
        src={order.furnitureImage}
        alt="Furniture"
        width={256}
        height={256}
        className="w-64 h-64 rounded-2xl object-cover bg-slate-100"
      />
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 flex-1">
        {[
          ["Furniture Type", order.furnitureType],
          ["Fabric Source", order.fabricSource],
          ["Dimensions", order.dimensions],
          ["Lead Time", order.leadTime],
          ["Upholstery Features", order.upholsteryFeatures],
          ["Priority Quote", order.priorityQuote],
        ].map(([label, value], idx) => (
          <div key={idx}>
            <div className="text-gray-400 font-semibold">{label}</div>
            <div className="font-bold text-lg">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
