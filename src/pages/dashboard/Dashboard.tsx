import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Upload, Download, Share2, Trash2, Search, 
  FileText, FileImage, FileVideo, File,
  ArrowUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from '@/store/store';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  // Dummy data for demonstration
  const files = [
    { 
      id: '1', 
      name: 'document.pdf', 
      size: '2.5 MB', 
      shared: true, 
      uploadDate: '2024-01-19 14:30',
      ownerId: '1',
      uploadedBy: 'John Doe',
      type: 'pdf',
      url: 'https://example.com/document.pdf'
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
      url: 'https://example.com/image.jpg'
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
      url: 'https://example.com/presentation.pptx'
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'image':
        return <FileImage className="h-6 w-6 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // Sort files based on selected criteria
  const getSortedFiles = (files: any[]) => {
    return [...files].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          break;
        case 'size':
          const sizeA = parseFloat(a.size);
          const sizeB = parseFloat(b.size);
          comparison = sizeA - sizeB;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Filter and sort files
  const filteredAndSortedFiles = getSortedFiles(
    files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File uploaded successfully",
    });
  };

  const handleFileDelete = (fileId: string) => {
    toast({
      title: "File Deleted",
      description: "File has been removed",
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };

  const canUploadFiles = userRole !== 'guest';
  const canDeleteFile = (fileOwnerId: string) => {
    return userRole === 'admin' || (userRole === 'user' && fileOwnerId === currentUserId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Files</h1>
            {canUploadFiles && (
              <Button onClick={handleFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={sortBy}
                  onValueChange={(value: 'name' | 'date' | 'size') => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Upload Date</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="w-10 h-10"
                >
                  <ArrowUpDown className={`h-4 w-4 transform ${
                    sortOrder === 'desc' ? 'rotate-180' : ''
                  }`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {file.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {userRole === 'admin' && (
                        <span className="text-xs text-gray-500">
                          {file.uploadedBy}
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        file.shared ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {file.shared ? 'Shared' : 'Private'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {userRole !== 'guest' && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/files/${file.id}/share`}>
                          <Share2 className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {canDeleteFile(file.ownerId) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileDelete(file.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedFile && (
                <>
                  {getFileIcon(selectedFile.type)}
                  <span>{selectedFile?.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile && (
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={selectedFile.url}
                  className="w-full h-full"
                  title={selectedFile.name}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
