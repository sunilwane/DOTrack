import * as React from "react";
import { ReactLenis } from "lenis/react";

interface ScrollerProps {
    children: React.ReactNode;
    className?: string;
    /** Direction of scrolling */
    direction?: "vertical" | "horizontal" | "both";
    /** Whether to show scrollbar */
    showScrollbar?: boolean;
    /** Custom scrollbar style */
    scrollbarStyle?: "thin" | "default" | "hidden";
    /** Lenis lerp value - lower = slower/smoother (0.03-0.15 recommended) */
    lerp?: number;
    /** Lenis duration for scroll animations */
    duration?: number;
    /** Use as root scroller (for full page scrolling like Landing page) */
    root?: boolean;
}

/**
 * Unified Scroller component for consistent smooth scrolling across the app.
 * Uses Lenis for buttery smooth scrolling effect with customizable scrollbar styles.
 * 
 * Usage:
 * - Full page scroll: <Scroller root={true} className="min-h-screen">
 * - Container scroll: <Scroller className="flex-1">
 * 
 * Adjust lerp for smoothness (lower = smoother): lerp={0.04} for very smooth
 */
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

    const scrollbarClass = showScrollbar ? scrollbarClasses[scrollbarStyle] : "scrollbar-hide";

    const lenisOptions = {
        lerp,
        duration,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        orientation: direction === "horizontal" ? "horizontal" as const : "vertical" as const,
    };

    // Root mode: Lenis controls the whole page scroll
    if (root) {
        const containerClasses = `${scrollbarClass} ${className}`.trim().replace(/\s+/g, " ");
        return (
            <ReactLenis root={true} options={lenisOptions}>
                <div className={containerClasses}>
                    {children}
                </div>
            </ReactLenis>
        );
    }

    // Container mode: Lenis controls scroll within this element
    const containerClasses = `${overflowClasses[direction]} ${scrollbarClass} ${className}`.trim().replace(/\s+/g, " ");
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

/**
 * @deprecated Use <Scroller> instead. This is kept for backwards compatibility.
 */
export const SmoothScrollProvider = Scroller;

export default Scroller;
