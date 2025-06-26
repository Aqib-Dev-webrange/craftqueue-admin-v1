"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Logout } from "../../../public/icons/icons";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { IMAGES } from "@/constants/image";
import { useRouter } from "next/navigation";

const getCurrentDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
};

const Header: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role: string; avatarUrl: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Fetch user from Supabase on mount
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          name: data.user.user_metadata?.fullName || data.user.email || "User",
          role: data.user.user_metadata?.isAdmin == true ? "Admin" : "User",
          avatarUrl: data.user.user_metadata?.avatar_url || IMAGES.avatar,
        });
      } else {
        router.push("/auth/login");
      }
    }
    fetchUser();
  }, [router]);

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

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    setShowDropdown(false);
    setTimeout(() => router.push("/auth/login"), 300);
  }
};

  if (!user) {
    return (
      <div className="flex justify-end items-center px-4 py-2">
        <span className="text-gray-500">Loading user...</span>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex justify-between items-center px-4 sm:px-4 ">
      {/* Left - Greeting (Hidden on mobile) */}
      <div className="hidden sm:block ">
        <p className="text-sm text-gray-800">{getCurrentDate()}</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl mt-2">Good Evening, {firstName}</h1>
      </div>

      {/* Mobile Greeting - Only first name */}
      <div className="block sm:hidden">
        <h1 className="text-lg font-bold">Hi, {firstName}!</h1>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center gap-8 border rounded-xl m-1 sm:p-3 relative"
        style={{ borderWidth: 2, borderStyle: "dashed", borderColor: "#e5e7eb" }}
      >
        {/* Desktop version - Full info */}
        <div className="hidden sm:flex items-center gap-4">
          <Image
            src={user.avatarUrl}
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
          />
          <div className="flex flex-col gap-2">
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
            <div className="absolute right-0 top-full mt-2 w-36 sm:w-40 bg-white rounded-xl font-d shadow-sm border py-2 z-50">
              <div className="py-1">
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile Settings
                </Link>
                <Link 
                  href="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Account Settings
                </Link>
                <hr className="my-1 border-gray-100" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                >
                  Sign Out
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
