"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebarItem";
import { sidebarData } from "@/utils/data/sidebarData";
import Image from "next/image";
import { IMAGES } from "@/constants/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to find the most specific active item
  const getActiveItemIndex = () => {
    if (!isClient) return -1;

    // Find all matching items
    const matchingItems = sidebarData
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        if (item.type !== "item") return false;
        return pathname === item.link || pathname.startsWith(item.link + "/");
      })
      .sort((a, b) => b.item.link.length - a.item.link.length); // Sort by link length (most specific first)

    return matchingItems.length > 0 ? matchingItems[0].index : -1;
  };

  const activeItemIndex = getActiveItemIndex();

  // Prevent hydration mismatch by not rendering pathname-dependent content on server
  if (!isClient) {
    return (
      <>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-primary p-2 rounded"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar for desktop */}
        <aside className="hidden md:block absolute w-[300px] h-screen bg-primary text-white p-[25px] rounded-[20px] space-y-2">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={IMAGES.logo}
              alt="Logo"
              width={800}
              height={800}
              className="w-40 object-contain"
            />
          </div>
          {/* Sidebar Render - No active state on server */}
          {sidebarData.map((item, index) => {
            if (item.type === "item") {
              return (
                <SidebarItem
                  key={index}
                  label={item.label}
                  icon={item.icon}
                  active={false} // No active state on server
                  link={item.link}
                />
              );
            }
            return null;
          })}
        </aside>
      </>
    );
  }

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-[60] bg-primary p-2 rounded"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block absolute w-80 h-screen bg-primary text-white p-6 rounded-[20px] space-y-2">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={IMAGES.logo}
            alt="Logo"
            width={800}
            height={800}
            className="w-40 object-contain"
          />
        </div>
        {/* Sidebar Render */}
        {sidebarData.map((item, index) => {
          if (item.type === "item") {
            return (
              <SidebarItem
                key={index}
                label={item.label}
                icon={item.icon}
                active={index === activeItemIndex}
                link={item.link}
              />
            );
          }
          return null;
        })}
      </aside>

      {/* Sidebar Drawer for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-64 h-full bg-primary text-white p-6 rounded-r-[20px] space-y-2 z-50 animate-slide-in-left">
            <button
              className="absolute top-4 right-4"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <div className="flex justify-center mb-6">
              <Image
                src={IMAGES.logo}
                alt="Logo"
                width={800}
                height={800}
                className="w-32 object-contain"
              />
            </div>
            {sidebarData.map((item, index) => {
              if (item.type === "item") {
                return (
                  <SidebarItem
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    active={index === activeItemIndex}
                    link={item.link}
                    onClick={() => setMobileOpen(false)}
                  />
                );
              }
              return null;
            })}
          </aside>
        </div>
      )}
    </>
  );
}
