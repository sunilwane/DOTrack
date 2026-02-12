import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";
import Deployments from "../pages/Deployments/Deployments";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import ConnectWallet from "../pages/ConnectWallet/ConnectWallet";
import AuditDashboard from "../pages/AuditLogs/AuditLogs";
import Pipeline from "../pages/Pipeline/Pipeline";
import AllProjects from "../pages/Projects/Projects";
import RegisterProject from "../pages/RegisterProject/RegisterProject";
import VersionHistory from "../pages/VersionHistory/VersionHistory";
import MarketPlace from "../pages/Marketplace/Marketplace";

import { AppLayout } from "../Components/layout/AppLayout";
import { ProtectedRoute } from "../Components/ProtectedRoute";
import { PublicRoute } from "../Components/PublicRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="/connect" element={<ConnectWallet />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/register-project" element={<RegisterProject />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/pipelines" element={<Pipeline />} />
          <Route path="/ipfs-templates" element={<Pipeline />} />
          <Route path="/audit-logs" element={<AuditDashboard />} />
          <Route path="/version-history" element={<VersionHistory />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
};
