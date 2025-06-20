import React from 'react';

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  location?: string;
}

interface StepperProps {
  steps: Step[];
}

export default function Stepper({ steps }: StepperProps) {
  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'; // Green for completed
      case 'current':
        return 'bg-[#3A2414]'; // Brown for current/active
      case 'pending':
      default:
        return 'bg-gray-300'; // Light gray for pending
    }
  };

  const getLineColor = (currentIndex: number, nextIndex: number) => {
    const currentStep = steps[currentIndex];
    const nextStep = steps[nextIndex];
    
    // Line is active if current step is completed or current step is active
    if (currentStep.status === 'completed' || 
        (currentStep.status === 'current' && nextStep?.status !== 'pending')) {
      return 'bg-[#3A2414]'; // Active line color
    }
    return 'bg-gray-300'; // Inactive line color
  };

  // Helper function to format location
  const formatLocation = (location?: string) => {
    if (!location) return '';
    
    // Check if location already contains city and country format
    if (location.includes(',')) {
      // Split by comma and take last 2 parts (assuming city, country format)
      const parts = location.split(',').map(part => part.trim());
      if (parts.length >= 2) {
        const city = parts[parts.length - 2];
        const country = parts[parts.length - 1];
        return `${city}, ${country}`;
      }
    }
    
    // Default location mappings for common status locations
    const locationMap: { [key: string]: string } = {
      'warehouse': 'Los Angeles, USA',
      'processing_facility': 'San Francisco, USA',
      'dispatch_center': 'Chicago, USA',
      'in_transit': 'En Route',
      'delivery_hub': 'New York, USA',
      'delivered': 'Customer Location',
      'on the way to delivery address': 'En Route'
    };
    
    return locationMap[location.toLowerCase()] || location;
  };

  return (
    <div className="w-full mb-8">
      {/* Dates Row */}
      <div className='flex items-center justify-between mb-4'>
        {steps.map((step) => (
          <div key={step.id} className={`font-dmSans font-medium `}>
            {step.date && (
              <div className={`w-full text-[14px] `}>
                {step.date}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Visual Progress Line */}
      <div className='w-full mx-auto flex items-center justify-between mb-4'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className={`w-6 h-6 ${getStepColor(step.status)} rounded-full flex items-center justify-center z-10 relative `}>
              {step.status === 'completed' && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {/* {step.status === 'current' && (
                <div className='w-3 h-3 bg-white rounded-full animate-pulse'/>
              )}
              {step.status === 'pending' && (
                <div className='w-2 h-2 bg-gray-500 rounded-full'/>
              )} */}
            </div>
            
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[4px] ${getLineColor(index, index + 1)} transition-all duration-300`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels and Locations */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col ">
            {/* Step Title */}
            <div className={`text-xs md:text-sm lg:text-base font-medium mb-1 transition-colors duration-300 `}>
              {/* <span className="hidden sm:inline mr-1">{getLocationIcon(step.title, step.status)}</span> */}
              {step.title}
            </div>
            
            {/* Location */}
            {step.location && (
              <span className={`text-[10px] max-w-[80px] text-gray-400 leading-tight transition-colors duration-300`}>
                {formatLocation(step.location)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
