interface LoadingSpinnerProps {
  message?: string;
  variant?: "single" | "dual";
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ 
  message = "Loading...", 
  variant = "single",
  size = "md" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16", 
    lg: "h-24 w-24"
  };

  const borderClasses = {
    sm: "border-2",
    md: "border-2",
    lg: "border-4"
  };

  if (variant === "dual") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Dual Spinner Container */}
          <div className="relative flex items-center justify-center">
            {/* Outer spinner - Clockwise */}
            <div 
              className={`animate-spin rounded-full ${sizeClasses[size]} ${borderClasses[size]} border-t-primary border-r-primary border-b-transparent border-l-transparent`}
            ></div>
            
            {/* Inner spinner - Anticlockwise with inline styles */}
            <div 
              className={`absolute rounded-full ${
                size === 'sm' ? 'h-4 w-4' : 
                size === 'md' ? 'h-8 w-8' : 'h-12 w-12'
              } ${
                size === 'sm' ? 'border' : 'border-2'
              } border-t-primary border-r-primary border-b-transparent border-l-transparent`}
              style={{
                animation: 'spin 0.5s linear infinite reverse'
              }}
            ></div>
          </div>
          
          <div className="text-gray-500">{message}</div>
        </div>
      </div>
    );
  }

  // Single spinner (original)
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} ${borderClasses[size]} border-t-primary border-r-transparent border-b-transparent border-l-transparent`}></div>
        <div className="text-gray-500">{message}</div>
      </div>
    </div>
  );
}