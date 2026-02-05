import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { Scroller } from "../common/Scroller";

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-background-light dark:bg-background-dark h-screen overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Topbar />
        <Scroller 
          className="flex-1" 
          direction="vertical" 
          scrollbarStyle="thin"
          lerp={0.04}
          duration={1.8}
        >
          <Outlet />
        </Scroller>
      </div>
    </div>
  );
};
