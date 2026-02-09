import * as React from "react";
import { createPortal } from "react-dom";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface SimpleTooltipProps {
   
    label: React.ReactNode;
    
    placement?: TooltipPlacement;
   
    delay?: number;
    
    className?: string;
    children: React.ReactElement;
}

function getTooltipPosition(
    rect: DOMRect,
    placement: TooltipPlacement
): React.CSSProperties {
    const gap = 8;
    switch (placement) {
        case "right":
            return { top: rect.top + rect.height / 2, left: rect.right + gap, transform: "translateY(-50%)" };
        case "left":
            return { top: rect.top + rect.height / 2, left: rect.left - gap, transform: "translate(-100%, -50%)" };
        case "top":
            return { top: rect.top - gap, left: rect.left + rect.width / 2, transform: "translate(-50%, -100%)" };
        case "bottom":
            return { top: rect.bottom + gap, left: rect.left + rect.width / 2, transform: "translateX(-50%)" };
    }
}

const arrowClasses: Record<TooltipPlacement, string> = {
    right: "absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900",
    left: "absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900",
    top: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900",
    bottom: "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900",
};

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
    label,
    placement = "right",
    delay = 0,
    className = "",
    children,
}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [position, setPosition] = React.useState<React.CSSProperties>({});

    const showTooltip = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition(getTooltipPosition(rect, placement));
        }
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
        } else {
            setIsVisible(true);
        }
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            ref={triggerRef}
            className={`inline-block ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {isVisible &&
                createPortal(
                    <div
                        className="fixed z-[9999] pointer-events-none"
                        style={position}
                    >
                        <div className="relative bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap">
                            {label}
                            <div className={arrowClasses[placement]}></div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};
