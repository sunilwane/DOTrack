export const getEventChipClass = (event: string) => {
  const normalizedEvent = event.toUpperCase();
  if (/DEPLOYMENT/.test(normalizedEvent)) {
    return 'bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30';
  }
  if (/APPROVAL/.test(normalizedEvent)) {
    return 'bg-nexus-purple/20 text-nexus-purple border border-nexus-purple/30';
  }
  return 'bg-slate-700/30 text-slate-400 border border-slate-700/40';
};
