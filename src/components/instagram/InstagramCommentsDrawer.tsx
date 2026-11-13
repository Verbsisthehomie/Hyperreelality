import React, { useState } from 'react';
import { SyntheticPost, SyntheticComment } from '../../types';
import { X, Heart, Send } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface InstagramCommentsDrawerProps {
  post: SyntheticPost | null;
  isOpen: boolean;
  onClose: () => void;
  phoneTheme: 'dark' | 'light';
  onAddComment?: (postId: string, comment: SyntheticComment) => void;
}

export const InstagramCommentsDrawer: React.FC<InstagramCommentsDrawerProps> = ({
  post,
  isOpen,
  onClose,
  phoneTheme,
  onAddComment,
}) => {
  const isDark = phoneTheme === 'dark';
  const [inputText, setInputText] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  if (!isOpen || !post) return null;

  const handleToggleCommentLike = (commentId: string) => {
    soundFx.playBlip(720, 'sine', 0.04);
    setLikedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    soundFx.playWarp();
    const newComment: SyntheticComment = {
      id: `comm_user_${Date.now()}`,
      authorHandle: '@researcher_83',
      authorName: 'Lab Observer',
      authorAvatar: 'LO',
      text: inputText.trim(),
      timestamp: 'Just now',
      outrageStance: 'ironic',
      likesCount: 1,
    };

    if (onAddComment) {
      onAddComment(post.id, newComment);
    }
    setInputText('');
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
      <div 
        className={`w-full max-h-[75%] rounded-t-3xl flex flex-col shadow-2xl border-t transition-colors ${
          isDark 
            ? 'bg-neutral-950 border-neutral-800 text-white' 
            : 'bg-white border-neutral-200 text-black'
        }`}
      >
        {/* Drag handle pill */}
        <div className="w-full flex items-center justify-center pt-2 pb-1 cursor-grab" onClick={onClose}>
          <div className="w-10 h-1 bg-neutral-600 rounded-full opacity-60" />
        </div>

        {/* Drawer Header */}
        <div className="px-4 py-2 border-b border-neutral-800/60 flex items-center justify-between">
          <span className="font-bold text-sm tracking-tight">Comments</span>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white"
            aria-label="Close Comments"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comments Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
          {post.comments.map(c => {
            const isCommentLiked = likedComments[c.id];
            return (
              <div key={c.id} className="flex items-start justify-between space-x-3">
                <div className="flex items-start space-x-2.5 flex-1">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                    {c.authorAvatar}
                  </div>

                  <div className="flex-1 leading-snug">
                    <span className="font-semibold mr-1.5">{c.authorHandle.replace('@', '')}</span>
                    <span className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>{c.text}</span>
                    <div className="mt-1 flex items-center space-x-3 text-[10px] text-neutral-400 font-mono">
                      <span>{c.timestamp}</span>
                      <span>{c.likesCount + (isCommentLiked ? 1 : 0)} likes</span>
                      <button className="font-semibold hover:underline">Reply</button>
                    </div>
                  </div>
                </div>

                {/* Like Heart */}
                <button 
                  onClick={() => handleToggleCommentLike(c.id)}
                  className="p-1 focus:outline-none"
                  aria-label="Like comment"
                >
                  <Heart 
                    className={`w-3.5 h-3.5 transition-colors ${
                      isCommentLiked ? 'fill-[#FF3040] text-[#FF3040]' : 'text-neutral-500'
                    }`} 
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Emoji Reaction Shortcuts */}
        <div className="px-4 py-1.5 border-t border-neutral-800/40 flex items-center justify-around text-base">
          {['❤️', '🔥', '👏', '😢', '😍', '😮', '😂'].map(emoji => (
            <button 
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className="hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Bottom Comment Input Bar */}
        <form 
          onSubmit={handlePostComment}
          className={`p-3 border-t flex items-center space-x-2.5 ${
            isDark ? 'bg-black border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
            LO
          </div>

          <input
            type="text"
            placeholder="Add a comment as @researcher_83..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`flex-1 text-xs py-1.5 px-3 rounded-full border focus:outline-none ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-600' 
                : 'bg-white border-neutral-300 text-black placeholder-neutral-400 focus:border-neutral-400'
            }`}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="text-xs font-bold text-[#0095F6] disabled:opacity-40 hover:text-blue-400 px-1"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
