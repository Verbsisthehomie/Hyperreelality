import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  MoreVertical, 
  Music2, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';
import { SyntheticPost, AlgorithmicWeights } from '../../types';
import { soundFx } from '../../utils/audio';

interface InstagramReelsViewProps {
  posts: SyntheticPost[];
  weights: AlgorithmicWeights;
  xRayMode?: boolean;
  onOpenComments?: (post: SyntheticPost) => void;
  onLikePost?: (post: SyntheticPost) => void;
}

export const InstagramReelsView: React.FC<InstagramReelsViewProps> = ({
  posts,
  weights,
  xRayMode = false,
  onOpenComments,
  onLikePost,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const videoPosts = posts.filter(p => p.mediaType === 'video_simulation' || p.mediaType === 'photo');
  const currentPost = videoPosts[currentIndex] || posts[0];

  const handleNext = () => {
    soundFx.playBlip(600, 'sine', 0.03);
    setCurrentIndex((prev) => (prev + 1) % (videoPosts.length || 1));
  };

  const handlePrev = () => {
    soundFx.playBlip(500, 'sine', 0.03);
    setCurrentIndex((prev) => (prev - 1 + (videoPosts.length || 1)) % (videoPosts.length || 1));
  };

  const handleLike = () => {
    if (!currentPost) return;
    const nextState = !isLiked[currentPost.id];
    setIsLiked(prev => ({ ...prev, [currentPost.id]: nextState }));
    if (nextState) {
      soundFx.playLikePop();
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 900);
    }
    if (onLikePost) onLikePost(currentPost);
  };

  const handleDoubleTap = () => {
    if (!currentPost) return;
    if (!isLiked[currentPost.id]) {
      setIsLiked(prev => ({ ...prev, [currentPost.id]: true }));
      soundFx.playLikePop();
      if (onLikePost) onLikePost(currentPost);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  if (!currentPost) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black text-neutral-400 font-mono text-xs">
        NO REELS IN QUEUE
      </div>
    );
  }

  // Calculate dynamic reel likes from metrics
  const baseLikes = currentPost.metrics?.likes ?? 850;
  const dynamicLikes = weights.commercialParasocialWeight > 0.6
    ? Math.round(baseLikes * (1 + weights.commercialParasocialWeight * 2))
    : baseLikes;

  const captionText = currentPost.mutations?.outrage && weights.outrageAmplification > 0.6
    ? currentPost.mutations.outrage.caption
    : currentPost.content;

  const scoreText = (currentPost.metrics?.engagementVelocity ?? 88).toFixed(1);

  return (
    <div className="relative flex-1 h-full w-full bg-black overflow-hidden select-none flex flex-col justify-between">
      {/* Background Media / Video Mock */}
      <div 
        className="absolute inset-0 bg-neutral-900 cursor-pointer"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={currentPost.mediaUrl}
          alt={currentPost.authorHandle}
          className={`w-full h-full object-cover ${
            weights.hyperrealDrift > 0.6 ? 'saturate-200 hue-rotate-15 contrast-125' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

        {/* Double-Tap Heart Burst Animation */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart className="w-24 h-24 text-red-500 fill-current animate-ping drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          </div>
        )}
      </div>

      {/* Top Header Controls: Title & Audio toggle */}
      <div className="relative z-20 px-4 pt-3 flex items-center justify-between text-white drop-shadow">
        <span className="font-bold text-lg tracking-tight">Reels</span>
        <button
          onClick={() => {
            soundFx.playBlip(800, 'sine', 0.02);
            setIsMuted(!isMuted);
          }}
          className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Up/Down Quick Navigation overlay pills */}
      <div className="absolute right-3 top-14 z-20 flex flex-col space-y-1">
        <button
          onClick={handlePrev}
          title="Previous Reel"
          className="p-1 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm transition-all"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          title="Next Reel"
          className="p-1 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm transition-all"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* X-Ray Mode Floating Telemetry HUD */}
      {xRayMode && (
        <div className="relative z-20 mx-3 mt-1 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#38F2C2]/50 font-mono text-[10px] text-[#38F2C2] shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> REEL TELEMETRY
            </span>
            <span className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-white/20">
              Score: {scoreText}
            </span>
          </div>
          <div className="flex justify-between text-[9px] text-slate-300">
            <span>Cluster: {currentPost.rawVector.ideologicalCluster}</span>
            <span className="text-[#FF5E5B]">Outrage: {(weights.outrageAmplification * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}

      {/* Bottom Interface: Author info, caption on bottom-left; Action stack on bottom-right */}
      <div className="relative z-20 p-4 pb-2 flex items-end justify-between space-x-3">
        {/* Left Column: Author, Follow, Caption, Sound */}
        <div className="flex-1 space-y-2 text-white">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentPost.authorGradient} p-[1.5px]`}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-[10px]">
                {currentPost.authorAvatar}
              </div>
            </div>
            <span className="font-semibold text-xs drop-shadow">{currentPost.authorHandle}</span>
            <button className="text-[11px] font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md px-2.5 py-0.5 rounded-md transition-colors border border-white/20">
              Follow
            </button>
          </div>

          <p className="text-xs text-white/95 line-clamp-2 drop-shadow leading-relaxed">
            {captionText}
          </p>

          {/* Audio Marquee Ticker */}
          <div className="flex items-center space-x-1.5 text-[11px] text-white/80">
            <Music2 className="w-3 h-3" />
            <span className="truncate max-w-[200px]">
              {currentPost.soundTitle}
            </span>
          </div>
        </div>

        {/* Right Column: Floating Action Icons Stack */}
        <div className="flex flex-col items-center space-y-4 pb-1">
          {/* Heart Button */}
          <button onClick={handleLike} className="flex flex-col items-center group">
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isLiked[currentPost.id] ? 'text-red-500 fill-current' : 'text-white'
                }`}
              />
            </div>
            <span className="text-[11px] text-white font-medium drop-shadow mt-0.5">
              {dynamicLikes > 999 ? `${(dynamicLikes / 1000).toFixed(1)}k` : dynamicLikes}
            </span>
          </button>

          {/* Comments Button */}
          <button
            onClick={() => onOpenComments && onOpenComments(currentPost)}
            className="flex flex-col items-center group"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-[11px] text-white font-medium drop-shadow mt-0.5">
              {currentPost.metrics?.commentsCount ?? currentPost.comments.length}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              soundFx.playBlip(750, 'sine', 0.03);
            }}
            className="flex flex-col items-center group"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5 text-white -rotate-12" />
            </div>
            <span className="text-[11px] text-white font-medium drop-shadow mt-0.5">Share</span>
          </button>

          {/* More Options */}
          <button className="p-2 text-white/80 hover:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Spinning Audio Album Disc */}
          <div className="w-7 h-7 rounded-full border-2 border-white/60 overflow-hidden animate-[spin_4s_linear_infinite] shadow-lg">
            <img src={currentPost.authorAvatar} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
