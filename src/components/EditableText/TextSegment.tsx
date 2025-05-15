
import React from 'react';
import { cn } from '@/lib/utils';

export interface TextSegment {
  text: string;
  bold: boolean;
  fontSize: number;
}

interface TextSegmentProps {
  segments: TextSegment[];
}

const TextSegmentRenderer: React.FC<TextSegmentProps> = ({
  segments
}) => {
  // Helper function to convert newlines to <br/> tags
  const formatTextWithLineBreaks = (text: string) => {
    // Split text by newline character
    const lines = text.split('\n');
    return lines.map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {segments.map((segment, index) => (
        <span
          key={index}
          className={cn(
            segment.bold ? 'font-bold' : 'font-normal'
          )}
          style={{ fontSize: `${segment.fontSize}px` }}
        >
          {formatTextWithLineBreaks(segment.text)}
        </span>
      ))}
    </>
  );
};

export default TextSegmentRenderer;
