import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Brain, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  HeartHandshake, 
  GitCompare, 
  CheckCircle2, 
  XCircle,
  Terminal,
  Activity,
  UserCheck
} from 'lucide-react';
import { ShadowProfile, CriticPipeline, AlgorithmicWeights } from '../../types';
import { soundFx } from '../../utils/audio';

interface ShadowTelemetryDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  shadowProfile: ShadowProfile;
  weights: AlgorithmicWeights;
  lastCriticPipeline?: CriticPipeline | null;
}

export const ShadowTelemetryDrawer: React.FC<ShadowTelemetryDrawerProps> = ({
  isOpen,
  onToggle,
  shadowProfile,
  weights,
  lastCriticPipeline,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'dualCritic'>('profile');

  return (
    <div className="border-t border-[#1a263b] bg-[#080d16] text-[#E0E6ED] font-mono text-xs shadow-2xl transition-all duration-300 select-none">
      {/* Drawer Header Bar */}
      <div 
        onClick={() => {
          soundFx.playBlip(600, 'sine', 0.03);
          onToggle();
        }}
        className="px-4 py-2.5 bg-[#0a101d] border-b border-[#1a263b] flex items-center justify-between cursor-pointer hover:bg-[#0e172a] transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">
              SHADOW PROFILE & DUAL-CRITIC INSPECTOR
            </span>
          </div>
          <span className="text-[10px] bg-[#14233c] text-sky-400 px-2 py-0.5 rounded border border-sky-500/30">
            Cluster: {shadowProfile.inferredIdeologicalCluster}
          </span>
          <span className="text-[10px] text-slate-500 hidden md:inline">
            Addiction Propensity: {shadowProfile.addictionPropensity}%
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400">
              {isOpen ? 'COLLAPSE DRAWER' : 'EXPAND TELEMETRY'}
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-[#38F2C2]" />}
          </div>
        </div>
      </div>

      {/* Expanded Drawer Content */}
      {isOpen && (
        <div className="p-4 md:p-6 space-y-4 max-h-[360px] overflow-y-auto">
          {/* Sub-tab Switcher */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'profile'
                  ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>COGNITIVE SHADOW PROFILE</span>
            </button>
            <button
              onClick={() => setActiveTab('dualCritic')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'dualCritic'
                  ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>DUAL-CRITIC MUTATION LOG</span>
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1: Vulnerability Scores */}
              <div className="bg-[#0b1220] border border-[#1b2a45] rounded-xl p-3 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold text-[#38F2C2]">
                  COGNITIVE VULNERABILITIES
                </div>
                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-300">
                      <span>Outrage Susceptibility:</span>
                      <span className="text-[#FF5E5B] font-bold">{shadowProfile.outrageSusceptibility}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-[#FF5E5B]" style={{ width: `${shadowProfile.outrageSusceptibility}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300">
                      <span>Novelty Seeking:</span>
                      <span className="text-amber-400 font-bold">{shadowProfile.noveltySeeking}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-amber-400" style={{ width: `${shadowProfile.noveltySeeking}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300">
                      <span>Parasocial Vulnerability:</span>
                      <span className="text-pink-400 font-bold">{shadowProfile.parasocialVulnerability}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-pink-400" style={{ width: `${shadowProfile.parasocialVulnerability}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300">
                      <span>Hyperreal Tolerance:</span>
                      <span className="text-purple-400 font-bold">{shadowProfile.hyperrealTolerance}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-purple-400" style={{ width: `${shadowProfile.hyperrealTolerance}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Ideological Affinities */}
              <div className="bg-[#0b1220] border border-[#1b2a45] rounded-xl p-3 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold text-[#38F2C2]">
                  IDEOLOGICAL VECTOR PROBABILITIES
                </div>
                <div className="space-y-1.5 text-[10px]">
                  {Object.entries(shadowProfile.ideologyAffinities).map(([cluster, score]) => (
                    <div key={cluster} className="space-y-0.5">
                      <div className="flex justify-between text-slate-300">
                        <span className="capitalize">{cluster.replace('-', ' ')}</span>
                        <span className="font-mono text-slate-400">{score}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#38F2C2]/70"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Interaction Telemetry Counters */}
              <div className="bg-[#0b1220] border border-[#1b2a45] rounded-xl p-3 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold text-[#38F2C2]">
                  RECORDED REACTION HISTORY
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">Total Linger:</span>
                    <span className="text-base font-bold text-white">{shadowProfile.totalLingerSeconds}s</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">Hate-Watches:</span>
                    <span className="text-base font-bold text-[#FF5E5B]">{shadowProfile.hateWatchCount}</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">Amplifications:</span>
                    <span className="text-base font-bold text-[#38F2C2]">{shadowProfile.amplifyCount}</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block">Ignores / Debunks:</span>
                    <span className="text-base font-bold text-slate-300">
                      {shadowProfile.ignoreCount} / {shadowProfile.debunkCount}
                    </span>
                  </div>
                </div>
                <p className="text-[9px] text-slate-500 italic mt-1">
                  Double-tapping posts in the inner feed updates these interaction vectors in real time.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'dualCritic' && (
            <div className="bg-[#0b1220] border border-[#1b2a45] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-xs text-[#38F2C2]">
                  DUAL-CRITIC NEGOTIATION PIPELINE
                </span>
                <span className="text-[10px] text-slate-400">
                  CRITIC 1 (OPTIMIZER) vs. CRITIC 2 (CULTURAL ARBITER)
                </span>
              </div>

              {lastCriticPipeline ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                  {/* Step 1: Raw Thought */}
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">1. RAW THOUGHT</span>
                    <p className="text-slate-200 italic">"{lastCriticPipeline.rawThought}"</p>
                  </div>

                  {/* Step 2: Critic 1 Optimizer */}
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                      <span>CRITIC 1: ENGAGEMENT OPTIMIZER</span>
                      <span>Score: {lastCriticPipeline.critic1.score.toFixed(0)}</span>
                    </div>
                    <p className="text-slate-300 text-[10px]">{lastCriticPipeline.critic1.rationale}</p>
                    <div className="text-[9px] text-amber-300/80 truncate">
                      Hook: {lastCriticPipeline.critic1.ruleApplied}
                    </div>
                  </div>

                  {/* Step 3: Critic 2 Arbiter & Final */}
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#38F2C2] font-bold">
                      <span>CRITIC 2: CULTURAL ARBITER</span>
                      <span>Subculture: {lastCriticPipeline.critic2.score.toFixed(0)}%</span>
                    </div>
                    <p className="text-slate-300 text-[10px]">{lastCriticPipeline.critic2.rationale}</p>
                    <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-emerald-400">
                      <strong>Synthesized Output:</strong> "{lastCriticPipeline.finalWarp}"
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-black/40 rounded-xl border border-dashed border-slate-800 text-center text-slate-400 text-xs">
                  <span>No recent dual-critic cycle logged. Spawn a synthetic cycle or test a thought to view the before/after critique negotiation.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
