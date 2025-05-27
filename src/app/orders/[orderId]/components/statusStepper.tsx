"use client";
// components/OrderStatusStepper.tsx
import React from "react";
import { PackagePlus, PackageCheck, Truck, MapPin} from "lucide-react";
import { Check } from "../../../../../public/icons/icons";

const steps = [
  { label: "Processing", icon: PackagePlus, color: "bg-yellow-400", completed: true },
  { label: "Shipped", icon: PackageCheck, color: "bg-indigo-700", completed: true },
  { label: "Out For Delivery", icon: Truck, color: "bg-gray-300", completed: false },
  { label: "Delivered", icon: MapPin, color: "bg-gray-300", completed: false },
];

export default function OrderStatusStepper({ currentStep = 2 }) {
  return (
    <div className="flex items-center w-full my-8">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        // Determine step state
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        return (
          <React.Fragment key={step.label}>
            {idx > 0 && (
              <div
                className={`flex-1 h-[2px] -mx-2 ${
                  idx <= currentStep ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            )}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full
                  ${isCompleted ? step.color : isCurrent ? "border-4 border-indigo-700 bg-white" : "bg-gray-300"}
                  ${isCurrent ? "shadow-lg" : ""}
                `}
              >
                <Icon className={`w-8 h-8 ${isCompleted ? "text-white" : isCurrent ? "text-indigo-700" : "text-white"}`} />
              </div>
              <div className={`mt-2 font-semibold text-lg text-center ${isCurrent ? "text-indigo-700" : ""}`}>
                {step.label}
              </div>
              <div className="">
                <Check
                  className={`  ${
                    isCompleted
                    ? "text-green-600"
                      : isCurrent
                      ? "text-indigo-700"
                      : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}