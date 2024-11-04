import { useState } from 'react';
import { X } from 'lucide-react';
import { Program, AVAILABLE_STEPS } from '../../types/program';
import { useProgramStore } from '../../store/programs';
import { cn } from '../../lib/utils';

interface ProgramStepsModalProps {
  program: Program;
  onClose: () => void;
}

export default function ProgramStepsModal({ program, onClose }: ProgramStepsModalProps) {
  const { updateProgramSteps } = useProgramStore();
  const [selectedSteps, setSelectedSteps] = useState<string[]>(
    program.steps.map(step => step.id)
  );

  const handleStepToggle = (stepId: string) => {
    if (AVAILABLE_STEPS.find(step => step.id === stepId)?.required) {
      return; // Can't toggle required steps
    }

    setSelectedSteps(current =>
      current.includes(stepId)
        ? current.filter(id => id !== stepId)
        : [...current, stepId]
    );
  };

  const handleSave = () => {
    // Always include required steps
    const requiredStepIds = AVAILABLE_STEPS.filter(step => step.required).map(step => step.id);
    const allSteps = [...new Set([...requiredStepIds, ...selectedSteps])];
    
    updateProgramSteps(program.id, allSteps);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Configure Program Steps</h2>
            <p className="mt-1 text-sm text-gray-500">Select which steps to include in {program.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_STEPS.map((step) => (
              <div
                key={step.id}
                className={cn(
                  'p-4 rounded-lg border',
                  selectedSteps.includes(step.id) ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                )}
              >
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedSteps.includes(step.id)}
                    onChange={() => handleStepToggle(step.id)}
                    disabled={step.required}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-900">{step.name}</span>
                      {step.required && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 whitespace-nowrap">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{step.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}