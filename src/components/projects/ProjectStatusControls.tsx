import { ParticipantStatus, STEP_STATUS_MAP } from '../../types/participant';
import { useParticipantStore } from '../../store/participants';
import { useProgramStore } from '../../store/programs';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectStatusControlsProps {
  projectId: string;
  currentStatus: ParticipantStatus;
  programId: string;
}

export default function ProjectStatusControls({ projectId, currentStatus, programId }: ProjectStatusControlsProps) {
  const { updateParticipantStatus } = useParticipantStore();
  const { programs } = useProgramStore();

  // Get the program configuration
  const program = programs.find(p => p.id === programId);
  if (!program) return null;

  // Build available statuses based on program steps
  const availableStatuses = [
    ParticipantStatus.READY_FOR_BOOKING, // Always include initial status
    ...Object.entries(program.steps)
      .filter(([_, enabled]) => enabled)
      .flatMap(([step]) => STEP_STATUS_MAP[step as keyof typeof STEP_STATUS_MAP] || []),
    ParticipantStatus.COMPLETED // Always include completed status
  ];

  const currentIndex = availableStatuses.indexOf(currentStatus);
  const nextStatus = availableStatuses[currentIndex + 1];
  const prevStatus = availableStatuses[currentIndex - 1];

  const handleStatusChange = async (status: ParticipantStatus) => {
    try {
      await updateParticipantStatus(projectId, status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (currentStatus === ParticipantStatus.COMPLETED) {
    return null;
  }

  const getStatusLabel = (status: ParticipantStatus) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-yellow-800">Testing Controls:</span>
          <div className="flex items-center space-x-2">
            {prevStatus && (
              <button
                onClick={() => handleStatusChange(prevStatus)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
              >
                Previous Status
              </button>
            )}
            {nextStatus && (
              <button
                onClick={() => handleStatusChange(nextStatus)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                <span>Advance to {getStatusLabel(nextStatus)}</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value as ParticipantStatus)}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}