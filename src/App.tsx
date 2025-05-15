
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServicesProvider } from "@/context/ServicesContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import BriefAnalysis from "./pages/BriefAnalysis";
import NgobrolKemasan from "./pages/NgobrolKemasan";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Portfolio from "./pages/Portfolio";
import Ebook from "./pages/Ebook";
import Workshop from "./pages/Workshop";
import PrintHub from "./pages/PrintHub"; 
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ServicesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/brief-analysis" element={<BriefAnalysis />} />
            <Route path="/ngobrol-kemasan" element={<NgobrolKemasan />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/print-hub" element={<PrintHub />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ServicesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
