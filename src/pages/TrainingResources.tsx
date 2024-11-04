import { useState } from 'react';
import { Search, Play, FileText, Book, CheckCircle, Lock, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz';
  duration?: string;
  completed?: boolean;
  locked?: boolean;
}

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Home Energy Auditing',
    description: 'Learn the fundamentals of conducting residential energy audits',
    type: 'video',
    duration: '15 mins',
    completed: true
  },
  {
    id: '2',
    title: 'Building Envelope Assessment',
    description: 'Comprehensive guide to evaluating building envelopes',
    type: 'document',
    duration: '25 mins',
    completed: true
  },
  {
    id: '3',
    title: 'HVAC Systems Evaluation',
    description: 'Understanding heating, ventilation, and air conditioning systems',
    type: 'video',
    duration: '20 mins',
    completed: false
  },
  {
    id: '4',
    title: 'Energy Efficiency Recommendations',
    description: 'How to provide effective energy-saving recommendations',
    type: 'document',
    duration: '30 mins',
    completed: false
  },
  {
    id: '5',
    title: 'Advanced Audit Techniques',
    description: 'Advanced methods for comprehensive energy assessments',
    type: 'video',
    duration: '45 mins',
    locked: true
  }
];

export default function TrainingResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'document' | 'quiz'>('all');

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const progress = (RESOURCES.filter(r => r.completed).length / RESOURCES.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training Resources</h1>
            <p className="mt-1 text-sm text-gray-500">
              Complete the required training materials to become a certified Energy Advisor
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">Overall Progress</div>
            <div className="w-48 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm font-medium text-gray-900">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
            <option value="quiz">Quizzes</option>
          </select>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={cn(
                "bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow",
                resource.locked && "opacity-75"
              )}
            >
              <div className="flex justify-between items-start">
                <div className={cn(
                  "p-2 rounded-lg",
                  resource.type === 'video' ? 'bg-blue-100' : 'bg-purple-100'
                )}>
                  {resource.type === 'video' ? (
                    <Play className="h-5 w-5 text-blue-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                {resource.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {resource.locked && (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-900">{resource.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.duration}
                </div>
                <button
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium",
                    resource.locked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : resource.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  )}
                  disabled={resource.locked}
                >
                  {resource.completed ? 'Review' : resource.locked ? 'Locked' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}