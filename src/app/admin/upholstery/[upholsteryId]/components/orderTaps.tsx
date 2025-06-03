'use client';
import React from 'react';

type TabType = "furniture" | "orderTrack";

interface TabsProps {
  current: TabType;
  onChange: (tab: TabType) => void;
}

export default function Tabs({ current, onChange }: TabsProps) {
  const tabs = [
    { id: "furniture" as const, label: "Furniture Details", icon: "🪑" },
    { id: "orderTrack" as const, label: "Order Tracking", icon: "📦" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
              ${current === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}