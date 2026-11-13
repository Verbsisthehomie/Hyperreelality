import React, { useState, useRef } from 'react';
import { SyntheticPost, AlgorithmicWeights, ShadowProfile } from '../../types';
import { resolveDynamicPostContent } from '../../utils/engine';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Sparkles, 
  Flame, 
  Cpu, 
  Compass, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface InstagramPostCardProps {
  post: SyntheticPost;
  weights: AlgorithmicWeights;
  shadowProfile: ShadowProfile;
  xRayMode: boolean;
  phoneTheme: 'dark' | 'light';
  isNewlyGenerated?: boolean;
  onLikePost: (postId: string) => void;
  onOpenComments: (post: SyntheticPost) => void;
  onSharePost: (post: SyntheticPost) => void;
  onSelectForCritic?: (post: SyntheticPost) => void;
}

export const InstagramPostCard: React.FC<InstagramPostCardProps> = ({
  post,
  weights,
  shadowProfile,
  xRayMode,
  phoneTheme,
  isNewlyGenerated = false,
  onLikePost,
  onOpenComments,
  onSharePost,
  onSelectForCritic,
}) => {
  const isDark = phoneTheme === 'dark';
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const lastTapRef = useRef<number>(0);

  // Dynamically resolve caption, likes, comments, and location based on algorithm sliders!
  const resolved = resolveDynamicPostContent(post, weights);
  const displayLikes = isLiked ? resolved.likes + 1 : resolved.likes;

  // Double-tap to like gesture handler
  const handleMediaTouchOrClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap triggered!
      soundFx.playBlip(880, 'sine', 0.08);
      setIsLiked(true);
      setShowHeartBurst(true);
      onLikePost(post.id);
      setTimeout(() => setShowHeartBurst(false), 900);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const handleHeartClick = () => {
    soundFx.playBlip(isLiked ? 400 : 750, 'sine', 0.05);
    setIsLiked(!isLiked);
    onLikePost(post.id);
  };

  const handleSaveClick = () => {
    soundFx.playBlip(600, 'triangle', 0.05);
    setIsSaved(!isSaved);
  };

  const isLongCaption = resolved.caption.length > 90;

  return (
    <article className={`border-b select-none transition-all duration-500 ${
      isDark ? 'border-neutral-900 bg-black text-white' : 'border-neutral-100 bg-white text-black'
    } ${isNewlyGenerated ? 'ring-1 ring-inset ring-emerald-400/60 bg-emerald-950/10' : ''}`}>
      {/* 1. Post Header */}
      <div className="h-14 px-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {/* Avatar with Instagram story rainbow ring */}
          <div className="w-8 h-8 rounded-full p-[1.8px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
            <img 
              src={post.mediaUrl} 
              alt={post.authorName} 
              className={`w-full h-full rounded-full object-cover border ${
                isDark ? 'border-black' : 'border-white'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-xs leading-tight tracking-tight hover:underline cursor-pointer">
                {post.authorHandle.replace('@', '')}
              </span>
              {/* Blue verified checkmark */}
              <span className="text-[#0095F6] text-[10px]">●</span>
              {isNewlyGenerated && (
                <span className="text-[8px] px-1.5 py-0.2 rounded font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 animate-pulse">
                  LIVE
                </span>
              )}
              {resolved.activeModeLabel !== 'standard' && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase ${
                  resolved.activeModeLabel === 'outrage' 
                    ? 'bg-[#FF5E5B]/20 text-[#FF5E5B]'
                    : resolved.activeModeLabel === 'clout'
                    ? 'bg-[#FFB000]/20 text-[#FFB000]'
                    : resolved.activeModeLabel === 'hyperreal'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {resolved.activeModeLabel}
                </span>
              )}
            </div>

            <div className="text-[10px] text-neutral-400 flex items-center space-x-1">
              <span>{resolved.location}</span>
              {resolved.sponsoredLabel && (
                <>
                  <span>•</span>
                  <span className="text-amber-500 font-semibold">{resolved.sponsoredLabel}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3-Dot Options Button */}
        <button
          onClick={() => setShowOptionsMenu(!showOptionsMenu)}
          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
          aria-label="Post options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Media Image Container with Double-Tap to Like & X-Ray Mode */}
      <div 
        className="relative w-full aspect-square bg-neutral-900 overflow-hidden cursor-pointer"
        onClick={handleMediaTouchOrClick}
      >
        <img
          src={post.mediaUrl}
          alt={resolved.caption}
          className={`w-full h-full object-cover select-none transition-all duration-300 ${resolved.visualFilterClass}`}
          loading="lazy"
        />

        {/* Hyperreal scanline effect if drift is elevated */}
        {weights.hyperrealDrift > 0.4 && (
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
        )}

        {/* Animated Double-Tap Floating Heart Burst */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none animate-in zoom-in-50 fade-in duration-200">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-[0_0_20px_rgba(255,48,64,0.9)] animate-bounce" />
          </div>
        )}

        {/* X-Ray Telemetry Overlay (When Enabled in Outer UX) */}
        {xRayMode && (
          <div className="absolute inset-0 bg-[#060A12]/85 backdrop-blur-sm z-20 p-3.5 flex flex-col justify-between font-mono text-xs text-[#38F2C2] border-2 border-[#38F2C2]/50 animate-in fade-in duration-150 pointer-events-none">
            {/* Top X-Ray Header */}
            <div className="flex items-center justify-between border-b border-[#38F2C2]/30 pb-1.5">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                <Cpu className="w-3.5 h-3.5 animate-pulse text-[#38F2C2]" /> X-RAY TELEMETRY HUD
              </span>
              <span className="bg-[#38F2C2]/20 text-[#38F2C2] border border-[#38F2C2]/40 px-1.5 py-0.5 rounded text-[9px] font-bold">
                {resolved.syntheticConfidence}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-2 text-[10px]">
              <div className="bg-[#0D1524] p-2 rounded-lg border border-[#1E2E48]">
                <div className="text-neutral-400 text-[9px] uppercase">RANK SCORE</div>
                <div className="text-lg font-black text-[#FFB000]">
                  {Math.round(80 + weights.outrageAmplification * 15)} / 100
                </div>
              </div>

              <div className="bg-[#0D1524] p-2 rounded-lg border border-[#1E2E48]">
                <div className="text-neutral-400 text-[9px] uppercase">DOPAMINE TRIGGER</div>
                <div className="text-xs font-bold text-[#FF5E5B] truncate mt-0.5">
                  {post.rawVector.outrageScore > 70 ? 'Moral Indignation' : post.rawVector.parasocialScore > 70 ? 'Parasocial Attachment' : 'Novelty Disruption'}
                </div>
              </div>
            </div>

            {/* Weight equation breakdown */}
            <div className="bg-[#090F1C] border border-[#1E2E48] rounded-lg p-2 space-y-1 text-[9px] text-neutral-300">
              <div className="flex justify-between">
                <span>Outrage Multiplier (x{weights.outrageAmplification.toFixed(2)}):</span>
                <span className="text-[#FF5E5B] font-bold">+{Math.round(post.rawVector.outrageScore * weights.outrageAmplification * 1.7)} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Echo Chamber Tightness (x{weights.echoChamberCohesion.toFixed(2)}):</span>
                <span className="text-[#38F2C2] font-bold">+{Math.round(80 * weights.echoChamberCohesion * 1.5)} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Clout / Parasocial Weight (x{weights.commercialParasocialWeight.toFixed(2)}):</span>
                <span className="text-amber-400 font-bold">+{Math.round(post.rawVector.parasocialScore * weights.commercialParasocialWeight * 1.1)} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Hyperreal Drift (x{weights.hyperrealDrift.toFixed(2)}):</span>
                <span className="text-purple-400 font-bold">+{Math.round(post.rawVector.hyperrealScore * weights.hyperrealDrift * 1.4)} pts</span>
              </div>
            </div>

            {/* Subculture Tag */}
            <div className="text-[9px] text-neutral-400 flex items-center justify-between border-t border-neutral-800 pt-1">
              <span>SUBCULTURE: [{post.subculture}]</span>
              <span className="text-amber-400">DUAL-CRITIC WARPED</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Action Row */}
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Like Heart Button */}
          <button
            onClick={handleHeartClick}
            className="focus:outline-none transition-transform active:scale-125"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-150 ${
                isLiked 
                  ? 'fill-[#FF3040] text-[#FF3040] scale-110' 
                  : isDark ? 'text-white' : 'text-neutral-900'
              }`} 
            />
          </button>

          {/* Comment Button */}
          <button
            onClick={() => onOpenComments(post)}
            className="focus:outline-none transition-transform active:scale-125"
            aria-label="Comment"
          >
            <MessageCircle className={`w-6 h-6 -rotate-90 ${isDark ? 'text-white' : 'text-neutral-900'}`} />
          </button>

          {/* Share / DM Button */}
          <button
            onClick={() => onSharePost(post)}
            className="focus:outline-none transition-transform active:scale-125"
            aria-label="Share Post"
          >
            <Send className={`w-6 h-6 -rotate-12 ${isDark ? 'text-white' : 'text-neutral-900'}`} />
          </button>
        </div>

        {/* Right Bookmark / Save Button */}
        <button
          onClick={handleSaveClick}
          className="focus:outline-none transition-transform active:scale-125"
          aria-label={isSaved ? 'Remove from saved' : 'Save post'}
        >
          <Bookmark 
            className={`w-6 h-6 transition-colors ${
              isSaved 
                ? 'fill-current text-amber-500' 
                : isDark ? 'text-white' : 'text-neutral-900'
            }`} 
          />
        </button>
      </div>

      {/* 4. Like Count */}
      <div className="px-3 py-1">
        <span className="font-semibold text-xs tracking-tight">
          {displayLikes.toLocaleString()} likes
        </span>
      </div>

      {/* 5. Caption with Truncation Toggle */}
      <div className="px-3 text-xs leading-normal">
        <span className="font-semibold mr-1.5 cursor-pointer hover:underline">
          {post.authorHandle.replace('@', '')}
        </span>
        <span className="font-normal font-sans">
          {isExpanded || !isLongCaption 
            ? resolved.caption 
            : `${resolved.caption.slice(0, 85)}...`
          }
        </span>
        {isLongCaption && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="ml-1 text-neutral-400 font-medium hover:text-white"
          >
            more
          </button>
        )}
      </div>

      {/* 6. Comments Preview & Open Drawer CTA */}
      <div className="px-3 pt-1 pb-1">
        <button
          onClick={() => onOpenComments(post)}
          className="text-xs text-neutral-400 hover:text-neutral-300 block mb-0.5"
        >
          View all {resolved.comments.length + 14} comments
        </button>

        {/* Top 1 preview comment */}
        {resolved.comments[0] && (
          <div className="text-xs truncate">
            <span className="font-semibold mr-1.5">
              {resolved.comments[0].authorHandle.replace('@', '')}
            </span>
            <span className="text-neutral-300 font-sans">
              {resolved.comments[0].text}
            </span>
          </div>
        )}
      </div>

      {/* 7. Timestamp */}
      <div className="px-3 pb-3 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
        {post.timestamp}
      </div>

      {/* Options Menu Dropdown Modal */}
      {showOptionsMenu && (
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-neutral-400 pb-1 border-b border-neutral-800">
            <span>POST DIAGNOSTIC TRACE</span>
            <button onClick={() => setShowOptionsMenu(false)} className="text-white">✕</button>
          </div>
          <button
            onClick={() => {
              if (onSelectForCritic) onSelectForCritic(post);
              setShowOptionsMenu(false);
            }}
            className="w-full text-left py-1 text-[#38F2C2] hover:underline flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Inspect in Dual-Critic Feedback Lab
          </button>
          <div className="text-[10px] text-neutral-400">
            Archetype: <span className="text-amber-400">{post.authorArchetype}</span>
          </div>
        </div>
      )}
    </article>
  );
};
