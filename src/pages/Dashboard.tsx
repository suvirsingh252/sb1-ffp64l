import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useParticipantStore } from '../store/participants';
import { useAdvisorStore } from '../store/advisors';
import { ParticipantStatus } from '../types/participant';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { participants } = useParticipantStore();
  const { advisors } = useAdvisorStore();

  // Common metrics
  const totalParticipants = participants.length;
  const completedProjects = participants.filter(p => p.status === ParticipantStatus.COMPLETED).length;
  const inProgressProjects = participants.filter(p => 
    p.status !== ParticipantStatus.COMPLETED && 
    p.status !== ParticipantStatus.READY_FOR_BOOKING
  ).length;

  // Role-specific metrics
  const getMetrics = () => {
    switch (user?.role) {
      case 'BOOKING_AGENT':
        return [
          {
            name: 'Ready for Booking',
            value: participants.filter(p => p.status === ParticipantStatus.READY_FOR_BOOKING).length,
            icon: Calendar,
            color: 'blue'
          },
          {
            name: 'Booked Today',
            value: participants.filter(p => p.status === ParticipantStatus.BOOKED).length,
            icon: CheckCircle,
            color: 'green'
          },
          {
            name: 'Available Advisors',
            value: advisors.filter(a => a.totalContractUnits > 0).length,
            icon: Users,
            color: 'purple'
          }
        ];

      case 'ENERGY_ADVISOR':
        return [
          {
            name: 'Upcoming Audits',
            value: participants.filter(p => p.status === ParticipantStatus.BOOKED).length,
            icon: Calendar,
            color: 'blue'
          },
          {
            name: 'Reports Pending',
            value: participants.filter(p => 
              p.status === ParticipantStatus.AUDIT_COMPLETED && !p.reportUploaded
            ).length,
            icon: FileText,
            color: 'yellow'
          },
          {
            name: 'Monthly Target',
            value: '15/30',
            icon: TrendingUp,
            color: 'green'
          }
        ];

      case 'TECH_TEAM':
        return [
          {
            name: 'Pending Reviews',
            value: participants.filter(p => p.status === ParticipantStatus.READY_FOR_TECH_TEAM).length,
            icon: Clock,
            color: 'yellow'
          },
          {
            name: 'Quote Requests',
            value: participants.filter(p => p.status === ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE).length,
            icon: FileText,
            color: 'purple'
          },
          {
            name: 'Active Work Orders',
            value: '5',
            icon: AlertCircle,
            color: 'blue'
          }
        ];

      default:
        return [
          {
            name: 'Total Participants',
            value: totalParticipants,
            icon: Users,
            color: 'blue'
          },
          {
            name: 'In Progress',
            value: inProgressProjects,
            icon: Clock,
            color: 'yellow'
          },
          {
            name: 'Completed',
            value: completedProjects,
            icon: CheckCircle,
            color: 'green'
          }
        ];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your current projects and activities
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={cn(
                'p-3 rounded-full',
                metric.color === 'blue' && 'bg-blue-100',
                metric.color === 'green' && 'bg-green-100',
                metric.color === 'yellow' && 'bg-yellow-100',
                metric.color === 'purple' && 'bg-purple-100'
              )}>
                <metric.icon className={cn(
                  'h-6 w-6',
                  metric.color === 'blue' && 'text-blue-600',
                  metric.color === 'green' && 'text-green-600',
                  metric.color === 'yellow' && 'text-yellow-600',
                  metric.color === 'purple' && 'text-purple-600'
                )} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{metric.name}</h3>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Program Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Program Overview</h2>
          <div className="flex items-center space-x-2">
            <BarChart className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>
        </div>

        <div className="space-y-4">
          {['Home Energy Assessment', 'Commercial Energy Audit', 'Multi-Unit Residential'].map((program) => {
            const total = Math.floor(Math.random() * 50) + 10;
            const completed = Math.floor(Math.random() * total);
            const progress = (completed / total) * 100;

            return (
              <div key={program} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{program}</span>
                    <span className="text-sm text-gray-500">{completed}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}