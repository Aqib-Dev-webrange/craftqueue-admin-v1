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
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step.status === 'completed' ? 'bg-green-500 text-white' :
            step.status === 'current' ? 'bg-primary text-white' :
            'bg-gray-300 text-gray-600'
          }`}>
            {step.status === 'completed' ? '✓' : step.id}
          </div>
          <div className="ml-2">
            <div className={`text-sm font-medium ${
              step.status === 'current' ? 'text-primary' : 'text-gray-600'
            }`}>
              {step.title}
            </div>
            {step.date && (
              <div className="text-xs text-gray-500">{step.date}</div>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`h-px bg-gray-300 flex-1 mx-4 ${
              step.status === 'completed' ? 'bg-green-500' : ''
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
