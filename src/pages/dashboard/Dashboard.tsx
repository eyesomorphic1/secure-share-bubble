import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Upload, Download, Share2, Trash2, Search, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from '@/store/store';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // Dummy data for demonstration
  const files = [
    { 
      id: '1', 
      name: 'document.pdf', 
      size: '2.5 MB', 
      shared: true, 
      createdAt: '2024-01-19', 
      ownerId: '1',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-01-19 14:30',
      lastModified: '2024-01-19 15:45'
    },
    { 
      id: '2', 
      name: 'image.jpg', 
      size: '1.8 MB', 
      shared: false, 
      createdAt: '2024-01-18', 
      ownerId: '2',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-01-18 09:15',
      lastModified: '2024-01-18 09:15'
    },
    { 
      id: '3', 
      name: 'presentation.pptx', 
      size: '5.2 MB', 
      shared: true, 
      createdAt: '2024-01-17', 
      ownerId: '1',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-01-17 11:20',
      lastModified: '2024-01-19 16:30'
    },
  ];

  // Filter files based on search query
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File uploaded successfully",
    });
  };

  const handleFileDelete = (fileId: string) => {
    // Only admin and file owner can delete
    toast({
      title: "File Deleted",
      description: "File has been removed",
    });
  };

  const canUploadFiles = userRole !== 'guest';
  const canDeleteFile = (fileOwnerId: string) => {
    return userRole === 'admin' || (userRole === 'user' && fileOwnerId === '1'); // '1' is dummy current user ID
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
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {file.uploadedBy}
                    </TableCell>
                    <TableCell>{file.uploadedAt}</TableCell>
                    <TableCell>{file.lastModified}</TableCell>
                    <TableCell>
                      {file.shared ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Shared
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Private
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        {userRole !== 'guest' && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/files/${file.id}/share`}>
                              <Share2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {canDeleteFile(file.ownerId) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleFileDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;