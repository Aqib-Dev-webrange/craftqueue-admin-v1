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
        return 'bg-[#3A2414]';
      case 'current':
        return 'bg-[#3A2414]';
      case 'pending':
      default:
        return 'bg-gray-400';
    }
  };

  const getLineColor = (currentIndex: number) => {
    const currentStep = steps[currentIndex];
    
    if (currentStep.status === 'completed') {
      return 'bg-primary';
    }
    return 'bg-gray-400';
  };

  return (
    <div className="w-full mb-8 px-6">

      <div className='flex items-center justify-between mb-4'>
        {steps.map((step) => (
          <div key={step.id} className={`font-dmSans  font-medium`}>
          
            {step.date && (
              <div className=" w-full text-[16px]">{step.date}</div>
            )}
            </div>
        ))}
      </div>
      {/* Visual Progress Line - Full Width */}
      <div className='w-full mx-auto flex items-center justify-between mb-4 pr-6'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className={`w-6 h-6 ${getStepColor(step.status)} rounded-full flex items-center justify-center z-10`}>
              {step.status === 'completed' && (
                // <Check className="w-2 h-2 text-white" />
                <div className='w-6 h-6'/>
              )}
            </div>
            
            {/* Connection Line - Full Width Between Steps */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[4px] ${getLineColor(index)} `} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels - Full Width */}
      <div className="flex items-center  justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center w-24 flex-">
            <div className={`text-xs md:text-sm lg:text-base font-medium text-nowrap`}>
              {step.title}
            </div>
            <span className='text-[12px] text-start text-gray-400'>{step.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
