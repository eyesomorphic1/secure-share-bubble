import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from './store/store';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import FileViewer from './pages/files/FileViewer';
import FileSharing from './pages/files/FileSharing';
import SetupMFA from './pages/auth/SetupMFA';

const App = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup-mfa" element={<SetupMFA />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/files/:fileId" element={<FileViewer />} />
            <Route path="/files/:fileId/share" element={<FileSharing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
};

export default App;