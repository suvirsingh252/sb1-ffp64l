import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParticipantStore } from '../store/participants';
import { UserPlus, Filter } from 'lucide-react';
import { PROGRAMS } from '../lib/mockData';
import AddParticipantModal from '../components/participants/AddParticipantModal';
import { cn } from '../lib/utils';

export default function ParticipantsPage() {
  const navigate = useNavigate();
  const { participants } = useParticipantStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | 'ALL'>('ALL');

  const filteredParticipants = selectedProgram === 'ALL' 
    ? participants 
    : participants.filter(p => p.program === selectedProgram);

  const groupedParticipants = PROGRAMS.reduce((acc, program) => {
    acc[program] = filteredParticipants.filter(p => p.program === program);
    return acc;
  }, {} as Record<string, typeof participants>);

  const handleParticipantClick = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Participants</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Programs</option>
              {PROGRAMS.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Participant
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedParticipants).map(([program, programParticipants]) => (
          <div key={program} className={cn(
            'bg-white rounded-lg shadow overflow-hidden',
            programParticipants.length === 0 && selectedProgram !== 'ALL' && 'hidden'
          )}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">{program}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {programParticipants.length} participants
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {programParticipants.map((participant) => (
                    <tr 
                      key={participant.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleParticipantClick(participant.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {participant.firstName} {participant.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{participant.email}</div>
                        <div className="text-sm text-gray-500">{participant.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{participant.city}</div>
                        <div className="text-sm text-gray-500">{participant.postalCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          participant.status === 'READY_FOR_BOOKING' && 'bg-yellow-100 text-yellow-800',
                          participant.status === 'BOOKED' && 'bg-blue-100 text-blue-800',
                          participant.status === 'COMPLETED' && 'bg-green-100 text-green-800'
                        )}>
                          {participant.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(participant.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {programParticipants.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No participants found in this program
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddParticipantModal
          onClose={() => setShowAddModal(false)}
          onAdd={async (data) => {
            // Handle adding participant
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}