import { useState } from 'react';
import { Participant } from '../../types/participant';
import { cn } from '../../lib/utils';

interface TechTeamSectionProps {
  project: Participant;
  programId?: string;
}

export default function TechTeamSection({ project, programId }: TechTeamSectionProps) {
  const [proposedUpgrades, setProposedUpgrades] = useState<Array<{
    id: string;
    description: string;
    category: string;
    specifications: string;
    status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
    notes?: string;
  }>>([]);

  const handleApproveUpgrade = (upgradeId: string) => {
    setProposedUpgrades(upgrades =>
      upgrades.map(upgrade =>
        upgrade.id === upgradeId
          ? { ...upgrade, status: 'APPROVED' }
          : upgrade
      )
    );
  };

  const handleRejectUpgrade = (upgradeId: string) => {
    setProposedUpgrades(upgrades =>
      upgrades.map(upgrade =>
        upgrade.id === upgradeId
          ? { ...upgrade, status: 'REJECTED' }
          : upgrade
      )
    );
  };

  const handleRequestQuote = async (upgrade: any) => {
    // Implementation for quote request
    console.log('Requesting quote for upgrade:', upgrade);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Proposed Upgrades Review</h2>
        
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
                  Actions
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {upgrade.status === 'PENDING_REVIEW' ? (
                        <>
                          <button
                            onClick={() => handleApproveUpgrade(upgrade.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectUpgrade(upgrade.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : upgrade.status === 'APPROVED' ? (
                        <button
                          onClick={() => handleRequestQuote(upgrade)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Generate Quote Request
                        </button>
                      ) : (
                        <span className="text-red-600">Rejected</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {proposedUpgrades.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No upgrades pending review
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}