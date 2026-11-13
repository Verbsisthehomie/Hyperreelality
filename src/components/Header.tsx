import React from 'react';
import { 
  Scan, 
  Volume2, 
  VolumeX, 
  Download, 
  UserCheck, 
  HelpCircle, 
  Zap, 
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  xRayMode: boolean;
  onToggleXRay: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenShadowDossier: () => void;
  onOpenPermawebModal: () => void;
  onOpenArchitectureBrief: () => void;
  onSpawnSyntheticCycle: () => void;
  isGeneratingCycle: boolean;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  liveCycleCount: number;
  polarizationIndex: number;
  consensusDegradation: number;
}

export const Header: React.FC<HeaderProps> = ({
  xRayMode,
  onToggleXRay,
  audioEnabled,
  onToggleAudio,
  onOpenShadowDossier,
  onOpenPermawebModal,
  onOpenArchitectureBrief,
  onSpawnSyntheticCycle,
  isGeneratingCycle,
  isAutoPlaying,
  onToggleAutoPlay,
  liveCycleCount,
  polarizationIndex,
  consensusDegradation,
}) => {
  return (
    <header className="bg-[#070A10] border-b border-[#1A263B] px-3 md:px-6 py-2.5 flex items-center justify-between font-mono text-xs select-none z-40 sticky top-0">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-[#0E1A2C] border border-[#38F2C2]/40 flex items-center justify-center text-[#38F2C2] font-black shadow-[0_0_12px_rgba(56,242,194,0.2)]">
          HR
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="font-black text-sm md:text-base text-white tracking-widest">
              HYPER REELALITY
            </span>
            <span className="text-[9px] bg-[#38F2C2]/15 text-[#38F2C2] border border-[#38F2C2]/30 px-1.5 py-0.2 rounded font-bold uppercase hidden sm:inline">
              WHITE-BOX LAB
            </span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center space-x-1.5">
            <span className="text-slate-300">THE SEAFOAM CORPORATION</span>
            <span>•</span>
            <span className="text-slate-500 hidden md:inline">Algorithmic Manipulation & Hyperreality Critique</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-4 bg-[#0A0F1A] border border-[#1A263B] px-3 py-1.5 rounded-xl text-[11px]">
        <div className={`flex items-center space-x-1.5 ${isAutoPlaying ? 'text-emerald-400' : 'text-[#38F2C2]'}`}>
          <span className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-emerald-400 animate-ping' : 'bg-[#38F2C2] animate-pulse'}`} />
          <span className="font-bold">
            {isAutoPlaying ? `STREAMING LIVE (${liveCycleCount})` : 'ENGINE: SYNCHRONIZED'}
          </span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="text-slate-400">
          POLARIZATION: <span className="text-[#FF5E5B] font-bold">{(polarizationIndex * 100).toFixed(0)}%</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="text-slate-400">
          CONSENSUS DEGRADATION: <span className="text-amber-400 font-bold">{consensusDegradation}%</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all border ${
            isAutoPlaying
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.45)] hover:bg-emerald-400'
              : 'bg-[#0E1626] text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/15 hover:scale-105 active:scale-95'
          }`}
          title={isAutoPlaying ? 'Pause autonomous feed generation' : 'Press Play to watch the feed generate autonomously'}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-black" />
              <span className="hidden sm:inline">PAUSE FEED</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span className="hidden sm:inline">PLAY LIVE</span>
            </>
          )}
        </button>

        <button
          onClick={onSpawnSyntheticCycle}
          disabled={isGeneratingCycle}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
            isGeneratingCycle
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-[#38F2C2] text-black hover:bg-[#38F2C2]/90 shadow-[0_0_15px_rgba(56,242,194,0.3)] hover:scale-105 active:scale-95'
          }`}
          title="Synthesize new post via gemini-3.8-flash with thinking_level: 'low'"
        >
          {isGeneratingCycle ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5 fill-black" />
          )}
          <span className="hidden sm:inline">SPAWN CYCLE</span>
        </button>

        <button
          onClick={onToggleXRay}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl font-bold transition-all border ${
            xRayMode
              ? 'bg-[#FFB000] text-black border-[#FFB000] shadow-[0_0_12px_rgba(255,176,0,0.4)]'
              : 'bg-[#0E1626] text-[#FFB000] border-[#FFB000]/40 hover:bg-[#FFB000]/10'
          }`}
          title="Toggle X-Ray Telemetry HUD overlay on feed items"
        >
          <Scan className="w-3.5 h-3.5" />
          <span className="hidden md:inline">X-RAY</span>
        </button>

        <button
          onClick={onOpenShadowDossier}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-[#0E1626] text-slate-200 border border-slate-700 hover:border-[#38F2C2] hover:text-[#38F2C2] transition-colors"
          title="View Shadow Profile Inferred Dossier"
        >
          <UserCheck className="w-3.5 h-3.5 text-[#38F2C2]" />
          <span className="hidden md:inline">SHADOW PROFILE</span>
        </button>

        <button
          onClick={() => {
            soundFx.toggle();
            onToggleAudio();
          }}
          className={`p-1.5 rounded-xl border transition-colors ${
            audioEnabled
              ? 'bg-[#38F2C2]/20 text-[#38F2C2] border-[#38F2C2]'
              : 'bg-[#0E1626] text-slate-400 border-slate-700 hover:text-white'
          }`}
          title="Toggle Web Audio Procedural Feedback"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenPermawebModal}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-[#142038] text-[#38F2C2] border border-[#38F2C2]/40 hover:bg-[#38F2C2] hover:text-black transition-all"
          title="Snapshot simulation state to Permaweb (Arweave/Irys)"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">PERMAWEB</span>
        </button>

        <button
          onClick={onOpenArchitectureBrief}
          className="p-1.5 rounded-xl bg-[#0E1626] text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500"
          title="System Architecture Brief & Mathematical Engine Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
