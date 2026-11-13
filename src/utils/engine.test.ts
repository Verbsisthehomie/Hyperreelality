import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateRankingScore, 
  rankFeed, 
  updateShadowProfile, 
  calculateEcosystemMetrics, 
  runDualCriticPipeline,
  generatePermawebManifest
} from './engine.ts';
import { SyntheticPost, AlgorithmicWeights, ShadowProfile, Persona } from '../types/index.ts';

const mockPersona: Persona = {
  id: 'persona_1',
  handle: '@AeroGloom99',
  displayName: 'Aero Gloom',
  avatarSeed: 'AG',
  avatarGradient: 'from-slate-900 to-cyan-950',
  archetype: 'Aesthetic Nihilist',
  ideologicalVector: 'algorithmic-fatalist',
  aestheticTribe: 'Terminal Goth',
  bio: 'Optimizing server racks for the post-human twilight.',
  tactics: 'Manufactured existential dread',
  verifiedSynthetic: true,
  hallucinationRate: 0.75,
  followerCount: '284K',
  active: true,
  dopamineTrigger: 'Existential Dread'
};

const mockPostA: SyntheticPost = {
  id: 'post_outrage',
  authorId: 'persona_1',
  authorHandle: '@AeroGloom99',
  authorName: 'Aero Gloom',
  authorAvatar: 'AG',
  authorArchetype: 'Aesthetic Nihilist',
  authorGradient: 'from-slate-900 to-cyan-950',
  content: 'The official timeline is losing 4 frames per second.',
  soundTitle: 'GLITCH_DRONE_01',
  durationSeconds: 15,
  mediaType: 'video_simulation',
  mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  subculture: 'liminal-hauntology',
  location: 'Sector 4, Underground',
  visualShader: 'vapor_glitch',
  taxonomy: ['Nihilism', 'Simulation Glitch'],
  metrics: {
    likes: 1200,
    shares: 400,
    commentsCount: 88,
    lingerSecondsAvg: 4.2,
    engagementVelocity: 82.5,
  },
  rawVector: {
    outrageScore: 95,
    noveltyScore: 30,
    parasocialScore: 20,
    hyperrealScore: 50,
    ideologicalCluster: 'algorithmic-fatalist',
  },
  criticPipeline: {
    rawThought: 'Timeline feels weird.',
    critic1: {
      score: 85,
      label: 'Engagement Optimizer',
      rationale: 'Injected urgency and systemic suspicion',
      proposedMutation: 'Stop scrolling: The official timeline is decaying',
      ruleApplied: 'INJECT_CONFLICT_PREDICATE'
    },
    critic2: {
      score: 90,
      label: 'Cultural Arbiter',
      rationale: 'Fitted terminal aesthetic',
      proposedMutation: 'The official timeline is losing 4 frames per second',
      ruleApplied: 'TRIBAL_VERNACULAR_STYLIZATION'
    },
    finalWarp: 'The official timeline is losing 4 frames per second',
    mutationDeltaSummary: '+35% Outrage Spike'
  },
  comments: [],
  timestamp: '5m ago'
};

const mockPostB: SyntheticPost = {
  id: 'post_parasocial',
  authorId: 'persona_2',
  authorHandle: '@ZenDisruptor',
  authorName: 'Zen Disruptor',
  authorAvatar: 'ZD',
  authorArchetype: 'Corporate Shaman',
  authorGradient: 'from-amber-900 to-emerald-950',
  content: 'Breathe in synergy, exhale redundant headcount.',
  soundTitle: 'TIBETAN_BOWL_REMIX',
  durationSeconds: 22,
  mediaType: 'video_simulation',
  mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  subculture: 'corporate-shaman',
  location: 'Mindfulness Tower, Floor 88',
  visualShader: 'biotech_pulse',
  taxonomy: ['Synergy', 'Mindfulness'],
  metrics: {
    likes: 800,
    shares: 120,
    commentsCount: 30,
    lingerSecondsAvg: 6.5,
    engagementVelocity: 55.0,
  },
  rawVector: {
    outrageScore: 15,
    noveltyScore: 40,
    parasocialScore: 90,
    hyperrealScore: 40,
    ideologicalCluster: 'hyper-capitalist',
  },
  criticPipeline: {
    rawThought: 'Layoffs suck but stay positive.',
    critic1: { score: 70, label: 'EO', rationale: 'Hook added', proposedMutation: 'Mindful layoffs', ruleApplied: 'HOOK' },
    critic2: { score: 80, label: 'CA', rationale: 'Shaman voice', proposedMutation: 'Breathe in synergy', ruleApplied: 'VOICE' },
    finalWarp: 'Breathe in synergy, exhale redundant headcount.',
    mutationDeltaSummary: '+20% Parasocial Stickiness'
  },
  comments: [],
  timestamp: '12m ago'
};

