import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useParticipantStore } from '../store/participants';
import { useAuthStore } from '../store/auth';
import ProjectContact from '../components/projects/ProjectContact';
import ProjectBooking from '../components/projects/ProjectBooking';
import ProjectEASection from '../components/projects/ProjectEASection';
import ProjectDocuments from '../components/projects/ProjectDocuments';
import TechTeamSection from '../components/projects/TechTeamSection';
import ProjectStatusTimeline from '../components/projects/ProjectStatusTimeline';
import ProjectActionItems from '../components/projects/ProjectActionItems';
import ProjectStatusControls from '../components/projects/ProjectStatusControls';
import WorkordersTable from '../components/tech/WorkordersTable';
import { cn } from '../lib/utils';
import { ClipboardList, UserCircle, Wrench } from 'lucide-react';

type TabType = 'contact' | 'ea' | 'tech';

export default function ProjectPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { participants } = useParticipantStore();
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const project = participants.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const tabs = [
    {
      id: 'contact' as TabType,
      label: 'Contact Info',
      icon: <UserCircle className="h-4 w-4" />,
      show: true,
    },
    {
      id: 'ea' as TabType,
      label: 'Energy Advisor',
      icon: <ClipboardList className="h-4 w-4" />,
      show: true,
    },
    {
      id: 'tech' as TabType,
      label: 'Tech Team',
      icon: <Wrench className="h-4 w-4" />,
      show: user?.role === 'TECH_TEAM' || user?.role === 'ADMIN',
    },
  ].filter(tab => tab.show);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectContact project={project} />
              <ProjectBooking project={project} />
            </div>
            <ProjectDocuments programId="1" stage="INITIAL_AUDIT" />
          </div>
        );
      case 'ea':
        return <ProjectEASection project={project} />;
      case 'tech':
        return (user?.role === 'TECH_TEAM' || user?.role === 'ADMIN') && (
          <div className="space-y-6">
            <TechTeamSection project={project} programId="1" />
            <WorkordersTable />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Project: {project.firstName} {project.lastName}
        </h1>
      </div>

      {/* Testing Controls */}
      <ProjectStatusControls 
        projectId={project.id} 
        currentStatus={project.status}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Status Timeline & Action Items */}
        <div className="lg:col-span-1 space-y-6">
          <ProjectStatusTimeline 
            currentStatus={project.status}
            statusHistory={project.statusHistory}
          />
          <ProjectActionItems />
        </div>

        {/* Right Column - Tabbed Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2',
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}