import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParticipantStore } from '../../store/participants';
import { ParticipantStatus } from '../../types/participant';
import { PauseCircle, PlayCircle, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import BookingModal from '../bookings/BookingModal';
import ProjectStatusBadge from '../projects/ProjectStatusBadge';

interface ParticipantTableProps {
  participants: Array<any>;
}

export default function ParticipantTable({ participants }: ParticipantTableProps) {
  const navigate = useNavigate();
  const { toggleParticipantHold } = useParticipantStore();
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = (participantId: string) => {
    setSelectedParticipant(participantId);
    setShowBookingModal(true);
  };

  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  if (!participants || participants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No participants ready for booking.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
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
                Program
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
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className={cn(
                  'hover:bg-gray-50 transition-colors cursor-pointer',
                  participant.onHold && 'bg-gray-50'
                )}
                onClick={() => handleViewProject(participant.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {participant.firstName} {participant.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{participant.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{participant.email}</div>
                  <div className="text-sm text-gray-500">{participant.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {participant.program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProjectStatusBadge status={participant.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleParticipantHold(participant.id)}
                      className="text-gray-400 hover:text-gray-500"
                      title={participant.onHold ? 'Resume' : 'Pause'}
                    >
                      {participant.onHold ? (
                        <PlayCircle className="h-5 w-5" />
                      ) : (
                        <PauseCircle className="h-5 w-5" />
                      )}
                    </button>
                    {participant.status === ParticipantStatus.READY_FOR_BOOKING && !participant.onHold && (
                      <button
                        onClick={() => handleBooking(participant.id)}
                        className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                      >
                        <Calendar className="h-5 w-5" />
                        <span>Book Audit</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleViewProject(participant.id)}
                      className="text-blue-600 hover:text-blue-700"
                      title="View Project"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showBookingModal && selectedParticipant && (
        <BookingModal
          participantId={selectedParticipant}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedParticipant(null);
          }}
        />
      )}
    </>
  );
}