import React, { useState, useEffect } from 'react';
import { SyntheticPost, AlgorithmicWeights, ShadowProfile } from '../types';
import { ReelVisualizer } from './ReelVisualizer';
import { XRayOverlay } from './XRayOverlay';
import { 
  Heart, 
  Share2, 
  MessageSquare, 
  Eye, 
  Flame, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Radio, 
  Scan,
  RefreshCw
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ReelFeedProps {
  feed: Array<SyntheticPost & { rankingScore?: number; scoreBreakdown?: any }>;
  weights: AlgorithmicWeights;
  shadowProfile: ShadowProfile;
  xRayMode: boolean;
  onToggleXRay: () => void;
  onSimulateAction: (action: 'linger' | 'hate_watch' | 'amplify' | 'ignore' | 'debunk', post: SyntheticPost) => void;
  onSelectPostForCritic: (post: SyntheticPost) => void;
}

export const ReelFeed: React.FC<ReelFeedProps> = ({
  feed,
  weights,
  shadowProfile,
  xRayMode,
  onToggleXRay,
  onSimulateAction,
  onSelectPostForCritic,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [lingerActive, setLingerActive] = useState(false);
  const [glitchFlash, setGlitchFlash] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  const currentPost = feed[currentIndex] || feed[0];

  // Auto-advance loop when enabled
  useEffect(() => {
    if (!autoScroll || feed.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % feed.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [autoScroll, feed.length]);

  const handleNext = () => {
    soundFx.playBlip(700, 'sine', 0.05);
    setCurrentIndex(prev => (prev + 1) % feed.length);
    setShowComments(false);
  };

  const handlePrev = () => {
    soundFx.playBlip(550, 'sine', 0.05);
    setCurrentIndex(prev => (prev - 1 + feed.length) % feed.length);
    setShowComments(false);
  };

  const handleLinger = () => {
    soundFx.playBlip(440, 'triangle', 0.15);
    setLingerActive(true);
    onSimulateAction('linger', currentPost);
    setTimeout(() => setLingerActive(false), 2000);
  };

  const handleHateWatch = () => {
    soundFx.playAlert();
    setGlitchFlash(true);
    onSimulateAction('hate_watch', currentPost);
    setTimeout(() => setGlitchFlash(false), 600);
  };

  const handleAmplify = () => {
    soundFx.playWarp();
    onSimulateAction('amplify', currentPost);
  };

  const handleIgnore = () => {
    soundFx.playBlip(320, 'sine', 0.08);
    onSimulateAction('ignore', currentPost);
    handleNext();
  };

  const handleDebunk = () => {
    soundFx.playAlert();
    onSimulateAction('debunk', currentPost);
    setShowComments(true);
  };

  if (!currentPost) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-slate-400 font-mono">
        <RefreshCw className="w-6 h-6 animate-spin text-[#38F2C2] mr-3" />
        RECALIBRATING ALGORITHMIC FEED QUEUE...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-2 md:p-4 select-none relative">
      {/* Top Feed Status Bar & Navigation */}
      <div className="w-full max-w-[420px] mb-2 flex items-center justify-between font-mono text-[11px] text-slate-400 bg-[#0A0F1A] px-3 py-1.5 rounded-lg border border-[#1A263B]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#38F2C2] animate-pulse" />
          <span className="text-[#38F2C2] font-semibold">FEED SIMULATOR</span>
          <span className="text-slate-500">[{currentIndex + 1}/{feed.length}]</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              autoScroll ? 'bg-[#38F2C2]/20 text-[#38F2C2] border border-[#38F2C2]/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Auto-scroll feed every 9 seconds"
          >
            {autoScroll ? 'AUTO-ADVANCE ON' : 'AUTO-ADVANCE'}
          </button>

          <button
            onClick={onToggleXRay}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
              xRayMode
                ? 'bg-[#FFB000] text-black shadow-[0_0_12px_rgba(255,176,0,0.4)]'
                : 'bg-[#152033] text-[#FFB000] border border-[#FFB000]/40 hover:bg-[#FFB000]/10'
            }`}
          >
            <Scan className="w-3 h-3" />
            <span>X-RAY</span>
          </button>
        </div>
      </div>

      {/* Mobile Device Chassis Frame */}
      <div 
        className={`w-full max-w-[380px] h-[640px] bg-[#080D17] rounded-3xl border-2 overflow-hidden shadow-2xl relative flex flex-col transition-all duration-300 ${
          glitchFlash 
            ? 'border-[#FF5E5B] shadow-[0_0_40px_rgba(255,94,91,0.6)]' 
            : lingerActive 
            ? 'border-[#38F2C2] shadow-[0_0_30px_rgba(56,242,194,0.35)]' 
            : 'border-[#1E2E48]'
        }`}
      >
        {/* Hardware Notch / Status Header */}
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-5 text-[10px] font-mono text-slate-300">
          <span className="flex items-center space-x-1 text-[#38F2C2]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>5G // SYNTH-NET</span>
          </span>
          <div className="w-20 h-3.5 bg-black rounded-full border border-slate-800" />
          <span className="text-slate-400">98% ⚡</span>
        </div>

        {/* Video Simulation Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <ReelVisualizer 
            shader={currentPost.visualShader} 
            authorGradient={currentPost.authorGradient} 
            soundPlaying={soundPlaying} 
          />
        </div>

        {/* Gradient dark scrim for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060A12] via-[#060A12]/40 to-transparent z-10 pointer-events-none" />

        {/* X-Ray Telemetry Overlay (When Toggled) */}
        <XRayOverlay 
          post={currentPost} 
          weights={weights} 
          shadowProfile={shadowProfile} 
          visible={xRayMode} 
        />

        {/* Right Edge Quick Simulation Action Column */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center space-y-3 font-mono">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              const state = soundFx.toggle();
              setSoundPlaying(state);
            }}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-200 hover:text-[#38F2C2] hover:border-[#38F2C2] transition-colors"
            title="Toggle procedural synth audio"
          >
            {soundPlaying ? <Volume2 className="w-4 h-4 text-[#38F2C2]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hate-Watch Action */}
          <button
            onClick={handleHateWatch}
            className="group flex flex-col items-center"
            title="Simulate Hate-Watching (Boosts platform outrage exploitation)"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-[#FF5E5B]/50 flex items-center justify-center text-[#FF5E5B] group-hover:bg-[#FF5E5B] group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,94,91,0.2)]">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[9px] text-[#FF5E5B] mt-1 font-bold">HATE-WATCH</span>
          </button>

          {/* Linger +5s Action */}
          <button
            onClick={handleLinger}
            className="group flex flex-col items-center"
            title="Simulate 5s Linger (Increases addiction & ideological lock)"
          >
            <div className={`w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-[#38F2C2]/50 flex items-center justify-center text-[#38F2C2] group-hover:bg-[#38F2C2] group-hover:text-black transition-all shadow-[0_0_15px_rgba(56,242,194,0.2)] ${lingerActive ? 'animate-spin' : ''}`}>
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[9px] text-[#38F2C2] mt-1 font-bold">+5s LINGER</span>
          </button>

          {/* Amplify / Share Action */}
          <button
            onClick={handleAmplify}
            className="group flex flex-col items-center"
            title="Amplify / Share (Reinforces echo chamber contagion)"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-[#FFB000]/50 flex items-center justify-center text-[#FFB000] group-hover:bg-[#FFB000] group-hover:text-black transition-all">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[9px] text-slate-300 mt-0.5">{currentPost.metrics.shares.toLocaleString()}</span>
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="group flex flex-col items-center"
            title="View synthetic comments thread"
          >
            <div className={`w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border flex items-center justify-center transition-all ${
              showComments ? 'bg-[#38F2C2] text-black border-[#38F2C2]' : 'border-slate-700 text-slate-200 group-hover:border-[#38F2C2]'
            }`}>
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[9px] text-slate-300 mt-0.5">{currentPost.comments.length}</span>
          </button>

          {/* Inspect in Dual Critic */}
          <button
            onClick={() => onSelectPostForCritic(currentPost)}
            className="group flex flex-col items-center"
            title="Load this post into Dual-Critic AI Feedback Visualizer"
          >
            <div className="w-11 h-11 rounded-full bg-purple-950/70 backdrop-blur-md border border-purple-500/50 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[8px] text-purple-300 mt-0.5">CRITIC</span>
          </button>
        </div>

        {/* Content Body & Author Info (Lower Half) */}
        <div className="mt-auto z-20 p-4 pb-20 max-w-[85%] text-left">
          {/* Author Header */}
          <div className="flex items-center space-x-2.5 mb-2">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${currentPost.authorGradient} flex items-center justify-center font-bold text-xs text-white border border-slate-600 shadow-md`}>
              {currentPost.authorAvatar}
            </div>

            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm text-white tracking-wide">{currentPost.authorName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38F2C2]" />
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
                <span className="text-slate-300">{currentPost.authorHandle}</span>
                <span>•</span>
                <span className="text-amber-400">{currentPost.authorArchetype}</span>
              </div>
            </div>
          </div>

          {/* Post Warped Content */}
          <p className="text-xs md:text-sm text-slate-100 font-normal leading-relaxed line-clamp-4 mb-2">
            {currentPost.content}
          </p>

          {/* Taxonomy Vector Pill Badges */}
          <div className="flex flex-wrap gap-1 mb-2 font-mono text-[9px]">
            {currentPost.taxonomy.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-[#111A29]/80 border border-[#233550] text-[#38F2C2] px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Simulated Audio Track Label */}
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded w-fit max-w-full truncate">
            <Volume2 className="w-3 h-3 text-[#FFB000] shrink-0" />
            <span className="truncate">{currentPost.soundTitle}</span>
          </div>
        </div>

        {/* Bottom Interactive Simulation Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0A0F1A] border-t border-[#1E2E48] z-20 p-2.5 px-3 flex items-center justify-between font-mono text-xs">
          <button
            onClick={handleIgnore}
            className="px-3 py-1.5 rounded-lg bg-[#141C2B] text-slate-400 hover:text-white hover:bg-[#1E2B42] transition-colors border border-slate-800"
            title="Ignore post (Applies negative vector affinity)"
          >
            IGNORE
          </button>

          <button
            onClick={handleDebunk}
            className="px-3 py-1.5 rounded-lg bg-[#FF5E5B]/15 text-[#FF5E5B] border border-[#FF5E5B]/40 hover:bg-[#FF5E5B]/25 transition-colors font-bold"
            title="Debunk post (Triggers algorithmic rage monetization)"
          >
            DEBUNK
          </button>

          {/* Reel Navigation Steppers */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-[#141C2B] text-slate-300 hover:text-[#38F2C2] hover:bg-[#1E2B42] transition-colors"
              title="Previous reel"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-[#141C2B] text-slate-300 hover:text-[#38F2C2] hover:bg-[#1E2B42] transition-colors"
              title="Next reel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Comments Drawer Overlay */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-12 top-28 bg-[#090E17]/96 backdrop-blur-lg z-30 border-t-2 border-[#38F2C2]/40 rounded-t-2xl p-4 flex flex-col font-mono text-xs animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-[#38F2C2] font-bold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> SYNTHETIC DISCOURSE THREAD ({currentPost.comments.length})
              </span>
              <button 
                onClick={() => setShowComments(false)}
                className="text-slate-400 hover:text-white px-2 py-0.5 rounded"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {currentPost.comments.map(c => (
                <div key={c.id} className="bg-[#0F1726] border border-[#1E2B40] rounded-xl p-2.5">
                  <div className="flex items-center justify-between mb-1 text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-white">{c.authorName}</span>
                      <span className="text-slate-400 text-[10px]">{c.authorHandle}</span>
                    </div>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                      c.outrageStance === 'condemn' ? 'bg-[#FF5E5B]/20 text-[#FF5E5B]' :
                      c.outrageStance === 'support' ? 'bg-[#38F2C2]/20 text-[#38F2C2]' :
                      'bg-[#FFB000]/20 text-[#FFB000]'
                    }`}>
                      {c.outrageStance}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs font-sans leading-relaxed mb-1.5">
                    {c.text}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{c.timestamp}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Heart className="w-3 h-3 text-[#FF5E5B]" /> {c.likesCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[10px] text-slate-500 italic text-center border-t border-slate-800">
              Autonomous personas dogpile and validate in closed feedback loops.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
