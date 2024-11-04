import { useState } from 'react';
import { X, Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  onSave: (fields: FormField[]) => void;
  onCancel: () => void;
}

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'textarea', label: 'Text Area' },
] as const;

export default function FormBuilder({ onSave, onCancel }: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [draggedField, setDraggedField] = useState<number | null>(null);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        label: '',
        type: 'text',
        required: false,
      },
    ]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    setFields(fields.map((field, i) => 
      i === index ? { ...field, ...updates } : field
    ));
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedField(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedField === null) return;

    const newFields = [...fields];
    const [draggedItem] = newFields.splice(draggedField, 1);
    newFields.splice(index, 0, draggedItem);
    setFields(newFields);
    setDraggedField(index);
  };

  const handleDragEnd = () => {
    setDraggedField(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Form Builder</h2>
            <p className="mt-1 text-sm text-gray-500">Design your data collection form</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <button
            onClick={addField}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mx-auto" />
            <span className="mt-1 block">Add Field</span>
          </button>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'bg-white rounded-lg border p-4 shadow-sm',
                  draggedField === index && 'opacity-50'
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Label</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Field Label"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, { 
                          type: e.target.value as FormField['type'],
                          options: e.target.value === 'select' ? [''] : undefined
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {FIELD_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(index, { required: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Required</span>
                      </label>

                      <button
                        onClick={() => removeField(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {field.type === 'select' && (
                  <div className="mt-4 pl-9">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                    <div className="space-y-2">
                      {field.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(field.options || [])];
                              newOptions[optionIndex] = e.target.value;
                              updateField(index, { options: newOptions });
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <button
                            onClick={() => {
                              const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                              updateField(index, { options: newOptions });
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newOptions = [...(field.options || []), ''];
                          updateField(index, { options: newOptions });
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(fields)}
            disabled={fields.length === 0}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium text-white',
              fields.length === 0
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            )}
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}