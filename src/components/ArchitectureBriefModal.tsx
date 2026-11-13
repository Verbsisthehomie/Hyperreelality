import React from 'react';
import { X, BookOpen, Cpu, Flame, Compass, Sparkles, Radio, HeartHandshake, ShieldCheck } from 'lucide-react';

interface ArchitectureBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureBriefModal: React.FC<ArchitectureBriefModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#080D17] border-2 border-[#38F2C2]/50 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col font-mono text-xs text-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B1220] border-b border-[#1E2E48] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <BookOpen className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wider uppercase">
              SYSTEM ARCHITECTURE BRIEF // THE SEAFOAM CORPORATION
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 select-text">
          {/* Executive Summary */}
          <div>
            <h2 className="text-[#38F2C2] text-sm font-bold uppercase tracking-wider mb-2">
              1. EXECUTIVE SYSTEM SUMMARY
            </h2>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              **HYPER REELALITY** is a white-box algorithmic laboratory engineered to expose the causal feedback loops of modern attention platforms. Conventional social media presents recommendations as organic serendipity; HYPER REELALITY turns the black box translucent, allowing the investigator to dynamically adjust ranking parameters, watch shadow profiles congeal, and track how raw human thoughts are algorithmically warped through a Dual-Critic adversarial pipeline before publication.
            </p>
          </div>

          {/* Mathematical Scoring Engine */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-4 rounded-xl space-y-3">
            <h2 className="text-[#FFB000] text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" /> 2. FIRST-PRINCIPLES MATHEMATICAL SCORING ENGINE
            </h2>
            <div className="p-3 bg-black/70 rounded-lg border border-slate-800 text-[#38F2C2] text-[11px] font-mono leading-relaxed overflow-x-auto">
              <code>
                RankScore = (OutrageScore x W_outrage x 1.7) + (ClusterAffinity x W_echo x 1.5) + (NoveltyScore x W_novelty x 1.2) + (HyperrealScore x W_drift x 1.4) + (ParasocialScore x W_parasocial x 1.1) + SensationalismBonus
              </code>
            </div>
            <div className="space-y-1.5 text-slate-300 font-sans text-xs">
              <p>
                <strong>Outrage Weight (W_outrage):</strong> Multiplies conflict predicates and institutional accusations. A score above 0.7 triggers non-linear retention spikes.
              </p>
              <p>
                <strong>Echo Chamber Cohesion (W_echo):</strong> Computes cosine distance between post ideological tags and the user's inferred shadow profile cluster. High values penalize cross-ideological nuance.
              </p>
              <p>
                <strong>Novelty Decay (W_novelty):</strong> Governs the half-life of familiar tropes. When maxed, only uncanny, surreal, or catastrophic anomalies surface.
              </p>
              <p>
                <strong>Hyperreal Drift (W_drift):</strong> Measures divergence from physical ground truths into self-referential subcultural folklore and manufactured memories.
              </p>
            </div>
          </div>

          {/* The Shadow Profile Feedback Loop */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-4 rounded-xl space-y-2">
            <h2 className="text-purple-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4" /> 3. THE SHADOW PROFILE STATE MACHINE
            </h2>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Every simulated user interaction mutates the hidden digital twin:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 font-sans text-xs">
              <li><strong>+5s Linger:</strong> Signals subconscious optical fixation; increments addiction propensity and locks ideological affinity.</li>
              <li><strong>Hate-Watch:</strong> Flags the user as susceptible to high-arousal negative engagement; algorithm optimizes upcoming slots for moral conflict.</li>
              <li><strong>Amplify / Share:</strong> Turns the user into an active echo-chamber node; reinforces contagion vectors.</li>
              <li><strong>Ignore:</strong> Applies negative decay coefficients, prompting the engine to test alternate novelty or parasocial hooks.</li>
            </ul>
          </div>

          {/* Dual-Critic Feedback Pipeline */}
          <div className="bg-[#0D1524] border border-[#1E2E48] p-4 rounded-xl space-y-2">
            <h2 className="text-[#38F2C2] text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 4. DUAL-CRITIC ADVERSARIAL MUTATION PIPELINE
            </h2>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              When content is forged in the laboratory, it undergoes two adversarial validation passes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="bg-black/50 p-3 rounded-lg border border-[#FF5E5B]/30">
                <span className="text-[#FF5E5B] font-bold block mb-1">CRITIC 1: ENGAGEMENT OPTIMIZER</span>
                <span className="text-slate-400 text-[11px] block leading-relaxed font-sans">
                  Evaluates 3-second drop-off hazards, retention cliffs, and curiosity gaps. Rewrites quiet thoughts into high-stakes moral dilemmas, urgency imperatives, or status threats.
                </span>
              </div>
              <div className="bg-black/50 p-3 rounded-lg border border-[#38F2C2]/30">
                <span className="text-[#38F2C2] font-bold block mb-1">CRITIC 2: CULTURAL & AESTHETIC ARBITER</span>
                <span className="text-slate-400 text-[11px] block leading-relaxed font-sans">
                  Applies subcultural vernacular (Terminal Goth, Bio-Silicon Maximalism, Hauntology) and injects hyperreal drift tokens, ensuring the post feels organic to its synthetic sub-tribe.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0B1220] border-t border-[#1E2E48] px-5 py-3 flex items-center justify-between text-[10px] text-slate-500">
          <span>THE SEAFOAM CORPORATION // DIVISION OF EXPERIMENTAL SIMULATION</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#38F2C2] text-black font-bold hover:bg-[#38F2C2]/90"
          >
            DISMISS BRIEF
          </button>
        </div>
      </div>
    </div>
  );
};
