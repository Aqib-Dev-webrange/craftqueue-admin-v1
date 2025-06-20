"use client";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface OrderStatusDropdownProps {
  status: string;
  onChange: (status: string) => void;
  disabled?: boolean;
}

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-800" },
  { value: "dispatched", label: "Dispatched", color: "bg-purple-100 text-purple-800" },
  { value: "en_route", label: "En Route", color: "bg-orange-100 text-orange-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
];

export default function OrderStatusDropdown({ status, onChange, disabled = false }: OrderStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentStatus = statusOptions.find((option) => option.value === status) || statusOptions[0];

  const handleStatusChange = (newStatus: string) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${currentStatus.color} ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80 hover:shadow-sm"
        }`}
      >
        <span>{currentStatus.label}</span>
        <RiArrowDropDownLine 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                option.value === status ? "bg-gray-100" : ""
              }`}
            >
              <span className={`px-2 py-1 rounded-md text-xs ${option.color}`}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
