import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParticipantStore } from '../../store/participants';
import { useAuthStore } from '../../store/auth';
import { ClipboardCheck, FileSpreadsheet, Calculator, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import RoleImpersonation from '../common/RoleImpersonation';

export default function TechTeamDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);
  const { participants } = useParticipantStore();
  
  // Filter projects ready for technical review
  const pendingReview = participants.filter(p => p.status === 'READY_FOR_TECH_TEAM');
  const pendingQuotes = participants.filter(p => p.status === 'READY_FOR_CONTRACTOR_QUOTE');

  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tech Team Dashboard</h1>
        {user?.role === 'ADMIN' && (
          <RoleImpersonation
            currentRole={user.role}
            roleType="TECH_TEAM"
            onUserChange={setImpersonatedUserId}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <ClipboardCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
              <p className="text-2xl font-semibold text-purple-600">{pendingReview.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <Calculator className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Quotes</h3>
              <p className="text-2xl font-semibold text-orange-600">{pendingQuotes.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Projects Ready for Review</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingReview.map((project) => (
            <div 
              key={project.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleViewProject(project.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {project.firstName} {project.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{project.address}</p>
                  <p className="text-sm text-gray-500">{project.program}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Ready for Review
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
          {pendingReview.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No projects pending review
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quote Requests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingQuotes.map((project) => (
            <div 
              key={project.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleViewProject(project.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {project.firstName} {project.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{project.address}</p>
                  <p className="text-sm text-gray-500">{project.program}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Quote Pending
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
          {pendingQuotes.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No pending quote requests
            </div>
          )}
        </div>
      </div>
    </div>
  );
}