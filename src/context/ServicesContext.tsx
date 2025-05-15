
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ServiceItem } from '@/data/initialServices';
import { useServicesStorage } from '@/hooks/use-services-storage';
import { useServicesImageEditor } from '@/hooks/use-services-image-editor';

// Define the context shape
type ServicesContextType = {
  services: ServiceItem[];
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  isLoading: boolean | number | null;
  storageUsage: number;
  handleImageChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleResetImages: () => void;
  needsUpdate: boolean;
  handleUpdateTextContent?: () => void;
  hasLoadError: boolean;
};

// Create context with default values
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Provider component
export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  // Use a ref to track initialization
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use the original hooks for implementation
  const { 
    services, 
    setServices, 
    storageUsage, 
    handleResetImages,
    needsUpdate,
    handleUpdateTextContent,
    isLoading: storageLoading,
    hasLoadError
  } = useServicesStorage();
  
  const { 
    isEditMode, 
    setIsEditMode, 
    isLoading: imageLoading,
    handleImageChange 
  } = useServicesImageEditor(services, setServices);

  // Add event listener for sessionStorage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'servicesEditMode') {
        const newEditMode = event.newValue === 'true';
        setIsEditMode(newEditMode);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Mark as initialized
    setIsInitialized(true);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setIsEditMode]);

  // Combine loading states
  const isLoading = storageLoading || imageLoading;
  
  // Context value
  const contextValue = {
    services,
    isEditMode,
    setIsEditMode,
    isLoading,
    storageUsage,
    handleImageChange,
    handleResetImages,
    needsUpdate,
    handleUpdateTextContent,
    hasLoadError
  };

  // Only render children once initialized
  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
};

// Custom hook for using the services context
export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
