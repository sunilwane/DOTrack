import * as React from "react";
import type { AnimatedStage } from "./useStageAnimation";

export interface StageItem {
    id: string | number;
    label: string;
    time?: string;
    icon?: string;
    activeIcon?: string;
    doneIcon?: string;
}

interface StageTrackerProps {
    items: StageItem[];
    states: AnimatedStage[];
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    showLabels?: boolean;
    showTime?: boolean;
    connectorDuration?: number; 
}

const StageTracker: React.FC<StageTrackerProps> = ({
    items,
    states,
    orientation = 'horizontal',
    className = '',
    showLabels = true,
    showTime = true,
    connectorDuration = 1400,
}) => {
    const getStateForItem = (itemId: string | number): AnimatedStage => {
        return states.find(s => s.id === itemId) || { id: itemId, status: 'pending', connectorProgress: 0 };
    };

    
    const calculateOverallProgress = (): number => {
        const totalSteps = items.length - 1;
        if (totalSteps <= 0) return 0;
        
        const doneCount = states.filter(s => s.status === 'done' && s.connectorProgress === 100).length;
        
        
        const animatingStage = states.find(s => s.status === 'done' && s.connectorProgress < 100);
        const animatingProgress = animatingStage ? animatingStage.connectorProgress / 100 : 0;
        
        const progressPerStage = 100 / totalSteps;
        return (doneCount * progressPerStage) + (animatingProgress * progressPerStage);
    };

    const getIcon = (item: StageItem, state: AnimatedStage): string => {
        if (state.status === 'done') {
            return item.doneIcon || 'check';
        }
        if (state.status === 'active') {
            return item.activeIcon || 'progress_activity';
        }
        return item.icon || 'radio_button_unchecked';
    };

    const getStatusClasses = (status: AnimatedStage['status']) => {
        switch (status) {
            case 'done':
                return 'size-10 rounded-full bg-emerald-500 text-white shadow-lg';
            case 'active':
                return 'size-12 rounded-full bg-primary text-white ring-4 ring-primary/20 shadow-lg scale-110';
            case 'pending':
            default:
                return 'size-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-40';
        }
    };

    const overallProgress = calculateOverallProgress();

    if (orientation === 'vertical') {
        return (
            <div className={`flex flex-col relative ${className}`}>
                {items.map((item, index) => {
                    const state = getStateForItem(item.id);
                    const isLast = index === items.length - 1;
                    
                    return (
                        <div key={item.id} className="grid grid-cols-[48px_1fr] gap-x-4">
                            <div className="flex flex-col items-center">
                                
                                <div
                                    className={`
                                        flex items-center justify-center z-10
                                        transition-all duration-500
                                        ${getStatusClasses(state.status)}
                                    `}
                                >
                                    <span className={`material-symbols-outlined text-xl ${
                                        state.status === 'active' ? 'animate-spin' : ''
                                    }`}>
                                        {getIcon(item, state)}
                                    </span>
                                </div>
                                
                                
                                {!isLast && (
                                    <div className="relative w-[2px] h-16 mt-2 bg-slate-200 dark:bg-slate-800">
                                        <div 
                                            className="absolute top-0 left-0 w-full bg-primary"
                                            style={{ 
                                                height: `${state.connectorProgress}%`,
                                                transition: state.connectorProgress === 0 ? 'none' : `height ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            
                           
                            <div className={`flex flex-col ${isLast ? '' : 'pb-8'}`}>
                                {showLabels && (
                                    <div className={`mb-1 transition-all duration-300 ${
                                        state.status === 'active' 
                                            ? 'text-primary font-bold' 
                                            : state.status === 'done'
                                                ? 'text-slate-900 dark:text-white'
                                                : 'text-slate-500'
                                    }`}>
                                        <span className="text-sm">{item.label}</span>
                                        {state.status === 'active' && (
                                            <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 animate-pulse">
                                                Running...
                                            </span>
                                        )}
                                        {state.status === 'done' && (
                                            <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                                Complete
                                            </span>
                                        )}
                                    </div>
                                )}
                                {showTime && item.time && (
                                    <span className="text-xs text-slate-500">{item.time}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    
    return (
        <div className={`flex items-center justify-between relative w-full px-4 ${className}`}>
            
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
            
            
            <div
                className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0"
                style={{ 
                    width: `${overallProgress}%`,
                    transition: overallProgress === 0 ? 'none' : `width ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
            />

            {items.map((item) => {
                const state = getStateForItem(item.id);
                
                return (
                    <div 
                        key={item.id} 
                        className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${
                            state.status === 'pending' ? 'opacity-40' : ''
                        }`}
                    >
                        
                        <div
                            className={`
                                flex items-center justify-center
                                transition-all duration-500
                                ${getStatusClasses(state.status)}
                            `}
                        >
                            <span className={`material-symbols-outlined text-[20px] ${
                                state.status === 'active' ? 'animate-spin' : ''
                            }`}>
                                {getIcon(item, state)}
                            </span>
                        </div>
                        
                        
                        {showLabels && (
                            <div className="text-center">
                                <p className={`text-[10px] font-bold uppercase tracking-tight ${
                                    state.status === 'active' 
                                        ? 'text-primary' 
                                        : state.status === 'pending' 
                                            ? 'text-slate-500' 
                                            : 'text-slate-900 dark:text-white'
                                }`}>
                                    {item.label}
                                </p>
                                {showTime && item.time && (
                                    <p className={`text-[9px] font-mono tracking-tighter ${
                                        state.status === 'pending' ? 'text-slate-600' : 'text-slate-500'
                                    }`}>
                                        {item.time}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StageTracker;
