import React from 'react';

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface StepperProps {
  steps: Step[];
}

export default function Stepper({ steps }: StepperProps) {
  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary';
      case 'current':
        return 'bg-primary';
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
    <div className="w-full mb-8">

      <div className='flex items-center justify-between mb-4'>
        {steps.map((step) => (
          <div key={step.id} className={`flex items-center `}>
          
            {step.date && (
              <div className="text-xs text-gray-500 ml-2">{step.date}</div>
            )}
            </div>
        ))}
      </div>
      {/* Visual Progress Line - Full Width */}
      <div className='w-[95%] mx-auto flex items-center justify-between mb-4 '>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className={`w-4 h-4 ${getStepColor(step.status)} rounded-full flex items-center justify-center z-10`}>
              {step.status === 'completed' && (
                // <Check className="w-2 h-2 text-white" />
                <div className='w-4 h-4'/>
              )}
            </div>
            
            {/* Connection Line - Full Width Between Steps */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] ${getLineColor(index)} `} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels - Full Width */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center w-24 flex-">
            <div className={`text-xs md:text-sm lg:text-base font-medium ${
              step.status === 'current' ? 'text-primary' : 
              step.status === 'completed' ? 'text-primary' : 'text-gray-600'
            }`}>
              {step.title}
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}
