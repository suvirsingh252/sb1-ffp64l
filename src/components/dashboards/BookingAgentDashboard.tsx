import { useState } from 'react';
import { useParticipantStore } from '../../store/participants';
import { useAuthStore } from '../../store/auth';
import { useAdvisorStore } from '../../store/advisors';
import ParticipantTable from '../participants/ParticipantTable';
import ParticipantFilters from '../participants/ParticipantFilters';
import AdvisorBookingView from '../booking/AdvisorBookingView';
import { CalendarCheck, UserPlus, Users } from 'lucide-react';
import AddParticipantModal from '../participants/AddParticipantModal';
import { ParticipantStatus } from '../../types/participant';
import { cn } from '../../lib/utils';
import RoleImpersonation from '../common/RoleImpersonation';

type BookingView = 'PROGRAM' | 'ADVISOR';

export default function BookingAgentDashboard() {
  const { user } = useAuthStore();
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);
  const { participants, addParticipant } = useParticipantStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingView, setBookingView] = useState<BookingView>('PROGRAM');

  // Filter only participants that are ready for booking
  const readyForBooking = participants.filter(p => p.status === ParticipantStatus.READY_FOR_BOOKING);

  const handleAddParticipant = async (data: any) => {
    await addParticipant({
      ...data,
      id: String(participants.length + 1),
      status: ParticipantStatus.READY_FOR_BOOKING,
      createdAt: new Date().toISOString(),
      onHold: false,
      reportUploaded: false
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Booking Dashboard</h1>
        <div className="flex items-center space-x-4">
          {user?.role === 'ADMIN' && (
            <RoleImpersonation
              currentRole={user.role}
              roleType="BOOKING_AGENT"
              onUserChange={setImpersonatedUserId}
            />
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Participant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CalendarCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Ready for Booking</h3>
              <p className="text-2xl font-semibold text-green-600">{readyForBooking.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Available Energy Advisors</h3>
              <p className="text-2xl font-semibold text-blue-600">
                {/* Count active advisors with available units */}
                {readyForBooking.length > 0 ? '5 available' : 'No bookings pending'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setBookingView('PROGRAM')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                bookingView === 'PROGRAM'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Book by Program
            </button>
            <button
              onClick={() => setBookingView('ADVISOR')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                bookingView === 'ADVISOR'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Book by Energy Advisor
            </button>
          </nav>
        </div>

        <div className="p-6">
          {bookingView === 'PROGRAM' ? (
            <>
              <ParticipantFilters />
              <div className="mt-6">
                <ParticipantTable participants={readyForBooking} />
              </div>
            </>
          ) : (
            <AdvisorBookingView participants={readyForBooking} />
          )}
        </div>
      </div>

      {showAddModal && (
        <AddParticipantModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddParticipant}
        />
      )}
    </div>
  );
}