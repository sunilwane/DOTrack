import { useState, useRef, useCallback, useEffect } from "react";

export type StageStatus = 'pending' | 'active' | 'done';

export interface AnimatedStage {
    id: string | number;
    status: StageStatus;
    connectorProgress: number; 
}

export interface UseStageAnimationOptions {
   
    loadingDuration?: number;
    
    connectorDuration?: number;
    
    restartDelay?: number;
    
    loop?: boolean;
}

const defaultOptions: UseStageAnimationOptions = {
    loadingDuration: 1500,
    connectorDuration: 1400, 
    restartDelay: 2000,
    loop: true,
};

export function useStageAnimation<T extends { id: string | number }>(
    items: T[],
    options: UseStageAnimationOptions = {}
): { states: AnimatedStage[]; currentIndex: number } {
    const opts = { ...defaultOptions, ...options };
    
    const [animatedStates, setAnimatedStates] = useState<AnimatedStage[]>(() =>
        items.map((item, idx) => ({
            id: item.id,
            status: idx === 0 ? 'active' : 'pending',
            connectorProgress: 0,
        }))
    );
    
    const currentIndexRef = useRef(0);
    const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isMountedRef = useRef(true);

    const clearTimers = useCallback(() => {
        if (animationTimerRef.current) {
            clearTimeout(animationTimerRef.current);
            animationTimerRef.current = null;
        }
    }, []);

    const animateConnector = useCallback((stageIdx: number, onComplete: () => void) => {
        if (!isMountedRef.current) return;
        
        const duration = opts.connectorDuration || 1400;
        
        
        setAnimatedStates(prev => {
            const newStates = [...prev];
            if (newStates[stageIdx]) {
                newStates[stageIdx] = {
                    ...newStates[stageIdx],
                    connectorProgress: 100,
                };
            }
            return newStates;
        });

        
        animationTimerRef.current = setTimeout(() => {
            if (!isMountedRef.current) return;
            onComplete();
        }, duration);
    }, [opts.connectorDuration]);

    const runLoadingAndAdvance = useCallback(() => {
        if (!isMountedRef.current) return;
        
        const currentIdx = currentIndexRef.current;
        const totalItems = items.length;

        
        animationTimerRef.current = setTimeout(() => {
            if (!isMountedRef.current) return;

            
            setAnimatedStates(prev => {
                const newStates = [...prev];
                if (newStates[currentIdx]) {
                    newStates[currentIdx] = { ...newStates[currentIdx], status: 'done' };
                }
                return newStates;
            });

            
            if (currentIdx < totalItems - 1) {
                animateConnector(currentIdx, () => {
                   
                    if (!isMountedRef.current) return;
                    
                    const nextIdx = currentIdx + 1;
                    currentIndexRef.current = nextIdx;
                    
                    setAnimatedStates(prev => {
                        const newStates = [...prev];
                        if (newStates[nextIdx]) {
                            newStates[nextIdx] = { ...newStates[nextIdx], status: 'active' };
                        }
                        return newStates;
                    });
                    
                    
                    runLoadingAndAdvance();
                });
            } else if (opts.loop) {
                
                animationTimerRef.current = setTimeout(() => {
                    if (!isMountedRef.current) return;
                    
                    currentIndexRef.current = 0;
                    setAnimatedStates(
                        items.map((item, idx) => ({
                            id: item.id,
                            status: idx === 0 ? 'active' : 'pending',
                            connectorProgress: 0,
                        }))
                    );
                    
                    runLoadingAndAdvance();
                }, opts.restartDelay);
            }
        }, opts.loadingDuration);
    }, [items, opts.loadingDuration, opts.loop, opts.restartDelay, animateConnector]);

    useEffect(() => {
        isMountedRef.current = true;
        
        
        setAnimatedStates(
            items.map((item, idx) => ({
                id: item.id,
                status: idx === 0 ? 'active' : 'pending',
                connectorProgress: 0,
            }))
        );

        
        runLoadingAndAdvance();

        return () => {
            isMountedRef.current = false;
            clearTimers();
        };
    }, [items, runLoadingAndAdvance, clearTimers]);

    return {
        states: animatedStates,
        currentIndex: currentIndexRef.current,
    };
}
