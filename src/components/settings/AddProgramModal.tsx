import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, FileSpreadsheet, FormInput } from 'lucide-react';
import { cn } from '../../lib/utils';

const programSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  abbreviation: z.string().min(1, 'Abbreviation is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  dataCollection: z.enum(['CSV', 'EXCEL', 'CUSTOM_FORM']),
  isActive: z.boolean().default(true),
  steps: z.array(z.string()).min(1, 'At least one step is required'),
});

type ProgramForm = z.infer<typeof programSchema>;

interface AddProgramModalProps {
  onClose: () => void;
  onAdd?: (data: ProgramForm) => Promise<void>;
}

const PROGRAM_STEPS = [
  'Initial Booking',
  'Initial Audit',
  'Technical Review',
  'Quote Generation',
  'Work Orders',
  'Final Audit'
];

export default function AddProgramModal({ onClose, onAdd }: AddProgramModalProps) {
  const [step, setStep] = useState<'details' | 'collection'>('details');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProgramForm>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      isActive: true,
      dataCollection: 'CUSTOM_FORM',
    },
  });

  const dataCollection = watch('dataCollection');

  const onSubmit = async (data: ProgramForm) => {
    try {
      if (onAdd) {
        await onAdd(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to add program:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
          <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-lg z-10">
            <div>
              <h2 className="text-xl font-semibold">Add New Program</h2>
              <p className="mt-1 text-sm text-gray-500">Configure program details and data collection</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Program Name</label>
                  <input
                    {...register('name')}
                    className={cn(
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500',
                      errors.name && 'border-red-300'
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Abbreviation</label>
                  <input
                    {...register('abbreviation')}
                    className={cn(
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500',
                      errors.abbreviation && 'border-red-300'
                    )}
                  />
                  {errors.abbreviation && (
                    <p className="mt-1 text-sm text-red-600">{errors.abbreviation.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    {...register('startDate')}
                    className={cn(
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500',
                      errors.startDate && 'border-red-300'
                    )}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    {...register('endDate')}
                    className={cn(
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500',
                      errors.endDate && 'border-red-300'
                    )}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Collection Method</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      {...register('dataCollection')}
                      value="CSV"
                      className="sr-only"
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="flex items-center text-sm font-medium text-gray-900">
                          <Upload className="h-5 w-5 mr-2" />
                          CSV Import
                        </span>
                        <span className="mt-1 text-xs text-gray-500">Upload CSV template</span>
                      </span>
                    </span>
                  </label>

                  <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      {...register('dataCollection')}
                      value="EXCEL"
                      className="sr-only"
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="flex items-center text-sm font-medium text-gray-900">
                          <FileSpreadsheet className="h-5 w-5 mr-2" />
                          Excel Import
                        </span>
                        <span className="mt-1 text-xs text-gray-500">Upload Excel template</span>
                      </span>
                    </span>
                  </label>

                  <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      {...register('dataCollection')}
                      value="CUSTOM_FORM"
                      className="sr-only"
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="flex items-center text-sm font-medium text-gray-900">
                          <FormInput className="h-5 w-5 mr-2" />
                          Custom Form
                        </span>
                        <span className="mt-1 text-xs text-gray-500">Create custom form</span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program Steps</label>
                <div className="grid grid-cols-2 gap-4">
                  {PROGRAM_STEPS.map((step) => (
                    <label key={step} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        {...register('steps')}
                        value={step}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{step}</span>
                    </label>
                  ))}
                </div>
                {errors.steps && (
                  <p className="mt-1 text-sm text-red-600">{errors.steps.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Program is active
                </label>
              </div>
            </form>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t sticky bottom-0 bg-white rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium text-white',
                isSubmitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              )}
            >
              {isSubmitting ? 'Adding...' : 'Add Program'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}