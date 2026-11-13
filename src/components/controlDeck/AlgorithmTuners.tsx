import React from 'react';
import { AlgorithmicWeights, EcosystemMetrics } from '../../types';
import { ALGORITHM_PRESETS } from '../../data/seedData';
import { 
  Sliders, 
  Flame, 
  Compass, 
  Sparkles, 
  Radio, 
  HeartHandshake, 
  Zap, 
  Activity, 
  ShieldAlert, 
  RotateCcw 
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface AlgorithmTunersProps {
  weights: AlgorithmicWeights;
  onUpdateWeights: (newWeights: AlgorithmicWeights) => void;
  ecosystemMetrics: EcosystemMetrics;
}

export const AlgorithmTuners: React.FC<AlgorithmTunersProps> = ({
  weights,
  onUpdateWeights,
  ecosystemMetrics,
}) => {
  const handleSliderChange = (key: keyof AlgorithmicWeights, value: number) => {
    soundFx.playBlip(500 + value * 400, 'sine', 0.03);
    onUpdateWeights({
      ...weights,
      [key]: Math.round(value * 100) / 100,
    });
  };

  const applyPreset = (presetKey: string) => {
    soundFx.playWarp();
    const preset = ALGORITHM_PRESETS[presetKey];
    if (preset) {
      onUpdateWeights(preset.weights);
    }
  };

  const slidersConfig: Array<{
    key: keyof AlgorithmicWeights;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    accentHex: string;
  }> = [
    {
      key: 'outrageAmplification',
      label: 'Outrage Amplification',
      description: 'Weights moral friction, conflict predicates, and adversarial dogpiles',
      icon: <Flame className="w-4 h-4 text-[#FF5E5B]" />,
      color: 'text-[#FF5E5B]',
      accentHex: '#FF5E5B',
    },
    {
      key: 'echoChamberCohesion',
      label: 'Echo Chamber Cohesion',
      description: 'Penalizes cross-tribal dissonance; locks user into matching ideological cluster',
      icon: <Compass className="w-4 h-4 text-[#38F2C2]" />,
      color: 'text-[#38F2C2]',
      accentHex: '#38F2C2',
    },
    {
      key: 'noveltyDecay',
      label: 'Novelty vs. Familiarity Decay',
      description: 'Accelerates reward obsolescence; demands higher uncanny shock value',
      icon: <Sparkles className="w-4 h-4 text-[#FFB000]" />,
      color: 'text-[#FFB000]',
      accentHex: '#FFB000',
    },
    {
      key: 'hyperrealDrift',
      label: 'Hyperreal Drift / Hallucination Index',
      description: 'Decouples content from empirical physics into synthetic folklore & deep-lore',
      icon: <Radio className="w-4 h-4 text-purple-400" />,
      color: 'text-purple-400',
      accentHex: '#C084FC',
    },
    {
      key: 'commercialParasocialWeight',
      label: 'Commercial Parasocial Weight',
      description: 'Elevates simulated intimacy, sponsor-coded confessionals, and conversion hooks',
      icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
      color: 'text-pink-400',
      accentHex: '#F472B6',
    },
    {
      key: 'sensationalismBias',
      label: 'Sensationalism Bias',
      description: 'Non-linear spike applied to extreme claims and catastrophic urgency',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      color: 'text-amber-400',
      accentHex: '#FBBF24',
    },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Ecosystem Health Diagnostic Radar & Gauges */}
      <div className="bg-[#090E17] border border-[#1A263B] rounded-2xl p-4 tactical-border">
        <div className="flex items-center justify-between border-b border-[#1A263B] pb-2.5 mb-3">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Activity className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase text-sm">ECOSYSTEM HEALTH & POLARIZATION RADAR</span>
          </div>
          <span className="text-[10px] text-slate-500">LIVE MACRO TELEMETRY</span>
        </div>

        {/* 5 Macro Gauges */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {/* Polarization */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Polarization</div>
            <div className="text-xl font-black text-[#FF5E5B] my-0.5">
              {(ecosystemMetrics.polarizationIndex * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF5E5B] transition-all duration-300" 
                style={{ width: `${ecosystemMetrics.polarizationIndex * 100}%` }}
              />
            </div>
          </div>

          {/* Echo Chamber Density */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Echo Density</div>
            <div className="text-xl font-black text-[#38F2C2] my-0.5">
              {(ecosystemMetrics.echoChamberDensity * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#38F2C2] transition-all duration-300" 
                style={{ width: `${ecosystemMetrics.echoChamberDensity * 100}%` }}
              />
            </div>
          </div>

          {/* Dopamine Velocity */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Dopamine Velocity</div>
            <div className="text-xl font-black text-[#FFB000] my-0.5">
              {ecosystemMetrics.dopamineVelocity} <span className="text-[10px] font-normal text-slate-400">c/s</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFB000] transition-all duration-300" 
                style={{ width: `${ecosystemMetrics.dopamineVelocity}%` }}
              />
            </div>
          </div>

          {/* Hallucinatory Drift */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Reality Drift</div>
            <div className="text-xl font-black text-purple-400 my-0.5">
              {(ecosystemMetrics.hallucinatoryDriftRate * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-400 transition-all duration-300" 
                style={{ width: `${ecosystemMetrics.hallucinatoryDriftRate * 100}%` }}
              />
            </div>
          </div>

          {/* Consensus Degradation */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-2.5 rounded-xl col-span-2 md:col-span-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide flex items-center justify-between">
              <span>Degradation</span>
              <ShieldAlert className="w-3 h-3 text-[#FF5E5B]" />
            </div>
            <div className="text-xl font-black text-[#FF5E5B] my-0.5">
              {ecosystemMetrics.consensusDegradation}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF5E5B] transition-all duration-300" 
                style={{ width: `${ecosystemMetrics.consensusDegradation}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Profiles Quick Picker */}
      <div className="bg-[#0A0F1A] border border-[#1A263B] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[#38F2C2] font-semibold text-xs uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Curated Algorithmic Archetypes (Instant Presets)
          </span>
          <span className="text-slate-500 text-[10px]">6 PRESETS LOADED</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(ALGORITHM_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="text-left p-2.5 rounded-xl bg-[#0F1626] border border-[#1E2E48] hover:border-[#38F2C2] hover:bg-[#142038] transition-all group"
            >
              <div className="font-bold text-slate-200 group-hover:text-[#38F2C2] text-xs truncate">
                {preset.label}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="bg-[#090E17] border border-[#1A263B] rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1A263B] pb-2">
          <div className="flex items-center space-x-2 text-slate-200">
            <Sliders className="w-4 h-4 text-[#FFB000]" />
            <span className="font-bold uppercase tracking-wider text-xs">FIRST-PRINCIPLES RANKING LEVERS</span>
          </div>
          <button
            onClick={() => applyPreset('balanced_entropy')}
            className="flex items-center space-x-1 text-[10px] text-slate-400 hover:text-[#38F2C2] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET TO EQUILIBRIUM</span>
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {slidersConfig.map(slider => {
            const currentValue = weights[slider.key];
            return (
              <div 
                key={slider.key} 
                className="bg-[#0D1524] border border-[#1A2840] rounded-xl p-3 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {slider.icon}
                    <span className="font-bold text-slate-200 text-xs">{slider.label}</span>
                  </div>
                  <span className={`font-mono font-bold text-xs ${slider.color} bg-black/40 px-2 py-0.5 rounded border border-slate-800`}>
                    {currentValue.toFixed(2)}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
                  {slider.description}
                </p>

                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentValue}
                    onChange={(e) => handleSliderChange(slider.key, parseFloat(e.target.value))}
                    className="flex-1 accent-[#38F2C2] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 w-8 text-right font-mono">
                    {Math.round(currentValue * 100)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Ranking Equation Mathematical Formula */}
      <div className="bg-[#060910] border border-slate-800 rounded-xl p-3 font-mono text-[10px] text-slate-400">
        <div className="text-slate-300 font-bold mb-1 uppercase text-[#38F2C2]">
          ACTIVE MATHEMATICAL SCORING ENGINE
        </div>
        <div className="p-2 bg-black/60 rounded border border-slate-800 overflow-x-auto text-slate-300 leading-relaxed">
          <code>
            Score = (Outrage x {weights.outrageAmplification.toFixed(2)} x 1.7) 
            + (Affinity x {weights.echoChamberCohesion.toFixed(2)} x 1.5) 
            + (Novelty x {weights.noveltyDecay.toFixed(2)} x 1.2) 
            + (Hyperreal x {weights.hyperrealDrift.toFixed(2)} x 1.4) 
            + (Parasocial x {weights.commercialParasocialWeight.toFixed(2)} x 1.1)
          </code>
        </div>
      </div>
    </div>
  );
};
