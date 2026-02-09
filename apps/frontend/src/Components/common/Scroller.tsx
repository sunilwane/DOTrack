import * as React from "react";
import { ReactLenis } from "lenis/react";

interface ScrollerProps {
  children: React.ReactNode;
  className?: string;

  direction?: "vertical" | "horizontal" | "both";

  showScrollbar?: boolean;

  scrollbarStyle?: "thin" | "default" | "hidden";

  lerp?: number;

  duration?: number;

  root?: boolean;
}

export const Scroller: React.FC<ScrollerProps> = ({
  children,
  className = "",
  direction = "vertical",
  showScrollbar = true,
  scrollbarStyle = "thin",
  lerp = 0.06,
  duration = 1.5,
  root = false,
}) => {
  const overflowClasses = {
    vertical: "overflow-y-auto overflow-x-hidden",
    horizontal: "overflow-x-auto overflow-y-hidden",
    both: "overflow-auto",
  };

  const scrollbarClasses = {
    thin: "scrollbar-thin",
    default: "",
    hidden: "scrollbar-hide",
  };

  const scrollbarClass = showScrollbar
    ? scrollbarClasses[scrollbarStyle]
    : "scrollbar-hide";

  const lenisOptions = {
    lerp,
    duration,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    orientation:
      direction === "horizontal"
        ? ("horizontal" as const)
        : ("vertical" as const),
  };

  if (root) {
    const containerClasses = `${scrollbarClass} ${className}`
      .trim()
      .replace(/\s+/g, " ");
    return (
      <ReactLenis root={true} options={lenisOptions}>
        <div className={containerClasses}>{children}</div>
      </ReactLenis>
    );
  }

  const containerClasses =
    `${overflowClasses[direction]} ${scrollbarClass} ${className}`
      .trim()
      .replace(/\s+/g, " ");
  return (
    <ReactLenis
      root={false}
      className={containerClasses}
      options={lenisOptions}
    >
      {children}
    </ReactLenis>
  );
};

export const SmoothScrollProvider = Scroller;

export default Scroller;
