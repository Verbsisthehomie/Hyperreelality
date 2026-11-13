import React, { useState } from 'react';
import { AlgorithmicWeights, Persona, EcosystemMetrics, SyntheticPost, CriticPipeline } from '../../types';
import { AlgorithmTuners } from './AlgorithmTuners';
import { PersonaSynthesizer } from './PersonaSynthesizer';
import { DualCriticVisualizer } from './DualCriticVisualizer';
import { Sliders, Users, GitCompare, Terminal } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ControlDeckProps {
  weights: AlgorithmicWeights;
  onUpdateWeights: (newWeights: AlgorithmicWeights) => void;
  ecosystemMetrics: EcosystemMetrics;
  personas: Persona[];
  onTogglePersona: (id: string) => void;
  onAddPersona: (newPersona: Persona) => void;
  onInjectTrend: (seed: string, targetPersonaId?: string) => Promise<SyntheticPost | void>;
  selectedPostForCritic: SyntheticPost | null;
  onEvaluateThought: (thought: string, personaId: string) => Promise<CriticPipeline>;
  isGeneratingCycle: boolean;
  onSpawnSyntheticCycle: () => void;
  lastGeneratedNotice?: string;
  activeTab: 'tuners' | 'personas' | 'critic';
  onTabChange: (tab: 'tuners' | 'personas' | 'critic') => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  weights,
  onUpdateWeights,
  ecosystemMetrics,
  personas,
  onTogglePersona,
  onAddPersona,
  onInjectTrend,
  selectedPostForCritic,
  onEvaluateThought,
  isGeneratingCycle,
  onSpawnSyntheticCycle,
  lastGeneratedNotice,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'tuners' as const,
      label: 'TAB A: TAXONOMY & ALGORITHM TUNERS',
      shortLabel: 'ALGORITHM TUNERS',
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: 'personas' as const,
      label: 'TAB B: PERSONA SYNTHESIZER',
      shortLabel: 'PERSONA SYNTH',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'critic' as const,
      label: 'TAB C: DUAL-CRITIC FEEDBACK LOOP',
      shortLabel: 'DUAL CRITIC',
      icon: <GitCompare className="w-4 h-4" />,
    },
  ];

  const handleTabClick = (tabId: 'tuners' | 'personas' | 'critic') => {
    soundFx.playBlip(600, 'sine', 0.04);
    onTabChange(tabId);
  };

  return (
    <div className="flex flex-col h-full bg-[#070B13] border-l border-[#1A263B] overflow-hidden">
      {/* Control Deck Header Tab Switcher */}
      <div className="bg-[#0A0F1A] border-b border-[#1A263B] px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40 shadow-[0_0_15px_rgba(56,242,194,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1626]'
                }`}
              >
                {tab.icon}
                <span className="hidden xl:inline">{tab.label}</span>
                <span className="xl:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center space-x-2 font-mono text-[10px] text-slate-500 bg-[#060910] px-2.5 py-1 rounded-lg border border-slate-800">
          <Terminal className="w-3.5 h-3.5 text-[#38F2C2]" />
          <span>FOUNDRY: ONLINE</span>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {activeTab === 'tuners' && (
          <AlgorithmTuners
            weights={weights}
            onUpdateWeights={onUpdateWeights}
            ecosystemMetrics={ecosystemMetrics}
          />
        )}

        {activeTab === 'personas' && (
          <PersonaSynthesizer
            personas={personas}
            onTogglePersona={onTogglePersona}
            onAddPersona={onAddPersona}
            onInjectTrend={onInjectTrend}
            weights={weights}
            isGeneratingCycle={isGeneratingCycle}
            onSpawnSyntheticCycle={onSpawnSyntheticCycle}
            lastGeneratedNotice={lastGeneratedNotice}
          />
        )}

        {activeTab === 'critic' && (
          <DualCriticVisualizer
            selectedPost={selectedPostForCritic}
            personas={personas}
            weights={weights}
            onEvaluateThought={onEvaluateThought}
          />
        )}
      </div>
    </div>
  );
};
