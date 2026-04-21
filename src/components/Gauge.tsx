import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
  warningThreshold?: number;
}

export const Gauge: React.FC<GaugeProps> = ({ label, value, color, icon, warningThreshold = 80 }) => {
  const isWarning = value >= warningThreshold;

  return (
    <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">{icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{label}</span>
        </div>
        <span className={`text-lg font-mono font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-slate-100'}`}>
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-4 bg-slate-900 rounded border border-slate-700 p-0.5 flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: value >= (i + 1) * 10 ? 1 : 0.1,
              backgroundColor: isWarning ? '#ef4444' : (color.includes('orange') ? '#f97316' : (color.includes('cyan') ? '#06b6d4' : '#eab308'))
            }}
            className="h-full flex-1 rounded-sm"
            style={{
              boxShadow: (value >= (i + 1) * 10) ? `0 0 8px ${isWarning ? 'rgba(239,68,68,0.4)' : 'rgba(59,130,246,0.2)'}` : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};
