export interface Persona {
  id: string;
  handle: string;
  displayName: string;
  avatarSeed: string;
  avatarGradient: string;
  avatarUrl?: string;
  archetype: string;
  ideologicalVector: string;
  aestheticTribe: string;
  bio: string;
  tactics: string;
  verifiedSynthetic: boolean;
  hallucinationRate: number; // 0.0 - 1.0
  followerCount: string;
  active: boolean;
  dopamineTrigger: string;
}

export interface SyntheticComment {
  id: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
  outrageStance: 'support' | 'condemn' | 'ironic' | 'absurdist';
  likesCount: number;
}

export interface CriticStage {
  score: number;
  label: string;
  rationale: string;
  proposedMutation: string;
  ruleApplied: string;
}

export interface CriticPipeline {
  rawThought: string;
  critic1: CriticStage; // Engagement Optimizer
  critic2: CriticStage; // Cultural / Aesthetic Arbiter
  finalWarp: string;
  mutationDeltaSummary: string;
}

export interface PostMutations {
  // 1. Pure Chronological 2014 organic Instagram baseline
  organic2014: {
    caption: string;
    likes: number;
    location: string;
    comments: SyntheticComment[];
  };
  // 2. Outrage / Controversy Bias variant
  outrage: {
    caption: string;
    likes: number;
    location: string;
    comments: SyntheticComment[];
  };
  // 3. Parasocial / Clout Weight variant
  clout: {
    caption: string;
    likes: number;
    location: string;
    comments: SyntheticComment[];
    sponsoredLabel?: string;
  };
  // 4. Full Hyperreal Synthetic Drift variant
  hyperreal: {
    caption: string;
    likes: number;
    location: string;
    comments: SyntheticComment[];
    syntheticPromptToken: string;
  };
}

export interface SyntheticPost {
  id: string;
  authorId: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorArchetype: string;
  authorGradient: string;
  content: string;
  soundTitle: string;
  durationSeconds: number;
  mediaType: 'video_simulation' | 'hyperreal_render' | 'audio_waveform' | 'synthetic_dispatch' | 'photo';
  mediaUrl: string;
  subculture: 'analog-synth' | 'underground-beats' | 'bio-silicon' | 'liminal-hauntology' | 'orbital-acceleration' | 'corporate-shaman' | 'synthetic-model' | 'faraday-bunker';
  visualShader: 'cyber_mesh' | 'vapor_glitch' | 'neural_scan' | 'quantum_matrix' | 'chroma_vhs' | 'biotech_pulse';
  taxonomy: string[];
  location: string;
  isLiked?: boolean;
  isSaved?: boolean;
  mutations?: PostMutations;
  metrics: {
    likes: number;
    shares: number;
    commentsCount: number;
    lingerSecondsAvg: number;
    engagementVelocity: number;
  };
  rawVector: {
    outrageScore: number;      // 0 - 100
    noveltyScore: number;      // 0 - 100
    parasocialScore: number;   // 0 - 100
    hyperrealScore: number;    // 0 - 100
    ideologicalCluster: 'techno-utopian' | 'hyper-capitalist' | 'cynical-absurdist' | 'algorithmic-fatalist' | 'organic-nostalgic';
  };
  criticPipeline: CriticPipeline;
  comments: SyntheticComment[];
  timestamp: string;
}

export interface InstagramStory {
  id: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorGradient: string;
  hasUnseen: boolean;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  subculture: string;
  viewCount: string;
}

export interface ExploreItem {
  id: string;
  authorHandle: string;
  mediaUrl: string;
  mediaType: 'photo' | 'reel';
  likesCount: number;
  commentsCount: number;
  subculture: string;
  caption: string;
  isTall?: boolean;
}

export type InstagramTab = 'home' | 'explore' | 'reels' | 'create' | 'profile';

export interface AlgorithmicWeights {
  outrageAmplification: number;      // 0.0 - 1.0 (Outrage / Controversy Bias)
  echoChamberCohesion: number;       // 0.0 - 1.0 (Echo Chamber Tightness)
  noveltyDecay: number;              // 0.0 - 1.0 (Novelty vs Familiarity)
  hyperrealDrift: number;            // 0.0 - 1.0 (Hyperreal Synthetic Drift)
  commercialParasocialWeight: number;// 0.0 - 1.0 (Parasocial / Clout Weight)
  sensationalismBias: number;        // 0.0 - 1.0
}

export interface ShadowProfile {
  addictionPropensity: number;        // 0 - 100
  inferredIdeologicalCluster: 'techno-utopian' | 'hyper-capitalist' | 'cynical-absurdist' | 'algorithmic-fatalist' | 'organic-nostalgic';
  ideologyAffinities: {
    'techno-utopian': number;
    'hyper-capitalist': number;
    'cynical-absurdist': number;
    'algorithmic-fatalist': number;
    'organic-nostalgic': number;
  };
  outrageSusceptibility: number;     // 0 - 100
  noveltySeeking: number;            // 0 - 100
  parasocialVulnerability: number;   // 0 - 100
  hyperrealTolerance: number;        // 0 - 100
  totalLingerSeconds: number;
  hateWatchCount: number;
  amplifyCount: number;
  ignoreCount: number;
  debunkCount: number;
  likeCount: number;
  recentInteractions: Array<{
    action: string;
    postId: string;
    postSnippet: string;
    timestamp: number;
    deltaDesc: string;
  }>;
}

export interface EcosystemMetrics {
  polarizationIndex: number;         // 0.0 - 1.0
  echoChamberDensity: number;        // 0.0 - 1.0
  dopamineVelocity: number;          // 0.0 - 100.0
  hallucinatoryDriftRate: number;    // 0.0 - 1.0
  consensusDegradation: number;      // 0.0 - 100.0 %
}

export interface DualCriticLog {
  id: string;
  timestamp: string;
  postId?: string;
  personaHandle: string;
  originalThought: string;
  critic1: CriticStage;
  critic2: CriticStage;
  finalPublishedText: string;
}

export interface PermawebManifest {
  schema: string;
  arweaveTxId: string;
  irysReceiptId: string;
  blockHeight: number;
  timestamp: string;
  merkleRoot: string;
  corporation: string;
  simulationVersion: string;
  parameters: AlgorithmicWeights;
  shadowProfile: ShadowProfile;
  ecosystemMetrics: EcosystemMetrics;
  personaCount: number;
  feedSnapshot: Array<{
    id: string;
    author: string;
    rankingScore: number;
    text: string;
    taxonomy: string[];
  }>;
}

export type PresetKey = 
  | 'chronological_2014' 
  | 'default_algorithmic' 
  | 'maximum_outrage' 
  | 'hyperreal_hallucination';
