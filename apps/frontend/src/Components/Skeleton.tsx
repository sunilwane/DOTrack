import { Skeleton as HeroSkeleton } from "@heroui/react";
import React from "react";

interface SkeletonProps {

    children?: React.ReactNode;
    isLoaded?: boolean;
    variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table' | 'button' | 'badge' | 'project';
    width?: string;
    height?: string;
    rows?: number;
    className?: string;
    skeletonClassName?: string;
}

export const Skeleton = ({
    children,
    isLoaded = false,
    variant = 'rectangular',
    width,
    height,
    rows = 1,
    className = '',
    skeletonClassName = ''
}: SkeletonProps) => {

    const baseSkeletonClass = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/[0.25] before:to-transparent dark:before:via-white/[0.15] dark:bg-slate-700 bg-slate-200 border border-white/5";

    if (children !== undefined) {
        if (isLoaded) return <>{children}</>;

        return (
            <HeroSkeleton
                isLoaded={false}
                className={`rounded-xl ${baseSkeletonClass} ${className} ${skeletonClassName}`}
                style={{ width, height }}
            >
                <div className="opacity-0 pointer-events-none select-none">
                    {children}
                </div>
            </HeroSkeleton>
        );
    }

    if (variant === 'badge') {
        return (
            <HeroSkeleton
                isLoaded={isLoaded}
                className={`rounded-full ${baseSkeletonClass} ${className} ${skeletonClassName}`}
                style={{ width: width || '60px', height: height || '22px' }}
            />
        );
    }

    if (variant === 'button') {
        return (
            <HeroSkeleton
                isLoaded={isLoaded}
                className={`rounded-lg ${baseSkeletonClass} ${className} ${skeletonClassName}`}
                style={{ width: width || '100px', height: height || '32px' }}
            />
        );
    }

    if (variant === 'text') {
        return (
            <div className={`flex flex-col gap-2.5 ${className}`}>
                {Array.from({ length: rows }).map((_, i) => (
                    <HeroSkeleton
                        key={i}
                        isLoaded={isLoaded}
                        className={`rounded-lg ${baseSkeletonClass} ${skeletonClassName}`}
                        style={{
                            width: width || (i === rows - 1 ? '70%' : '100%'),
                            height: height || '14px'
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'project') {
        return (
            <div className={`bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col gap-4 ${className}`}>
                {/* Status Badge Placeholder */}
                <div className="absolute top-0 right-0 p-3">
                    <HeroSkeleton isLoaded={isLoaded} className={`w-20 h-6 rounded-full ${baseSkeletonClass}`} />
                </div>

                {/* Icon Placeholder */}
                <HeroSkeleton isLoaded={isLoaded} className={`w-12 h-12 rounded-lg ${baseSkeletonClass}`} />

                {/* Name & Repo */}
                <div className="flex flex-col gap-2">
                    <HeroSkeleton isLoaded={isLoaded} className={`h-4 w-1/2 rounded ${baseSkeletonClass}`} />
                    <HeroSkeleton isLoaded={isLoaded} className={`h-3 w-3/4 rounded ${baseSkeletonClass}`} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 dark:border-slate-800/50">
                    <div className="flex flex-col gap-2">
                        <HeroSkeleton isLoaded={isLoaded} className={`h-2 w-12 rounded ${baseSkeletonClass}`} />
                        <HeroSkeleton isLoaded={isLoaded} className={`h-6 w-16 rounded ${baseSkeletonClass}`} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <HeroSkeleton isLoaded={isLoaded} className={`h-2 w-12 rounded ${baseSkeletonClass}`} />
                        <HeroSkeleton isLoaded={isLoaded} className={`h-4 w-20 rounded ${baseSkeletonClass}`} />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        <HeroSkeleton isLoaded={isLoaded} className={`size-8 rounded-full ${baseSkeletonClass}`} />
                        <HeroSkeleton isLoaded={isLoaded} className={`size-8 rounded-full ${baseSkeletonClass}`} />
                    </div>
                    <HeroSkeleton isLoaded={isLoaded} className={`size-6 rounded ${baseSkeletonClass}`} />
                </div>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`flex flex-col rounded-xl overflow-hidden bg-[#161b25] border border-white/5 shadow-2xl ${className}`}>
                <HeroSkeleton isLoaded={isLoaded} className={`aspect-video w-full ${baseSkeletonClass}`} />

                <div className="p-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <HeroSkeleton isLoaded={isLoaded} className={`h-4 w-3/4 rounded-md ${baseSkeletonClass}`} />
                        <div className="flex items-center gap-2">
                            <HeroSkeleton isLoaded={isLoaded} className={`size-5 rounded-full ${baseSkeletonClass}`} />
                            <HeroSkeleton isLoaded={isLoaded} className={`h-3 w-1/3 rounded-md ${baseSkeletonClass}`} />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <HeroSkeleton isLoaded={isLoaded} className={`h-5 w-16 rounded ${baseSkeletonClass}`} />
                        <HeroSkeleton isLoaded={isLoaded} className={`h-5 w-12 rounded ${baseSkeletonClass}`} />
                        <HeroSkeleton isLoaded={isLoaded} className={`h-5 w-14 rounded ${baseSkeletonClass}`} />
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                        <div className="flex flex-col gap-1">
                            <HeroSkeleton isLoaded={isLoaded} className={`h-2 w-8 rounded ${baseSkeletonClass}`} />
                            <HeroSkeleton isLoaded={isLoaded} className={`h-4 w-12 rounded ${baseSkeletonClass}`} />
                        </div>
                        <HeroSkeleton isLoaded={isLoaded} className={`h-8 w-20 rounded-lg ${baseSkeletonClass}`} />
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'table') {
        return (
            <div className={`flex flex-col gap-2 ${className}`}>
                <div className="flex gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <HeroSkeleton key={i} isLoaded={isLoaded} className={`h-3 w-1/4 rounded-md ${baseSkeletonClass}`} />
                    ))}
                </div>
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 items-center">
                        <HeroSkeleton isLoaded={isLoaded} className={`h-10 w-full rounded-lg ${baseSkeletonClass}`} />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'circular') {
        return (
            <HeroSkeleton
                isLoaded={isLoaded}
                className={`rounded-full ${baseSkeletonClass} ${className} ${skeletonClassName}`}
                style={{ width: width || '40px', height: height || '40px' }}
            />
        );
    }

    return (
        <HeroSkeleton
            isLoaded={isLoaded}
            className={`rounded-lg ${baseSkeletonClass} ${className} ${skeletonClassName}`}
            style={{ width: width || '100%', height: height || '20px' }}
        />
    );
};
