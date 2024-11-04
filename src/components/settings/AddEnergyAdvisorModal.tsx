import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useAdvisorStore } from '../../store/advisors';
import { SERVICE_AREAS, PROGRAMS } from '../../lib/mockData';
import { cn } from '../../lib/utils';

const advisorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  programsTrainedIn: z.array(z.string()).min(1, 'At least one program is required'),
  totalContractUnits: z.number().min(1, 'Contract units must be greater than 0'),
  preferredDays: z.array(z.string()).min(1, 'At least one preferred day is required'),
  certificationLevel: z.enum(['JUNIOR', 'INTERMEDIATE', 'SENIOR']),
});

type AdvisorForm = z.infer<typeof advisorSchema>;

interface AddEnergyAdvisorModalProps {
  onClose: () => void;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
] as const;

export default function AddEnergyAdvisorModal({ onClose }: AddEnergyAdvisorModalProps) {
  const { addAdvisor } = useAdvisorStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdvisorForm>({
    resolver: zodResolver(advisorSchema),
  });

  const onSubmit = async (data: AdvisorForm) => {
    try {
      await addAdvisor({
        ...data,
        id: String(Date.now()),
        status: 'ACTIVE',
        maxAuditsPerDay: 3,
        averageAuditDuration: 120,
      });
      onClose();
    } catch (error) {
      console.error('Failed to add advisor:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add Energy Advisor</h2>
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
              <label className="block text-sm font-medium text-gray-700">Name</label>
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
              <label className="block text-sm font-medium text-gray-700">
                Certification Level
              </label>
              <select
                {...register('certificationLevel')}
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.certificationLevel && 'border-red-300'
                )}
              >
                <option value="JUNIOR">Junior</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="SENIOR">Senior</option>
              </select>
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
            <label className="block text-sm font-medium text-gray-700">Service Areas</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SERVICE_AREAS.map((area) => (
                <label key={area} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('serviceAreas')}
                    value={area}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{area}</span>
                </label>
              ))}
            </div>
            {errors.serviceAreas && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceAreas.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Programs</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {PROGRAMS.map((program) => (
                <label key={program} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('programsTrainedIn')}
                    value={program}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{program}</span>
                </label>
              ))}
            </div>
            {errors.programsTrainedIn && (
              <p className="mt-1 text-sm text-red-600">{errors.programsTrainedIn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Field Days</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredDays')}
                    value={day}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
            {errors.preferredDays && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredDays.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Yearly Target Units
            </label>
            <input
              {...register('totalContractUnits', { valueAsNumber: true })}
              type="number"
              min="1"
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.totalContractUnits && 'border-red-300'
              )}
            />
            {errors.totalContractUnits && (
              <p className="mt-1 text-sm text-red-600">{errors.totalContractUnits.message}</p>
            )}
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
              {isSubmitting ? 'Adding...' : 'Add Energy Advisor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}