import { useState } from 'react';
import { Upload, File, Image, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DocumentUploadProps {
  programId: string;
  stage: 'INITIAL_AUDIT' | 'FINAL_AUDIT' | 'POST_RETROFIT';
}

export default function ProjectDocuments({ programId, stage }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: '1',
      name: 'Front-view.jpg',
      type: 'image',
      uploadedAt: '2024-03-15'
    },
    {
      id: '2',
      name: 'Initial-assessment.pdf',
      type: 'document',
      uploadedAt: '2024-03-15'
    }
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Documents & Images</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drag and drop files here, or{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              browse
            </button>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: 10MB
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              {doc.type === 'image' ? (
                <Image className="h-5 w-5 text-blue-500" />
              ) : (
                <File className="h-5 w-5 text-purple-500" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleDelete(doc.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}