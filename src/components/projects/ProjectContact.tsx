import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Participant } from '../../types/participant';

interface ProjectContactProps {
  project: Participant;
}

export default function ProjectContact({ project }: ProjectContactProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${project.address}, ${project.city}, ${project.postalCode}`
  )}`;

  const handleCall = () => {
    window.location.href = `tel:${project.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${project.email}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Phone className="h-5 w-5 mr-2" />
            <span>{project.phone}</span>
          </div>
          <button
            onClick={handleCall}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Call
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Mail className="h-5 w-5 mr-2" />
            <span>{project.email}</span>
          </div>
          <button
            onClick={handleEmail}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Email
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-1" />
            <div>
              <p className="text-gray-500">{project.address}</p>
              <p className="text-gray-500">{project.city}, {project.postalCode}</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center mt-2"
              >
                View on Google Maps
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}