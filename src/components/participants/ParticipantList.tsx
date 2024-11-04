import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Participant } from '../../types/participant';
import { Clock, MapPin, BookOpen, UserPlus } from 'lucide-react';
import AddParticipantModal from './AddParticipantModal';
import { useParticipantStore } from '../../store/participants';

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList = ({ participants }: ParticipantListProps) => {
  const [searchParams] = useSearchParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const { addParticipant } = useParticipantStore();
  
  const filteredParticipants = React.useMemo(() => {
    let filtered = [...participants];
    
    const search = searchParams.get('search')?.toLowerCase();
    const program = searchParams.get('program');
    const location = searchParams.get('location');
    const timeRange = searchParams.get('timeRange');

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search) ||
          p.email.toLowerCase().includes(search) ||
          p.address.toLowerCase().includes(search)
      );
    }

    if (program && program !== 'All') {
      filtered = filtered.filter((p) => p.program === program);
    }

    if (location && location !== 'All') {
      filtered = filtered.filter((p) => p.city === location);
    }

    if (timeRange && timeRange !== 'All') {
      const now = new Date();
      const days = timeRange === 'Last 7 days' ? 7 : timeRange === 'Last 30 days' ? 30 : 90;
      const cutoff = new Date(now.setDate(now.getDate() - days));
      
      filtered = filtered.filter((p) => new Date(p.createdAt) >= cutoff);
    }

    return filtered;
  }, [participants, searchParams]);

  const handleAddParticipant = async (data: any) => {
    await addParticipant({
      ...data,
      id: String(participants.length + 1),
      status: 'READY_FOR_BOOKING',
      createdAt: new Date().toISOString(),
      onHold: false,
      reportUploaded: false
    });
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Participants</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Participant
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredParticipants.map((participant) => (
          <div key={participant.id} className="py-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {participant.firstName} {participant.lastName}
                </h3>
                <div className="mt-1 text-sm text-gray-500">{participant.email}</div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {participant.city}
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-1" />
                    {participant.program}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {new Date(participant.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  participant.onHold ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {participant.onHold ? 'On Hold' : participant.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddParticipantModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddParticipant}
        />
      )}

      {filteredParticipants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No participants found matching the current filters.
        </div>
      )}
    </>
  );
};

export default ParticipantList;