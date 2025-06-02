import { useState } from "react";

const ORDER_STATUSES = ["Pending", "On Route", "Deliverd"];

type OrderStatusDropdownProps = {
  status: string;
  onChange: (status: string) => void;
};

export default function OrderStatusDropdown({ status, onChange }: OrderStatusDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm flex items-center gap-1"
        onClick={() => setOpen((v) => !v)}
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
      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded shadow z-10 ">
          {ORDER_STATUSES.map((s) => (
            <div
              key={s}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                s === status ? " text-green-600" : ""
              }`}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
