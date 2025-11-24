import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Cases from "./pages/Cases";
import CaseMedicineBeauty from "./pages/CaseMedicineBeauty";
import CaseConstruction from "./pages/CaseConstruction";
import CaseHoreca from "./pages/CaseHoreca";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/medicine-beauty" element={<CaseMedicineBeauty />} />
          <Route path="/cases/construction" element={<CaseConstruction />} />
          <Route path="/cases/horeca" element={<CaseHoreca />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
