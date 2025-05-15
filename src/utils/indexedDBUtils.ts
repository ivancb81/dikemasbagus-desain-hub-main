
/**
 * IndexedDB utility for storing and retrieving service images
 * Provides better storage capacity (50MB+) compared to localStorage (5MB)
 */

// Database configuration
const DB_NAME = 'dikemasbagusDB';
const DB_VERSION = 3; // Incremented to add better error handling
const SERVICES_STORE = 'services';
const VERSION_STORE = 'versions'; 
const SESSION_STORE = 'session'; // New store to track session data

/**
 * Initialize the IndexedDB database
 * @returns A promise that resolves when the database is ready
 */
export const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // Open connection to IndexedDB
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    // Handle database upgrade (first time or version change)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for services if it doesn't exist
      if (!db.objectStoreNames.contains(SERVICES_STORE)) {
        db.createObjectStore(SERVICES_STORE, { keyPath: 'id' });
      }
      
      // Create object store for versions if it doesn't exist
      if (!db.objectStoreNames.contains(VERSION_STORE)) {
        db.createObjectStore(VERSION_STORE, { keyPath: 'key' });
      }
      
      // Create object store for session data
      if (!db.objectStoreNames.contains(SESSION_STORE)) {
        db.createObjectStore(SESSION_STORE, { keyPath: 'key' });
      }
    };
    
    // Handle success
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    // Handle errors
    request.onerror = (event) => {
      console.error('Database initialization error:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

/**
 * Save services data to IndexedDB with retry mechanism
 * @param services The services data to save
 * @param version The version of the data being saved
 * @returns A promise that resolves when the data is saved
 */
export const saveServicesToIndexedDB = async (services: any[], version: number): Promise<void> => {
  const retries = 3;
  let attempt = 0;
  
  while (attempt < retries) {
    try {
      const db = await initDatabase();
      const transaction = db.transaction([SERVICES_STORE, VERSION_STORE], 'readwrite');
      const store = transaction.objectStore(SERVICES_STORE);
      const versionStore = transaction.objectStore(VERSION_STORE);
      
      // Clear existing data
      store.clear();
      
      // Save each service with a unique ID
      services.forEach((service, index) => {
        const serviceWithId = {
          ...service,
          id: `service-${index}`
        };
        store.add(serviceWithId);
      });
      
      // Save the version number
      versionStore.put({ key: 'servicesVersion', value: version });
      
      // Save last update timestamp
      versionStore.put({ key: 'lastUpdate', value: new Date().getTime() });
      
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          // Also save session marker to indicate successful save
          updateSessionData('servicesInitialized', true);
          resolve();
        };
        transaction.onerror = (event) => {
          console.error('Transaction error:', (event.target as IDBTransaction).error);
          reject((event.target as IDBTransaction).error);
        };
      });
    } catch (error) {
      attempt++;
      console.error(`Error saving services (attempt ${attempt}/${retries}):`, error);
      
      if (attempt >= retries) {
        console.error('Max retry attempts reached. Could not save services.');
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
};

/**
 * Load services data from IndexedDB with fallback to default
 * @returns A promise that resolves with the services data
 */
export const loadServicesFromIndexedDB = async (): Promise<any[]> => {
  try {
    const db = await initDatabase();
    const transaction = db.transaction([SERVICES_STORE], 'readonly');
    const store = transaction.objectStore(SERVICES_STORE);
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        // Sort by ID to maintain original order
        const results = request.result.sort((a, b) => {
          const idA = parseInt(a.id.split('-')[1]);
          const idB = parseInt(b.id.split('-')[1]);
          return idA - idB;
        });
        
        // Successfully loaded data
        if (results.length > 0) {
          // Also mark session as initialized
          updateSessionData('servicesInitialized', true);
        }
        
        resolve(results);
      };
      request.onerror = (event) => {
        console.error('Load request error:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  } catch (error) {
    console.error('Error loading services from IndexedDB:', error);
    throw error;
  }
};

/**
 * Get the stored data version from IndexedDB
 * @returns A promise that resolves with the version number or null if not found
 */
export const getStoredVersion = async (key: string = 'servicesVersion'): Promise<number | null> => {
  try {
    const db = await initDatabase();
    const transaction = db.transaction([VERSION_STORE], 'readonly');
    const store = transaction.objectStore(VERSION_STORE);
    const request = store.get(key);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.value);
        } else {
          resolve(null); // No version stored yet
        }
      };
      request.onerror = (event) => {
        console.error('Version request error:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  } catch (error) {
    console.error('Error getting stored version from IndexedDB:', error);
    return null;
  }
};

/**
 * Store or update session data
 */
export const updateSessionData = async (key: string, value: any): Promise<void> => {
  try {
    const db = await initDatabase();
    const transaction = db.transaction([SESSION_STORE], 'readwrite');
    const store = transaction.objectStore(SESSION_STORE);
    
    store.put({ key, value });
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject((event.target as IDBTransaction).error);
    });
  } catch (error) {
    console.error('Error updating session data:', error);
  }
};

/**
 * Get session data
 */
export const getSessionData = async (key: string): Promise<any> => {
  try {
    const db = await initDatabase();
    const transaction = db.transaction([SESSION_STORE], 'readonly');
    const store = transaction.objectStore(SESSION_STORE);
    const request = store.get(key);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.value);
        } else {
          resolve(null);
        }
      };
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  } catch (error) {
    console.error('Error getting session data:', error);
    return null;
  }
};

/**
 * Check if we have any saved services in IndexedDB
 * @returns A promise that resolves with a boolean indicating if services exist
 */
export const hasStoredServices = async (): Promise<boolean> => {
  try {
    const services = await loadServicesFromIndexedDB();
    return services.length > 0;
  } catch (error) {
    console.error('Error checking for stored services:', error);
    return false;
  }
};

/**
 * Clear all services data from IndexedDB
 * @returns A promise that resolves when the data is cleared
 */
export const clearServicesFromIndexedDB = async (): Promise<void> => {
  try {
    const db = await initDatabase();
    const transaction = db.transaction([SERVICES_STORE], 'readwrite');
    const store = transaction.objectStore(SERVICES_STORE);
    store.clear();
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject((event.target as IDBTransaction).error);
    });
  } catch (error) {
    console.error('Error clearing services from IndexedDB:', error);
    throw error;
  }
};
