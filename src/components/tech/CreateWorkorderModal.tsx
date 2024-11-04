import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Contractor } from '../../types/team';

const workorderSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  contractorId: z.string().min(1, 'Contractor is required'),
  quoteId: z.string().min(1, 'Quote is required'),
  description: z.string().min(1, 'Description is required'),
  totalAmount: z.number().min(0, 'Amount must be greater than 0'),
  notes: z.string().optional(),
});

type WorkorderForm = z.infer<typeof workorderSchema>;

interface CreateWorkorderModalProps {
  onClose: () => void;
  onSubmit: (data: WorkorderForm) => void;
  contractors: Contractor[];
}

export default function CreateWorkorderModal({
  onClose,
  onSubmit,
  contractors
}: CreateWorkorderModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkorderForm>({
    resolver: zodResolver(workorderSchema),
  });

  const handleFormSubmit = async (data: WorkorderForm) => {
    try {
      onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Failed to create work order:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Create Work Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contractor
            </label>
            <select
              {...register('contractorId')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.contractorId && 'border-red-300'
              )}
            >
              <option value="">Select a contractor</option>
              {contractors.map((contractor) => (
                <option key={contractor.id} value={contractor.id}>
                  {contractor.name}
                </option>
              ))}
            </select>
            {errors.contractorId && (
              <p className="mt-1 text-sm text-red-600">{errors.contractorId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.description && 'border-red-300'
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                {...register('totalAmount', { valueAsNumber: true })}
                className={cn(
                  'block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                  errors.totalAmount && 'border-red-300'
                )}
              />
            </div>
            {errors.totalAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.totalAmount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any additional notes or instructions..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium text-white',
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {isSubmitting ? 'Creating...' : 'Create Work Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}