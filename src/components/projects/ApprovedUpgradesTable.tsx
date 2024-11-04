import { useState } from 'react';
import { Send, FileText, Building2 } from 'lucide-react';
import { useContractorStore } from '../../store/contractors';
import QuoteRequestModal from '../quotes/QuoteRequestModal';
import { cn } from '../../lib/utils';

interface ApprovedUpgrade {
  id: string;
  description: string;
  category: string;
  specifications: string;
  assignedContractor?: string;
  status: 'PENDING' | 'QUOTE_REQUESTED' | 'QUOTE_RECEIVED' | 'APPROVED' | 'REJECTED';
}

interface ApprovedUpgradesTableProps {
  projectId: string;
  upgrades: ApprovedUpgrade[];
}

export default function ApprovedUpgradesTable({ projectId, upgrades }: ApprovedUpgradesTableProps) {
  const { contractors } = useContractorStore();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const pendingQuoteRequests = upgrades.filter(
    upgrade => upgrade.status === 'PENDING' && upgrade.assignedContractor
  );

  const handleGenerateQuotes = () => {
    setShowQuoteModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Approved Upgrades</h2>
        {pendingQuoteRequests.length > 0 && (
          <button
            onClick={handleGenerateQuotes}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Generate Quote Requests
          </button>
        )}
      </div>

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
                Assigned Contractor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {upgrades.map((upgrade) => {
              const contractor = contractors.find(c => c.id === upgrade.assignedContractor);
              
              return (
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
                    {contractor ? (
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                        {contractor.name}
                      </div>
                    ) : (
                      <span className="text-amber-500">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      upgrade.status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
                      upgrade.status === 'QUOTE_REQUESTED' && 'bg-blue-100 text-blue-800',
                      upgrade.status === 'QUOTE_RECEIVED' && 'bg-purple-100 text-purple-800',
                      upgrade.status === 'APPROVED' && 'bg-green-100 text-green-800',
                      upgrade.status === 'REJECTED' && 'bg-red-100 text-red-800'
                    )}>
                      {upgrade.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              );
            })}
            {upgrades.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No approved upgrades yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showQuoteModal && (
        <QuoteRequestModal
          projectId={projectId}
          upgrades={pendingQuoteRequests}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </div>
  );
}