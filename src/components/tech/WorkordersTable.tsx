import { useState } from 'react';
import { useContractorStore } from '../../store/contractors';
import { FileText, Send, Building2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import CreateWorkorderModal from './CreateWorkorderModal';

interface Workorder {
  id: string;
  projectId: string;
  contractorId: string;
  quoteId: string;
  description: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  createdAt: string;
  startDate?: string;
  completionDate?: string;
  totalAmount: number;
  notes?: string;
}

export default function WorkordersTable() {
  const { contractors } = useContractorStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workorders, setWorkorders] = useState<Workorder[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleCreateWorkorder = (data: Omit<Workorder, 'id' | 'status' | 'createdAt'>) => {
    const newWorkorder: Workorder = {
      ...data,
      id: Date.now().toString(),
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
    };
    setWorkorders([...workorders, newWorkorder]);
  };

  const handleStatusChange = async (workorderId: string, newStatus: Workorder['status']) => {
    setWorkorders(orders =>
      orders.map(order =>
        order.id === workorderId
          ? {
              ...order,
              status: newStatus,
              ...(newStatus === 'IN_PROGRESS' ? { startDate: new Date().toISOString() } : {}),
              ...(newStatus === 'COMPLETED' ? { completionDate: new Date().toISOString() } : {})
            }
          : order
      )
    );
  };

  const getStatusIcon = (status: Workorder['status']) => {
    switch (status) {
      case 'DRAFT':
        return <FileText className="h-5 w-5 text-gray-500" />;
      case 'SENT':
        return <Send className="h-5 w-5 text-blue-500" />;
      case 'ACCEPTED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'REJECTED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadgeColor = (status: Workorder['status']) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'SENT':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Work Orders</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Create Work Order
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workorders.map((workorder) => {
                const contractor = contractors.find(c => c.id === workorder.contractorId);
                
                return (
                  <tr key={workorder.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(workorder.status)}
                        <span className={cn(
                          'ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          getStatusBadgeColor(workorder.status)
                        )}>
                          {workorder.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contractor?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contractor?.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{workorder.description}</div>
                      {workorder.notes && (
                        <div className="text-sm text-gray-500">{workorder.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${workorder.totalAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        Created: {new Date(workorder.createdAt).toLocaleDateString()}
                      </div>
                      {workorder.startDate && (
                        <div className="text-sm text-gray-500">
                          Started: {new Date(workorder.startDate).toLocaleDateString()}
                        </div>
                      )}
                      {workorder.completionDate && (
                        <div className="text-sm text-gray-500">
                          Completed: {new Date(workorder.completionDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {workorder.status === 'DRAFT' && (
                          <button
                            onClick={() => handleStatusChange(workorder.id, 'SENT')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Send to Contractor
                          </button>
                        )}
                        {workorder.status === 'ACCEPTED' && (
                          <button
                            onClick={() => handleStatusChange(workorder.id, 'IN_PROGRESS')}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Start Work
                          </button>
                        )}
                        {workorder.status === 'IN_PROGRESS' && (
                          <button
                            onClick={() => handleStatusChange(workorder.id, 'COMPLETED')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {workorders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No work orders created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <CreateWorkorderModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateWorkorder}
          contractors={contractors}
        />
      )}
    </div>
  );
}