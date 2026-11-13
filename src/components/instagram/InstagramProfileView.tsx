import React, { useState } from 'react';
import { 
  Grid, 
  Film, 
  Bookmark, 
  UserCheck, 
  ChevronDown, 
  Menu, 
  Plus, 
  Link as LinkIcon,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Persona, SyntheticPost, AlgorithmicWeights } from '../../types';
import { soundFx } from '../../utils/audio';

interface InstagramProfileViewProps {
  personas: Persona[];
  posts: SyntheticPost[];
  weights: AlgorithmicWeights;
  xRayMode?: boolean;
  onSelectPost?: (post: SyntheticPost) => void;
}

export const InstagramProfileView: React.FC<InstagramProfileViewProps> = ({
  personas,
  posts,
  weights,
  xRayMode = false,
  onSelectPost,
}) => {
  const [activeTab, setActiveTab] = useState<'grid' | 'reels' | 'saved'>('grid');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(personas[0]?.id || 'p_aerogloom');

  const currentPersona = personas.find(p => p.id === selectedPersonaId) || personas[0];
  const personaPosts = posts.filter(p => p.authorHandle === currentPersona.handle);

  const highlights = [
    { title: 'Foundry', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80' },
    { title: 'Reels', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80' },
    { title: 'Weights', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80' },
    { title: 'Glitches', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80' },
    { title: 'Archive', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-black text-white overflow-y-auto scrollbar-none select-none">
      {/* Top Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/5 sticky top-0 bg-black/95 backdrop-blur-md z-20">
        <div className="flex items-center space-x-1.5 cursor-pointer">
          <span className="font-bold text-sm tracking-tight">{currentPersona.handle}</span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          {currentPersona.verifiedSynthetic && (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#38F2C2] fill-[#38F2C2]/20" />
          )}
        </div>

        <div className="flex items-center space-x-3 text-white">
          <button 
            title="Switch Persona"
            onClick={() => {
              const nextIdx = (personas.findIndex(p => p.id === currentPersona.id) + 1) % personas.length;
              setSelectedPersonaId(personas[nextIdx].id);
              soundFx.playBlip(650, 'sine', 0.03);
            }}
            className="text-[10px] font-mono text-[#38F2C2] border border-[#38F2C2]/40 px-2 py-0.5 rounded-full hover:bg-[#38F2C2]/10"
          >
            SWITCH ENTITY
          </button>
          <Menu className="w-5 h-5 text-neutral-300" />
        </div>
      </div>

      {/* Main Profile Info Section */}
      <div className="px-4 pt-3 pb-2 space-y-3">
        {/* Avatar + Stats Counters */}
        <div className="flex items-center justify-between">
          {/* Avatar with Story Ring */}
          <div className="relative">
            <div className="w-[74px] h-[74px] rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                <img
                  src={currentPersona.avatarUrl}
                  alt={currentPersona.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#38F2C2] text-black flex items-center justify-center font-bold text-xs ring-2 ring-black">
              +
            </div>
          </div>

          {/* Stats: Posts, Followers, Following */}
          <div className="flex-1 flex justify-around pl-4">
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm">{personaPosts.length + 18}</span>
              <span className="text-[11px] text-neutral-400">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm">{currentPersona.followerCount}</span>
              <span className="text-[11px] text-neutral-400">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm">342</span>
              <span className="text-[11px] text-neutral-400">Following</span>
            </div>
          </div>
        </div>

        {/* Bio Information */}
        <div className="text-xs space-y-1">
          <div className="font-semibold text-white flex items-center space-x-1">
            <span>{currentPersona.displayName}</span>
            <span className="text-[10px] font-normal text-neutral-400 font-mono">
              ({currentPersona.archetype})
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">
            {currentPersona.aestheticTribe} • Autonomous Synthetic Entity
          </div>
          <p className="text-xs text-neutral-200 leading-snug">
            {currentPersona.bio}
          </p>
          <div className="flex items-center space-x-1 text-sky-400 text-[11px] pt-0.5">
            <LinkIcon className="w-3 h-3 text-sky-400" />
            <span className="hover:underline cursor-pointer">hyperreelality.seafoam.corp/{currentPersona.handle.replace('@', '')}</span>
          </div>
        </div>

        {/* Action Buttons: Edit / Share Profile */}
        <div className="flex items-center space-x-2 pt-1">
          <button className="flex-1 bg-[#262626] hover:bg-[#333] text-white font-semibold text-xs py-1.5 rounded-lg transition-colors">
            Edit profile
          </button>
          <button className="flex-1 bg-[#262626] hover:bg-[#333] text-white font-semibold text-xs py-1.5 rounded-lg transition-colors">
            Share profile
          </button>
          <button className="bg-[#262626] hover:bg-[#333] p-1.5 rounded-lg text-white">
            <UserCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Story Highlights Row */}
        <div className="pt-2">
          <div className="flex items-center space-x-3.5 overflow-x-auto scrollbar-none pb-1">
            {highlights.map((h, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0">
                <div className="w-14 h-14 rounded-full p-[1.5px] bg-neutral-800 border border-neutral-700">
                  <img src={h.img} alt={h.title} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-[10px] text-neutral-300 truncate max-w-[56px] text-center">
                  {h.title}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0">
              <div className="w-14 h-14 rounded-full border border-dashed border-neutral-600 flex items-center justify-center text-neutral-400">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-neutral-400 text-center">New</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row (Grid, Reels, Saved) */}
      <div className="flex items-center border-t border-b border-neutral-800 mt-2">
        <button
          onClick={() => setActiveTab('grid')}
          className={`flex-1 py-2.5 flex justify-center border-b-2 transition-colors ${
            activeTab === 'grid' ? 'border-white text-white' : 'border-transparent text-neutral-500'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`flex-1 py-2.5 flex justify-center border-b-2 transition-colors ${
            activeTab === 'reels' ? 'border-white text-white' : 'border-transparent text-neutral-500'
          }`}
        >
          <Film className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2.5 flex justify-center border-b-2 transition-colors ${
            activeTab === 'saved' ? 'border-white text-white' : 'border-transparent text-neutral-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Post Grid */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5 flex-1 bg-black">
        {(personaPosts.length > 0 ? personaPosts : posts.slice(0, 9)).map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectPost && onSelectPost(p)}
            className="relative aspect-square bg-neutral-900 cursor-pointer overflow-hidden group"
          >
            <img
              src={p.mediaUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            {p.mediaType === 'video_simulation' && (
              <div className="absolute top-1.5 right-1.5 text-white drop-shadow">
                <Film className="w-3.5 h-3.5" />
              </div>
            )}
            {xRayMode && (
              <div className="absolute inset-0 bg-black/60 p-1 flex flex-col justify-end text-[8px] font-mono text-[#38F2C2]">
                <span>SCR: {((p as any).rankingScore ?? p.metrics?.engagementVelocity ?? 85).toFixed(0)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
