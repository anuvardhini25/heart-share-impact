import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import HelpRequests from "./pages/HelpRequests";
import NGODirectory from "./pages/NGODirectory";
import ImpactStories from "./pages/ImpactStories";
import VolunteerPage from "./pages/VolunteerPage";
import DonationFlow from "./pages/DonationFlow";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import NGOAdminDashboard from "./pages/dashboard/NGOAdminDashboard";
import VolunteerDashboard from "./pages/dashboard/VolunteerDashboard";
import BeneficiaryDashboard from "./pages/dashboard/BeneficiaryDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/help-requests" element={<HelpRequests />} />
            <Route path="/ngo-directory" element={<NGODirectory />} />
            <Route path="/impact-stories" element={<ImpactStories />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/donate/:requestId" element={<DonationFlow />} />
            <Route path="/dashboard/donor/*" element={<DonorDashboard />} />
            <Route path="/dashboard/ngo-admin/*" element={<NGOAdminDashboard />} />
            <Route path="/dashboard/volunteer/*" element={<VolunteerDashboard />} />
            <Route path="/dashboard/beneficiary/*" element={<BeneficiaryDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
