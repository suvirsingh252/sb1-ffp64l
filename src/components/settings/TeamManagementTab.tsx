import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import BookingAgentTable from './BookingAgentTable';
import EnergyAdvisorTable from './EnergyAdvisorTable';
import TechTeamTable from './TechTeamTable';
import TraineeTable from './TraineeTable';
import AddBookingAgentModal from './AddBookingAgentModal';
import AddEnergyAdvisorModal from './AddEnergyAdvisorModal';
import AddTechTeamModal from './AddTechTeamModal';
import AddTraineeModal from './AddTraineeModal';

type TeamType = 'BOOKING_AGENT' | 'ENERGY_ADVISOR' | 'TECH_TEAM' | 'TRAINEE';

export default function TeamManagementTab() {
  const [showModal, setShowModal] = useState<TeamType | null>(null);

  const handleCloseModal = () => setShowModal(null);

  return (
    <div className="space-y-8">
      {/* Booking Agents Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Booking Agents</h2>
          <button
            onClick={() => setShowModal('BOOKING_AGENT')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Booking Agent
          </button>
        </div>
        <BookingAgentTable />
      </section>

      {/* Energy Advisors Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Energy Advisors</h2>
          <button
            onClick={() => setShowModal('ENERGY_ADVISOR')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Energy Advisor
          </button>
        </div>
        <EnergyAdvisorTable />
      </section>

      {/* Tech Team Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Tech Team</h2>
          <button
            onClick={() => setShowModal('TECH_TEAM')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Tech Team Member
          </button>
        </div>
        <TechTeamTable />
      </section>

      {/* Trainees Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Trainees</h2>
          <button
            onClick={() => setShowModal('TRAINEE')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Trainee
          </button>
        </div>
        <TraineeTable />
      </section>

      {/* Modals */}
      {showModal === 'BOOKING_AGENT' && (
        <AddBookingAgentModal onClose={handleCloseModal} />
      )}
      {showModal === 'ENERGY_ADVISOR' && (
        <AddEnergyAdvisorModal onClose={handleCloseModal} />
      )}
      {showModal === 'TECH_TEAM' && (
        <AddTechTeamModal onClose={handleCloseModal} />
      )}
      {showModal === 'TRAINEE' && (
        <AddTraineeModal onClose={handleCloseModal} />
      )}
    </div>
  );
}