import { Clock, CheckCircle } from 'lucide-react';
import { ParticipantStatus } from '../../types/participant';
import { cn } from '../../lib/utils';

interface ProjectStatusTimelineProps {
  currentStatus: ParticipantStatus;
  statusHistory?: Array<{
    status: ParticipantStatus;
    date: string;
    assignedTo?: string;
    notes?: string;
  }>;
}

const STATUS_ORDER = [
  ParticipantStatus.READY_FOR_BOOKING,
  ParticipantStatus.AUDIT_SCHEDULED,
  ParticipantStatus.INITIAL_AUDIT_COMPLETED,
  ParticipantStatus.READY_FOR_TECH_REVIEW,
  ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE,
  ParticipantStatus.WORKORDERS_SENT,
  ParticipantStatus.READY_FOR_FINAL_AUDIT,
  ParticipantStatus.FINAL_AUDIT_SCHEDULED,
  ParticipantStatus.COMPLETED
];

const STATUS_LABELS: Record<ParticipantStatus, string> = {
  [ParticipantStatus.READY_FOR_BOOKING]: 'Ready for Booking',
  [ParticipantStatus.AUDIT_SCHEDULED]: 'Audit Scheduled',
  [ParticipantStatus.INITIAL_AUDIT_COMPLETED]: 'Initial Audit Completed',
  [ParticipantStatus.READY_FOR_TECH_REVIEW]: 'Ready for Technical Review',
  [ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE]: 'Ready for Contractor Quote',
  [ParticipantStatus.WORKORDERS_SENT]: 'Work Orders Sent',
  [ParticipantStatus.READY_FOR_FINAL_AUDIT]: 'Ready for Final Audit',
  [ParticipantStatus.FINAL_AUDIT_SCHEDULED]: 'Final Audit Scheduled',
  [ParticipantStatus.COMPLETED]: 'Project Completed',
  [ParticipantStatus.ON_HOLD]: 'On Hold'
};

export default function ProjectStatusTimeline({ currentStatus, statusHistory = [] }: ProjectStatusTimelineProps) {
  const currentStatusIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Project Status</h2>
      <div className="space-y-4">
        {STATUS_ORDER.map((status, index) => {
          const isPast = STATUS_ORDER.indexOf(status) < currentStatusIndex;
          const isCurrent = status === currentStatus;
          const historyEntry = statusHistory.find(h => h.status === status);
          const statusKey = `status-${status}-${index}`;

          return (
            <div key={statusKey} className="relative flex items-center">
              {index !== 0 && (
                <div
                  className={cn(
                    'absolute h-full w-0.5 -top-4 left-3',
                    isPast ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center w-6 h-6 rounded-full',
                  isPast ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-200'
                )}
              >
                {isPast ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <Clock className={cn(
                    'w-4 h-4',
                    isCurrent ? 'text-white' : 'text-gray-400'
                  )} />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className={cn(
                      'text-sm font-medium',
                      isPast || isCurrent ? 'text-gray-900' : 'text-gray-500'
                    )}>
                      {STATUS_LABELS[status]}
                    </p>
                    {historyEntry && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(historyEntry.date).toLocaleDateString()}
                        {historyEntry.assignedTo && (
                          <span className="ml-2">• Assigned to: {historyEntry.assignedTo}</span>
                        )}
                      </p>
                    )}
                  </div>
                  {isCurrent && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                </div>
                {historyEntry?.notes && (
                  <p className="mt-1 text-sm text-gray-500">{historyEntry.notes}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}