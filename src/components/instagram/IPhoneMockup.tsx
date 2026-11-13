import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Radio } from 'lucide-react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  activePresetLabel?: string;
  xRayMode?: boolean;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  activePresetLabel,
  xRayMode = false,
}) => {
  const [currentTime, setCurrentTime] = useState('9:41');
  const [islandExpanded, setIslandExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto my-auto flex flex-col items-center justify-center p-2 select-none">
      {/* Outer Titanium Bezel Frame */}
      <div className="relative w-[385px] sm:w-[400px] h-[780px] sm:h-[820px] rounded-[52px] bg-[#1a1c22] p-[10px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1),0_0_40px_rgba(56,242,194,0.08)] ring-1 ring-white/15 transition-all">
        {/* Antenna bands and volume/action button accents on exterior */}
        <div className="absolute -left-[3px] top-[115px] w-[3px] h-[26px] bg-[#3a3f4d] rounded-l" />
        <div className="absolute -left-[3px] top-[160px] w-[3px] h-[50px] bg-[#3a3f4d] rounded-l" />
        <div className="absolute -left-[3px] top-[220px] w-[3px] h-[50px] bg-[#3a3f4d] rounded-l" />
        <div className="absolute -right-[3px] top-[170px] w-[3px] h-[75px] bg-[#3a3f4d] rounded-r" />

        {/* Inner Phone Screen */}
        <div className="relative w-full h-full bg-black rounded-[42px] overflow-hidden flex flex-col border border-white/5 shadow-inner">
          {/* iOS Status Bar */}
          <div className="relative z-30 h-11 px-7 flex items-center justify-between text-white text-[13px] font-semibold tracking-tight select-none pt-1">
            {/* Clock */}
            <span className="font-mono text-xs">{currentTime}</span>

            {/* Dynamic Island */}
            <div
              onClick={() => setIslandExpanded(!islandExpanded)}
              className={`absolute left-1/2 -translate-x-1/2 top-2 bg-black border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg z-40 ${
                islandExpanded
                  ? 'w-[240px] h-[34px] px-3 justify-between'
                  : 'w-[105px] h-[26px] px-2 space-x-2'
              }`}
              title="Dynamic Island (Click to expand status)"
            >
              {islandExpanded ? (
                <>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#38F2C2]">
                    <span className="w-2 h-2 rounded-full bg-[#38F2C2] animate-ping" />
                    <span>SYNTHETIC LIVE</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono truncate max-w-[100px]">
                    {activePresetLabel || 'REEL LAB'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d1117] ring-1 ring-white/10 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-blue-900/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    {xRayMode && (
                      <span className="text-[9px] font-mono text-[#38F2C2] tracking-tighter uppercase font-bold">
                        X-RAY
                      </span>
                    )}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
                </>
              )}
            </div>

            {/* Status Icons (5G, Wifi, Battery) */}
            <div className="flex items-center space-x-1.5 text-slate-200">
              <span className="text-[10px] font-mono font-bold tracking-tight">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center space-x-0.5">
                <Battery className="w-4 h-4 fill-current text-white" />
              </div>
            </div>
          </div>

          {/* Active Children / Instagram Canvas */}
          <div className="relative flex-1 flex flex-col overflow-hidden bg-black">
            {children}
          </div>

          {/* Bottom iOS Home Indicator */}
          <div className="relative z-30 h-5 w-full flex items-center justify-center bg-black/90 pointer-events-none pb-1">
            <div className="w-32 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
