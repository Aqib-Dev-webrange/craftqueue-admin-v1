import { FaMapPin } from "react-icons/fa";
import Stepper from "./stepper";

export default function OrdersTrack({ order, steps }: any) {
  return (
    <div className="pt-6">
      <div className="flex gap-8 items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Order Dispatched</span>
          <span className="text-gray-400 text-lg">Order ID #ADI-1254512</span>
        </div>
        <img
          src={order.furnitureImage}
          alt="Furniture"
          className="w-12 h-12 rounded-lg bg-slate-100"
        />
      </div>

      <Stepper steps={steps} />

      <div className="bg-white rounded-2xl border p-6 mt-8 flex flex-col gap-4 ">
        <div className="flex flex-col  gap-2 text-gray-700 border-b pb-4">
          <div className="flex items-center gap-2">
            <FaMapPin className="text-lg" />
            <span className="font-semibold">Ship to</span>
          </div>

          <span className="ml-2">{order.shipTo}</span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <img
            src={order.furnitureImage}
            alt=""
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="font-semibold text-lg">{order.productName}</div>
            <div className="text-gray-500 text-sm">
              Order ID <span className="font-semibold">{order.quoteId}</span>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-2">
              Priority
              {order.priority && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold ml-1">
                  Yes
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
