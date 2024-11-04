import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const techTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  certificationLevel: z.enum(['JUNIOR', 'INTERMEDIATE', 'SENIOR']),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

type TechTeamForm = z.infer<typeof techTeamSchema>;

interface AddTechTeamModalProps {
  onClose: () => void;
  onAdd: (data: TechTeamForm) => void;
}

const SPECIALIZATIONS = [
  'HVAC Systems',
  'Building Envelope',
  'Renewable Energy',
  'Energy Modeling',
  'Retrofit Planning',
  'Code Compliance'
];

export default function AddTechTeamModal({ onClose, onAdd }: AddTechTeamModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TechTeamForm>({
    resolver: zodResolver(techTeamSchema),
    defaultValues: {
      status: 'ACTIVE',
    },
  });

  const onSubmit = async (data: TechTeamForm) => {
    try {
      onAdd(data);
      onClose();
    } catch (error) {
      console.error('Failed to add tech team member:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add Tech Team Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.title && 'border-red-300'
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

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
            {errors.certificationLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.certificationLevel.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specializations
            </label>
            <div className="mt-2 space-y-2">
              {SPECIALIZATIONS.map((spec) => (
                <label key={spec} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    {...register('specializations')}
                    value={spec}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{spec}</span>
                </label>
              ))}
            </div>
            {errors.specializations && (
              <p className="mt-1 text-sm text-red-600">{errors.specializations.message}</p>
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
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              )}
            >
              {isSubmitting ? 'Adding...' : 'Add Tech Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}