import React, { useState, useEffect, useRef } from 'react';
import { InstagramStory } from '../../types';
import { X, Heart, Send, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface InstagramStoryViewerProps {
  stories: InstagramStory[];
  initialStoryId: string;
  onClose: () => void;
  onSimulateAction?: (action: 'like' | 'linger') => void;
}

export const InstagramStoryViewer: React.FC<InstagramStoryViewerProps> = ({
  stories,
  initialStoryId,
  onClose,
  onSimulateAction,
}) => {
  const initialIndex = stories.findIndex(s => s.id === initialStoryId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showSentToast, setShowSentToast] = useState(false);

  const activeStory = stories[currentIndex];

  // Auto-advancing progress bar (5000ms duration)
  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2; // 50 ticks * 100ms = 5000ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, stories.length, onClose]);

  const handleNext = () => {
    soundFx.playBlip(650, 'sine', 0.04);
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    soundFx.playBlip(550, 'sine', 0.04);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleToggleLike = () => {
    soundFx.playBlip(800, 'sine', 0.06);
    setIsLiked(!isLiked);
    if (!isLiked && onSimulateAction) {
      onSimulateAction('like');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    soundFx.playWarp();
    setShowSentToast(true);
    setReplyText('');
    setTimeout(() => setShowSentToast(false), 2000);
  };

  if (!activeStory) return null;

  return (
    <div 
      className="absolute inset-0 z-50 bg-black flex flex-col justify-between text-white select-none overflow-hidden animate-in fade-in duration-200"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
    >
      {/* Top Segmented Progress Bars */}
      <div className="absolute top-2.5 inset-x-3 z-30 flex items-center space-x-1.5">
        {stories.map((story, idx) => (
          <div key={story.id} className="flex-1 h-[2px] bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Story Top Header Bar */}
      <div className="absolute top-6 inset-x-3 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Avatar with ring */}
          <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
            <img 
              src={activeStory.mediaUrl} 
              alt={activeStory.authorName} 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-xs tracking-tight">{activeStory.authorHandle}</span>
              <span className="text-[11px] text-white/60">• {activeStory.timestamp}</span>
            </div>
            <div className="text-[9px] text-[#38F2C2] font-mono">{activeStory.subculture}</div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          aria-label="Close Story"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tap Zones for Left/Right Navigation */}
      <div className="absolute inset-0 z-20 flex">
        <div className="w-1/3 h-full" onClick={handlePrev} />
        <div className="w-2/3 h-full" onClick={handleNext} />
      </div>

      {/* Media Image / Visual Center */}
      <div className="relative w-full h-full flex items-center justify-center bg-neutral-950">
        <img 
          src={activeStory.mediaUrl} 
          alt={activeStory.caption} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Story Text Overlay / Caption */}
        <div className="absolute bottom-20 inset-x-4 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
            <p className="text-sm font-medium leading-snug drop-shadow-md">
              {activeStory.caption}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/60 font-mono">
              <span className="flex items-center gap-1 text-[#38F2C2]">
                <Sparkles className="w-3 h-3" /> Synthetic Story Vector
              </span>
              <span>{activeStory.viewCount} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Reply Bar */}
      <div className="relative z-30 p-3 pb-4 bg-gradient-to-t from-black to-transparent flex items-center space-x-3">
        <form onSubmit={handleSendReply} className="flex-1">
          <input
            type="text"
            placeholder={`Reply to ${activeStory.authorHandle}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full bg-neutral-900/90 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white"
          />
        </form>

        <button 
          onClick={handleToggleLike}
          className="p-2 transition-transform active:scale-125 focus:outline-none"
          aria-label="Like story"
        >
          <Heart 
            className={`w-6 h-6 transition-all ${
              isLiked 
                ? 'fill-[#FF3040] text-[#FF3040] scale-110' 
                : 'text-white'
            }`} 
          />
        </button>

        <button 
          onClick={handleNext}
          className="p-2 text-white/80 hover:text-white"
          aria-label="Share story"
        >
          <Send className="w-5 h-5 -rotate-12" />
        </button>
      </div>

      {/* Reply Sent Toast */}
      {showSentToast && (
        <div className="absolute top-20 inset-x-8 z-40 bg-white text-black text-xs font-semibold py-2 px-4 rounded-full text-center shadow-lg animate-in slide-in-from-top-4">
          Synthetic reply dispatched to timeline
        </div>
      )}
    </div>
  );
};
