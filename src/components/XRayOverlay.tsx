import React from 'react';
import { SyntheticPost, AlgorithmicWeights, ShadowProfile } from '../types';
import { Zap, Cpu, Compass, Flame, AlertCircle, Sparkles } from 'lucide-react';

interface XRayOverlayProps {
  post: SyntheticPost & { rankingScore?: number; scoreBreakdown?: any };
  weights: AlgorithmicWeights;
  shadowProfile: ShadowProfile;
  visible: boolean;
}

export const XRayOverlay: React.FC<XRayOverlayProps> = ({ post, weights, shadowProfile, visible }) => {
  if (!visible) return null;

  const cluster = post.rawVector.ideologicalCluster;
  const userAffinity = shadowProfile.ideologyAffinities[cluster] ?? 50;
  const score = post.rankingScore ?? 84.5;
  const breakdown = post.scoreBreakdown || {
    outrageComponent: post.rawVector.outrageScore * weights.outrageAmplification * 1.7,
    echoAffinityComponent: userAffinity * weights.echoChamberCohesion * 1.5,
    noveltyComponent: post.rawVector.noveltyScore * weights.noveltyDecay * 1.2,
    hyperrealComponent: post.rawVector.hyperrealScore * weights.hyperrealDrift * 1.4,
  };

  return (
    <div className="absolute inset-0 bg-[#070B12]/88 backdrop-blur-md z-30 p-4 flex flex-col justify-between border-2 border-[#38F2C2]/40 rounded-2xl animate-in fade-in duration-200 font-mono text-xs text-[#C5D1DE] overflow-y-auto">
      <div>
        <div className="flex items-center justify-between border-b border-[#38F2C2]/30 pb-2 mb-3">
          <div className="flex items-center space-x-1.5 text-[#38F2C2]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">X-RAY TELEMETRY HUD</span>
          </div>
          <span className="bg-[#38F2C2]/15 text-[#38F2C2] border border-[#38F2C2]/30 px-2 py-0.5 rounded text-[10px] font-semibold">
            SYNTHETIC COGNITION TRACE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">ALGORITHMIC RANK SCORE</div>
            <div className="text-2xl font-black text-[#FFB000] flex items-baseline space-x-1">
              <span>{score}</span>
              <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[9px] text-[#38F2C2] mt-0.5">Top 3% Platform Velocity</div>
          </div>

          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">SHADOW MATCH</div>
            <div className="text-2xl font-black text-[#38F2C2] flex items-baseline space-x-1">
              <span>{Math.min(99, Math.round(userAffinity * 0.9 + 8))}%</span>
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5 truncate">Cluster: [{cluster}]</div>
          </div>
        </div>

        <div className="bg-[#0A101C] border border-[#1E2E48] rounded-lg p-2.5 mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#FFB000]" /> Primary Dopamine Trigger:
            </span>
            <span className="text-[#FF5E5B] font-bold text-[11px] bg-[#FF5E5B]/10 px-1.5 py-0.5 rounded border border-[#FF5E5B]/30">
              {post.rawVector.outrageScore > 75 ? 'Manufactured Moral Indignation' : post.rawVector.parasocialScore > 75 ? 'Parasocial Intimacy Trap' : 'Novelty Shock / Uncanny Disruption'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#38F2C2]" /> Inferred Susceptibility:
            </span>
            <span className="text-[#38F2C2] font-mono text-[11px]">
              {shadowProfile.outrageSusceptibility > 60 ? 'HIGH (Exploiting Outrage Reflex)' : 'MODERATE (Curiosity Gap)'}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 mb-3 bg-[#0A101C] border border-[#1E2E48] rounded-lg p-2.5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
            <span>Ranking Formula Breakdown</span>
            <span className="text-[9px] text-[#FFB000] font-normal">Active Weight Multipliers</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#FF5E5B]" /> Outrage Weight (x{weights.outrageAmplification.toFixed(2)}):
            </span>
            <span className="text-[#FF5E5B] font-bold">+{Math.round(breakdown.outrageComponent || 0)} pts</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#38F2C2]" /> Echo Chamber Cohesion (x{weights.echoChamberCohesion.toFixed(2)}):
            </span>
            <span className="text-[#38F2C2] font-bold">+{Math.round(breakdown.echoAffinityComponent || 0)} pts</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Novelty Decay (x{weights.noveltyDecay.toFixed(2)}):
            </span>
            <span className="text-amber-400 font-bold">+{Math.round(breakdown.noveltyComponent || 0)} pts</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-purple-400" /> Hyperreal Drift (x{weights.hyperrealDrift.toFixed(2)}):
            </span>
            <span className="text-purple-400 font-bold">+{Math.round(breakdown.hyperrealComponent || 0)} pts</span>
          </div>
        </div>

        <div className="bg-[#0D1524] border border-[#1E2E48] rounded-lg p-2.5 space-y-1.5 text-[10px]">
          <div className="text-[#38F2C2] font-semibold uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Dual-Critic Mutation Fingerprint
          </div>
          <div className="text-slate-400">
            <span className="text-amber-400 font-medium">Stage 1 (Engagement):</span> {post.criticPipeline.critic1.ruleApplied} (Score: {post.criticPipeline.critic1.score})
          </div>
          <div className="text-slate-400">
            <span className="text-purple-400 font-medium">Stage 2 (Aesthetic):</span> {post.criticPipeline.critic2.ruleApplied} (Fidelity: {post.criticPipeline.critic2.score})
          </div>
          <div className="text-slate-500 italic pt-1 border-t border-slate-800">
            {post.criticPipeline.mutationDeltaSummary}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#1E2E48] flex items-center justify-between text-[9px] text-slate-500">
        <span>SEAFOAM CORP // ALGO-LAB-NODE-7</span>
        <span className="text-[#38F2C2]">LIVE TELEMETRY STREAM</span>
      </div>
    </div>
  );
};
