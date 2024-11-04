import { useState } from 'react';
import { Trash2, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTeamStore } from '../../store/team';

interface Trainee {
  id: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  mentor: string;
  progress: number;
  status: 'IN_TRAINING' | 'COMPLETED' | 'ON_HOLD';
}

export default function TraineeTable() {
  const { trainees, deleteTeamMember } = useTeamStore();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trainee?')) {
      await deleteTeamMember('TRAINEE', id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mentor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trainees && trainees.length > 0 ? (
            trainees.map((trainee) => (
              <tr key={trainee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{trainee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trainee.email}</div>
                  <div className="text-sm text-gray-500">{trainee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(trainee.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trainee.mentor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-600 h-2.5 rounded-full"
                      style={{ width: `${trainee.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {trainee.progress}% Complete
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    trainee.status === 'IN_TRAINING' && 'bg-yellow-100 text-yellow-800',
                    trainee.status === 'COMPLETED' && 'bg-green-100 text-green-800',
                    trainee.status === 'ON_HOLD' && 'bg-gray-100 text-gray-800'
                  )}>
                    {trainee.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(trainee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No trainees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}