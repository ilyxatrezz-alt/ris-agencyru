import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
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
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
