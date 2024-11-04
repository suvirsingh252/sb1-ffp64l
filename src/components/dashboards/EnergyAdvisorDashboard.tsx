import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParticipantStore } from '../../store/participants';
import { useAuthStore } from '../../store/auth';
import { Calendar, CheckCircle, Clock, Upload, Target, AlertCircle, FileText, BarChart } from 'lucide-react';
import { cn } from '../../lib/utils';
import RoleImpersonation from '../common/RoleImpersonation';

const MONTHLY_TARGET = 30;

export default function EnergyAdvisorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { participants } = useParticipantStore();
  const [selectedTab, setSelectedTab] = useState<'tasks' | 'completed'>('tasks');
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);

  const myParticipants = participants.filter(p => p.assignedAdvisor === (impersonatedUserId || user?.id));
  const upcomingAudits = myParticipants.filter(p => p.status === 'BOOKED');
  const pendingReports = myParticipants.filter(p => p.status === 'AUDIT_COMPLETED');
  const completedAudits = myParticipants.filter(p => p.status === 'COMPLETED');
  const pendingUploads = myParticipants.filter(p => p.status === 'AUDIT_COMPLETED' && !p.reportUploaded);

  const monthlyProgress = (completedAudits.length / MONTHLY_TARGET) * 100;

  const handleParticipantClick = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Energy Advisor Dashboard</h1>
        {user?.role === 'ADMIN' && (
          <RoleImpersonation
            currentRole={user.role}
            roleType="ENERGY_ADVISOR"
            onUserChange={setImpersonatedUserId}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Upcoming</h3>
              <p className="text-2xl font-semibold text-blue-600">{upcomingAudits.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Upload className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Upload</h3>
              <p className="text-2xl font-semibold text-yellow-600">{pendingUploads.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Monthly Target</h3>
              <p className="text-2xl font-semibold text-green-600">
                {completedAudits.length}/{MONTHLY_TARGET}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('tasks')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                selectedTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Open Tasks
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                selectedTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Completed Audits
            </button>
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {selectedTab === 'tasks' ? (
            <>
              {pendingUploads.map((audit) => (
                <div 
                  key={audit.id} 
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleParticipantClick(audit.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-full bg-red-100">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {audit.firstName} {audit.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{audit.address}</p>
                        <p className="text-xs text-red-600 mt-1">Report upload required</p>
                      </div>
                    </div>
                    <button 
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle upload action
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Report
                    </button>
                  </div>
                </div>
              ))}

              {upcomingAudits.map((audit) => (
                <div 
                  key={audit.id} 
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleParticipantClick(audit.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {audit.firstName} {audit.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{audit.address}</p>
                        <p className="text-xs text-blue-600 mt-1">Scheduled for today</p>
                      </div>
                    </div>
                    <button 
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle start audit action
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Start Audit
                    </button>
                  </div>
                </div>
              ))}

              {pendingUploads.length === 0 && upcomingAudits.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No pending tasks
                </div>
              )}
            </>
          ) : (
            <>
              {completedAudits.map((audit) => (
                <div 
                  key={audit.id} 
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleParticipantClick(audit.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {audit.firstName} {audit.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{audit.address}</p>
                        <p className="text-xs text-green-600 mt-1">
                          Completed on {new Date(audit.completedAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view report action
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </button>
                  </div>
                </div>
              ))}
              {completedAudits.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No completed audits this month
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}