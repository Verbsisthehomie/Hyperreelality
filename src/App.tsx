import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { 
  SyntheticPost, 
  AlgorithmicWeights, 
  ShadowProfile, 
  Persona, 
  CriticPipeline,
  InstagramTab,
  InstagramStory,
  SyntheticComment
} from './types';
import { 
  INITIAL_PERSONAS, 
  INITIAL_POSTS, 
  INITIAL_STORIES,
  ALGORITHM_PRESETS, 
  CURATED_TREND_SEEDS 
} from './data/seedData';
import { 
  rankFeed, 
  updateShadowProfile, 
  calculateEcosystemMetrics, 
  generatePermawebManifest,
  runDualCriticPipeline,
  generateSyntheticPostFromTrend 
} from './utils/engine';
import { Header } from './components/Header';
import { IPhoneMockup } from './components/instagram/IPhoneMockup';
import { InstagramHeader } from './components/instagram/InstagramHeader';
import { InstagramStoriesTray } from './components/instagram/InstagramStoriesTray';
import { InstagramStoryViewer } from './components/instagram/InstagramStoryViewer';
import { InstagramPostCard } from './components/instagram/InstagramPostCard';
import { InstagramCommentsDrawer } from './components/instagram/InstagramCommentsDrawer';
import { InstagramBottomNav } from './components/instagram/InstagramBottomNav';
import { InstagramExploreView } from './components/instagram/InstagramExploreView';
import { InstagramReelsView } from './components/instagram/InstagramReelsView';
import { InstagramProfileView } from './components/instagram/InstagramProfileView';
import { InstagramCreateModal } from './components/instagram/InstagramCreateModal';
import { ParameterDeck } from './components/outerWorkbench/ParameterDeck';
import { ShadowTelemetryDrawer } from './components/outerWorkbench/ShadowTelemetryDrawer';
import { PersonaSynthesizer } from './components/controlDeck/PersonaSynthesizer';
import { DualCriticVisualizer } from './components/controlDeck/DualCriticVisualizer';
import { ShadowProfileDrawer } from './components/ShadowProfileDrawer';
import { PermawebModal } from './components/PermawebModal';
import { ArchitectureBriefModal } from './components/ArchitectureBriefModal';
import { soundFx } from './utils/audio';
import { Sliders, Users, GitCompare, Smartphone, Terminal, RefreshCw, Sparkles, Play, Pause, Radio } from 'lucide-react';

