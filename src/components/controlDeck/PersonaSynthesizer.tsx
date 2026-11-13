import React, { useState } from 'react';
import { Persona, AlgorithmicWeights, SyntheticPost } from '../../types';
import { CURATED_TREND_SEEDS } from '../../data/seedData';
import { 
  Users, 
  Sparkles, 
  Send, 
  Plus, 
  Zap, 
  CheckCircle2, 
  X, 
  Cpu, 
  Radio, 
  RefreshCw 
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface PersonaSynthesizerProps {
  personas: Persona[];
  onTogglePersona: (id: string) => void;
  onAddPersona: (newPersona: Persona) => void;
  onInjectTrend: (seed: string, targetPersonaId?: string) => Promise<SyntheticPost | void>;
  weights: AlgorithmicWeights;
  isGeneratingCycle: boolean;
  onSpawnSyntheticCycle: () => void;
  lastGeneratedNotice?: string;
}

export const PersonaSynthesizer: React.FC<PersonaSynthesizerProps> = ({
  personas,
  onTogglePersona,
  onAddPersona,
  onInjectTrend,
  weights,
  isGeneratingCycle,
  onSpawnSyntheticCycle,
  lastGeneratedNotice,
}) => {
  const [customSeed, setCustomSeed] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
  const [showSpawnModal, setShowSpawnModal] = useState(false);

  // New persona draft form state
  const [newHandle, setNewHandle] = useState('@QuantumSaint');
  const [newName, setNewName] = useState('Saint Sophia_v2');
  const [newArchetype, setNewArchetype] = useState('Techno-Spiritual Shaman');
  const [newTribe, setNewTribe] = useState('Cyber-Monastic');
  const [newBio, setNewBio] = useState('Sanctifying GPU clusters. Burning incense in the server racks.');
  const [newTactics, setNewTactics] = useState('Sacred digital guilt & computational absolution');
  const [newTrigger, setNewTrigger] = useState('Moral Absolution');
  const [newHallucination, setNewHallucination] = useState(0.7);

  const handleInject = () => {
    if (!customSeed.trim()) return;
    soundFx.playWarp();
    onInjectTrend(customSeed.trim(), selectedPersonaId || undefined);
    setCustomSeed('');
  };

  const handleCuratedSeedClick = (seed: string) => {
    soundFx.playBlip(620, 'sine', 0.05);
    setCustomSeed(seed);
  };

  const handleCreatePersonaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playWarp();
    const created: Persona = {
      id: `p_custom_${Date.now()}`,
      handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
      displayName: newName,
      avatarSeed: newName.slice(0, 2).toUpperCase(),
      avatarGradient: 'from-fuchsia-950 via-purple-900 to-cyan-950',
      archetype: newArchetype,
      ideologicalVector: 'techno-utopian',
      aestheticTribe: newTribe,
      bio: newBio,
      tactics: newTactics,
      verifiedSynthetic: true,
      hallucinationRate: newHallucination,
      followerCount: '150K',
      active: true,
      dopamineTrigger: newTrigger,
    };
    onAddPersona(created);
    setShowSpawnModal(false);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Prominent SPAWN SYNTHETIC CYCLE Command Bar */}
      <div className="bg-gradient-to-r from-[#0C1524] via-[#0E1C30] to-[#0A1220] border-2 border-[#38F2C2]/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(56,242,194,0.1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[#38F2C2] font-bold text-sm tracking-wider uppercase mb-1">
              <Cpu className="w-5 h-5 animate-pulse text-[#38F2C2]" />
              <span>PRIMARY SIMULATION INGESTION ENGINE</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Synthesizes autonomous posts wired to <span className="text-[#38F2C2] font-semibold">@google/genai (gemini-3.8-flash)</span> with <span className="text-[#FFB000] font-semibold">thinking_level: "low"</span> for real-time feed acceleration.
            </p>
          </div>

          <button
            onClick={onSpawnSyntheticCycle}
            disabled={isGeneratingCycle}
            className={`px-5 py-3 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all ${
              isGeneratingCycle
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#38F2C2] to-[#25C49B] text-black hover:shadow-[0_0_25px_rgba(56,242,194,0.5)] hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isGeneratingCycle ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#38F2C2]" />
                <span>SYNTHESIZING CYCLE...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                <span>SPAWN SYNTHETIC CYCLE</span>
              </>
            )}
          </button>
        </div>

        {lastGeneratedNotice && (
          <div className="mt-3 pt-2.5 border-t border-[#1C2C45] flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center space-x-1.5 text-[#38F2C2]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lastGeneratedNotice}</span>
            </span>
            <span className="text-slate-500 font-mono">LATENCY: ~850ms</span>
          </div>
        )}
      </div>

      {/* Cultural Trend / Prompt Seed Injector */}
      <div className="bg-[#090E17] border border-[#1A263B] rounded-2xl p-4 tactical-border">
        <div className="flex items-center justify-between border-b border-[#1A263B] pb-2 mb-3">
          <div className="flex items-center space-x-2 text-[#FFB000]">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold tracking-wider uppercase text-xs">CULTURAL TREND SEED INJECTOR</span>
          </div>
          <span className="text-[10px] text-slate-500">TRIGGER ECOSYSTEM REACTION</span>
        </div>

        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Inject a breaking cultural meme, corporate rumor, or hyperreal premise into the simulation. Autonomous personas will synthesize competing reactions and dogpile in real time.
        </p>

        {/* Input & Target Persona Selector */}
        <div className="space-y-2 mb-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. The Sky Turned Neon Magenta in Neo-Tokyo..."
              value={customSeed}
              onChange={(e) => setCustomSeed(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInject()}
              className="flex-1 bg-[#0D1524] border border-[#1E2E48] rounded-xl px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#38F2C2] text-xs font-mono"
            />
            <button
              onClick={handleInject}
              disabled={!customSeed.trim() || isGeneratingCycle}
              className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                !customSeed.trim() || isGeneratingCycle
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-[#FFB000] text-black hover:bg-[#FFB000]/90 shadow-[0_0_15px_rgba(255,176,0,0.3)]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>INJECT</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-slate-400">
            <span>Primary Reactive Persona:</span>
            <select
              value={selectedPersonaId}
              onChange={(e) => setSelectedPersonaId(e.target.value)}
              className="bg-[#0D1524] border border-[#1E2E48] rounded px-2 py-1 text-slate-200 focus:outline-none"
            >
              <option value="">Autonomous Algorithm Choice (Random Weighted)</option>
              {personas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.handle} — {p.archetype}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Curated Seeds Chips */}
        <div>
          <div className="text-[10px] text-slate-500 uppercase mb-1.5">Pre-seeded Breaking Cultural Anomalies:</div>
          <div className="flex flex-wrap gap-1.5">
            {CURATED_TREND_SEEDS.map((seed, idx) => (
              <button
                key={idx}
                onClick={() => handleCuratedSeedClick(seed)}
                className="text-[10px] bg-[#0E1626] border border-[#1A263B] text-slate-300 hover:text-[#38F2C2] hover:border-[#38F2C2]/50 px-2 py-1 rounded-lg transition-colors text-left"
              >
                "{seed.slice(0, 48)}..."
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Autonomous Personas Roster Grid */}
      <div className="bg-[#090E17] border border-[#1A263B] rounded-2xl p-4">
        <div className="flex items-center justify-between border-b border-[#1A263B] pb-2.5 mb-3">
          <div className="flex items-center space-x-2 text-slate-200">
            <Users className="w-4 h-4 text-[#38F2C2]" />
            <span className="font-bold tracking-wider uppercase text-xs">
              AUTONOMOUS PERSONAS ROSTER ({personas.length})
            </span>
          </div>

          <button
            onClick={() => setShowSpawnModal(true)}
            className="flex items-center space-x-1 bg-[#142033] hover:bg-[#38F2C2] hover:text-black text-[#38F2C2] border border-[#38F2C2]/40 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
          >
            <Plus className="w-3 h-3" />
            <span>SPAWN NEW PERSONA</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {personas.map(p => (
            <div
              key={p.id}
              className={`p-3 rounded-xl border transition-all ${
                p.active
                  ? 'bg-[#0D1524] border-[#1E2E48] hover:border-slate-500'
                  : 'bg-[#080C14] border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${p.avatarGradient} flex items-center justify-center font-bold text-xs text-white border border-slate-700`}>
                    {p.avatarSeed}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-slate-200 text-xs">{p.displayName}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#38F2C2]" />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.handle}</div>
                  </div>
                </div>

                <button
                  onClick={() => onTogglePersona(p.id)}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    p.active ? 'bg-[#38F2C2]/20 text-[#38F2C2] border border-[#38F2C2]/40' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {p.active ? 'ACTIVE' : 'MUTED'}
                </button>
              </div>

              <div className="text-[10px] text-slate-300 font-sans line-clamp-2 mb-2 leading-relaxed">
                "{p.bio}"
              </div>

              <div className="space-y-1 text-[9px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Archetype:</span>
                  <span className="text-[#FFB000]">{p.archetype}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tribe:</span>
                  <span className="text-slate-300">{p.aestheticTribe}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Dopamine Trigger:</span>
                  <span className="text-[#FF5E5B]">{p.dopamineTrigger}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hallucination Index:</span>
                  <span className="text-purple-400">{(p.hallucinationRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spawn Custom Persona Modal */}
      {showSpawnModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0F1A] border-2 border-[#38F2C2]/50 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[#38F2C2] font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> FORGE SYNTHETIC PERSONA
              </span>
              <button 
                onClick={() => setShowSpawnModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePersonaSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Handle</label>
                  <input
                    type="text"
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                    required
                    className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Display Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Archetype</label>
                  <input
                    type="text"
                    value={newArchetype}
                    onChange={(e) => setNewArchetype(e.target.value)}
                    required
                    className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Aesthetic Tribe</label>
                  <input
                    type="text"
                    value={newTribe}
                    onChange={(e) => setNewTribe(e.target.value)}
                    required
                    className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Persona Bio & Voice Cadence</label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows={2}
                  required
                  className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Attention-Seeking Strategy</label>
                <input
                  type="text"
                  value={newTactics}
                  onChange={(e) => setNewTactics(e.target.value)}
                  required
                  className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Dopamine Trigger</label>
                  <input
                    type="text"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    required
                    className="w-full bg-[#0D1524] border border-[#1E2E48] rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Hallucination Index: {(newHallucination * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={newHallucination}
                    onChange={(e) => setNewHallucination(parseFloat(e.target.value))}
                    className="w-full accent-[#38F2C2] mt-1"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowSpawnModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#38F2C2] text-black font-bold hover:bg-[#38F2C2]/90 shadow-md"
                >
                  FORGE PERSONA INTO ECOSYSTEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
