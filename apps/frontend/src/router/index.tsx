import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Project/Project";
import Deployments from "../pages/Deployments/Deployments";
import { AppLayout } from "../Components/layout/AppLayout";

export const AppRouter = () => (
  <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/deployments" element={<Deployments />} />
      </Routes>
    </AppLayout>
  </BrowserRouter>
);
