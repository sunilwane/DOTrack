import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Project/Project";
import Deployments from "../pages/Deployments/Deployments";
import Landing from "../pages/Landing/Landing";
import AuditDashboard from "../pages/AuditLogs/AuditLogs";

import { AppLayout } from "../Components/layout/AppLayout";

export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route element={<AppLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/audit-logs" element={<AuditDashboard />} />

      </Route>

    </Routes>
  );
};
