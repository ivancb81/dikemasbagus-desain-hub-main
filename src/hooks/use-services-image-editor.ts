
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ServiceItem } from '@/data/initialServices';
import { aggressivelyCompressImage } from '@/utils/imageUtils';

// Maximum size per image
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

export const useServicesImageEditor = (services: ServiceItem[], setServices: (services: ServiceItem[]) => void) => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState<number | null>(null);
  
  // Initialize edit mode state from sessionStorage and maintain synchronization
  useEffect(() => {
    const savedEditMode = sessionStorage.getItem('servicesEditMode') === 'true';
    if (savedEditMode !== isEditMode) {
      setIsEditMode(savedEditMode);
    }
  }, []);

  // Sync edit mode changes to sessionStorage
  useEffect(() => {
    if (isEditMode) {
      sessionStorage.setItem('servicesEditMode', 'true');
    } else {
      sessionStorage.removeItem('servicesEditMode');
    }
  }, [isEditMode]);
  
  // Image change handler with improved error handling
  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Mohon unggah file gambar yang valid (JPG, PNG, GIF).",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size
      if (file.size > 8 * 1024 * 1024) { // 8MB
        toast({
          title: "Gambar terlalu besar",
          description: "Ukuran gambar melebihi 8MB. Mohon pilih gambar yang lebih kecil.",
          variant: "destructive",
        });
        return;
      }
      
      // Mark this card as loading
      setIsLoading(index);
      
      try {
        // Use aggressive compression to ensure image fits within size limits
        const compressedImageData = await aggressivelyCompressImage(file, MAX_IMAGE_SIZE);
        
        // Update the services array with the compressed image
        const updatedServices = [...services];
        updatedServices[index] = {
          ...updatedServices[index],
          imageSrc: compressedImageData
        };
        
        setServices(updatedServices);
        
        toast({
          title: "Gambar telah diperbarui",
          description: "Gambar untuk layanan ini telah berhasil diubah dan disimpan.",
        });
      } catch (error) {
        toast({
          title: "Gagal memproses gambar",
          description: "Terjadi kesalahan saat memproses gambar. Silakan coba lagi.",
          variant: "destructive",
        });
        console.error("Image processing error:", error);
      } finally {
        setIsLoading(null);
      }
    }
  };

  return {
    isEditMode,
    setIsEditMode,
    isLoading,
    handleImageChange
  };
};
