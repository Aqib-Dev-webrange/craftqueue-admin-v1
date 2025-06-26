import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  variant?: "single" | "dual";
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "Loading...",
  variant = "single",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const borderClasses = {
    sm: "border-2",
    md: "border-2",
    lg: "border-4",
  };

  // Use your brand's primary colors for the spinner
  const brandColors = [
    "#745535", // primary
    "#e7d9ca", // secondary
    "#7b5a38", // repeat for smooth gradient
    "#e7d9ca",
    "#745535",
  ];

  if (variant === "dual") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Dual Spinner Container */}
          <div className="relative flex items-center justify-center">
            {/* Outer spinner - Clockwise with gradient */}
            <div
              className={`animate-spin rounded-full ${sizeClasses[size]} ${borderClasses[size]} border-t-transparent border-r-transparent border-b-transparent border-l-transparent shadow-lg`}
              style={{
                borderTopColor: brandColors[0],
                borderRightColor: brandColors[1],
                borderBottomColor: brandColors[2],
                borderLeftColor: brandColors[3],
                borderStyle: "solid",
                borderWidth: size === "lg" ? "4px" : "2px",
                background: `conic-gradient(from 90deg at 50% 50%, ${brandColors.join(
                  ", "
                )})`,
              }}
            ></div>

            {/* Inner spinner - Anticlockwise with gradient */}
            <div
              className={`absolute rounded-full ${
                size === "sm"
                  ? "h-4 w-4"
                  : size === "md"
                  ? "h-8 w-8"
                  : "h-12 w-12"
              } ${
                size === "sm" ? "border" : "border-2"
              } border-t-transparent border-r-transparent border-b-transparent border-l-transparent shadow-md`}
              style={{
                animation: "spin 0.5s linear infinite reverse",
                borderTopColor: brandColors[1],
                borderRightColor: brandColors[2],
                borderBottomColor: brandColors[3],
                borderLeftColor: brandColors[0],
                borderStyle: "solid",
                borderWidth: size === "lg" ? "2px" : "1px",
                background: `conic-gradient(from 90deg at 50% 50%, ${brandColors
                  .slice()
                  .reverse()
                  .join(", ")})`,
              }}
            ></div>
          </div>
          <div className="text-[#745535] font-semibold animate-pulse">{message}</div>
        </div>
      </div>
    );
  }

  // Single spinner (gradient, shadow, pulse text)
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} ${borderClasses[size]} border-t-4 border-b-4 border-l-4 border-r-4 shadow-lg`}
          style={{
            borderTopColor: brandColors[0],
            borderRightColor: brandColors[1],
            borderBottomColor: brandColors[2],
            borderLeftColor: brandColors[3],
            borderStyle: "solid",
            borderWidth: size === "lg" ? "4px" : "2px",
            background: `conic-gradient(from 90deg at 50% 50%, ${brandColors.join(
              ", "
            )})`,
          }}
        ></div>
        <div className="text-[#745535] font-semibold animate-pulse">{message}</div>
      </div>
    </div>
  );
}