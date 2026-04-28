import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import ProtectedRoute from "./components/ProtectedRoute";
import SnowEffect from "./components/SnowEffect";
import { useSiteSettingsMap, getSetting } from "./hooks/useSiteSettings";
import Index from "./pages/Index";
import CityIndex from "./pages/CityIndex";
import Services from "./pages/Services";
import Cases from "./pages/Cases";
import CaseMedicineBeauty from "./pages/CaseMedicineBeauty";
import CaseConstruction from "./pages/CaseConstruction";
import CaseHoreca from "./pages/CaseHoreca";
import CaseLawyers from "./pages/CaseLawyers";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import WebDevelopment from "./pages/WebDevelopment";
import Smm from "./pages/Smm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CrmDashboard from "./pages/CrmDashboard";
import CrmClientDetail from "./pages/CrmClientDetail";
import CrmTasks from "./pages/CrmTasks";
import CrmAccounting from "./pages/CrmAccounting";
import Brief from "./pages/Brief";
import UsaScript from "./pages/UsaScript";
import AntiAging from "./pages/AntiAging";
import Manifest from "./pages/Manifest";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const { settings } = useSiteSettingsMap();
  const snowEnabled = getSetting(settings, "effects_snow_enabled", "false") === "true";

  return (
    <>
      {snowEnabled && <SnowEffect />}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                {/* City-specific routes */}
                <Route path="/rostov-na-donu" element={<CityIndex />} />
                <Route path="/moscow" element={<CityIndex />} />
                <Route path="/krasnodar" element={<CityIndex />} />
                <Route path="/donetsk" element={<CityIndex />} />
                <Route path="/services" element={<Services />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/cases/medicine-beauty" element={<CaseMedicineBeauty />} />
                <Route path="/cases/construction" element={<CaseConstruction />} />
                <Route path="/cases/horeca" element={<CaseHoreca />} />
                <Route path="/cases/lawyers" element={<CaseLawyers />} />
                <Route path="/web-development" element={<WebDevelopment />} />
                <Route path="/smm" element={<Smm />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/brief" element={<Brief />} />
                <Route path="/usa-script-ris" element={<UsaScript />} />
                <Route path="/project-anti-aging" element={<AntiAging />} />
                <Route path="/project-manifest-barbershop" element={<Manifest />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route path="/crm" element={<ProtectedRoute><CrmDashboard /></ProtectedRoute>} />
                <Route path="/crm/tasks" element={<ProtectedRoute><CrmTasks /></ProtectedRoute>} />
                <Route path="/crm/accounting" element={<ProtectedRoute><CrmAccounting /></ProtectedRoute>} />
                <Route path="/crm/:id" element={<ProtectedRoute><CrmClientDetail /></ProtectedRoute>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </>
        );
      };

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
