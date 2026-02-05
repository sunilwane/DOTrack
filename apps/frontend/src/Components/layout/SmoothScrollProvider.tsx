import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
    children: ReactNode;
    root?: boolean;
}

export const SmoothScrollProvider = ({ children, root = true }: SmoothScrollProviderProps) => {
    return (
        <ReactLenis root={root} options={{
            lerp: 0.1,
            duration: 1.8,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        }}>
            {children}
        </ReactLenis>
    );
};
