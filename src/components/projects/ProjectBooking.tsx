import { Calendar, Clock } from 'lucide-react';
import { Participant } from '../../types/participant';

interface ProjectBookingProps {
  project: Participant;
}

export default function ProjectBooking({ project }: ProjectBookingProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Initial Audit</p>
            <p className="text-sm text-gray-500">March 20, 2024</p>
            <p className="text-sm text-gray-500">9:30 AM</p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Final Audit</p>
            <p className="text-sm text-gray-500">Not yet scheduled</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Booking Notes</h3>
          <p className="text-sm text-gray-500">{project.notes || 'No booking notes available'}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Program Details</h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Program:</span> {project.program}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Property Type:</span> {project.propertyType}
          </p>
        </div>
      </div>
    </div>
  );
}