import React from 'react';
import { 
  Flame, 
  Compass, 
  HeartHandshake, 
  Radio, 
  RotateCcw, 
  Zap, 
  Activity, 
  ShieldAlert, 
  Sliders,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { AlgorithmicWeights, EcosystemMetrics, PresetKey } from '../../types';
import { ALGORITHM_PRESETS } from '../../data/seedData';
import { soundFx } from '../../utils/audio';

interface ParameterDeckProps {
  weights: AlgorithmicWeights;
  onUpdateWeights: (newWeights: AlgorithmicWeights) => void;
  ecosystemMetrics: EcosystemMetrics;
  activePreset?: string;
  onSelectPreset?: (key: string) => void;
}

export const ParameterDeck: React.FC<ParameterDeckProps> = ({
  weights,
  onUpdateWeights,
  ecosystemMetrics,
  activePreset,
  onSelectPreset,
}) => {
  const handleSliderChange = (key: keyof AlgorithmicWeights, value: number) => {
    soundFx.playBlip(500 + value * 450, 'sine', 0.02);
    onUpdateWeights({
      ...weights,
      [key]: Math.round(value * 100) / 100,
    });
  };

  const handlePresetClick = (presetKey: string) => {
    soundFx.playWarp();
    const preset = ALGORITHM_PRESETS[presetKey];
    if (preset) {
      onUpdateWeights(preset.weights);
    }
    if (onSelectPreset) {
      onSelectPreset(presetKey);
    }
  };

  const coreSliders = [
    {
      key: 'outrageAmplification' as keyof AlgorithmicWeights,
      label: 'Outrage / Controversy Bias',
      description: 'Injects rage-bait copy, inflammatory captions, hostile flame wars, and high-conflict commentary.',
      icon: <Flame className="w-4 h-4 text-[#FF5E5B]" />,
      color: 'text-[#FF5E5B]',
      accent: '#FF5E5B',
      indicator: 'MORAL FRICTION ENGINE',
    },
    {
      key: 'echoChamberCohesion' as keyof AlgorithmicWeights,
      label: 'Echo Chamber Tightness',
      description: 'Restricts the inner feed to hyper-specific subculture bubbles and penalizes ideological dissonance.',
      icon: <Compass className="w-4 h-4 text-[#38F2C2]" />,
      color: 'text-[#38F2C2]',
      accent: '#38F2C2',
      indicator: 'TRIBAL CLUSTERING',
    },
    {
      key: 'commercialParasocialWeight' as keyof AlgorithmicWeights,
      label: 'Parasocial / Clout Weight',
      description: 'Elevates influencer persona posts, conversion hooks, simulated intimacy, and vanity metrics.',
      icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
      color: 'text-pink-400',
      accent: '#F472B6',
      indicator: 'VANITY METRICS x10',
    },
    {
      key: 'hyperrealDrift' as keyof AlgorithmicWeights,
      label: 'Hyperreal Synthetic Drift',
      description: 'Decouples content from reality; mutates photos/captions into surreal AI hallucinations and uncanny lore.',
      icon: <Radio className="w-4 h-4 text-purple-400" />,
      color: 'text-purple-400',
      accent: '#C084FC',
      indicator: 'UNCANNY ENTROPY',
    },
  ];

  const presetsList = [
    {
      key: 'chronological_2014',
      num: '1',
      title: 'Pure Chronological 2014 IG',
      desc: 'Zero outrage, authentic friends, organic chronological order',
      color: 'hover:border-emerald-500/60 hover:bg-emerald-500/5',
      badge: 'HISTORIC',
    },
    {
      key: 'default_algorithmic',
      num: '2',
      title: 'Default Algorithmic Slop',
      desc: 'Corporate dopamine optimization, sponsored ads & clout',
      color: 'hover:border-blue-500/60 hover:bg-blue-500/5',
      badge: 'STATUS QUO',
    },
    {
      key: 'maximum_outrage',
      num: '3',
      title: 'Maximum Outrage Spiral',
      desc: 'Adversarial framing, dogpiles, and maximum rage polarization',
      color: 'hover:border-rose-500/60 hover:bg-rose-500/5',
      badge: 'CRITICAL',
    },
    {
      key: 'hyperreal_hallucination',
      num: '4',
      title: 'Full Hyperreal Hallucination',
      desc: 'Synthetic drift 1.0, AI hallucinations, uncanny token leakage',
      color: 'hover:border-purple-500/60 hover:bg-purple-500/5',
      badge: 'SURREAL',
    },
  ];

  return (
    <div className="flex flex-col space-y-5 font-mono text-xs select-none">
      {/* Quick Presets Bar */}
      <div className="bg-[#0b101b] border border-[#1b263b] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-[#1b263b] pb-2">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Layers className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">
              QUICK PRESETS BAR (INSTANT STATE SHIFTS)
            </span>
          </div>
          <span className="text-[10px] text-slate-500">4 CLINICAL PROFILES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presetsList.map(p => {
            const isSelected = activePreset === p.key;
            return (
              <button
                key={p.key}
                onClick={() => handlePresetClick(p.key)}
                className={`text-left p-2.5 rounded-xl border transition-all text-xs relative overflow-hidden group ${p.color} ${
                  isSelected
                    ? 'bg-[#152033] border-[#38F2C2] text-white shadow-[0_0_12px_rgba(56,242,194,0.15)]'
                    : 'bg-[#0e1626] border-[#1b2840] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs truncate group-hover:text-[#38F2C2] transition-colors">
                    {p.title}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 font-mono">
                    {p.badge}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 leading-tight">
                  {p.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Core Clinical Levers */}
      <div className="bg-[#0b101b] border border-[#1b263b] rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1b263b] pb-2">
          <div className="flex items-center space-x-2 text-slate-200">
            <Sliders className="w-4 h-4 text-[#FFB000]" />
            <span className="font-bold uppercase tracking-wider text-xs">
              PRECISION ALGORITHM SLIDERS
            </span>
          </div>
          <button
            onClick={() => handlePresetClick('balanced_entropy')}
            className="flex items-center space-x-1 text-[10px] text-slate-400 hover:text-[#38F2C2] transition-colors"
            title="Reset to 0.50 balanced entropy"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {coreSliders.map(slider => {
            const currentValue = weights[slider.key];
            return (
              <div
                key={slider.key}
                className="bg-[#0e1626] border border-[#1b2840] rounded-xl p-3 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {slider.icon}
                    <span className="font-bold text-slate-200 text-xs">{slider.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">
                      {slider.indicator}
                    </span>
                    <span className={`font-mono font-bold text-xs ${slider.color} bg-black/50 px-2 py-0.5 rounded border border-slate-800`}>
                      {currentValue.toFixed(2)}
                    </span>
                  </div>
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
                  <div className="text-[10px] text-slate-400 w-8 text-right font-mono">
                    {Math.round(currentValue * 100)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Ecosystem Health Diagnostic Gauges */}
      <div className="bg-[#0b101b] border border-[#1b263b] rounded-2xl p-4">
        <div className="flex items-center justify-between border-b border-[#1b263b] pb-2 mb-3">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Activity className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase text-xs">
              LIVE ECOSYSTEM METRICS
            </span>
          </div>
          <span className="text-[10px] text-slate-500">MACRO HEALTH</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Polarization */}
          <div className="bg-[#0e1626] border border-[#1b2840] p-2.5 rounded-xl">
            <div className="text-[9px] text-slate-400 uppercase">Polarization</div>
            <div className="text-lg font-black text-[#FF5E5B] my-0.5">
              {(ecosystemMetrics.polarizationIndex * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5E5B] transition-all duration-300"
                style={{ width: `${ecosystemMetrics.polarizationIndex * 100}%` }}
              />
            </div>
          </div>

          {/* Echo Chamber Density */}
          <div className="bg-[#0e1626] border border-[#1b2840] p-2.5 rounded-xl">
            <div className="text-[9px] text-slate-400 uppercase">Echo Density</div>
            <div className="text-lg font-black text-[#38F2C2] my-0.5">
              {(ecosystemMetrics.echoChamberDensity * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#38F2C2] transition-all duration-300"
                style={{ width: `${ecosystemMetrics.echoChamberDensity * 100}%` }}
              />
            </div>
          </div>

          {/* Dopamine Velocity */}
          <div className="bg-[#0e1626] border border-[#1b2840] p-2.5 rounded-xl">
            <div className="text-[9px] text-slate-400 uppercase">Dopamine Velocity</div>
            <div className="text-lg font-black text-[#FFB000] my-0.5">
              {ecosystemMetrics.dopamineVelocity}
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFB000] transition-all duration-300"
                style={{ width: `${ecosystemMetrics.dopamineVelocity}%` }}
              />
            </div>
          </div>

          {/* Reality Drift */}
          <div className="bg-[#0e1626] border border-[#1b2840] p-2.5 rounded-xl">
            <div className="text-[9px] text-slate-400 uppercase">Reality Drift</div>
            <div className="text-lg font-black text-purple-400 my-0.5">
              {(ecosystemMetrics.hallucinatoryDriftRate * 100).toFixed(0)}%
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-400 transition-all duration-300"
                style={{ width: `${ecosystemMetrics.hallucinatoryDriftRate * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