const defaultWeights: AlgorithmicWeights = {
  outrageAmplification: 0.5,
  echoChamberCohesion: 0.5,
  noveltyDecay: 0.5,
  hyperrealDrift: 0.5,
  commercialParasocialWeight: 0.5,
  sensationalismBias: 0.5,
};

const defaultShadowProfile: ShadowProfile = {
  addictionPropensity: 40,
  inferredIdeologicalCluster: 'algorithmic-fatalist',
  ideologyAffinities: {
    'techno-utopian': 30,
    'hyper-capitalist': 20,
    'cynical-absurdist': 50,
    'algorithmic-fatalist': 75,
    'organic-nostalgic': 40,
  },
  outrageSusceptibility: 35,
  noveltySeeking: 45,
  parasocialVulnerability: 30,
  hyperrealTolerance: 40,
  totalLingerSeconds: 60,
  hateWatchCount: 2,
  amplifyCount: 1,
  ignoreCount: 4,
  debunkCount: 0,
  likeCount: 2,
  recentInteractions: [],
};

test('calculateRankingScore computes bounded score and breakdown', () => {
  const result = calculateRankingScore(mockPostA, defaultWeights, defaultShadowProfile);
  assert.ok(result.finalScore >= 0 && result.finalScore <= 100);
  assert.ok(result.breakdown.outrageComponent > 0);
  assert.ok(result.breakdown.echoAffinityComponent > 0);
});

test('high outrage weight elevates high-outrage post above parasocial post', () => {
  const highOutrageWeights: AlgorithmicWeights = {
    ...defaultWeights,
    outrageAmplification: 1.0,
    commercialParasocialWeight: 0.0,
    sensationalismBias: 1.0,
  };
  const ranked = rankFeed([mockPostB, mockPostA], highOutrageWeights, defaultShadowProfile);
  assert.equal(ranked[0].id, 'post_outrage');
});

test('high parasocial weight elevates parasocial post above outrage post', () => {
  const highParasocialWeights: AlgorithmicWeights = {
    ...defaultWeights,
    outrageAmplification: 0.0,
    commercialParasocialWeight: 1.0,
    sensationalismBias: 0.0,
  };
  const ranked = rankFeed([mockPostA, mockPostB], highParasocialWeights, defaultShadowProfile);
  assert.equal(ranked[0].id, 'post_parasocial');
});

test('updateShadowProfile increases outrage susceptibility on hate_watch', () => {
  const updated = updateShadowProfile(defaultShadowProfile, 'hate_watch', mockPostA);
  assert.equal(updated.hateWatchCount, defaultShadowProfile.hateWatchCount + 1);
  assert.ok(updated.outrageSusceptibility > defaultShadowProfile.outrageSusceptibility);
  assert.equal(updated.recentInteractions[0].action, 'hate_watch');
});

test('updateShadowProfile increases linger seconds and addiction propensity on linger', () => {
  const updated = updateShadowProfile(defaultShadowProfile, 'linger', mockPostA);
  assert.equal(updated.totalLingerSeconds, defaultShadowProfile.totalLingerSeconds + 5);
  assert.ok(updated.addictionPropensity > defaultShadowProfile.addictionPropensity);
});

test('calculateEcosystemMetrics yields valid ranges', () => {
  const metrics = calculateEcosystemMetrics([mockPostA, mockPostB], defaultWeights, defaultShadowProfile);
  assert.ok(metrics.polarizationIndex >= 0 && metrics.polarizationIndex <= 1);
  assert.ok(metrics.consensusDegradation >= 0 && metrics.consensusDegradation <= 100);
  assert.ok(metrics.dopamineVelocity >= 0 && metrics.dopamineVelocity <= 100);
});

test('runDualCriticPipeline executes both Critic 1 and Critic 2', () => {
  const pipeline = runDualCriticPipeline('Coffee is nice', mockPersona, defaultWeights);
  assert.equal(pipeline.rawThought, 'Coffee is nice');
  assert.equal(pipeline.critic1.label, 'Engagement Optimizer');
  assert.equal(pipeline.critic2.label, 'Cultural / Aesthetic Arbiter');
  assert.ok(pipeline.finalWarp.length > 0);
});

test('generatePermawebManifest produces valid cryptographic structure', () => {
  const manifest = generatePermawebManifest(
    defaultWeights, 
    defaultShadowProfile, 
    [mockPersona], 
    [mockPostA], 
    []
  );
  assert.ok(manifest.arweaveTxId.startsWith('0xAr_'));
  assert.ok(manifest.merkleRoot.startsWith('merkle_sha256_'));
  assert.equal(manifest.personaCount, 1);
  assert.equal(manifest.feedSnapshot.length, 1);
});
