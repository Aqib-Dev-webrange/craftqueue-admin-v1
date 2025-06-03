import { FaMapPin } from "react-icons/fa";
import Stepper from "./stepper";
import Image from "next/image";

interface Order {
  furnitureImage: string;
  productName: string;
  quoteId: string;
  priority: boolean;
  quoteTotal: string;
  shipTo: string;
}

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface OrdersTrackProps {
  order: Order;
  steps: Step[];
}

export default function OrdersTrack({ order, steps }: OrdersTrackProps) {
  // Validate steps data
  const validSteps = steps.filter(step => 
    step && typeof step.id !== 'undefined' && step.title
  );

  return (
    <div className="pt-6">
      <div className="flex gap-8 items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Order Dispatched</span>
          <span className="text-gray-400 text-lg">Order ID #{order.quoteId}</span>
        </div>
        <Image
          src={order.furnitureImage}
          alt="Furniture"
          width={400}
          height={400}
          className="w-12 h-12 rounded-lg bg-slate-100 object-cover"
        />
      </div>

      {/* Only render Stepper if we have valid steps */}
      {validSteps.length > 0 && <Stepper steps={validSteps} />}

      <div className="bg-white rounded-2xl border p-6 mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-gray-700 border-b pb-4">
          <div className="flex items-center gap-2">
            <FaMapPin className="text-lg text-primary" />
            <span className="font-semibold">Ship to</span>
          </div>
          <span className="ml-2">{order.shipTo}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
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
                  High
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs ml-1">
                  Normal
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Quote Total</div>
            <div className="text-2xl font-bold">{order.quoteTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
