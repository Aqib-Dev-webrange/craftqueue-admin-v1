import OrderCard from "@/app/admin/orders/tracker/[trackerId]/components/orderCard";
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
  location?: string;
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
        <div className="flex flex-col gap-2 font-poppins">
          <span className="text-[24px] font-medium">Order Dispatched</span>
          <span className="font-[16px] text-opacity-40 text-lg">Order ID {order.quoteId}</span>
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

      

      {/* Order Summary Card Component */}
      <OrderCard order={order} />
    </div>
  );
}
