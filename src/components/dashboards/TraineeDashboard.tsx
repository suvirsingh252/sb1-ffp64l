import { useParticipantStore } from '../../store/participants';
import { Book, CheckSquare } from 'lucide-react';

const TRAINING_MODULES = [
  {
    id: 1,
    title: 'Introduction to Energy Auditing',
    description: 'Learn the basics of energy auditing and its importance',
    completed: true,
  },
  {
    id: 2,
    title: 'Home Assessment Techniques',
    description: 'Detailed guide on conducting thorough home assessments',
    completed: true,
  },
  {
    id: 3,
    title: 'Energy Efficiency Measures',
    description: 'Understanding various energy efficiency improvements',
    completed: false,
  },
  {
    id: 4,
    title: 'Report Writing',
    description: 'How to create comprehensive energy audit reports',
    completed: false,
  },
];

export default function TraineeDashboard() {
  const { participants } = useParticipantStore();
  const completedModules = TRAINING_MODULES.filter(m => m.completed).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Training Progress</h3>
              <p className="text-2xl font-semibold text-blue-600">
                {completedModules} / {TRAINING_MODULES.length} Modules
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Training Modules</h2>
          <p className="mt-1 text-sm text-gray-500">
            Complete all modules to become a certified Energy Advisor
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {TRAINING_MODULES.map((module) => (
            <div key={module.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center">
                    {module.title}
                    {module.completed && (
                      <CheckSquare className="h-4 w-4 text-green-500 ml-2" />
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{module.description}</p>
                </div>
                <button
                  className={`ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                    module.completed
                      ? 'text-green-700 bg-green-100'
                      : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={module.completed}
                >
                  {module.completed ? 'Completed' : 'Start Module'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Observation Mode</h2>
          <p className="mt-1 text-sm text-gray-500">
            View ongoing audits to learn from experienced advisors
          </p>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500">
            No active audits available for observation at this time
          </div>
        </div>
      </div>
    </div>
  );
}