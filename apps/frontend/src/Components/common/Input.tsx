import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = "",
    containerClassName = "",
    id,
    ...props
}) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`w-full h-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-sm focus:border-primary focus:ring-0 transition-colors placeholder:text-slate-500 text-slate-900 dark:text-white ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p id={`${inputId}-error`} className="text-xs text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
};
