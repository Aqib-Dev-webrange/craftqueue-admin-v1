import Image from "next/image";
import { TiLocation } from "react-icons/ti";

interface Order {
  furnitureImage: string;
  productName: string;
  quoteId: string;
  priority: boolean;
  quoteTotal: string;
  shipTo: string;
}

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl border p-6 mt-8 flex flex-col gap-4">
      {/* Shipping Information */}
      <div className="flex flex-col gap-2 text-gray-700 border-b pb-4 font-poppins">
        <div className="flex items-center gap-2">
          
          <span className="text-gray-500">Ship to</span>
        </div>

        <span className="flex"><TiLocation className="text-xl" />{order.shipTo}</span>
      </div>
      
      {/* Order Details */}
      <div className="flex items-center gap-4 mt-2 font-dmSans">
        <Image
          src={order.furnitureImage}
          alt={`${order.productName} furniture`}
          width={200}
          height={200}
          className="w-16 h-16 rounded-lg object-cover border"
        />
        
        <div className="flex-1">
          <div className="font-semibold text-lg">{order.productName}</div>
          <div className="text-gray-500 text-sm">
            Order ID <span className="font-semibold">{order.quoteId}</span>
          </div>
          <div className="text-gray-500 text-sm flex items-center gap-2">
            Priority
            {order.priority ? (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold ml-1">
                Yes
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs ml-1">
                No
              </span>
            )}
          </div>
        </div>
        
        <div className="text-right font-dmSans">
          <div className="text-gray-400 text-sm">Quote Total</div>
          <div className="text-2xl ">{order.quoteTotal}</div>
        </div>
      </div>
    </div>
  );
}