"use client";
import { useState } from "react";
import SidebarItem from "./sidebarItem";
import SidebarSection from "./sidebarSection";
import { sidebarData } from "@/utils/data/sidebarData";
import Image from "next/image";

export default function Sidebar() {
  const [active, setActive] = useState("");
  const handleClick = (label: string) => setActive(label);

  return (
    <aside className="absolute w-80 h-full bg-primary text-white p-6   rounded-[20px] space-y-2">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
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
              active={active === item.label}
              link={item.link}
              onClick={() => handleClick(item.label)}
            />
          );
        }

        return null;
      })}
    </aside>
  );
}
