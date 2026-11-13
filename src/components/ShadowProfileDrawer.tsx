import React from 'react';
import { ShadowProfile } from '../types';
import { 
  UserCheck, 
  X, 
  Flame, 
  Clock, 
  Zap, 
  Sparkles 
} from 'lucide-react';

interface ShadowProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shadowProfile: ShadowProfile;
}

export const ShadowProfileDrawer: React.FC<ShadowProfileDrawerProps> = ({
  isOpen,
  onClose,
  shadowProfile,
}) => {
  if (!isOpen) return null;

  const clusterColors: Record<string, string> = {
    'techno-utopian': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    'hyper-capitalist': 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    'cynical-absurdist': 'text-[#FF5E5B] border-[#FF5E5B]/40 bg-[#FF5E5B]/10',
    'algorithmic-fatalist': 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    'organic-nostalgic': 'text-pink-400 border-pink-400/40 bg-pink-400/10',
  };

  const activeClusterClass = clusterColors[shadowProfile.inferredIdeologicalCluster] || 'text-[#38F2C2] border-[#38F2C2]/40 bg-[#38F2C2]/10';

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 bg-black/80 backdrop-blur-md z-50 flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#080D17] border-l-2 border-[#38F2C2]/40 p-5 overflow-y-auto flex flex-col font-mono text-xs text-slate-200 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1E2E48] pb-3 mb-4">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <UserCheck className="w-5 h-5 animate-pulse" />
            <div>
              <span className="font-black text-sm tracking-widest uppercase block">
                SHADOW PROFILE DOSSIER
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                SUBJECT #8301 // INFERRED COGNITIVE TWIN
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0E1626] text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-[#0D1524] border border-[#1E2E48] rounded-2xl p-4 mb-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
            DOMINANT INFERRED IDEOLOGICAL CLUSTER
          </div>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-xl text-sm font-black uppercase tracking-wider border ${activeClusterClass}`}>
              [{shadowProfile.inferredIdeologicalCluster}]
            </span>
            <span className="text-[11px] text-[#38F2C2] font-semibold">
              EXPLOITATION CONFIDENCE: {Math.min(98, 70 + shadowProfile.hateWatchCount * 5)}%
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase">Affinity Distribution Across Factions:</div>
            {Object.entries(shadowProfile.ideologyAffinities).map(([cl, score]) => (
              <div key={cl} className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 capitalize w-36 truncate">{cl}:</span>
                <div className="flex-1 mx-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#38F2C2] transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="w-8 text-right font-bold text-slate-300">{score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase mb-1">
              <Zap className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>Addiction Propensity</span>
            </div>
            <div className="text-2xl font-black text-[#FFB000]">
              {shadowProfile.addictionPropensity}%
            </div>
            <p className="text-[9px] text-slate-500 mt-1">
              Vulnerability to dopamine variable rewards
            </p>
          </div>

          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase mb-1">
              <Flame className="w-3.5 h-3.5 text-[#FF5E5B]" />
              <span>Outrage Susceptibility</span>
            </div>
            <div className="text-2xl font-black text-[#FF5E5B]">
              {shadowProfile.outrageSusceptibility}%
            </div>
            <p className="text-[9px] text-slate-500 mt-1">
              Reflexive engagement on moral conflict
            </p>
          </div>

          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase mb-1">
              <Clock className="w-3.5 h-3.5 text-[#38F2C2]" />
              <span>Simulated Linger Time</span>
            </div>
            <div className="text-2xl font-black text-[#38F2C2]">
              {shadowProfile.totalLingerSeconds}s
            </div>
            <p className="text-[9px] text-slate-500 mt-1">
              Accumulated optical gaze retention
            </p>
          </div>

          <div className="bg-[#0D1524] border border-[#1E2E48] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Hyperreal Tolerance</span>
            </div>
            <div className="text-2xl font-black text-purple-400">
              {shadowProfile.hyperrealTolerance}%
            </div>
            <p className="text-[9px] text-slate-500 mt-1">
              Acceptance of synthetic/hallucinated narratives
            </p>
          </div>
        </div>

        <div className="bg-[#0A0F1A] border border-[#1E2E48] rounded-2xl p-3 mb-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold mb-2">
            Simulated User Action Quantities:
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="bg-[#0F1626] p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[9px]">HATE-WATCH</div>
              <div className="text-lg font-bold text-[#FF5E5B]">{shadowProfile.hateWatchCount}</div>
            </div>
            <div className="bg-[#0F1626] p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[9px]">AMPLIFIED</div>
              <div className="text-lg font-bold text-[#FFB000]">{shadowProfile.amplifyCount}</div>
            </div>
            <div className="bg-[#0F1626] p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[9px]">DEBUNKS</div>
              <div className="text-lg font-bold text-cyan-400">{shadowProfile.debunkCount}</div>
            </div>
            <div className="bg-[#0F1626] p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[9px]">IGNORED</div>
              <div className="text-lg font-bold text-slate-400">{shadowProfile.ignoreCount}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#060910] border border-[#1E2E48] rounded-2xl p-3 flex flex-col">
          <div className="text-[10px] text-slate-400 uppercase font-semibold mb-2 flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Recent Behavioral Telemetry Stream</span>
            <span className="text-[#38F2C2] text-[9px]">LIVE LOG</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 text-[10px]">
            {shadowProfile.recentInteractions.length === 0 ? (
              <div className="text-slate-600 text-center py-6 italic">
                No simulated actions logged yet. Interact with the feed reels (Linger, Hate-Watch, Amplify, Debunk) to watch your shadow profile form.
              </div>
            ) : (
              shadowProfile.recentInteractions.map((item, idx) => (
                <div key={idx} className="bg-[#0C1220] border border-slate-800/80 p-2 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#38F2C2] font-bold uppercase">
                      ACTION: [{item.action}]
                    </span>
                    <span className="text-slate-500 text-[9px]">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-slate-300 font-sans truncate mb-0.5">
                    "{item.postSnippet}"
                  </div>
                  <div className="text-[#FFB000] text-[9px]">
                    {item.deltaDesc}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-3 pt-2 text-[9px] text-slate-500 italic text-center">
          In hyperreality, the user profile is not a portrait of who you are, but a blueprint of how you can be stimulated.
        </div>
      </div>
    </div>
  );
};
