import { Button } from "@/components/ui/button";
import { Shield, Lock, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Lock className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-primary">SecureShare</span>
            </div>
            <div className="flex space-x-4">
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Secure File Sharing</span>
            <span className="block text-primary">Made Simple</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Share files with confidence using military-grade encryption. Your data security is our top priority.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/register">Start Sharing Securely</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">End-to-End Encryption</h3>
              <p className="mt-2 text-gray-500">
                Your files are encrypted before they leave your device, ensuring maximum security.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center">
                <Lock className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Multi-Factor Authentication</h3>
              <p className="mt-2 text-gray-500">
                Additional layer of security with MFA support using authenticator apps.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center">
                <Share2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Secure Sharing</h3>
              <p className="mt-2 text-gray-500">
                Share files with expiring links and granular access controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;