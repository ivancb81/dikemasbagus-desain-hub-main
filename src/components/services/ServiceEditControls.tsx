
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Image, HardDrive, AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ServiceEditControlsProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  handleResetImages: () => void;
  handleUpdateTextContent?: () => void;
  needsUpdate?: boolean;
  storageUsage?: number; // Optional storage usage in percentage
}

const ServiceEditControls: React.FC<ServiceEditControlsProps> = ({
  isEditMode,
  setIsEditMode,
  handleResetImages,
  handleUpdateTextContent,
  needsUpdate = false,
  storageUsage = 0
}) => {
  // Define storage warning thresholds
  const isStorageWarning = storageUsage > 70;
  const isStorageCritical = storageUsage > 90;
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Edit Mode Toggle */}
      <Button 
        variant={isEditMode ? "default" : "outline"} 
        size="sm" 
        onClick={() => setIsEditMode(!isEditMode)}
        className="flex items-center gap-1"
      >
        <Eye className="h-4 w-4" />
        {isEditMode ? "Tutup Mode Edit" : "Mode Edit Gambar"}
      </Button>
      
      {/* Reset button */}
      {isEditMode && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResetImages}
          className="flex items-center gap-1 border-red-300 text-red-600 hover:bg-red-50"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Semua Gambar
        </Button>
      )}
      
      {/* Update Content button - only when needed */}
      {needsUpdate && handleUpdateTextContent && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleUpdateTextContent}
          className="flex items-center gap-1 border-amber-300 text-amber-600 hover:bg-amber-50"
        >
          <RefreshCw className="h-4 w-4" />
          Perbarui Konten Teks
        </Button>
      )}
      
      {/* Storage usage warning */}
      {isStorageWarning && (
        <Alert variant={isStorageCritical ? "destructive" : "default"} className="max-w-md py-2 px-4">
          <HardDrive className="h-4 w-4 mr-2" />
          <AlertDescription className="text-xs">
            Penyimpanan: {storageUsage.toFixed(1)}% terpakai
            {isStorageCritical && ". Mohon hapus beberapa gambar!"}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ServiceEditControls;
