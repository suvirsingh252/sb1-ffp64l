import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import AddBookingAgentModal from './AddBookingAgentModal';
import { cn } from '../../lib/utils';
import { useTeamStore } from '../../store/team';

export interface BookingAgent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  programsBooked: string[];
}

export default function BookingAgentTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { bookingAgents, deleteTeamMember } = useTeamStore();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking agent?')) {
      await deleteTeamMember('BA', id);
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
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Programs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingAgents && bookingAgents.length > 0 ? (
            bookingAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {agent.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {agent.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{agent.email}</div>
                  <div>{agent.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {agent.programsBooked.map((program) => (
                      <span
                        key={program}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(agent.id)}
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
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No booking agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddModal && (
        <AddBookingAgentModal
          onClose={() => setShowAddModal(false)}
          onAdd={(data) => {
            console.log('Add booking agent:', data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}