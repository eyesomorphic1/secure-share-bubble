import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QrCode, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SetupMFA = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSetupMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual MFA setup logic
    toast({
      title: "MFA Setup Complete",
      description: "Your account is now more secure",
    });
    navigate('/dashboard');
  };

  const handleRegenerateQR = () => {
    // TODO: Implement actual QR code regeneration logic
    toast({
      title: "QR Code Regenerated",
      description: "Please scan the new QR code with your authenticator app",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Setup 2FA</CardTitle>
          <CardDescription className="text-center">
            Scan the QR code with your authenticator app
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSetupMFA}>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center relative">
                QR Code Placeholder
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                  onClick={handleRegenerateQR}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Can't scan the QR code? Click the refresh button below it to generate a new one.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-xl tracking-widest"
                maxLength={6}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Verify and Complete Setup
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SetupMFA;