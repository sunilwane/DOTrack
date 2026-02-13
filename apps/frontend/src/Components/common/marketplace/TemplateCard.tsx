import * as React from "react";
import type { TemplateCard as TemplateCardType } from "types";

interface TemplateCardProps {
  template: TemplateCardType;
  onDeploy?: (template: TemplateCardType) => void;
}

export const TemplateCardComponent: React.FC<TemplateCardProps> = ({ template, onDeploy }) => {
  return (
    <div className="glass-card flex flex-col rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group">
      <div className="relative w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url("${template.image}")` }}>
        {template.verified && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] fill-1">verified_user</span>
            Verified
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111318] to-transparent opacity-60"></div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-sm font-bold font-display group-hover:text-primary transition-colors">
            {template.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${template.author.avatar}`}></div>
            </div>
            <p className="text-[#9ca6ba] text-[10px] font-mono">
              {template.author.address} • <span className="text-green-500">Rep: {template.author.reputation}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] text-white/60 font-bold uppercase tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
          <div className="flex flex-col">
            <p className="text-[8px] text-white/40 uppercase font-bold">Price</p>
            <p className="text-white text-xs font-bold">{template.price}</p>
          </div>
          <button
            className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-2 py-1 rounded-lg text-[5] font-bold transition-all border border-primary/20"
            onClick={() => onDeploy?.(template)}
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};
