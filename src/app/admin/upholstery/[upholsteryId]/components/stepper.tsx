import React from 'react';

interface Step {
  id: number;
  title: string;
  is_active: boolean;
  date?: string;
  location?: string;
}

interface StepperProps {
  steps: Step[];
}

export default function Stepper({ steps }: StepperProps) {
  // Find the current active index
  const activeIndex = steps.findIndex((step) => step.is_active);

  const getStepStatus = (index: number) => {
    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "current";
    return "pending";
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#3A2414]";
      case "current":
        return "bg-[#3A2414]";
      default:
        return "bg-gray-300";
    }
  };

  const getLineColor = (index: number) => {
    return index < activeIndex ? "bg-[#3A2414]" : "bg-gray-300";
  };

  const formatLocation = (location?: string) => {
    if (!location) return "";

    if (location.includes(",")) {
      const parts = location.split(",").map((p) => p.trim());
      if (parts.length >= 2) {
        const city = parts[parts.length - 2];
        const country = parts[parts.length - 1];
        return `${city}, ${country}`;
      }
    }

    const map: { [key: string]: string } = {
      warehouse: "Los Angeles, USA",
      processing_facility: "San Francisco, USA",
      dispatch_center: "Chicago, USA",
      in_transit: "En Route",
      delivery_hub: "New York, USA",
      delivered: "Customer Location",
      "on the way to delivery address": "En Route",
    };

    return map[location.toLowerCase()] || location;
  };

  return (
    <div className="w-full mb-8">
      {/* Dates Row */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step) => (
          <div key={step.id} className="font-dmSans font-medium text-[14px]">
            {step.date && new Date(step.date).toLocaleDateString()}
          </div>
        ))}
      </div>

      {/* Step Dots + Lines */}
      <div className="flex items-center justify-between mb-4 w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <React.Fragment key={step.id}>
              {/* Step dot */}
              <div
                className={`w-6 h-6 ${getStepColor(status)} rounded-full flex items-center justify-center z-10`}
              >
                {/* {status === "completed" && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )} */}
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-[4px] ${getLineColor(index)} transition-all duration-300`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Labels & Locations */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col text-center items-center max-w-[80px]">
            <div className="text-xs md:text-sm font-medium mb-1">{step.title}</div>
            {step.location && (
              <span className="text-[10px] text-gray-400 leading-tight">
                {formatLocation(step.location)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
