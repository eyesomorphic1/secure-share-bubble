import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FileViewer = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  // Dummy file data for demonstration
  const file = {
    id: fileId,
    name: 'document.pdf',
    type: 'application/pdf',
    size: '2.5 MB',
    url: '#',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{file.name}</h1>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>

            {/* File preview placeholder */}
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              File Preview
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Type:</span> {file.type}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Size:</span> {file.size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileViewer;