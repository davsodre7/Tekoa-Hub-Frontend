import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { About } from "@/pages/About";
import NotFound from "./pages/NotFound";
import ContentDetail from './pages/ContentDetail';
import ContentList from './pages/ContentList';
import ContentForm from './pages/ContentForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/conteudos" element={<ContentList />} />
        <Route path="/admin/conteudos/novo" element={<ContentForm />} />
        <Route path="/admin/conteudos/:id/editar" element={<ContentForm />} />
        <Route path="/admin/conteudos/:id" element={<ContentForm />} />
        <Route path="/explore/:id" element={<ContentDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
