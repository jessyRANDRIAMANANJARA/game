import React, { useState } from 'react';
import { 
  Zap, 
  Thermometer, 
  Wind, 
  Cpu, 
  Database, 
  ArrowUpCircle,
  Settings,
  AlertTriangle,
  RefreshCcw,
  Flame,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { Gauge } from './components/Gauge';

const App: React.FC = () => {
  const { state, adjustTemp, adjustPressure, sellEnergy, upgrade } = useGameState();
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-mono">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-900 border-2 border-slate-800 p-8 rounded-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/30">
              <Cpu size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">Quantum Core</h1>
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase">Machine Operator Terminal v2.4.0</p>
            </div>
          </div>
          
          <div className="space-y-6 text-slate-300">
            <p className="leading-relaxed border-l-2 border-blue-500 pl-4 bg-blue-500/5 py-2">
              Attention Operator. The Quantum Core is unstable. Your primary objective is to maintain thermal and atmospheric balance while harvesting energy for the colony.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">[1]</span>
                <span>Keep <span className="text-orange-400">Temperature</span> and <span className="text-cyan-400">Pressure</span> below 80% to avoid structural integrity failure.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">[2]</span>
                <span>Convert generated <span className="text-yellow-400">Energy</span> into <span className="text-emerald-400">Credits</span>.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">[3]</span>
                <span>Use Credits to upgrade system efficiency and cooling power.</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowIntro(false)}
              className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest"
            >
              Initialize System <Zap className="group-hover:animate-pulse" size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 text-slate-100 font-mono select-none overflow-hidden flex flex-col items-center">
      <div className="crt-overlay" />
      <div className="scanline" />
      {/* HUD Header */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full border ${state.status === 'critical' ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-blue-500/20 border-blue-500 text-blue-500'}`}>
            <Settings className={state.status === 'critical' ? 'animate-spin' : ''} size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">System {state.status}</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1 w-4 rounded-full ${state.integrity > (i-1)*20 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">Structural Integrity</p>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-black ${state.integrity < 30 ? 'text-red-500' : 'text-emerald-400'}`}>
                {state.integrity}%
              </span>
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div 
                  animate={{ width: `${state.integrity}%` }}
                  className={`h-full ${state.integrity < 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
                />
              </div>
            </div>
          </div>
          
          <div className="h-10 w-[1px] bg-slate-800 hidden md:block" />

          <div className="flex flex-col items-end">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Available Credits</p>
            <div className="flex items-center gap-2 text-emerald-400">
              <Database size={20} />
              <span className="text-2xl font-black tabular-nums">{state.credits}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Monitoring */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full" /> Live Metrics
          </h3>
          
          <Gauge 
            label="Reactor Core Temp" 
            value={state.temp} 
            color="bg-orange-500" 
            icon={<Thermometer size={16} />} 
          />
          <Gauge 
            label="Steam Pressure" 
            value={state.pressure} 
            color="bg-cyan-500" 
            icon={<Wind size={16} />} 
          />
          <Gauge 
            label="Stored Energy" 
            value={state.energy} 
            color="bg-yellow-500" 
            icon={<Zap size={16} />} 
            warningThreshold={101}
          />
        </div>

        {/* Center: Interactive Visual & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-8">
           {/* Visualizer */}
          <div className="aspect-square bg-slate-900 border-2 border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
            
            {/* Rotating Core Visual */}
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: 0.9 + (state.energy / 500)
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="relative w-48 h-48"
            >
              <div className={`absolute inset-0 rounded-full border-4 border-dashed opacity-20 ${state.status === 'critical' ? 'border-red-500 animate-ping' : 'border-blue-500'}`} />
              <div className="absolute inset-4 rounded-full border-2 border-slate-700" />
              <div className="absolute inset-8 rounded-full border border-slate-600 opacity-50" />
              
              {/* Core Glow */}
              <div className={`absolute inset-12 rounded-full blur-xl transition-colors duration-1000 ${
                state.temp > 80 ? 'bg-red-500/40' : 
                state.pressure > 80 ? 'bg-orange-500/40' : 
                'bg-blue-500/30'
              }`} />
              
              {/* Inner Core */}
              <div className={`absolute inset-12 rounded-full bg-gradient-to-tr transition-colors duration-500 ${
                state.temp > 80 ? 'from-red-600 to-orange-400' : 
                'from-blue-600 to-cyan-400'
              } flex items-center justify-center shadow-lg border border-white/20`}>
                <Zap className="text-white/80" size={32} />
              </div>
            </motion.div>

            {/* Warning Overlay */}
            {state.status === 'critical' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border-4 border-red-500/30 bg-red-500/5 flex flex-col items-center justify-end pb-8"
              >
                <div className="bg-red-600 text-white text-[10px] px-3 py-1 font-bold rounded animate-bounce">
                   CRITICAL OVERHEAT
                </div>
              </motion.div>
            )}
          </div>

          {/* Core Controls */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => adjustTemp(-5 * state.upgrades.cooling)}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-blue-500 transition-all active:scale-95 group shadow-lg"
            >
              <Droplets className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-400 uppercase">Inject Coolant</span>
            </button>
            <button 
              onClick={() => adjustPressure(-5 * state.upgrades.venting)}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-cyan-500 transition-all active:scale-95 group shadow-lg"
            >
              <Wind className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-400 uppercase">Vent Pressure</span>
            </button>
            <button 
              onClick={sellEnergy}
              disabled={state.energy < 10}
              className={`col-span-2 relative overflow-hidden flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98] shadow-lg ${
                state.energy >= 10 
                  ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500 text-white group' 
                  : 'bg-slate-900 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
              }`}
            >
              {state.energy >= 10 && (
                <motion.div 
                  layoutId="glow"
                  className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
              <Zap className={state.energy >= 10 ? "animate-bounce" : ""} size={20} />
              <span className="font-bold uppercase tracking-widest relative z-10">Harvest Energy (+{5 * state.upgrades.efficiency} Cr)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Upgrades */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" /> System Upgrades
          </h3>

          <UpgradeItem 
            title="Cryo-Cooling" 
            level={state.upgrades.cooling} 
            cost={(state.upgrades.cooling + 1) * 20} 
            icon={<Flame size={16} className="text-red-400" />} 
            onClick={() => upgrade('cooling')}
            credits={state.credits}
            desc="Reduces core temperature faster"
          />
          <UpgradeItem 
            title="Rapid Venting" 
            level={state.upgrades.venting} 
            cost={(state.upgrades.venting + 1) * 20} 
            icon={<Wind size={16} className="text-cyan-400" />} 
            onClick={() => upgrade('venting')}
            credits={state.credits}
            desc="Releases pressure more efficiently"
          />
          <UpgradeItem 
            title="Output Buffer" 
            level={state.upgrades.efficiency} 
            cost={(state.upgrades.efficiency + 1) * 20} 
            icon={<ArrowUpCircle size={16} className="text-emerald-400" />} 
            onClick={() => upgrade('efficiency')}
            credits={state.credits}
            desc="Increases credits per energy unit"
          />
        </div>
      </div>

      {/* Game Over Screen */}
      <AnimatePresence>
        {state.isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border-2 border-red-500 p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)]"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-red-500 animate-pulse" />
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-red-500/20 rounded-full text-red-500 border-2 border-red-500">
                  <AlertTriangle size={48} />
                </div>
              </div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">CORE BREACH</h2>
              <p className="text-red-400 text-sm font-bold tracking-widest uppercase mb-8">Reactor Integrity Failure</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 col-span-2">
                   <p className="text-[10px] text-slate-500 uppercase font-bold">Total Energy Stabilized</p>
                   <p className="text-3xl font-black text-yellow-400">{state.totalHarvested} MW</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Credits Earned</p>
                  <p className="text-xl font-black text-emerald-400">{state.credits}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Efficiency Lvl</p>
                  <p className="text-xl font-black text-blue-400">{state.upgrades.efficiency}</p>
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                Re-initialize Systems <RefreshCcw size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface UpgradeProps {
  title: string;
  level: number;
  cost: number;
  icon: React.ReactNode;
  onClick: () => void;
  credits: number;
  desc: string;
}

const UpgradeItem: React.FC<UpgradeProps> = ({ title, level, cost, icon, onClick, credits, desc }) => {
  const canAfford = credits >= cost;

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl group hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-800 rounded text-slate-400">{icon}</div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-tight">{title}</h4>
            <p className="text-[10px] text-slate-500">LVL {level}</p>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mb-4 leading-tight italic">{desc}</p>
      <button 
        onClick={onClick}
        disabled={!canAfford}
        className={`w-full py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
          canAfford 
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white' 
            : 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed opacity-50'
        }`}
      >
        Upgrade — {cost} Cr
      </button>
    </div>
  );
};

export default App;
