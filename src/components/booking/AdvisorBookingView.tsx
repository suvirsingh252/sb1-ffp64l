import { useState } from 'react';
import { useAdvisorStore } from '../../store/advisors';
import { Participant } from '../../types/participant';
import { Advisor } from '../../store/advisors';
import { Calendar, MapPin, Briefcase, Clock } from 'lucide-react';
import BookingModal from '../bookings/BookingModal';

interface AdvisorBookingViewProps {
  participants: Participant[];
}

export default function AdvisorBookingView({ participants }: AdvisorBookingViewProps) {
  const { advisors } = useAdvisorStore();
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleAdvisorSelect = (advisorId: string) => {
    setSelectedAdvisor(advisorId);
    setSelectedParticipant(null);
  };

  const handleBooking = (participantId: string) => {
    setSelectedParticipant(participantId);
    setShowBookingModal(true);
  };

  const getEligibleParticipants = (advisor: Advisor) => {
    return participants.filter(participant => 
      advisor.serviceAreas.includes(participant.city) &&
      advisor.programsTrainedIn.includes(participant.program)
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Energy Advisors</h3>
          <div className="space-y-4">
            {advisors.map((advisor) => {
              const eligibleParticipants = getEligibleParticipants(advisor);
              
              return (
                <button
                  key={advisor.id}
                  onClick={() => handleAdvisorSelect(advisor.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAdvisor === advisor.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{advisor.name}</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {advisor.serviceAreas.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {advisor.programsTrainedIn.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {advisor.totalContractUnits} units remaining
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {eligibleParticipants.length} eligible
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Eligible Participants</h3>
          {selectedAdvisor ? (
            <div className="space-y-4">
              {getEligibleParticipants(advisors.find(a => a.id === selectedAdvisor)!).map((participant) => (
                <div
                  key={participant.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {participant.firstName} {participant.lastName}
                      </h4>
                      <p className="text-sm text-gray-500">{participant.address}</p>
                      <p className="text-sm text-gray-500">{participant.program}</p>
                    </div>
                    <button
                      onClick={() => handleBooking(participant.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select an Energy Advisor to view eligible participants
            </div>
          )}
        </div>
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
    </div>
  );
}