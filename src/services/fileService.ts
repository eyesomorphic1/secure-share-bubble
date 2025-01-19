import { apiClient } from '@/lib/api-client';
import type { File } from '@/store/slices/fileSlice';

// Mock data for development
const mockFiles: File[] = [
  { 
    id: '1', 
    name: 'document.pdf', 
    size: '2.5 MB', 
    shared: true, 
    uploadDate: '2024-01-19 14:30',
    ownerId: '1',
    uploadedBy: 'John Doe',
    type: 'pdf',
    url: 'https://example.com/document.pdf',
    encrypted: false
  },
  { 
    id: '2', 
    name: 'image.jpg', 
    size: '1.8 MB', 
    shared: false, 
    uploadDate: '2024-01-18 09:15',
    ownerId: '2',
    uploadedBy: 'Jane Smith',
    type: 'image',
    url: 'https://example.com/image.jpg',
    encrypted: false
  },
  { 
    id: '3', 
    name: 'presentation.pptx', 
    size: '5.2 MB', 
    shared: true, 
    uploadDate: '2024-01-17 11:20',
    ownerId: '1',
    uploadedBy: 'John Doe',
    type: 'pptx',
    url: 'https://example.com/presentation.pptx',
    encrypted: false
  },
];

export const fetchFiles = async (): Promise<File[]> => {
  // This will be replaced with actual API call later
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFiles), 1000);
  });
};

export const deleteFile = async (fileId: string): Promise<void> => {
  // This will be replaced with actual API call later
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

export const shareFile = async (fileId: string): Promise<void> => {
  // This will be replaced with actual API call later
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};