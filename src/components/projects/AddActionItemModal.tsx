import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useTeamStore } from '../../store/team';
import { cn } from '../../lib/utils';

const actionItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  assignedTo: z.string().min(1, 'Assignee is required'),
  assigneeRole: z.enum(['EA', 'BA', 'TECH']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

type ActionItemForm = z.infer<typeof actionItemSchema>;

interface AddActionItemModalProps {
  onClose: () => void;
  onAdd: (data: ActionItemForm) => void;
}

export default function AddActionItemModal({ onClose, onAdd }: AddActionItemModalProps) {
  const { energyAdvisors, bookingAgents, techTeam } = useTeamStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ActionItemForm>({
    resolver: zodResolver(actionItemSchema),
    defaultValues: {
      assigneeRole: 'EA'
    }
  });

  const selectedRole = watch('assigneeRole');

  const getAssigneeOptions = () => {
    switch (selectedRole) {
      case 'EA':
        return energyAdvisors;
      case 'BA':
        return bookingAgents;
      case 'TECH':
        return techTeam;
      default:
        return [];
    }
  };

  const onSubmit = async (data: ActionItemForm) => {
    const assignee = getAssigneeOptions().find(member => member.id === data.assignedTo);
    if (assignee) {
      onAdd({
        ...data,
        assignedTo: `${assignee.name} (${assignee.title})`
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add Action Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Description</label>
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
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              {...register('dueDate')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.dueDate && 'border-red-300'
              )}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team</label>
              <select
                {...register('assigneeRole')}
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.assigneeRole && 'border-red-300'
                )}
              >
                <option value="EA">Energy Advisors</option>
                <option value="BA">Booking Agents</option>
                <option value="TECH">Tech Team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Assign To</label>
              <select
                {...register('assignedTo')}
                className={cn(
                  'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                  errors.assignedTo && 'border-red-300'
                )}
              >
                <option value="">Select team member</option>
                {getAssigneeOptions().map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.title})
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              {...register('priority')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.priority && 'border-red-300'
              )}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
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
              Add Action Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}