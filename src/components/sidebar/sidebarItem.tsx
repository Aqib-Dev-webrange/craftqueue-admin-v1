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
    <div className="group">
      <Link
        href={link}
        className={`
          flex items-center justify-between text-[16px] px-4 py-3 rounded-xl cursor-pointer
          transition-all duration-300 ease-in-out relative overflow-hidden
          before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left 
          before:transition-transform before:duration-300 before:rounded-lg
          hover:before:scale-x-100 
          ${active 
            ? "bg-white text-primary shadow-lg before:scale-x-100" 
            : "hover:bg-white hover:text-primary hover:shadow-md"
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 relative z-10">
          {/* Icon with bounce animation */}
          <div className={`
            transition-all duration-300 ease-in-out
          `}>
            {icon}
          </div>
          
          {/* Label with typing effect */}
          <span className="tracking-wider font-medium py-1 relative overflow-hidden">
            <span className={`
              inline-block transition-all duration-500 ease-in-out
              ${active 
                ? "translate-y-0" 
                : "group-hover:translate-y-0 translate-y-1"
              }
            `}>
              {label}
            </span>
          </span>
        </div>

        {/* Count with pulse animation */}
        {count && (
          <span className={`
            text-[16px] px-2 py-1 rounded-full bg-current bg-opacity-20 
            transition-all duration-300 ease-in-out relative z-10
            ${active 
              ? "animate-pulse scale-110" 
              : "group-hover:animate-pulse group-hover:scale-110"
            }
          `}>
            {count.toLocaleString()}
          </span>
        )}
      </Link>
    </div>
  );
}
