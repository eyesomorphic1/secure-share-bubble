import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Link as LinkIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const FileSharing = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shareLink, setShareLink] = useState('https://example.com/share/abc123');
  const [expiryTime, setExpiryTime] = useState('24h');
  const [allowDownload, setAllowDownload] = useState(true);
  const [email, setEmail] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard",
    });
  };

  const handleShareWithUser = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual sharing logic
    toast({
      title: "Share Success",
      description: `File shared with ${email}`,
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold mb-6">Share File</h1>

            {/* Share Link Section */}
            <div className="space-y-4 mb-8">
              <h2 className="text-lg font-semibold">Share via Link</h2>
              <div className="flex space-x-2">
                <Input value={shareLink} readOnly />
                <Button onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Link Expiry</Label>
                  <Select value={expiryTime} onValueChange={setExpiryTime}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select expiry time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="allow-download">Allow Download</Label>
                  <Switch
                    id="allow-download"
                    checked={allowDownload}
                    onCheckedChange={setAllowDownload}
                  />
                </div>
              </div>
            </div>

            {/* Share with User Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Share with User</h2>
              <form onSubmit={handleShareWithUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileSharing;