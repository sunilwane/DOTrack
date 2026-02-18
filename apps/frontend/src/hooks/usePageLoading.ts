import { useState, useEffect, useCallback } from 'react';

const visitedPages = new Set<string>();

/**
 * Hook to manage simulated loading state for pages.
 * Ensures skeletons are shown only on the first visit to a page in the current session.
 * 
 * @param pageKey Unique identifier for the page (e.g., 'dashboard', 'blockchain')
 * @param duration Duration in ms to show the skeleton (default: 2000ms)
 * @returns Object containing isLoading state and a function to manually trigger loading
 */
export const usePageLoading = (pageKey: string, duration: number = 2000) => {
    const [isLoading, setIsLoading] = useState(!visitedPages.has(pageKey));

    useEffect(() => {
     
        if (!visitedPages.has(pageKey)) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                visitedPages.add(pageKey);
            }, duration);

            return () => clearTimeout(timer);
        } else {
           
            setIsLoading(false);
        }
    }, [pageKey, duration]);

    
    const triggerLoading = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            
            visitedPages.add(pageKey);
        }, duration);
        
    }, [duration, pageKey]);

    return { isLoading, triggerLoading };
};