export default function App() {
  // 1. Core State
  const [activePreset, setActivePreset] = useState<string>('default_algorithmic');
  const [weights, setWeights] = useState<AlgorithmicWeights>(
    ALGORITHM_PRESETS.default_algorithmic.weights
  );

  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
  const [posts, setPosts] = useState<SyntheticPost[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<InstagramStory[]>(INITIAL_STORIES);

  const [shadowProfile, setShadowProfile] = useState<ShadowProfile>({
    addictionPropensity: 48,
    inferredIdeologicalCluster: 'cynical-absurdist',
    ideologyAffinities: {
      'techno-utopian': 40,
      'hyper-capitalist': 35,
      'cynical-absurdist': 65,
      'algorithmic-fatalist': 50,
      'organic-nostalgic': 30,
    },
    outrageSusceptibility: 52,
    noveltySeeking: 60,
    parasocialVulnerability: 45,
    hyperrealTolerance: 40,
    totalLingerSeconds: 65,
    hateWatchCount: 4,
    amplifyCount: 3,
    ignoreCount: 7,
    debunkCount: 1,
    likeCount: 6,
    recentInteractions: [],
  });

  // 2. Navigation & View States
  const [activeInstagramTab, setActiveInstagramTab] = useState<InstagramTab>('home');
  const [activeWorkbenchTab, setActiveWorkbenchTab] = useState<'parameters' | 'personas' | 'critic'>('parameters');
  const [phoneTheme, setPhoneTheme] = useState<'dark' | 'light'>('dark');

  // 3. Modals & Overlays
  const [xRayMode, setXRayMode] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isShadowDossierOpen, setIsShadowDossierOpen] = useState<boolean>(false);
  const [isPermawebModalOpen, setIsPermawebModalOpen] = useState<boolean>(false);
  const [isArchitectureBriefOpen, setIsArchitectureBriefOpen] = useState<boolean>(false);
  const [isBottomTelemetryOpen, setIsBottomTelemetryOpen] = useState<boolean>(false);

  // 4. Instagram App Interactive Overlays
  const [activeStory, setActiveStory] = useState<InstagramStory | null>(null);
  const [activeCommentPost, setActiveCommentPost] = useState<SyntheticPost | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // 5. Critic & Synthesis Telemetry
  const [selectedPostForCritic, setSelectedPostForCritic] = useState<SyntheticPost | null>(INITIAL_POSTS[0] || null);
  const [lastCriticPipeline, setLastCriticPipeline] = useState<CriticPipeline | null>(
    INITIAL_POSTS[0]?.criticPipeline || null
  );
  const [isGeneratingCycle, setIsGeneratingCycle] = useState<boolean>(false);
  const [lastGeneratedNotice, setLastGeneratedNotice] = useState<string>('');

  // 6. Autonomous Playback State ("Press Play & Watch")
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlaySpeedMs, setAutoPlaySpeedMs] = useState<number>(4500);
  const [liveCycleCount, setLiveCycleCount] = useState<number>(0);
  const [cycleProgress, setCycleProgress] = useState<number>(0);
  const [newestPostId, setNewestPostId] = useState<string | null>(null);

  const feedScrollRef = useRef<HTMLDivElement | null>(null);
  const weightsRef = useRef<AlgorithmicWeights>(weights);
  const personasRef = useRef<Persona[]>(personas);
  const isGeneratingRef = useRef<boolean>(false);
  const activeInstagramTabRef = useRef<InstagramTab>(activeInstagramTab);

  useEffect(() => {
    weightsRef.current = weights;
  }, [weights]);

  useEffect(() => {
    personasRef.current = personas;
  }, [personas]);

  useEffect(() => {
    activeInstagramTabRef.current = activeInstagramTab;
  }, [activeInstagramTab]);

  // 6. Ranked Feed & Ecosystem Math
  const rankedFeed = useMemo(() => {
    return rankFeed(posts, weights, shadowProfile);
  }, [posts, weights, shadowProfile]);

  const ecosystemMetrics = useMemo(() => {
    return calculateEcosystemMetrics(posts, weights, shadowProfile);
  }, [posts, weights, shadowProfile]);

  const permawebManifest = useMemo(() => {
    return generatePermawebManifest(weights, shadowProfile, personas, rankedFeed, []);
  }, [weights, shadowProfile, personas, rankedFeed]);

  // Handle Preset Changes from Outer Workbench
  const handleSelectPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    const preset = ALGORITHM_PRESETS[presetKey];
    if (preset) {
      setWeights(preset.weights);
    }
  };

  // Simulated User Actions (feeds back into shadow profile immediately)
  const handleSimulateAction = (
    action: 'linger' | 'hate_watch' | 'amplify' | 'ignore' | 'debunk' | 'like',
    post: SyntheticPost
  ) => {
    const updated = updateShadowProfile(shadowProfile, action, post);
    setShadowProfile(updated);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isNowLiked = !p.isLiked;
        const targetPost = { ...p, isLiked: isNowLiked };
        if (isNowLiked) {
          handleSimulateAction('like', targetPost);
        }
        return targetPost;
      }
      return p;
    }));
  };

  const handleTogglePersona = (id: string) => {
    soundFx.playBlip(550, 'sine', 0.04);
    setPersonas(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleAddPersona = (newPersona: Persona) => {
    setPersonas(prev => [newPersona, ...prev]);
    setLastGeneratedNotice(`Forged Persona: ${newPersona.handle} integrated into ecosystem`);
  };

  const insertIncomingPost = useCallback((incomingPost: SyntheticPost) => {
    setPosts(prev => {
      const aged = prev.map((p, idx) => {
        const nextAge = p.timestamp === 'JUST NOW' ? '1m ago' : p.timestamp === '1m ago' ? '3m ago' : p.timestamp;
        // Organic engagement tick on existing feed items while stream is alive
        const likeDelta = idx < 5 ? Math.floor(Math.random() * 14) + 1 : 0;
        return {
          ...p,
          timestamp: nextAge,
          metrics: {
            ...p.metrics,
            likes: p.metrics.likes + likeDelta,
          },
        };
      });
      return [incomingPost, ...aged].slice(0, 35);
    });

    setSelectedPostForCritic(incomingPost);
    if (incomingPost.criticPipeline) {
      setLastCriticPipeline(incomingPost.criticPipeline);
    }
    setNewestPostId(incomingPost.id);
    setLiveCycleCount(c => c + 1);

    if (activeInstagramTabRef.current === 'home' && feedScrollRef.current) {
      feedScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!newestPostId) return;
    const timer = setTimeout(() => setNewestPostId(null), 3200);
    return () => clearTimeout(timer);
  }, [newestPostId]);

  // Spawn Synthetic Cycle via @google/genai (gemini-3.8-flash with thinking: low)
  const handleSpawnSyntheticCycle = useCallback(async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;

    const currentWeights = weightsRef.current;
    const currentPersonas = personasRef.current;

    soundFx.playWarp();
    setIsGeneratingCycle(true);
    setLastGeneratedNotice('Synthesizing post with gemini-3.8-flash [thinking: low]...');

    try {
      const activePersonas = currentPersonas.filter(p => p.active);
      const chosenPersona = activePersonas[Math.floor(Math.random() * activePersonas.length)] || currentPersonas[0];
      const randomSeed = CURATED_TREND_SEEDS[Math.floor(Math.random() * CURATED_TREND_SEEDS.length)];

      const res = await fetch('/api/generate-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trendSeed: randomSeed,
          personaId: chosenPersona.id,
          weights: currentWeights,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          insertIncomingPost(data.post);
          const modelBadge = data.modelUsed === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash (Thinking: Low)' : 'Autonomous Engine';
          setLastGeneratedNotice(`Spawned Cycle by ${data.post.authorHandle} via ${modelBadge}`);
          return;
        }
      }
      throw new Error('Fallback required');
    } catch {
      const activePersonas = currentPersonas.filter(p => p.active);
      const chosenPersona = activePersonas[Math.floor(Math.random() * activePersonas.length)] || currentPersonas[0];
      const randomSeed = CURATED_TREND_SEEDS[Math.floor(Math.random() * CURATED_TREND_SEEDS.length)];
      const fallbackPost = generateSyntheticPostFromTrend(randomSeed, chosenPersona, currentWeights, currentPersonas);

      insertIncomingPost(fallbackPost);
      setLastGeneratedNotice(`Spawned Cycle by ${fallbackPost.authorHandle} via The Seafoam Simulation Engine`);
    } finally {
      isGeneratingRef.current = false;
      setIsGeneratingCycle(false);
    }
  }, [insertIncomingPost]);

  // Autonomous Play/Pause Ticker
  const handleToggleAutoPlay = () => {
    const nextState = !isAutoPlaying;
    soundFx.playBlip(nextState ? 760 : 420, 'sine', 0.06);
    setIsAutoPlaying(nextState);
    if (!nextState) {
      setCycleProgress(0);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      setCycleProgress(0);
      return;
    }

    // Immediate first generation burst so pressing Play feels instant
    const kickstartTimer = setTimeout(() => {
      handleSpawnSyntheticCycle();
    }, 450);

    const tickMs = 100;
    let elapsed = 0;

    const progressTimer = setInterval(() => {
      if (isGeneratingRef.current) return;
      elapsed += tickMs;
      const pct = Math.min(100, (elapsed / autoPlaySpeedMs) * 100);
      setCycleProgress(pct);

      if (elapsed >= autoPlaySpeedMs) {
        elapsed = 0;
        setCycleProgress(0);
        handleSpawnSyntheticCycle();
      }
    }, tickMs);

    return () => {
      clearTimeout(kickstartTimer);
      clearInterval(progressTimer);
    };
  }, [isAutoPlaying, autoPlaySpeedMs, handleSpawnSyntheticCycle]);

  // Inject Trend Seed
  const handleInjectTrend = async (seed: string, targetPersonaId?: string): Promise<SyntheticPost | void> => {
    soundFx.playWarp();
    setIsGeneratingCycle(true);
    setLastGeneratedNotice(`Injecting Trend Seed: "${seed.slice(0, 30)}..."`);

    try {
      const res = await fetch('/api/generate-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trendSeed: seed,
          personaId: targetPersonaId,
          weights,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          setPosts(prev => [data.post, ...prev]);
          setSelectedPostForCritic(data.post);
          if (data.post.criticPipeline) {
            setLastCriticPipeline(data.post.criticPipeline);
          }
          setLastGeneratedNotice(`Trend Injected: Reaction forged by ${data.post.authorHandle}`);
          return data.post;
        }
      }
      throw new Error('Local fallback');
    } catch {
      const target = personas.find(p => p.id === targetPersonaId) || personas[0];
      const post = generateSyntheticPostFromTrend(seed, target, weights, personas);
      setPosts(prev => [post, ...prev]);
      setSelectedPostForCritic(post);
      if (post.criticPipeline) {
        setLastCriticPipeline(post.criticPipeline);
      }
      setLastGeneratedNotice(`Trend Injected: Reaction forged by ${post.authorHandle}`);
      return post;
    } finally {
      setIsGeneratingCycle(false);
    }
  };

  const handleEvaluateThought = async (thought: string, personaId: string): Promise<CriticPipeline> => {
    try {
      const res = await fetch('/api/evaluate-thought', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: thought, personaId, weights }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.pipeline) {
          setLastCriticPipeline(data.pipeline);
          return data.pipeline;
        }
      }
    } catch {
      // Fallback
    }
    const persona = personas.find(p => p.id === personaId) || personas[0];
    const pipeline = runDualCriticPipeline(thought, persona, weights);
    setLastCriticPipeline(pipeline);
    return pipeline;
  };

  const handleAddComment = (postId: string, comment: SyntheticComment) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [comment, ...p.comments],
          metrics: {
            ...p.metrics,
            commentsCount: p.metrics.commentsCount + 1,
          },
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E0E6ED] flex flex-col font-sans selection:bg-[#38F2C2]/30 selection:text-[#38F2C2]">
      {/* 1. Global Researcher Workstation Header */}
      <Header
        xRayMode={xRayMode}
        onToggleXRay={() => setXRayMode(!xRayMode)}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onOpenShadowDossier={() => setIsShadowDossierOpen(true)}
        onOpenPermawebModal={() => setIsPermawebModalOpen(true)}
        onOpenArchitectureBrief={() => setIsArchitectureBriefOpen(true)}
        onSpawnSyntheticCycle={handleSpawnSyntheticCycle}
        isGeneratingCycle={isGeneratingCycle}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={handleToggleAutoPlay}
        liveCycleCount={liveCycleCount}
        polarizationIndex={ecosystemMetrics.polarizationIndex}
        consensusDegradation={ecosystemMetrics.consensusDegradation}
      />

      {/* 2. Master Split Workspace: Left Outer Console + Center/Right Phone Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT WORKBENCH PANE: Linear/Figma Developer Console Aesthetic */}
        <section 
          className="w-full lg:w-[480px] xl:w-[520px] 2xl:w-[580px] border-r border-[#1A263B] bg-[#070B13] flex flex-col overflow-hidden flex-shrink-0"
          aria-label="Outer Research Workstation"
        >
          {/* Workstation Console Tabs */}
          <div className="bg-[#0A0F1A] border-b border-[#1A263B] px-3 py-2 flex items-center justify-between select-none">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  soundFx.playBlip(500, 'sine', 0.02);
                  setActiveWorkbenchTab('parameters');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  activeWorkbenchTab === 'parameters'
                    ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40 shadow-[0_0_12px_rgba(56,242,194,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1626]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>PARAMETERS</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playBlip(550, 'sine', 0.02);
                  setActiveWorkbenchTab('personas');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  activeWorkbenchTab === 'personas'
                    ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40 shadow-[0_0_12px_rgba(56,242,194,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1626]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>PERSONAS</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playBlip(600, 'sine', 0.02);
                  setActiveWorkbenchTab('critic');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  activeWorkbenchTab === 'critic'
                    ? 'bg-[#152238] text-[#38F2C2] border border-[#38F2C2]/40 shadow-[0_0_12px_rgba(56,242,194,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1626]'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>DUAL-CRITIC</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 bg-[#060910] px-2 py-1 rounded border border-slate-800">
              <Terminal className="w-3 h-3 text-[#38F2C2]" />
              <span>LIVE WORKBENCH</span>
            </div>
          </div>

          {/* Workbench Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 scrollbar-thin">
            {activeWorkbenchTab === 'parameters' && (
              <ParameterDeck
                weights={weights}
                onUpdateWeights={setWeights}
                ecosystemMetrics={ecosystemMetrics}
                activePreset={activePreset}
                onSelectPreset={handleSelectPreset}
              />
            )}

            {activeWorkbenchTab === 'personas' && (
              <PersonaSynthesizer
                personas={personas}
                onTogglePersona={handleTogglePersona}
                onAddPersona={handleAddPersona}
                onInjectTrend={handleInjectTrend}
                weights={weights}
                isGeneratingCycle={isGeneratingCycle}
                onSpawnSyntheticCycle={handleSpawnSyntheticCycle}
                lastGeneratedNotice={lastGeneratedNotice}
              />
            )}

            {activeWorkbenchTab === 'critic' && (
              <DualCriticVisualizer
                selectedPost={selectedPostForCritic}
                personas={personas}
                weights={weights}
                onEvaluateThought={handleEvaluateThought}
              />
            )}
          </div>
        </section>

        {/* RIGHT INNER PANE: Authentic Instagram iOS Clone inside iPhone Mockup */}
        <section 
          className="flex-1 bg-[#05070c] flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d1627] via-[#060910] to-[#030508]"
          aria-label="Inner Authentic Instagram Mobile Simulator"
        >
          {/* Playback Transport & Nested Runtime Bar */}
          <div className="w-full max-w-[400px] mb-2.5 bg-[#090E18] border border-[#1A263B] rounded-2xl p-2 px-3 flex flex-col space-y-1.5 shadow-lg">
            <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleAutoPlay}
                  aria-label={isAutoPlaying ? 'Pause autonomous feed' : 'Play autonomous feed'}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                    isAutoPlaying
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:bg-emerald-400'
                      : 'bg-[#121D31] text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/15'
                  }`}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-black" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-emerald-400" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>
                <span className={`hidden sm:inline font-semibold ${isAutoPlaying ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isAutoPlaying ? `AUTO-STREAMING (${liveCycleCount})` : 'AUTO-FEED PAUSED'}
                </span>
              </div>

              {/* Speed Controls */}
              <div className="flex items-center space-x-1 bg-[#05080F] p-0.5 rounded-lg border border-slate-800">
                {[
                  { label: '2.5s', ms: 2500 },
                  { label: '4.5s', ms: 4500 },
                  { label: '8s', ms: 8000 },
                ].map(opt => (
                  <button
                    key={opt.ms}
                    onClick={() => {
                      soundFx.playBlip(650, 'sine', 0.02);
                      setAutoPlaySpeedMs(opt.ms);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                      autoPlaySpeedMs === opt.ms
                        ? 'bg-[#1C2C47] text-[#38F2C2]'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown Progress Line */}
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  isGeneratingCycle ? 'bg-amber-400 animate-pulse w-full' : 'bg-emerald-400'
                }`}
                style={{ width: isGeneratingCycle ? '100%' : `${cycleProgress}%` }}
              />
            </div>
          </div>

          {/* Centered iPhone Mockup Bezel */}
          <IPhoneMockup 
            activePresetLabel={ALGORITHM_PRESETS[activePreset]?.label}
            xRayMode={xRayMode}
          >
            {/* Top Instagram Wordmark Header (shown on Home tab) */}
            {activeInstagramTab === 'home' && (
              <InstagramHeader 
                phoneTheme={phoneTheme}
                onNotificationClick={() => setIsBottomTelemetryOpen(true)}
                onDmClick={() => setIsBottomTelemetryOpen(true)}
              />
            )}

            {/* Main Instagram Screen Routing */}
            <div className="relative flex-1 flex flex-col overflow-hidden bg-black">
              {/* Tab 1: HOME FEED */}
              {activeInstagramTab === 'home' && (
                <div ref={feedScrollRef} className="flex-1 overflow-y-auto scrollbar-none">
                  {/* Stories Tray */}
                  <InstagramStoriesTray
                    stories={stories}
                    onSelectStory={(story) => setActiveStory(story)}
                    phoneTheme={phoneTheme}
                  />

                  {/* Vertical Post Feed */}
                  <div className="divide-y divide-neutral-900">
                    {rankedFeed.map((post) => (
                      <InstagramPostCard
                        key={post.id}
                        post={post}
                        weights={weights}
                        shadowProfile={shadowProfile}
                        xRayMode={xRayMode}
                        phoneTheme={phoneTheme}
                        isNewlyGenerated={post.id === newestPostId}
                        onLikePost={handleLikePost}
                        onOpenComments={(p) => setActiveCommentPost(p)}
                        onSharePost={() => soundFx.playBlip(750, 'sine', 0.03)}
                        onSelectForCritic={(p) => {
                          setSelectedPostForCritic(p);
                          setActiveWorkbenchTab('critic');
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: EXPLORE GRID */}
              {activeInstagramTab === 'explore' && (
                <InstagramExploreView
                  weights={weights}
                  xRayMode={xRayMode}
                  onSelectItem={(item) => {
                    // Option to view or interact
                  }}
                />
              )}

              {/* Tab 3: REELS PLAYER */}
              {activeInstagramTab === 'reels' && (
                <InstagramReelsView
                  posts={rankedFeed}
                  weights={weights}
                  xRayMode={xRayMode}
                  onOpenComments={(p) => setActiveCommentPost(p)}
                  onLikePost={(p) => handleLikePost(p.id)}
                />
              )}

              {/* Tab 5: PROFILE VIEW */}
              {activeInstagramTab === 'profile' && (
                <InstagramProfileView
                  personas={personas}
                  posts={posts}
                  weights={weights}
                  xRayMode={xRayMode}
                  onSelectPost={(p) => {
                    setSelectedPostForCritic(p);
                    setActiveInstagramTab('home');
                  }}
                />
              )}
            </div>

            {/* Bottom 5-Tab Navigation Bar */}
            <InstagramBottomNav
              activeTab={activeInstagramTab}
              onTabChange={(tab) => {
                soundFx.playBlip(620, 'sine', 0.03);
                if (tab === 'create') {
                  setIsCreateModalOpen(true);
                } else {
                  setActiveInstagramTab(tab);
                }
              }}
              phoneTheme={phoneTheme}
              userAvatarUrl={personas[0]?.avatarUrl}
            />

            {/* Story Viewer Overlay (within phone) */}
            {activeStory && (
              <InstagramStoryViewer
                stories={stories}
                initialStoryId={activeStory.id}
                onClose={() => setActiveStory(null)}
                onSimulateAction={(act) => handleSimulateAction(act, rankedFeed[0])}
              />
            )}

            {/* Comments Drawer (within phone) */}
            <InstagramCommentsDrawer
              post={activeCommentPost}
              isOpen={Boolean(activeCommentPost)}
              onClose={() => setActiveCommentPost(null)}
              phoneTheme={phoneTheme}
              onAddComment={handleAddComment}
            />

            {/* Create Post Modal (within phone) */}
            <InstagramCreateModal
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              personas={personas}
              weights={weights}
              onPublishPost={(newPost) => {
                setPosts(prev => [newPost, ...prev]);
                setSelectedPostForCritic(newPost);
              }}
              onInjectTrend={handleInjectTrend}
            />
          </IPhoneMockup>
        </section>
      </main>

      {/* 3. Collapsible Bottom Telemetry Drawer (Shadow Profile & Dual-Critic Log) */}
      <ShadowTelemetryDrawer
        isOpen={isBottomTelemetryOpen}
        onToggle={() => setIsBottomTelemetryOpen(!isBottomTelemetryOpen)}
        shadowProfile={shadowProfile}
        weights={weights}
        lastCriticPipeline={lastCriticPipeline}
      />

      {/* 4. Modals */}
      <ShadowProfileDrawer
        isOpen={isShadowDossierOpen}
        onClose={() => setIsShadowDossierOpen(false)}
        shadowProfile={shadowProfile}
      />

      <PermawebModal
        isOpen={isPermawebModalOpen}
        onClose={() => setIsPermawebModalOpen(false)}
        manifest={permawebManifest}
      />

      <ArchitectureBriefModal
        isOpen={isArchitectureBriefOpen}
        onClose={() => setIsArchitectureBriefOpen(false)}
      />
    </div>
  );
}
