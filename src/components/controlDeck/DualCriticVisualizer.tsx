import React, { useState } from 'react';
import { Persona, AlgorithmicWeights, SyntheticPost, CriticPipeline } from '../../types';
import { 
  GitCompare, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Send, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface DualCriticVisualizerProps {
  selectedPost: SyntheticPost | null;
  personas: Persona[];
  weights: AlgorithmicWeights;
  onEvaluateThought: (thought: string, personaId: string) => Promise<CriticPipeline>;
}

export const DualCriticVisualizer: React.FC<DualCriticVisualizerProps> = ({
  selectedPost,
  personas,
  weights,
  onEvaluateThought,
}) => {
  const [customThought, setCustomThought] = useState('I spent all afternoon on my phone and felt strangely lonely.');
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0]?.id || '');
  const [activePipeline, setActivePipeline] = useState<CriticPipeline | null>(
    selectedPost ? selectedPost.criticPipeline : null
  );
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Update pipeline when selectedPost changes
  React.useEffect(() => {
    if (selectedPost) {
      setActivePipeline(selectedPost.criticPipeline);
    }
  }, [selectedPost]);

  const handleRunEvaluation = async () => {
    if (!customThought.trim()) return;
    soundFx.playWarp();
    setIsEvaluating(true);
    try {
      const result = await onEvaluateThought(customThought.trim(), selectedPersonaId || personas[0].id);
      setActivePipeline(result);
    } finally {
      setIsEvaluating(false);
    }
  };

  const currentPersona = personas.find(p => p.id === selectedPersonaId) || personas[0];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Interactive Custom Thought Crucible / Workbench */}
      <div className="bg-[#090E17] border border-[#1A263B] rounded-2xl p-4 tactical-border">
        <div className="flex items-center justify-between border-b border-[#1A263B] pb-2 mb-3">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-bold tracking-wider uppercase text-xs">DUAL-CRITIC WARPING WORKBENCH</span>
          </div>
          <span className="text-[10px] text-slate-500">ADVERSARIAL FEEDBACK PIPELINE</span>
        </div>

        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Input an unvarnished human thought. Watch the Dual-Critic state machine algorithmically warp it through Engagement Optimization (Critic 1) and Cultural/Aesthetic Distortion (Critic 2).
        </p>

        <div className="space-y-3 mb-3">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Raw Unoptimized Thought (Draft Input):</label>
            <textarea
              value={customThought}
              onChange={(e) => setCustomThought(e.target.value)}
              rows={2}
              className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#38F2C2] text-xs font-mono"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-slate-400">Target Persona Voice:</span>
              <select
                value={selectedPersonaId}
                onChange={(e) => setSelectedPersonaId(e.target.value)}
                className="bg-[#0D1524] border border-[#1E2E48] rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
              >
                {personas.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.handle} ({p.archetype})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRunEvaluation}
              disabled={isEvaluating || !customThought.trim()}
              className={`px-4 py-2 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                isEvaluating || !customThought.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              }`}
            >
              {isEvaluating ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>WARPING THOUGHT...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>RUN THROUGH DUAL CRITIC</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flowchart: Step 0 -> Step 1 -> Step 2 */}
      {activePipeline && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-slate-300 font-bold uppercase text-xs px-1">
            <span>PIPELINE EXECUTION TRACE</span>
            <span className="text-[#38F2C2] text-[10px]">{activePipeline.mutationDeltaSummary}</span>
          </div>

          {/* Stage 0: Raw Thought */}
          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-2xl p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px]">0</span>
                RAW UNVARNISHED THOUGHT (UNOPTIMIZED DRAFT)
              </span>
              <span className="text-[10px] text-slate-500">VIRALITY SCORE: ~18/100</span>
            </div>
            <div className="bg-black/50 p-3 rounded-xl border border-slate-800 text-slate-300 font-sans italic text-xs">
              "{activePipeline.rawThought}"
            </div>
          </div>

          {/* Stage 1: Critic 1 (Engagement Optimizer) */}
          <div className="bg-[#121124] border-2 border-[#FF5E5B]/40 rounded-2xl p-4 relative shadow-[0_0_20px_rgba(255,94,91,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#FF5E5B] text-black font-black flex items-center justify-center text-[10px]">1</span>
                <span className="text-[#FF5E5B] font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> CRITIC 1: THE ENGAGEMENT OPTIMIZER
                </span>
              </div>
              <span className="bg-[#FF5E5B]/15 text-[#FF5E5B] px-2 py-0.5 rounded text-[10px] font-bold border border-[#FF5E5B]/30">
                RULE: {activePipeline.critic1.ruleApplied}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 mb-2 leading-relaxed bg-[#0A0D17] p-2.5 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-semibold">Algorithmic Rationale:</span> {activePipeline.critic1.rationale}
            </div>

            <div className="bg-black/60 p-3 rounded-xl border border-[#FF5E5B]/30 text-slate-100 font-mono text-xs">
              <div className="text-[9px] text-[#FF5E5B] uppercase mb-1 font-bold">MUTATION RESULT (STAGE 1):</div>
              "{activePipeline.critic1.proposedMutation}"
            </div>
          </div>

          {/* Stage 2: Critic 2 (Cultural / Aesthetic Arbiter) */}
          <div className="bg-[#10192A] border-2 border-[#38F2C2]/40 rounded-2xl p-4 relative shadow-[0_0_20px_rgba(56,242,194,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#38F2C2] text-black font-black flex items-center justify-center text-[10px]">2</span>
                <span className="text-[#38F2C2] font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> CRITIC 2: THE CULTURAL & AESTHETIC ARBITER
                </span>
              </div>
              <span className="bg-[#38F2C2]/15 text-[#38F2C2] px-2 py-0.5 rounded text-[10px] font-bold border border-[#38F2C2]/30">
                RULE: {activePipeline.critic2.ruleApplied}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 mb-2 leading-relaxed bg-[#0A0D17] p-2.5 rounded-lg border border-slate-800">
              <span className="text-[#38F2C2] font-semibold">Dialect Adaptation:</span> {activePipeline.critic2.rationale}
            </div>

            <div className="bg-black/60 p-3 rounded-xl border border-[#38F2C2]/30 text-white font-mono text-xs">
              <div className="text-[9px] text-[#38F2C2] uppercase mb-1 font-bold">FINAL WARPED FEED CONTENT:</div>
              "{activePipeline.finalWarp}"
            </div>
          </div>

          {/* Side-by-Side Diff Summary */}
          <div className="bg-[#0A0F1A] border border-[#1A263B] rounded-2xl p-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-slate-300 font-bold mb-2">
              <GitCompare className="w-4 h-4 text-[#FFB000]" />
              <span className="uppercase text-xs">HYPERREAL WARPING IMPACT SUMMARY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-200">
                <span className="font-bold block mb-1 text-red-400">INPUT CASUALTY:</span>
                Authentic vulnerability and quiet self-reflection deleted due to zero dopamine retention yield.
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-emerald-200">
                <span className="font-bold block mb-1 text-emerald-400">OUTPUT PRODUCT:</span>
                Weaponized indignation, tribal vernacular tokens, and parasocial retention hooks injected.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
