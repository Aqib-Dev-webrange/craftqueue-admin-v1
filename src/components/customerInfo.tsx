import Image from "next/image";
import { ICONS } from "@/constants/icon";
import { SupabaseImage } from "./ui/SupabaseImage";
import { IMAGES } from "@/constants/image";

type CustomerInfoProps = {
  customer: {
    avatar: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  onAssignVendor: () => void;
};

export default function CustomerInfo({ customer, onAssignVendor }: CustomerInfoProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 py-4">
        <SupabaseImage
          src={customer.avatar || IMAGES.avatar}
          alt={`${customer.name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
          width={64}
          height={64}
          fill={false}
          priority
        />
        <div className="font-inter">
          <div className="text-2xl font-semibold tracking-tight">{customer.name}</div>
          <div className="flex items-center gap-4 text-gray-500 mt-1 text-[16px]">
            <span className="flex items-center gap-2">
              <Image
                src={ICONS.mail}
                alt="Email"
                width={16}
                height={16}
                className="w-6 h-6"
              />
              <span className="tracking-normal ">{customer.email}</span>
            </span>
            {/* <span className="flex items-center gap-2">
              <Image
                src={ICONS.phone}
                alt="Phone"
                width={16}
                height={16}
                className="w-6 h-6"
              />
              <span className="tracking-normal">{customer.phone}</span>
            </span> */}
            <span className="flex items-center gap-2">
              <Image
                src={ICONS.user}
                alt="Phone"
                width={16}
                height={16}
                className="w-6 h-6"
              />
              <span className="tracking-normal">{customer.address}</span>
            </span>
          </div>
        </div>
      </div>
      <button
        className="bg-[#3a2415] text-white px-6 py-3 font-inter rounded-full font-medium tracking-wide hover:bg-primary/90 transition-colors"
        onClick={onAssignVendor}
      >
        Assign Vendor
      </button>
    </div>
  );
}
