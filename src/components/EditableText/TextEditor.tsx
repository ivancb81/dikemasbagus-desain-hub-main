
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, ALargeSmall, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TextSegment } from './TextSegment';
import { Slider } from '@/components/ui/slider';

interface TextEditorProps {
  segments: TextSegment[];
  setSegments: React.Dispatch<React.SetStateAction<TextSegment[]>>;
  onSave: () => void;
  onCancel: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  segments,
  setSegments,
  onSave,
  onCancel
}) => {
  const [isBold, setIsBold] = useState(segments[0]?.bold || false);
  const [fontSize, setFontSize] = useState(segments[0]?.fontSize || 16);
  
  // Update text content while preserving line breaks
  const updateSegmentText = (text: string) => {
    const newSegments = [...segments];
    newSegments[0] = { ...newSegments[0], text };
    setSegments(newSegments);
  };
  
  // Toggle bold for the entire segment
  const toggleBold = () => {
    const newBoldState = !isBold;
    setIsBold(newBoldState);
    
    const newSegments = [...segments];
    newSegments[0] = { 
      ...newSegments[0], 
      bold: newBoldState
    };
    setSegments(newSegments);
  };
  
  // Update font size for the entire segment
  const updateFontSize = (value: number[]) => {
    const newFontSize = value[0];
    setFontSize(newFontSize);
    
    const newSegments = [...segments];
    newSegments[0] = { ...newSegments[0], fontSize: newFontSize };
    setSegments(newSegments);
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-2">
      {/* Format toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-t border border-gray-200">
        <Button 
          variant={isBold ? "default" : "outline"} 
          size="sm" 
          onClick={toggleBold}
          className={cn(
            "h-8 w-8 p-0",
            isBold && "bg-brand-green hover:bg-brand-green/90"
          )}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 ml-4">
          <ALargeSmall className="h-4 w-4 text-gray-500" />
          <Slider
            className="w-24"
            value={[fontSize]}
            min={12}
            max={24}
            step={1}
            onValueChange={updateFontSize}
          />
          <span className="text-sm text-gray-500">
            {fontSize}px
          </span>
        </div>
      </div>
      
      {/* Display text being edited - preserving line breaks */}
      <Textarea 
        value={segments[0]?.text || ""}
        onChange={(e) => updateSegmentText(e.target.value)}
        rows={8}
        className={cn(
          "text-gray-600 text-base resize-none",
          isBold ? "font-bold" : "font-normal"
        )}
        style={{ 
          fontSize: `${fontSize}px`
        }}
      />
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button 
          size="sm" 
          onClick={onSave}
          className="h-8 px-3 bg-brand-green hover:bg-brand-green/90"
        >
          <Check className="h-4 w-4 mr-1" /> Save
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          className="h-8 px-3"
        >
          <X className="h-4 w-4 mr-1" /> Cancel
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
