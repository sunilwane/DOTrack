import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="flex bg-background-light dark:bg-background-dark min-h-screen">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
          <Topbar />
          <Outlet />
        </main>
      </div>
    </SmoothScrollProvider>
  );
};
