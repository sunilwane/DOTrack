import React from "react";

interface HelpCenterProps {
    title?: string;
    description?: string;
    linkText?: string;
    linkHref?: string;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
    title = "Help Center",
    description = "Need help setting up your decentralized build environment? Check our docs.",
    linkText = "Documentation",
    linkHref = "#"
}) => {
    return (
        <div className="bg-blue-600/5 rounded-xl p-5 border border-blue-600/10">
            <h4 className="text-xs font-bold text-blue-600 mb-2">{title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">{description}</p>
            <a className="inline-block mt-3 text-[10px] font-bold text-blue-600 uppercase hover:underline" href={linkHref}>
                {linkText}
            </a>
        </div>
    );
};
