import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogoWithText } from "../common/Logo";
import { Scroller } from "../common/Scroller";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backgroundVariant?: "node" | "mesh";
  maxWidth?: string;
  showLogo?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  backgroundVariant = "node",
  maxWidth = "max-w-[440px]",
}) => {
  const navigate = useNavigate();

  const bgClass = backgroundVariant === "mesh" ? "bg-gradient-mesh" : "node-bg";

  const glassClass =
    backgroundVariant === "mesh"
      ? "glass-card border border-white/10"
      : "bg-slate-950/95 border border-slate-800 shadow-2xl";

  return (
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 flex flex-col overflow-hidden ${bgClass}`}
    >
      <header className="w-full px-6 lg:px-12 py-5 flex-shrink-0">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <LogoWithText onClick={() => navigate("/")} />

          <Link
            className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            to="/"
          >
            Back to Marketplace
          </Link>
        </div>
      </header>

      <Scroller
        className="flex-1 px-6 py-8 relative"
        direction="vertical"
        scrollbarStyle="thin"
        lerp={0.04}
        duration={1.8}
      >
        <div
          className={`w-full ${maxWidth} ${glassClass} rounded-3xl p-8 lg:p-10 z-10 animate-in fade-in zoom-in-95 duration-500 mx-auto`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3 tracking-tight text-white">
              {title}
            </h1>

            <p className="text-slate-400 text-sm font-medium leading-6">
              {description}
            </p>
          </div>

          {children}
        </div>

        {backgroundVariant === "mesh" && (
          <>
            <div className="absolute -bottom-24 -left-24 size-96 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse duration-[4s]"></div>
            <div className="absolute -top-24 -right-24 size-96 bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse duration-[6s]"></div>
          </>
        )}
      </Scroller>

      <footer className="w-full py-4 px-6 border-t border-slate-800/50 flex-shrink-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Nexus CI/CD Protocol. All rights reserved.</p>

          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};