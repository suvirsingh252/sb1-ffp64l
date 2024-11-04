import { useState } from 'react';
import { Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import AddActionItemModal from './AddActionItemModal';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export default function ProjectActionItems() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);

  const handleAddAction = async (data: Omit<ActionItem, 'id' | 'status'>) => {
    const newAction: ActionItem = {
      id: Date.now().toString(),
      ...data,
      status: 'PENDING'
    };
    setActionItems([...actionItems, newAction]);
  };

  const handleStatusChange = (id: string, status: ActionItem['status']) => {
    setActionItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-600 bg-red-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'LOW':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: ActionItem['status']) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'IN_PROGRESS':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Action Items</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Action
        </button>
      </div>

      <div className="space-y-4">
        {actionItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              'p-4 rounded-lg border transition-colors',
              item.status === 'COMPLETED' ? 'bg-gray-50' : 'bg-white'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-xs text-gray-500">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Assigned to: {item.assignedTo}
                    </span>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getPriorityColor(item.priority)
                    )}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.status !== 'COMPLETED' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'COMPLETED')}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Mark Complete
                  </button>
                )}
                {item.status === 'PENDING' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'IN_PROGRESS')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {actionItems.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No action items yet
          </div>
        )}
      </div>

      {showAddModal && (
        <AddActionItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAction}
        />
      )}
    </div>
  );
}