import React from 'react';
import { InstagramStory } from '../../types';
import { Plus } from 'lucide-react';

interface InstagramStoriesTrayProps {
  stories: InstagramStory[];
  onSelectStory: (story: InstagramStory) => void;
  phoneTheme: 'dark' | 'light';
}

export const InstagramStoriesTray: React.FC<InstagramStoriesTrayProps> = ({
  stories,
  onSelectStory,
  phoneTheme,
}) => {
  const isDark = phoneTheme === 'dark';

  return (
    <div className={`py-3 px-3 overflow-x-auto no-scrollbar border-b flex items-center space-x-3.5 select-none transition-colors ${
      isDark ? 'border-neutral-900 bg-black' : 'border-neutral-100 bg-white'
    }`}>
      {/* 1. "Your Story" item with plus badge */}
      <button 
        onClick={() => onSelectStory(stories[0])}
        className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
        aria-label="Your Story"
      >
        <div className="relative mb-1">
          <div className="w-[62px] h-[62px] rounded-full p-[2px] bg-neutral-800">
            <div className={`w-full h-full rounded-full overflow-hidden border-2 ${
              isDark ? 'border-black' : 'border-white'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                alt="Your story" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          {/* Blue plus circle badge */}
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#0095F6] border-2 border-black flex items-center justify-center text-white">
            <Plus className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
        </div>
        <span className={`text-[11px] truncate max-w-[64px] font-normal ${
          isDark ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          Your story
        </span>
      </button>

      {/* 2. Persona Stories with authentic Instagram gradient rings */}
      {stories.map((story) => (
        <button
          key={story.id}
          onClick={() => onSelectStory(story)}
          className="flex flex-col items-center flex-shrink-0 group focus:outline-none transition-transform active:scale-95"
          aria-label={`Story from ${story.authorHandle}`}
        >
          {/* Instagram gradient ring */}
          <div className="w-[62px] h-[62px] rounded-full p-[2.2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] mb-1">
            <div className={`w-full h-full rounded-full overflow-hidden border-2 ${
              isDark ? 'border-black bg-black' : 'border-white bg-white'
            }`}>
              <img
                src={story.mediaUrl}
                alt={story.authorName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <span className={`text-[11px] truncate max-w-[64px] font-normal ${
            isDark ? 'text-neutral-200' : 'text-neutral-800'
          }`}>
            {story.authorHandle.replace('@', '')}
          </span>
        </button>
      ))}
    </div>
  );
};
