"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Eye, Edit3, Trash2 } from "lucide-react";

interface ActionDropdownProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionDropdown({ 
  onView, 
  onEdit, 
  onDelete 
}: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <BsThreeDots className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8  bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px]">
          <div className="py-1">
            <button
              onClick={handleAction(onView)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={handleAction(onEdit)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleAction(onDelete)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}