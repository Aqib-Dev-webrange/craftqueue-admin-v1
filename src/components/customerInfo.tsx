import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function CustomerInfo({ customer, onAssignVendor }: any) {
  return (
    <div className="flex items-center justify-between gap-4  ">
      <div className="flex items-center gap-4 py-4 ">
        <Image
          width={64}
          height={64}
          src={customer.avatar}
          alt={customer.name}
          className="w-16 h-16 rounded-full object-cover bg-slate-200"
        />
        <div>
          <div className="text-2xl font-bold">{customer.name}</div>
          <div className="flex items-center gap-4 text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <FaEnvelope /> {customer.email}
            </span>
            <span className="flex items-center gap-1">
              <FaPhone /> {customer.phone}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt /> {customer.address}
            </span>
          </div>
        </div>
      </div>
      <button
        className="bg-[#3a2415] text-white px-5 py-2 rounded-full font-semibold"
        onClick={onAssignVendor}
      >
        Assign Vendor
      </button>
    </div>
  );
}
