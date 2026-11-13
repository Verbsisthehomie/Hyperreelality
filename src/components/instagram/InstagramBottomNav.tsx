import React from 'react';
import { InstagramTab } from '../../types';
import { Home, Search, PlusSquare, Clapperboard } from 'lucide-react';

interface InstagramBottomNavProps {
  activeTab: InstagramTab;
  onTabChange: (tab: InstagramTab) => void;
  phoneTheme: 'dark' | 'light';
  userAvatarUrl?: string;
}

export const InstagramBottomNav: React.FC<InstagramBottomNavProps> = ({
  activeTab,
  onTabChange,
  phoneTheme,
  userAvatarUrl,
}) => {
  const isDark = phoneTheme === 'dark';

  return (
    <nav 
      aria-label="Instagram navigation"
      className={`h-[48px] border-t px-6 flex items-center justify-between select-none z-30 transition-colors ${
        isDark 
          ? 'bg-black border-neutral-800 text-white' 
          : 'bg-white border-neutral-200 text-black'
      }`}
    >
      {/* Home Tab */}
      <button
        onClick={() => onTabChange('home')}
        className="p-1.5 focus:outline-none transition-transform active:scale-90"
        aria-label="Home Feed"
      >
        <Home 
          className={`w-6 h-6 transition-all ${
            activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.75px] opacity-70'
          }`} 
        />
      </button>

      {/* Explore Tab */}
      <button
        onClick={() => onTabChange('explore')}
        className="p-1.5 focus:outline-none transition-transform active:scale-90"
        aria-label="Explore Search"
      >
        <Search 
          className={`w-6 h-6 transition-all ${
            activeTab === 'explore' ? 'stroke-[2.5px]' : 'stroke-[1.75px] opacity-70'
          }`} 
        />
      </button>

      {/* Reels Tab */}
      <button
        onClick={() => onTabChange('reels')}
        className="p-1.5 focus:outline-none transition-transform active:scale-90"
        aria-label="Reels Video Player"
      >
        <Clapperboard 
          className={`w-6 h-6 transition-all ${
            activeTab === 'reels' ? 'stroke-[2.5px]' : 'stroke-[1.75px] opacity-70'
          }`} 
        />
      </button>

      {/* Create Tab */}
      <button
        onClick={() => onTabChange('create')}
        className="p-1.5 focus:outline-none transition-transform active:scale-90"
        aria-label="Create Post"
      >
        <PlusSquare 
          className={`w-6 h-6 transition-all ${
            activeTab === 'create' ? 'stroke-[2.5px]' : 'stroke-[1.75px] opacity-70'
          }`} 
        />
      </button>

      {/* Profile Tab */}
      <button
        onClick={() => onTabChange('profile')}
        className="p-1 focus:outline-none transition-transform active:scale-90"
        aria-label="User Profile"
      >
        <div className={`w-6 h-6 rounded-full overflow-hidden border ${
          activeTab === 'profile'
            ? isDark ? 'border-white ring-1 ring-white' : 'border-black ring-1 ring-black'
            : 'border-transparent opacity-80'
        }`}>
          {userAvatarUrl ? (
            <img src={userAvatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
              HR
            </div>
          )}
        </div>
      </button>
    </nav>
  );
};
