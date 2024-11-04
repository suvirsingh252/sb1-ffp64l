import { useState } from 'react';
import { Users, FileSpreadsheet, Settings, Plus } from 'lucide-react';
import TeamManagementTab from '../components/settings/TeamManagementTab';
import ProgramTable from '../components/settings/ProgramTable';
import AddProgramModal from '../components/settings/AddProgramModal';
import { cn } from '../lib/utils';

type Tab = 'team' | 'programs' | 'general';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('programs');
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('team')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team Management
              </div>
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'programs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Programs
              </div>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                General Settings
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'team' && <TeamManagementTab />}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Programs</h2>
                <button
                  onClick={() => setShowAddProgramModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Program
                </button>
              </div>
              <ProgramTable />
            </div>
          )}
          {activeTab === 'general' && (
            <div className="text-center py-8 text-gray-500">
              General settings coming soon
            </div>
          )}
        </div>
      </div>

      {showAddProgramModal && (
        <AddProgramModal onClose={() => setShowAddProgramModal(false)} />
      )}
    </div>
  );
}