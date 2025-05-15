
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileUpload: (file: File, extractedText?: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check file type - accept .pdf, .doc, .docx, .txt
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Format file tidak didukung",
        description: "Silakan unggah file dalam format PDF, DOC, DOCX, atau TXT.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ukuran file terlalu besar",
        description: "Maksimal ukuran file adalah 5MB.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);

    // Extract text from file for analysis
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Pass the extracted text along with the file
        setSelectedFile(file);
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // For simplicity, we'll just extract text from TXT files
      // In a real app, you'd use libraries to extract text from PDF/DOC as well
      if (selectedFile.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          onFileUpload(selectedFile, text);
        };
        reader.readAsText(selectedFile);
      } else {
        // For other file types, just pass the file without extracted text
        onFileUpload(selectedFile);
      }
      
      toast({
        title: "File berhasil diunggah",
        description: `${selectedFile.name} sedang dianalisa.`,
      });
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-brand-green bg-brand-green bg-opacity-5' : 'border-gray-300'
        } transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop file brief atau klik untuk memilih
        </p>
        <p className="text-xs text-gray-500">
          Mendukung PDF, DOC, DOCX, TXT (Max 5MB)
        </p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />
      </div>

      {selectedFile && (
        <div className="mt-4">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button onClick={handleUpload} size="sm">
              Analisa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
