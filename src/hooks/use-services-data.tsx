
import { useServices } from '@/context/ServicesContext';

/**
 * Main hook for services data management
 * Uses the centralized services context
 */
export const useServicesData = () => {
  // Get all services data from the context
  const servicesData = useServices();
  return servicesData;
};
