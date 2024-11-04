import { useState } from 'react';
import { Plus, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Participant } from '../../types/participant';

const UPGRADE_CATEGORIES = [
  'Building Envelope',
  'HVAC Systems',
  'Windows & Doors',
  'Insulation',
  'Water Heating',
  'Ventilation',
  'Renewable Energy'
];

interface ProjectEASectionProps {
  project: Participant;
}

export default function ProjectEASection({ project }: ProjectEASectionProps) {
  const [notes, setNotes] = useState(project.notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [proposedUpgrades, setProposedUpgrades] = useState<Array<{
    id: string;
    description: string;
    category: string;
    specifications: string;
    status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
    notes?: string;
  }>>([]);
  const [showAddUpgrade, setShowAddUpgrade] = useState(false);
  const [newUpgrade, setNewUpgrade] = useState({
    description: '',
    category: '',
    specifications: '',
    notes: ''
  });

  const handleSaveNotes = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleAddUpgrade = () => {
    if (newUpgrade.description && newUpgrade.category) {
      setProposedUpgrades([
        ...proposedUpgrades,
        {
          id: Date.now().toString(),
          ...newUpgrade,
          status: 'PENDING_REVIEW'
        }
      ]);
      setNewUpgrade({
        description: '',
        category: '',
        specifications: '',
        notes: ''
      });
      setShowAddUpgrade(false);
    }
  };

  const handleNeedsRebooking = async () => {
    // Implementation for rebooking logic
    console.log('Needs rebooking');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Energy Advisor Notes</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleNeedsRebooking}
            className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
          >
            Needs Rebooking
          </button>
          <button
            onClick={handleSaveNotes}
            disabled={isSaving}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Add your notes here..."
      />

      {/* Proposed Upgrades Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Proposed Upgrades</h2>
          <button
            onClick={() => setShowAddUpgrade(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Upgrade
          </button>
        </div>

        {/* Upgrades Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposedUpgrades.map((upgrade) => (
                <tr key={upgrade.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {upgrade.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {upgrade.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {upgrade.specifications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      upgrade.status === 'PENDING_REVIEW' && 'bg-yellow-100 text-yellow-800',
                      upgrade.status === 'APPROVED' && 'bg-green-100 text-green-800',
                      upgrade.status === 'REJECTED' && 'bg-red-100 text-red-800'
                    )}>
                      {upgrade.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {upgrade.notes}
                  </td>
                </tr>
              ))}
              {proposedUpgrades.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No upgrades proposed yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Upgrade Form */}
        {showAddUpgrade && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Upgrade</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={newUpgrade.category}
                  onChange={(e) => setNewUpgrade({ ...newUpgrade, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {UPGRADE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newUpgrade.description}
                  onChange={(e) => setNewUpgrade({ ...newUpgrade, description: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specifications
                </label>
                <textarea
                  value={newUpgrade.specifications}
                  onChange={(e) => setNewUpgrade({ ...newUpgrade, specifications: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={newUpgrade.notes}
                  onChange={(e) => setNewUpgrade({ ...newUpgrade, notes: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUpgrade(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddUpgrade}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Add Upgrade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}