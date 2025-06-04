"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Logout } from "../../../public/icons/icons";
import Link from "next/link";

interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

const getCurrentDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
};

const Header: React.FC<{ user: User }> = ({ user }) => {
  const firstName = user.name.split(" ")[0];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-4 py-2">
      {/* Left - Greeting (Hidden on mobile) */}
      <div className="hidden sm:block">
        <p className="text-sm text-gray-500">{getCurrentDate()}</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-1">Good Evening, {firstName}</h1>
      </div>

      {/* Mobile Greeting - Only first name */}
      <div className="block sm:hidden">
        <h1 className="text-lg font-bold">Hi, {firstName}!</h1>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 border rounded-xl p-2 sm:p-3 relative"
        style={{ borderWidth: 2, borderStyle: "dashed", borderColor: "#e5e7eb" }}
      >
        {/* Desktop version - Full info */}
        <div className="hidden sm:flex items-center gap-3">
          <Image
            src={user.avatarUrl}
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold leading-none text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Mobile version - Only avatar */}
        <div className="flex sm:hidden items-center">
          <Image
            src={user.avatarUrl}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        
        {/* Logout Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-400 hover:text-black transition p-1"
            aria-label="User menu"
          >
            <Logout/>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              
              {/* Menu Items */}
              <div className="py-1">
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  👤 Profile Settings
                </Link>
                <Link 
                  href="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  ⚙️ Account Settings
                </Link>
                <hr className="my-1 border-gray-100" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
