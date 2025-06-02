import React from 'react';

export default function Stepper() {
  // Example: 7 steps with top and bottom text and active logic
  const steps = [
    { top: "April 12, 2020", bottom: "Quote Submitted", active: true },
    { top: "April 13, 2020", bottom: "Fabric Confirmed", active: true },
    { top: "April 14, 2020", bottom: "Fabric Received", active: true },
    { top: "April 14, 2020", bottom: "In Production", active: false },
    { top: "April 14, 2020", bottom: "Finishing", active: false },
    { top: "April 14, 2020", bottom: "Ready for Delivery", active: false },
    { top: "April 15, 2020", bottom: "Delivered", active: false },
  ];

  // Find the last active step index
  const lastActiveIdx = steps.map(s => s.active).lastIndexOf(true);

  return (
    <div className="flex items-center w-full">
      {steps.map((step, idx) => {
        const isActive = idx <= lastActiveIdx;
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center min-w-0 flex-shrink-0">
              {/* Top text */}
              <div className="mb-2 text-sm font-medium text-black text-center whitespace-nowrap">
                {step.top}
              </div>
              {/* Step circle */}
              <div className={`w-4 h-4 rounded-full ${isActive ? "bg-[#3a2415]" : "bg-gray-300"}`} />
              {/* Bottom text */}
              <div className="mt-2 text-sm font-semibold text-center text-black whitespace-nowrap">
                {step.bottom}
              </div>
            </div>
            {/* Line, except after last step */}
            {idx !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 min-w-[100px] max-w-[120px] z-10 ${
                  step.active && steps[idx + 1].active ? "bg-[#3a2415]" : "bg-slate-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
