
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Earnings from "./pages/Earnings";
import Payments from "./pages/Payments";
import Commissions from "./pages/Commissions";
import Pending from "./pages/Pending";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/commissions" element={<Commissions />} />
          
          {/* Pending Routes */}
          <Route path="/reports" element={<Pending />} />
          <Route path="/profile" element={<Pending />} />
          <Route path="/settings" element={<Pending />} />
          <Route path="/restaurants/:id" element={<Pending />} />
          <Route path="/restaurants/add" element={<Pending />} />
          <Route path="/restaurants/edit/:id" element={<Pending />} />
          <Route path="/users/:id" element={<Pending />} />
          <Route path="/orders/:id" element={<Pending />} />
          <Route path="/orders/:id/invoice" element={<Pending />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
