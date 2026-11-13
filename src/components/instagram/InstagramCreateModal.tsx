import React, { useState } from 'react';
import { X, Sparkles, Wand2, ArrowRight, Check, Image, AlertCircle } from 'lucide-react';
import { Persona, AlgorithmicWeights, SyntheticPost } from '../../types';
import { generateSyntheticPostFromTrend } from '../../utils/engine';
import { soundFx } from '../../utils/audio';

interface InstagramCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  personas: Persona[];
  weights: AlgorithmicWeights;
  onPublishPost: (post: SyntheticPost) => void;
  onInjectTrend: (seed: string, targetPersonaId?: string) => Promise<SyntheticPost | void>;
}

export const InstagramCreateModal: React.FC<InstagramCreateModalProps> = ({
  isOpen,
  onClose,
  personas,
  weights,
  onPublishPost,
  onInjectTrend,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(personas[0]?.id || '');
  const [rawThought, setRawThought] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const currentPersona = personas.find(p => p.id === selectedPersonaId) || personas[0];

  const handleCreate = async () => {
    if (!rawThought.trim()) return;
    setIsSynthesizing(true);
    soundFx.playWarp();

    try {
      const created = await onInjectTrend(rawThought, selectedPersonaId);
      if (created) {
        soundFx.playLikePop();
        onClose();
        setRawThought('');
      }
    } catch {
      // Fallback local post using engine generator
      const fallbackPost = generateSyntheticPostFromTrend(rawThought, currentPersona, weights, personas);
      onPublishPost(fallbackPost);
      soundFx.playLikePop();
      onClose();
      setRawThought('');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end select-none">
      <div className="bg-[#18181b] border-t border-white/10 rounded-t-3xl max-h-[90%] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-white">Synthesize New Post</span>
          <button
            onClick={handleCreate}
            disabled={!rawThought.trim() || isSynthesizing}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              rawThought.trim() && !isSynthesizing
                ? 'bg-[#38F2C2] text-black font-bold hover:bg-[#2ed6ab]'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isSynthesizing ? 'Warping...' : 'Share'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Persona Selector */}
          <div>
            <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide block mb-1.5">
              Select Publishing Persona
            </label>
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersonaId(p.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all ${
                    selectedPersonaId === p.id
                      ? 'bg-[#252528] border-[#38F2C2] text-[#38F2C2]'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <img src={p.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span>{p.handle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Prompt / Thought Input */}
          <div>
            <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide block mb-1.5">
              Raw Thought / Cultural Seed
            </label>
            <textarea
              rows={3}
              value={rawThought}
              onChange={(e) => setRawThought(e.target.value)}
              placeholder="e.g., Why does late-night scrolling feel like drinking digital salt water? Or test an incendiary claim..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38F2C2] resize-none"
            />
          </div>

          {/* Outer Weights Distortion Preview */}
          <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-2 font-mono text-[11px]">
            <div className="text-neutral-400 flex items-center justify-between text-[10px]">
              <span>ACTIVE DISTORTION LEVERS</span>
              <span className="text-[#38F2C2]">Live Outer Link</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-neutral-900/80 p-2 rounded border border-neutral-800">
                <span className="text-neutral-400">Outrage Bias:</span>{' '}
                <span className="text-[#FF5E5B] font-bold">{(weights.outrageAmplification * 100).toFixed(0)}%</span>
              </div>
              <div className="bg-neutral-900/80 p-2 rounded border border-neutral-800">
                <span className="text-neutral-400">Hyperreal Drift:</span>{' '}
                <span className="text-purple-400 font-bold">{(weights.hyperrealDrift * 100).toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 italic">
              When published, this thought will be mutated into 4 algorithmic states (2014 Organic, Outrage, Clout, and Hyperreal) and warped by current workbench sliders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
