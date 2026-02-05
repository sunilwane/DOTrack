import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Project/Project";
import Deployments from "../pages/Deployments/Deployments";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import ConnectWallet from "../pages/ConnectWallet/ConnectWallet";
import AuditDashboard from "../pages/AuditLogs/AuditLogs";
import Pipeline from "../pages/Pipeline/Pipeline";

import { AppLayout } from "../Components/layout/AppLayout";

export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/connect" element={<ConnectWallet />} />

      <Route element={<AppLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/pipelines" element={<Pipeline />} />
        <Route path="/audit-logs" element={<AuditDashboard />} />

      </Route>

    </Routes>
  );
};
