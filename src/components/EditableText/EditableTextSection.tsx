import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import TextSegmentRenderer, { TextSegment } from './TextSegment';
import TextEditor from './TextEditor';
interface EditableTextSectionProps {
  initialSegments: TextSegment[];
  onSegmentsUpdate: (segments: TextSegment[]) => void;
}
const EditableTextSection: React.FC<EditableTextSectionProps> = ({
  initialSegments,
  onSegmentsUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [segments, setSegments] = useState<TextSegment[]>([...initialSegments]);
  const handleEdit = () => {
    setSegments([...initialSegments]);
    setIsEditing(true);
  };
  const handleSave = () => {
    onSegmentsUpdate([...segments]);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  return <div className="mb-3 relative">
      {!isEditing ? <div className="group relative border border-transparent hover:border-gray-200 rounded-md p-2">
          
          <button onClick={handleEdit} className="absolute right-2 top-2 opacity-50 group-hover:opacity-100 transition-opacity p-1 bg-gray-100 rounded-full hover:bg-gray-200" aria-label="Edit text">
            <Pencil className="h-4 w-4 text-gray-700" />
          </button>
        </div> : <TextEditor segments={segments} setSegments={setSegments} onSave={handleSave} onCancel={handleCancel} />}
    </div>;
};
export default EditableTextSection;