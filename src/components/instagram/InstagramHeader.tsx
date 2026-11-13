import React from 'react';
import { Heart, Send, ChevronDown } from 'lucide-react';

interface InstagramHeaderProps {
  phoneTheme: 'dark' | 'light';
  onNotificationClick?: () => void;
  onDmClick?: () => void;
  unreadCount?: number;
}

export const InstagramHeader: React.FC<InstagramHeaderProps> = ({
  phoneTheme,
  onNotificationClick,
  onDmClick,
  unreadCount = 2,
}) => {
  const isDark = phoneTheme === 'dark';

  return (
    <header className={`h-11 px-4 flex items-center justify-between select-none z-20 border-b transition-colors ${
      isDark 
        ? 'bg-black border-neutral-900 text-white' 
        : 'bg-white border-neutral-100 text-black'
    }`}>
      {/* Brand logo / script wordmark */}
      <div className="flex items-center space-x-1 cursor-pointer">
        <span className="font-serif italic text-xl tracking-tight font-black select-none font-['Grand_Hotel',cursive,-apple-system,sans-serif]">
          Instagram
        </span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60 mt-0.5" />
      </div>

      {/* Action icons on right */}
      <div className="flex items-center space-x-4">
        {/* Activity / Heart icon */}
        <button
          onClick={onNotificationClick}
          className="relative p-1 focus:outline-none transition-transform active:scale-90"
          aria-label="Notifications"
        >
          <Heart className="w-5 h-5 stroke-[2px]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3040] rounded-full ring-2 ring-black" />
        </button>

        {/* Direct Messages / Paper Plane icon */}
        <button
          onClick={onDmClick}
          className="relative p-1 focus:outline-none transition-transform active:scale-90"
          aria-label="Direct Messages"
        >
          <Send className="w-5 h-5 stroke-[2px] -rotate-12" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-1 bg-[#FF3040] text-white text-[9px] font-bold px-1 rounded-full h-4 min-w-4 flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
