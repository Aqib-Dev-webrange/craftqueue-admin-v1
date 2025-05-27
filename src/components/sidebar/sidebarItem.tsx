// components/SidebarItem.jsx
"use client";
import Link from "next/link";
import React from "react";

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  link: string;
}
export default function SidebarItem({ label, icon, count, active, link, onClick }: SidebarItemProps) {
  return (
    <div>
      <Link
        href={link}
        className={`flex items-center justify-between text-sm px-4 py-2 rounded-lg cursor-pointer ${active ? "bg-white text-primary" : "hover:bg-white hover:text-primary"
          }`}
      onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="tracking-wider">{label}</span>
        </div>
        {count && <span className="text-xs">{count.toLocaleString()}</span>}
      </Link>
    </div>

  );
}
