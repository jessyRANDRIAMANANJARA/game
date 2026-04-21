import { useState, useEffect } from 'react';

export interface GameState {
  energy: number;
  temp: number;
  pressure: number;
  credits: number;
  totalHarvested: number;
  integrity: number;
  upgrades: {
    cooling: number;
    venting: number;
    efficiency: number;
  };
  isGameOver: boolean;
  status: 'idle' | 'running' | 'critical' | 'destroyed';
}

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    energy: 50,
    temp: 40,
    pressure: 30,
    credits: 0,
    totalHarvested: 0,
    integrity: 100,
    upgrades: {
      cooling: 1,
      venting: 1,
      efficiency: 1,
    },
    isGameOver: false,
    status: 'running',
  });

  const adjustTemp = (amount: number) => {
    setState(s => ({ ...s, temp: Math.min(100, Math.max(0, s.temp + amount)) }));
  };

  const adjustPressure = (amount: number) => {
    setState(s => ({ ...s, pressure: Math.min(100, Math.max(0, s.pressure + amount)) }));
  };

  const sellEnergy = () => {
    setState(s => {
      if (s.energy < 10) return s;
      const gained = 5 * s.upgrades.efficiency;
      return {
        ...s,
        energy: s.energy - 10,
        credits: s.credits + gained,
        totalHarvested: s.totalHarvested + 10,
      };
    });
  };

  const upgrade = (type: keyof GameState['upgrades']) => {
    setState(s => {
      const cost = (s.upgrades[type] + 1) * 20;
      if (s.credits < cost) return s;
      return {
        ...s,
        credits: s.credits - cost,
        upgrades: {
          ...s.upgrades,
          [type]: s.upgrades[type] + 1,
        },
      };
    });
  };

  useEffect(() => {
    if (state.isGameOver) return;

    const interval = setInterval(() => {
      setState(s => {
        // Core stability is tied to energy level
        const energyLoad = s.energy / 50;
        
        // Natural increase with load factor
        let newTemp = s.temp + (0.4 * energyLoad) - (0.1 * s.upgrades.cooling);
        let newPressure = s.pressure + (0.3 * energyLoad) - (0.05 * s.upgrades.venting);
        let newEnergy = s.energy + 0.3 + (s.upgrades.efficiency * 0.05);
        let newIntegrity = s.integrity;
        let newStatus = s.status;

        // Danger zones
        if (newTemp > 80 || newPressure > 80) {
          newIntegrity -= 1;
          newStatus = 'critical';
        } else {
          newStatus = 'running';
        }

        if (newIntegrity <= 0) {
          return { ...s, integrity: 0, isGameOver: true, status: 'destroyed' };
        }

        return {
          ...s,
          temp: Math.min(100, Math.max(0, newTemp)),
          pressure: Math.min(100, Math.max(0, newPressure)),
          energy: Math.min(100, newEnergy),
          integrity: newIntegrity,
          status: newStatus as any,
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [state.isGameOver]);

  return { state, adjustTemp, adjustPressure, sellEnergy, upgrade };
};
