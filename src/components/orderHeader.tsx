import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


type OrderHeaderProps = {
  status: string;
  setShowStatusDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showStatusDropdown: boolean;
  setStatus: (status: string) => void;
  ORDER_STATUSES: string[];
};

export default function OrderHeader({
  status,
  setShowStatusDropdown,
  showStatusDropdown,
  setStatus,
  ORDER_STATUSES,
}: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link
            href="/upholstery"
            className="mr-2 text-gray-500 hover:text-black"
          >
            <FaArrowLeft className="inline mr-1" />
          </Link>
          <span className="text-xl font-semibold">Order Details</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">
              Update Order Status
            </span>
            <div className="relative">
              <button
                className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
                onClick={() => setShowStatusDropdown((v) => !v)}
              >
                {status}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[140px]">
                  {ORDER_STATUSES.map((s) => (
                    <div
                      key={s}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        s === status ? "font-bold text-green-600" : ""
                      }`}
                      onClick={() => {
                        setStatus(s);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}