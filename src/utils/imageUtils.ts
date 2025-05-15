
/**
 * Compresses an image to a specified max width and quality
 * @param file - The original image file to compress
 * @param maxWidth - Maximum width in pixels (height will scale proportionally)
 * @param quality - Image quality from 0 to 1
 * @returns Promise with compressed image as data URL
 */
export const compressImage = (
  file: File, 
  maxWidth = 600, // Default width
  quality = 0.7  // Default quality
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (readerEvent) => {
      const image = new Image();
      
      image.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        
        // Calculate new dimensions if image is larger than maxWidth
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * ratio);
        }
        
        // Set canvas dimensions and draw resized image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Use better image rendering for smoother resizing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, 0, 0, width, height);
        
        // Try WebP format if supported (better compression)
        if (supportWebP()) {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          // If WebP size is smaller, use it
          if (estimateDataUrlSize(webpDataUrl) < estimateDataUrlSize(canvas.toDataURL('image/jpeg', quality))) {
            resolve(webpDataUrl);
            return;
          }
        }
        
        // Fall back to JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      
      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set image source as result from FileReader
      image.src = readerEvent.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Check if browser supports WebP format
 * @returns Boolean indicating WebP support
 */
function supportWebP(): boolean {
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Estimates the size of a data URL in bytes
 * @param dataUrl - The data URL string
 * @returns Approximate size in bytes
 */
export const estimateDataUrlSize = (dataUrl: string): number => {
  // Remove the data URL prefix to get just the base64 data
  const base64 = dataUrl.split(',')[1];
  // Each Base64 digit represents 6 bits, so 4 digits = 3 bytes
  // Need to account for padding as well
  return Math.floor((base64.length * 3) / 4);
};

/**
 * Checks if a dataUrl will fit within size limits
 * @param dataUrl - The data URL to check
 * @param maxSizeInBytes - Maximum size in bytes
 * @returns Boolean indicating if the image fits within limits
 */
export const isWithinStorageLimit = (dataUrl: string, maxSizeInBytes = 1024 * 1024): boolean => {
  const estimatedSize = estimateDataUrlSize(dataUrl);
  return estimatedSize <= maxSizeInBytes;
};

/**
 * Aggressively compresses an image to ensure it fits within size limits
 * @param file - The original image file to compress
 * @param targetSize - Target size in bytes
 * @returns Promise with compressed image as data URL
 */
export const aggressivelyCompressImage = async (file: File, targetSize = 500 * 1024): Promise<string> => {
  // Start with moderate compression
  let result = await compressImage(file, 600, 0.7);
  
  // If the image is still too large, compress more aggressively
  if (estimateDataUrlSize(result) > targetSize) {
    result = await compressImage(file, 500, 0.6);
  }
  
  // Last resort: heavy compression
  if (estimateDataUrlSize(result) > targetSize) {
    result = await compressImage(file, 400, 0.5);
  }
  
  // Final attempt with very aggressive compression
  if (estimateDataUrlSize(result) > targetSize) {
    result = await compressImage(file, 300, 0.3);
  }
  
  return result;
};

/**
 * Check total storage size against maximum storage limit
 * This is less relevant for IndexedDB but kept for reference
 */
export const wouldExceedStorageLimit = (
  newData: string, 
  existingSize: number, 
  maxStorageSize = 50 * 1024 * 1024
): boolean => {
  const newDataSize = estimateDataUrlSize(newData);
  return existingSize + newDataSize > maxStorageSize;
};
