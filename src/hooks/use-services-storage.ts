
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  iconMapping, 
  initialServices, 
  ServiceItem, 
  getIconName,
  SERVICES_DATA_VERSION 
} from '@/data/initialServices';
import { estimateDataUrlSize } from '@/utils/imageUtils';
import { 
  saveServicesToIndexedDB, 
  loadServicesFromIndexedDB, 
  clearServicesFromIndexedDB,
  hasStoredServices,
  getStoredVersion,
  getSessionData,
  updateSessionData
} from '@/utils/indexedDBUtils';

// Maximum storage size (estimate for IndexedDB)
const MAX_STORAGE_SIZE = 50 * 1024 * 1024; // 50MB

export const useServicesStorage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [storageUsage, setStorageUsage] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [storedVersion, setStoredVersion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  // Load services from IndexedDB on initial render with improved error handling and order preservation
  useEffect(() => {
    const loadServicesData = async () => {
      try {
        setIsLoading(true);
        
        // Check if initialization was successful in this session
        const isInitialized = await getSessionData('servicesInitialized');
        
        // First check if any data is stored
        const hasStored = await hasStoredServices();
        const currentStoredVersion = await getStoredVersion();
        setStoredVersion(currentStoredVersion);
        
        // Check if stored data needs to be updated based on version
        const needsVersionUpdate = currentStoredVersion !== null && currentStoredVersion < SERVICES_DATA_VERSION;
        
        if (hasStored) {
          const storedServices = await loadServicesFromIndexedDB();
          
          // Map the stored services to include the proper icon function
          const servicesWithIcons = storedServices.map((service: any) => {
            // Get the icon component based on stored name
            const IconComponent = iconMapping[service.iconName as keyof typeof iconMapping] || 
                                  iconMapping.Package; // Fallback icon
            
            return {
              ...service,
              icon: IconComponent
            };
          });
          
          // Preserve service order based on initialServices if we have a version mismatch
          if (needsVersionUpdate) {
            // Create an index map of service titles to their position in the initial array
            const initialOrderMap = new Map(initialServices.map((service, index) => [service.title, index]));
            
            // Sort the stored services according to the initial order
            servicesWithIcons.sort((a, b) => {
              const aIndex = initialOrderMap.get(a.title);
              const bIndex = initialOrderMap.get(b.title);
              
              // If both services are in the initial order, sort by their position
              if (aIndex !== undefined && bIndex !== undefined) {
                return aIndex - bIndex;
              }
              
              // If only one is in the initial order, prioritize it
              if (aIndex !== undefined) return -1;
              if (bIndex !== undefined) return 1;
              
              // If neither is in the initial order, maintain current order
              return 0;
            });
            
            setNeedsUpdate(true);
            toast({
              title: "Pembaruan konten tersedia",
              description: "Konten default telah diperbarui. Klik 'Perbarui Teks' untuk melihat perubahan.",
            });
          }
          
          setServices(servicesWithIcons);
          
          // Calculate storage usage
          calculateStorageUsage(servicesWithIcons);
        } else {
          // No stored data, use default and save it
          await saveServicesToIndexedDB(
            initialServices.map(service => ({
              ...service,
              icon: undefined,
              iconName: getIconName(service.icon)
            })), 
            SERVICES_DATA_VERSION
          );
          setStoredVersion(SERVICES_DATA_VERSION);
          // Mark that default data has been initialized
          updateSessionData('servicesInitialized', true);
        }
        
        setHasLoadError(false);
      } catch (error) {
        console.error('Failed to load services from IndexedDB:', error);
        setHasLoadError(true);
        
        // Use default services as fallback
        setServices(initialServices);
        
        toast({
          title: "Error",
          description: "Gagal memuat data layanan. Menggunakan data default.",
          variant: "destructive",
        });
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };
    
    loadServicesData();
  }, [toast]);

  // Save services to IndexedDB whenever they change with improved error handling
  useEffect(() => {
    if (!isInitialized || isLoading) return; // Skip initial render and loading states
    
    const saveServices = async () => {
      try {
        // Prepare services for storage
        const servicesForStorage = services.map(service => {
          // Convert icon component to string name for storage
          const iconName = getIconName(service.icon);
          
          return {
            ...service,
            icon: undefined, // Remove the function
            iconName // Add icon name string
          };
        });
        
        await saveServicesToIndexedDB(servicesForStorage, SERVICES_DATA_VERSION);
        
        // Update stored version
        setStoredVersion(SERVICES_DATA_VERSION);
        
        // Calculate new storage usage
        calculateStorageUsage(services);
      } catch (error) {
        console.error('Failed to save services to IndexedDB:', error);
        toast({
          title: "Kesalahan",
          description: "Gagal menyimpan perubahan. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    };
    
    const timeoutId = setTimeout(() => {
      saveServices();
    }, 500); // Debounce saves to reduce write operations
    
    return () => clearTimeout(timeoutId);
  }, [services, isInitialized, isLoading, toast]);

  // Calculate storage usage for all image data
  const calculateStorageUsage = (currentServices: ServiceItem[]) => {
    try {
      // Calculate total size of all images
      let totalSize = 0;
      
      currentServices.forEach(service => {
        if (service.imageSrc && typeof service.imageSrc === 'string' && service.imageSrc.startsWith('data:')) {
          totalSize += estimateDataUrlSize(service.imageSrc);
        }
      });
      
      // Calculate percentage of storage used (estimate)
      const percentage = Math.floor((totalSize / MAX_STORAGE_SIZE) * 100);
      setStorageUsage(Math.min(percentage, 100)); // Cap at 100%
    } catch (error) {
      console.error('Error calculating storage usage:', error);
    }
  };

  // Reset to default images functionality with improved error handling
  const handleResetImages = async () => {
    if (confirm('Yakin ingin mengembalikan semua gambar ke default? Semua perubahan gambar akan hilang.')) {
      try {
        setIsLoading(true);
        
        // Clear IndexedDB
        await clearServicesFromIndexedDB();
        
        // Reset to initial services
        setServices(initialServices);
        setStorageUsage(0);
        setNeedsUpdate(false);
        setStoredVersion(SERVICES_DATA_VERSION);
        
        // Re-save default data
        const servicesForStorage = initialServices.map(service => ({
          ...service,
          icon: undefined,
          iconName: getIconName(service.icon)
        }));
        
        await saveServicesToIndexedDB(servicesForStorage, SERVICES_DATA_VERSION);
        
        toast({
          title: "Gambar direset",
          description: "Semua gambar layanan telah dikembalikan ke gambar default.",
        });
      } catch (error) {
        console.error('Failed to reset images:', error);
        toast({
          title: "Gagal reset gambar",
          description: "Terjadi kesalahan saat mereset gambar. Silakan coba lagi.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Update text content while preserving images with improved error handling
  const handleUpdateTextContent = async () => {
    try {
      setIsLoading(true);
      
      // Create a map of the current services by title for easy lookup
      const currentServicesMap = services.reduce((acc, service) => {
        acc[service.title] = service;
        return acc;
      }, {} as Record<string, ServiceItem>);
      
      // Merge current service images with updated text content
      const updatedServices = initialServices.map(defaultService => {
        const currentService = currentServicesMap[defaultService.title];
        
        // If we have a stored version of this service, keep its image but update text
        if (currentService) {
          return {
            ...defaultService, // Get updated text content
            imageSrc: currentService.imageSrc // Preserve user's image
          };
        }
        
        // Otherwise use the default service data
        return defaultService;
      });
      
      // Update services with merged data
      setServices(updatedServices);
      setNeedsUpdate(false);
      setStoredVersion(SERVICES_DATA_VERSION);
      
      // Save the updated services to IndexedDB
      const servicesForStorage = updatedServices.map(service => ({
        ...service,
        icon: undefined,
        iconName: getIconName(service.icon)
      }));
      
      await saveServicesToIndexedDB(servicesForStorage, SERVICES_DATA_VERSION);
      
      toast({
        title: "Konten diperbarui",
        description: "Teks layanan telah diperbarui ke versi terbaru.",
      });
    } catch (error) {
      console.error('Failed to update text content:', error);
      toast({
        title: "Gagal memperbarui konten",
        description: "Terjadi kesalahan saat memperbarui teks. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    services,
    setServices,
    storageUsage,
    handleResetImages,
    needsUpdate,
    storedVersion,
    currentVersion: SERVICES_DATA_VERSION,
    handleUpdateTextContent,
    isLoading: isLoading,
    hasLoadError
  };
};
