import { ParticipantStatus } from '../../types/participant';
import { cn } from '../../lib/utils';

interface ProjectStatusBadgeProps {
  status: ParticipantStatus;
  className?: string;
}

const STATUS_STYLES: Record<ParticipantStatus, string> = {
  READY_FOR_BOOKING: 'bg-blue-100 text-blue-800',
  BOOKED: 'bg-purple-100 text-purple-800',
  AUDIT_COMPLETED: 'bg-yellow-100 text-yellow-800',
  READY_FOR_TECH_TEAM: 'bg-orange-100 text-orange-800',
  READY_FOR_CONTRACTOR_QUOTE: 'bg-pink-100 text-pink-800',
  WORKORDERS_SENT: 'bg-indigo-100 text-indigo-800',
  READY_FOR_FINAL_AUDIT: 'bg-green-100 text-green-800',
  FINAL_AUDIT_BOOKED: 'bg-cyan-100 text-cyan-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  ON_HOLD: 'bg-gray-100 text-gray-800'
};

export default function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium',
        STATUS_STYLES[status],
        className
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}