import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Sparkles, Filter, X } from 'lucide-react';
import { ExploreItem, AlgorithmicWeights } from '../../types';
import { EXPLORE_ITEMS } from '../../data/seedData';
import { soundFx } from '../../utils/audio';

interface InstagramExploreViewProps {
  weights: AlgorithmicWeights;
  xRayMode?: boolean;
  onSelectItem?: (item: ExploreItem) => void;
}

export const InstagramExploreView: React.FC<InstagramExploreViewProps> = ({
  weights,
  xRayMode = false,
  onSelectItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<ExploreItem | null>(null);

  const tags = [
    { id: 'all', label: 'For You' },
    { id: 'analog-synth', label: 'Analog Synths' },
    { id: 'bio-hacking', label: 'Neuro-Optimization' },
    { id: 'hyperreal-folklore', label: 'Hyperreal Folklore' },
    { id: 'orbital-acceleration', label: 'Neo-Tokyo' },
  ];

  const filteredItems = EXPLORE_ITEMS.filter(item => {
    const matchesTag = activeTag === 'all' || item.subculture === activeTag;
    const matchesQuery = !searchQuery || 
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subculture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  const handleItemClick = (item: ExploreItem) => {
    soundFx.playBlip(700, 'sine', 0.03);
    setPreviewItem(item);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black text-white overflow-hidden">
      {/* Search Bar Header */}
      <div className="px-3 pt-2 pb-2 bg-black/95 backdrop-blur-md sticky top-0 z-20 border-b border-white/5 space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search personas, subcultures, audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#262626] text-white text-xs rounded-lg pl-9 pr-8 py-2 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Subculture Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-0.5">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => {
                soundFx.playBlip(500, 'sine', 0.02);
                setActiveTag(tag.id);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeTag === tag.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#1e1e1e] text-neutral-300 hover:bg-[#2a2a2a]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Exploration Grid */}
      <div className="flex-1 overflow-y-auto p-1 scrollbar-none">
        <div className="grid grid-cols-3 gap-1">
          {filteredItems.map((item, idx) => {
            // Apply algorithmic multiplier for display likes based on weights
            const displayLikes = weights.commercialParasocialWeight > 0.6
              ? Math.round(item.likesCount * (1 + weights.commercialParasocialWeight * 2))
              : item.likesCount;

            // Make every 7th item large 2x2 featured item if available
            const isFeatured = idx % 7 === 1;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`relative group cursor-pointer overflow-hidden bg-neutral-900 ${
                  isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 aspect-square'
                }`}
              >
                <img
                  src={item.mediaUrl}
                  alt={item.caption}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    weights.hyperrealDrift > 0.6 ? 'hue-rotate-30 saturate-150 contrast-125' : ''
                  }`}
                  loading="lazy"
                />

                {/* Video Badge */}
                {item.mediaType === 'reel' && (
                  <div className="absolute top-1.5 right-1.5 z-10">
                    <svg className="w-3.5 h-3.5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm11 6-6 4V8l6 4z" />
                    </svg>
                  </div>
                )}

                {/* X-Ray Mode Overlay */}
                {xRayMode && (
                  <div className="absolute inset-0 bg-black/70 p-1 flex flex-col justify-between text-[9px] font-mono text-[#38F2C2] border border-[#38F2C2]/40 pointer-events-none z-10">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.subculture}</span>
                      <span className="text-amber-400 font-bold">{(weights.echoChamberCohesion * 100).toFixed(0)}%</span>
                    </div>
                    <div className="text-[8px] text-slate-300 truncate">{item.authorHandle}</div>
                  </div>
                )}

                {/* Standard Hover Overlay */}
                {!xRayMode && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 text-white text-xs font-bold pointer-events-none">
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3.5 h-3.5 fill-current text-white" />
                      <span>{displayLikes > 999 ? `${(displayLikes / 1000).toFixed(1)}k` : displayLikes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-current text-white" />
                      <span>{item.commentsCount}</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Modal Preview when clicking on an Explore Item */}
      {previewItem && (
        <div 
          className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewItem(null)}
        >
          <div 
            className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden max-w-sm mx-auto w-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-semibold text-xs text-white">{previewItem.authorHandle}</span>
              <button onClick={() => setPreviewItem(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-square bg-black relative">
              <img src={previewItem.mediaUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-neutral-300">
                <span className="font-semibold">{previewItem.likesCount.toLocaleString()} likes</span>
                <span>•</span>
                <span className="text-[10px] text-[#38F2C2] font-mono uppercase">#{previewItem.subculture}</span>
              </div>
              <p className="text-neutral-200 text-xs">
                <span className="font-semibold mr-1">{previewItem.authorHandle}</span>
                {previewItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
