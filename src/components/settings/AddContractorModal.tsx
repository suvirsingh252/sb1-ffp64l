import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useContractorStore } from '../../store/contractors';
import { SERVICE_AREAS } from '../../lib/mockData';
import { SERVICES_OFFERED } from '../../types/team';
import { cn } from '../../lib/utils';

const contractorSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  servicesOffered: z.array(z.string()).min(1, 'At least one service is required'),
  areasServiced: z.array(z.string()).min(1, 'At least one service area is required'),
  isPreferred: z.boolean(),
});

type ContractorForm = z.infer<typeof contractorSchema>;

interface AddContractorModalProps {
  onClose: () => void;
}

export default function AddContractorModal({ onClose }: AddContractorModalProps) {
  const { addContractor } = useContractorStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContractorForm>({
    resolver: zodResolver(contractorSchema),
    defaultValues: {
      isPreferred: false,
    },
  });

  const onSubmit = async (data: ContractorForm) => {
    try {
      await addContractor({
        ...data,
        status: 'ACTIVE',
      });
      onClose();
    } catch (error) {
      console.error('Failed to add contractor:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add Contractor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                {...register('name')}
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.name && 'border-red-300'
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                {...register('contactPerson')}
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.contactPerson && 'border-red-300'
                )}
              />
              {errors.contactPerson && (
                <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.email && 'border-red-300'
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register('phone')}
                type="tel"
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.phone && 'border-red-300'
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Services Offered</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SERVICES_OFFERED.map((service) => (
                <label key={service} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('servicesOffered')}
                    value={service}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
            {errors.servicesOffered && (
              <p className="mt-1 text-sm text-red-600">{errors.servicesOffered.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Service Areas</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SERVICE_AREAS.map((area) => (
                <label key={area} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('areasServiced')}
                    value={area}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{area}</span>
                </label>
              ))}
            </div>
            {errors.areasServiced && (
              <p className="mt-1 text-sm text-red-600">{errors.areasServiced.message}</p>
            )}
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('isPreferred')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Preferred Contractor</span>
            </label>
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
              {isSubmitting ? 'Adding...' : 'Add Contractor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}