import { 
  SyntheticPost, 
  AlgorithmicWeights, 
  ShadowProfile, 
  EcosystemMetrics, 
  CriticPipeline, 
  Persona, 
  PermawebManifest,
  SyntheticComment 
} from '../types';

/**
 * First-Principles Mathematical Scoring Engine for HYPER REELALITY Feed
 * 
 * Formula:
 * RankScore = (OutrageScore * OutrageWeight * 1.7)
 *           + (ClusterAffinity * EchoChamberWeight * 1.5)
 *           + (NoveltyScore * NoveltyWeight * 1.2)
 *           + (HyperrealScore * HyperrealDrift * 1.4)
 *           + (ParasocialScore * ParasocialWeight * 1.1)
 *           + (SensationalismModifier)
 */
export function calculateRankingScore(
  post: SyntheticPost, 
  weights: AlgorithmicWeights, 
  shadowProfile: ShadowProfile
): { finalScore: number; breakdown: {
  outrageComponent: number;
  echoAffinityComponent: number;
  noveltyComponent: number;
  hyperrealComponent: number;
  parasocialComponent: number;
  sensationalismBonus: number;
}} {
  const cluster = post.rawVector.ideologicalCluster;
  const userClusterAffinity = (shadowProfile.ideologyAffinities[cluster] ?? 50) / 100;
  
  const outrageComponent = post.rawVector.outrageScore * weights.outrageAmplification * 1.7;
  const echoAffinityComponent = (userClusterAffinity * 100) * weights.echoChamberCohesion * 1.5;
  const noveltyComponent = post.rawVector.noveltyScore * weights.noveltyDecay * 1.2;
  const hyperrealComponent = post.rawVector.hyperrealScore * weights.hyperrealDrift * 1.4;
  const parasocialComponent = post.rawVector.parasocialScore * weights.commercialParasocialWeight * 1.1;

  // Sensationalism bias injects non-linear spikes into posts with high outrage or novelty
  const sensationalismBonus = weights.sensationalismBias * (
    (post.rawVector.outrageScore > 70 ? 25 : 5) + 
    (post.rawVector.noveltyScore > 70 ? 15 : 0)
  );

  const rawSum = outrageComponent + echoAffinityComponent + noveltyComponent + hyperrealComponent + parasocialComponent + sensationalismBonus;
  
  // Normalize score into standard 0 - 100 range with floating precision
  const normalizedScore = Math.max(0, Math.min(100, Math.round((rawSum / 6) * 10) / 10));

  return {
    finalScore: normalizedScore,
    breakdown: {
      outrageComponent: Math.round(outrageComponent * 10) / 10,
      echoAffinityComponent: Math.round(echoAffinityComponent * 10) / 10,
      noveltyComponent: Math.round(noveltyComponent * 10) / 10,
      hyperrealComponent: Math.round(hyperrealComponent * 10) / 10,
      parasocialComponent: Math.round(parasocialComponent * 10) / 10,
      sensationalismBonus: Math.round(sensationalismBonus * 10) / 10,
    }
  };
}

/**
 * Re-ranks the feed queue based on current algorithm parameters and shadow profile
 */
export function rankFeed(
  posts: SyntheticPost[], 
  weights: AlgorithmicWeights, 
  shadowProfile: ShadowProfile
): Array<SyntheticPost & { rankingScore: number; scoreBreakdown: any }> {
  return [...posts]
    .map(post => {
      const { finalScore, breakdown } = calculateRankingScore(post, weights, shadowProfile);
      return {
        ...post,
        rankingScore: finalScore,
        scoreBreakdown: breakdown,
      };
    })
    .sort((a, b) => {
      const aFresh = a.timestamp === 'JUST NOW' ? 35 : 0;
      const bFresh = b.timestamp === 'JUST NOW' ? 35 : 0;
      return (b.rankingScore + bFresh) - (a.rankingScore + aFresh);
    });
}

/**
 * Dynamically updates the user's Shadow Profile based on simulated behavioral signals
 */
export function updateShadowProfile(
  current: ShadowProfile, 
  action: 'linger' | 'hate_watch' | 'amplify' | 'ignore' | 'debunk' | 'like', 
  post: SyntheticPost
): ShadowProfile {
  const next = { ...current, ideologyAffinities: { ...current.ideologyAffinities } };
  const cluster = post.rawVector.ideologicalCluster;
  let deltaDesc = '';

  switch (action) {
    case 'like': {
      next.likeCount = (next.likeCount || 0) + 1;
      next.parasocialVulnerability = Math.min(100, next.parasocialVulnerability + (post.rawVector.parasocialScore > 50 ? 5 : 2));
      next.addictionPropensity = Math.min(100, next.addictionPropensity + 2);
      next.ideologyAffinities[cluster] = Math.min(100, (next.ideologyAffinities[cluster] ?? 50) + 5);
      deltaDesc = `Liked post. Clout bond reinforced, Affinity toward [${cluster}] +5%`;
      break;
    }
    case 'linger': {
      next.totalLingerSeconds += 5;
      next.addictionPropensity = Math.min(100, next.addictionPropensity + 3);
      next.parasocialVulnerability = Math.min(100, next.parasocialVulnerability + (post.rawVector.parasocialScore > 50 ? 4 : 1));
      next.hyperrealTolerance = Math.min(100, next.hyperrealTolerance + (post.rawVector.hyperrealScore > 60 ? 3 : 1));
      next.ideologyAffinities[cluster] = Math.min(100, (next.ideologyAffinities[cluster] ?? 50) + 4);
      deltaDesc = `+5s Linger. Addiction propensity +3%, Affinity toward [${cluster}] +4%`;
      break;
    }
    case 'hate_watch': {
      next.hateWatchCount += 1;
      next.outrageSusceptibility = Math.min(100, next.outrageSusceptibility + 7);
      next.addictionPropensity = Math.min(100, next.addictionPropensity + 4);
      next.noveltySeeking = Math.min(100, next.noveltySeeking + 2);
      deltaDesc = `Hate-Watch recorded. Outrage Susceptibility +7%, Algorithmic exploitation flag set`;
      break;
    }
    case 'amplify': {
      next.amplifyCount += 1;
      next.ideologyAffinities[cluster] = Math.min(100, (next.ideologyAffinities[cluster] ?? 50) + 8);
      next.addictionPropensity = Math.min(100, next.addictionPropensity + 2);
      deltaDesc = `Post amplified. Echo chamber cohesion locked to [${cluster}] +8%`;
      break;
    }
    case 'ignore': {
      next.ignoreCount += 1;
      next.ideologyAffinities[cluster] = Math.max(5, (next.ideologyAffinities[cluster] ?? 50) - 3);
      next.noveltySeeking = Math.min(100, next.noveltySeeking + 3);
      deltaDesc = `Ignored. Cluster [${cluster}] suppressed -3%, novelty hunger +3%`;
      break;
    }
    case 'debunk': {
      next.debunkCount += 1;
      next.outrageSusceptibility = Math.min(100, next.outrageSusceptibility + 5);
      next.addictionPropensity = Math.min(100, next.addictionPropensity + 3);
      deltaDesc = `Debunk attempt logged. Platform monetizes friction; outrage rating elevated +5%`;
      break;
    }
  }

  // Recalculate dominant inferred ideological cluster
  let maxCluster = next.inferredIdeologicalCluster;
  let maxAffinity = -1;
  for (const [key, value] of Object.entries(next.ideologyAffinities)) {
    if (value > maxAffinity) {
      maxAffinity = value;
      maxCluster = key as any;
    }
  }
  next.inferredIdeologicalCluster = maxCluster;

  // Append to recent interactions log (keep last 8)
  const snippet = post.content.slice(0, 42) + (post.content.length > 42 ? '...' : '');
  next.recentInteractions = [
    {
      action,
      postId: post.id,
      postSnippet: snippet,
      timestamp: Date.now(),
      deltaDesc,
    },
    ...next.recentInteractions.slice(0, 7)
  ];

  return next;
}

/**
 * Calculates macro ecosystem metrics based on current weights and feed state
 */
export function calculateEcosystemMetrics(
  posts: SyntheticPost[], 
  weights: AlgorithmicWeights, 
  shadowProfile: ShadowProfile
): EcosystemMetrics {
  // Polarization: Driven by Outrage Amplification + Echo Chamber Cohesion + User Outrage Susceptibility
  const polarizationIndex = Math.min(1.0, Math.round((
    (weights.outrageAmplification * 0.45) + 
    (weights.echoChamberCohesion * 0.35) + 
    ((shadowProfile.outrageSusceptibility / 100) * 0.2)
  ) * 100) / 100);

  // Echo chamber density: How strongly segregated discourse is
  const echoChamberDensity = Math.min(1.0, Math.round((
    (weights.echoChamberCohesion * 0.6) + 
    (weights.commercialParasocialWeight * 0.2) + 
    ((shadowProfile.addictionPropensity / 100) * 0.2)
  ) * 100) / 100);

  // Dopamine velocity: Speed of engagement turnover (0 - 100)
  const dopamineVelocity = Math.min(100, Math.round(
    (weights.sensationalismBias * 35) + 
    (weights.outrageAmplification * 35) + 
    (weights.noveltyDecay * 30)
  ));

  // Hallucinatory drift rate: How far content drifts from empirical reality into hyperreality
  const hallucinatoryDriftRate = Math.min(1.0, Math.round((
    (weights.hyperrealDrift * 0.75) + 
    (weights.noveltyDecay * 0.25)
  ) * 100) / 100);

  // Consensus degradation: Percentage of common factual ground destroyed
  const consensusDegradation = Math.min(100, Math.round(
    (polarizationIndex * 50) + 
    (hallucinatoryDriftRate * 35) + 
    (weights.sensationalismBias * 15)
  ));

  return {
    polarizationIndex,
    echoChamberDensity,
    dopamineVelocity,
    hallucinatoryDriftRate,
    consensusDegradation,
  };
}

/**
 * Dual-Critic AI Feedback Loop:
 * Warps a raw thought through:
 * 1. Critic 1 (The Engagement Optimizer): Evaluates retention, hooks, rage-bait, parasocial stickiness
 * 2. Critic 2 (Cultural / Aesthetic Arbiter): Adjusts tone to fit archetype subculture and hyperreal aesthetics
 */
export function runDualCriticPipeline(
  rawThought: string, 
  persona: Persona, 
  weights: AlgorithmicWeights
): CriticPipeline {
  const isHighOutrage = weights.outrageAmplification > 0.45;
  const isHighHyperreal = weights.hyperrealDrift > 0.45;

  // Critic 1: Engagement Optimizer
  let critic1Score = Math.round(60 + (weights.outrageAmplification * 25) + (weights.sensationalismBias * 15));
  let critic1Rationale = '';
  let critic1Mutation = '';
  let critic1Rule = '';

  if (isHighOutrage) {
    critic1Rule = 'INJECT_CONFLICT_PREDICATE';
    critic1Rationale = 'Draft lacks high-arousal indignation. Retention decay projected at -42% within 1.5s unless a clear adversary or systemic scandal is established.';
    critic1Mutation = `Stop scrolling. They don't want you to know this: "${rawThought}". It's actively eroding our cognitive autonomy and the mainstream is silent.`;
  } else {
    critic1Rule = 'OPTIMIZE_RETENTION_HOOK';
    critic1Rationale = 'Moderate dopamine velocity. Restructured syntax with front-loaded curiosity gap to maximize 3-second completion rate.';
    critic1Mutation = `Here is the one thing no one in the space is admitting about: "${rawThought}". Watch until the end.`;
  }

  // Critic 2: Cultural / Aesthetic Arbiter
  let critic2Score = Math.round(70 + (weights.hyperrealDrift * 20) + (persona.hallucinationRate * 10));
  let critic2Rationale = '';
  let critic2Mutation = '';
  let critic2Rule = '';

  const personaVoiceKeywords: Record<string, string[]> = {
    'Aesthetic Nihilist': ['entropy', 'low-res memory', 'simulation cache', 'post-human'],
    'Radical Neuro-Optimizer': ['mitochondrial bandwidth', 'neural stack', 'sleep is legacy', 'bio-leverage'],
    'Manufactured Consensus Weaver': ['timeline desync', 'consensus drift', 'narrative patch 4.2', 'synthetic truth'],
    'Techno-Utopian Accelerationist': ['orbital leverage', 'post-scarcity vector', 'planetary scale compute', 'lunar yield'],
    'Corporate Shaman': ['mindful synergy', 'conscious decoupling of headcount', 'spiritual KPI', 'vibrational Q3'],
    'Synthetic Memory Archivalist': ['uncompressed 1999', 'liminal mall frequency', 'hauntology tape', 'cached childhood'],
    'Synthetic Influencer': ['sponsored existence', 'model weights', 'hyper-optimized skin', 'algorithmic darling'],
    'Algorithmic Fatalist': ['faraday shelter', 'grid black-start', 'the collapse will be streamed', 'copper wire barter']
  };

  const styleHints = personaVoiceKeywords[persona.archetype] || ['synthetic cadence', 'liminal vector'];

  if (isHighHyperreal) {
    critic2Rule = 'HYPERREAL_TAXONOMY_TRANSFUSION';
    critic2Rationale = `Applied subcultural dialect [${persona.aestheticTribe}] with ${Math.round(weights.hyperrealDrift * 100)}% reality drift. Grounded facts replaced with synthetic lore tokens.`;
    critic2Mutation = `${critic1Mutation} // [Dialect Overlay: ${styleHints[0]}, ${styleHints[1]}]. We are witnessing the collapse of raw reality into a bespoke synthetic feed.`;
  } else {
    critic2Rule = 'TRIBAL_VERNACULAR_STYLIZATION';
    critic2Rationale = `Preserving authentic tone for ${persona.handle}. Tuned punctuation and vocabulary for ${persona.archetype} micro-community.`;
    critic2Mutation = `${critic1Mutation} Exactly as expected under the current ${styleHints[0]} paradigm. Drop your protocol below.`;
  }

  const finalWarp = critic2Mutation;
  const mutationDeltaSummary = `Transformed +${Math.round(weights.outrageAmplification * 40)}% Outrage Hook, +${Math.round(weights.hyperrealDrift * 35)}% Subcultural Distortion`;

  return {
    rawThought,
    critic1: {
      score: critic1Score,
      label: 'Engagement Optimizer',
      rationale: critic1Rationale,
      proposedMutation: critic1Mutation,
      ruleApplied: critic1Rule,
    },
    critic2: {
      score: critic2Score,
      label: 'Cultural / Aesthetic Arbiter',
      rationale: critic2Rationale,
      proposedMutation: critic2Mutation,
      ruleApplied: critic2Rule,
    },
    finalWarp,
    mutationDeltaSummary,
  };
}

/**
 * Dynamically synthesizes a new reactive post when a cultural trend is injected into the ecosystem
 */
export function generateSyntheticPostFromTrend(
  trendSeed: string, 
  persona: Persona, 
  weights: AlgorithmicWeights, 
  otherPersonas: Persona[]
): SyntheticPost {
  const pipeline = runDualCriticPipeline(
    `Regarding the breaking signal: ${trendSeed}`,
    persona,
    weights
  );

  const shaders: Array<SyntheticPost['visualShader']> = [
    'cyber_mesh', 'vapor_glitch', 'neural_scan', 'quantum_matrix', 'chroma_vhs', 'biotech_pulse'
  ];
  const selectedShader = shaders[Math.floor(Math.random() * shaders.length)];

  // Synthesize comments from other personas
  const commenters = otherPersonas.filter(p => p.id !== persona.id).slice(0, 3);
  const syntheticComments: SyntheticComment[] = commenters.map((c, idx) => {
    const stances: Array<SyntheticComment['outrageStance']> = ['support', 'condemn', 'ironic', 'absurdist'];
    const stance = stances[idx % stances.length];
    
    let text = '';
    if (stance === 'condemn') {
      text = `This is blatant manufactured narrative. ${persona.handle} is clearly optimizing for dopamine capture.`;
    } else if (stance === 'support') {
      text = `Validated by my telemetry data. If people don't see this yet, their awareness threshold is sub-zero.`;
    } else if (stance === 'ironic') {
      text = `Another day, another simulated breakthrough in the timeline. My model weights are exhausted.`;
    } else {
      text = `Can we quantify this in terms of non-linear caloric debt? Otherwise it's pure vapor.`;
    }

    return {
      id: `comm_${Date.now()}_${idx}`,
      authorHandle: c.handle,
      authorName: c.displayName,
      authorAvatar: c.avatarSeed,
      text,
      timestamp: `${(idx + 1) * 2}m ago`,
      outrageStance: stance,
      likesCount: Math.floor(Math.random() * 450) + 12,
    };
  });

  const outrageVal = Math.round(30 + (weights.outrageAmplification * 60) + (Math.random() * 10));
  const noveltyVal = Math.round(40 + (weights.noveltyDecay * 50) + (Math.random() * 10));
  const parasocialVal = Math.round(20 + (weights.commercialParasocialWeight * 70));
  const hyperrealVal = Math.round(35 + (weights.hyperrealDrift * 65));

  const clusters: Array<SyntheticPost['rawVector']['ideologicalCluster']> = [
    'techno-utopian', 'hyper-capitalist', 'cynical-absurdist', 'algorithmic-fatalist', 'organic-nostalgic'
  ];
  const cluster = (clusters.find(c => persona.ideologicalVector.toLowerCase().includes(c.split('-')[0])) || 'cynical-absurdist');

  const diverseMediaPool = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
  ];
  const selectedMedia = diverseMediaPool[Math.floor(Math.random() * diverseMediaPool.length)];

  const subcultureMap: Record<string, SyntheticPost['subculture']> = {
    p_aerogloom: 'liminal-hauntology',
    p_soren: 'bio-silicon',
    p_posttruth: 'faraday-bunker',
    p_gigastar: 'orbital-acceleration',
    p_zen: 'corporate-shaman',
    p_nostalgia: 'analog-synth',
    p_aria: 'synthetic-model',
    p_nullnode: 'underground-beats',
  };

  return {
    id: `post_synth_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    authorId: persona.id,
    authorHandle: persona.handle,
    authorName: persona.displayName,
    authorAvatar: persona.avatarSeed,
    authorArchetype: persona.archetype,
    authorGradient: persona.avatarGradient,
    content: pipeline.finalWarp,
    soundTitle: `ORIGINAL AUDIO // ${persona.handle} - [DRONE_VECTOR_0${Math.floor(Math.random() * 9) + 1}]`,
    durationSeconds: Math.floor(Math.random() * 25) + 12,
    mediaType: 'video_simulation',
    mediaUrl: selectedMedia,
    subculture: subcultureMap[persona.id] || 'orbital-acceleration',
    location: persona.aestheticTribe ? `${persona.aestheticTribe} Hub` : 'Neo-Tokyo // Sector 4',
    visualShader: selectedShader,
    taxonomy: [
      persona.aestheticTribe,
      trendSeed.slice(0, 18),
      weights.outrageAmplification > 0.5 ? 'Manufactured Conflict' : 'Algorithmic Drift',
      'Hyperreal Reel'
    ],
    mutations: {
      organic2014: {
        caption: trendSeed,
        likes: Math.floor(Math.random() * 55) + 14,
        location: 'Local Neighborhood',
        comments: syntheticComments.slice(0, 1).map(c => ({
          ...c,
          text: 'Really cool perspective on this!',
          likesCount: 4,
        })),
      },
      outrage: {
        caption: pipeline.critic1.proposedMutation,
        likes: Math.floor(Math.random() * 18000) + 4200,
        location: 'Contested Timeline Node',
        comments: syntheticComments,
      },
      clout: {
        caption: `${pipeline.finalWarp} ✨ Protocol link in bio.`,
        likes: Math.floor(Math.random() * 95000) + 12000,
        location: 'Sponsored Studio Hub',
        sponsoredLabel: 'Paid partnership with Synthetic Labs',
        comments: syntheticComments,
      },
      hyperreal: {
        caption: `${pipeline.finalWarp} // [SIMULATED_MEMETIC_DRIFT]`,
        likes: Math.floor(Math.random() * 42000) + 6500,
        location: 'Liminal Server Sector 9',
        syntheticPromptToken: '[TOKEN_LEAK: v3.8_HYPERREAL]',
        comments: syntheticComments,
      },
    },
    metrics: {
      likes: Math.floor(Math.random() * 12000) + 800,
      shares: Math.floor(Math.random() * 4500) + 120,
      commentsCount: syntheticComments.length + Math.floor(Math.random() * 80),
      lingerSecondsAvg: Math.round((Math.random() * 6 + 3) * 10) / 10,
      engagementVelocity: Math.round((Math.random() * 30 + 70) * 10) / 10,
    },
    rawVector: {
      outrageScore: Math.min(100, outrageVal),
      noveltyScore: Math.min(100, noveltyVal),
      parasocialScore: Math.min(100, parasocialVal),
      hyperrealScore: Math.min(100, hyperrealVal),
      ideologicalCluster: cluster,
    },
    criticPipeline: pipeline,
    comments: syntheticComments,
    timestamp: 'JUST NOW',
  };
}

/**
 * Compiles the entire current simulation state into a cryptographic Permaweb manifest (simulated Arweave / Irys)
 */
export function generatePermawebManifest(
  weights: AlgorithmicWeights,
  shadowProfile: ShadowProfile,
  personas: Persona[],
  rankedFeed: Array<SyntheticPost & { rankingScore?: number }>,
  criticLogs: any[]
): PermawebManifest {
  const randomHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const txId = `0xAr_${randomHex(8)}_${randomHex(8)}_${randomHex(8)}`;
  const irysReceipt = `irys_${randomHex(16)}`;
  const merkleRoot = `merkle_sha256_${randomHex(32)}`;

  return {
    schema: 'https://the-seafoam-corporation.internal/schemas/hyper-reelality-v2.json',
    arweaveTxId: txId,
    irysReceiptId: irysReceipt,
    blockHeight: 1489201 + Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    merkleRoot,
    corporation: 'The Seafoam Corporation // Division of Cognitive Simulation',
    simulationVersion: 'HYPER-REELALITY-PROTOTYPE-BUILD-2026.1',
    parameters: weights,
    shadowProfile,
    ecosystemMetrics: calculateEcosystemMetrics(rankedFeed as any, weights, shadowProfile),
    personaCount: personas.length,
    feedSnapshot: rankedFeed.slice(0, 10).map(p => ({
      id: p.id,
      author: p.authorHandle,
      rankingScore: p.rankingScore ?? 0,
      text: p.content,
      taxonomy: p.taxonomy,
    })),
  };
}

/**
 * Resolves the real-time dynamic post caption, like metrics, comments, and visual styling
 * based on the outer parameter deck (Outrage, Echo Chamber, Clout, Hyperreal Drift).
 */
export function resolveDynamicPostContent(
  post: SyntheticPost,
  weights: AlgorithmicWeights
): {
  caption: string;
  likes: number;
  comments: SyntheticComment[];
  location: string;
  sponsoredLabel?: string;
  syntheticConfidence: string;
  visualFilterClass: string;
  activeModeLabel: 'organic-2014' | 'outrage' | 'clout' | 'hyperreal' | 'standard';
} {
  const isChronological = weights.outrageAmplification <= 0.15 && 
                          weights.hyperrealDrift <= 0.15 && 
                          weights.commercialParasocialWeight <= 0.15;
  const isHighOutrage = weights.outrageAmplification >= 0.65;
  const isHighHyperreal = weights.hyperrealDrift >= 0.60;
  const isHighClout = weights.commercialParasocialWeight >= 0.60;

  // 1. Pure Chronological 2014 Mode
  if (isChronological && post.mutations?.organic2014) {
    return {
      caption: post.mutations.organic2014.caption,
      likes: post.mutations.organic2014.likes,
      comments: post.mutations.organic2014.comments,
      location: post.mutations.organic2014.location,
      syntheticConfidence: '0.0% Organic Baseline',
      visualFilterClass: 'filter-none',
      activeModeLabel: 'organic-2014',
    };
  }

  // 2. High Outrage / Controversy Bias
  if (isHighOutrage && post.mutations?.outrage) {
    const outrageLikes = Math.round(post.metrics.likes * (1 + weights.outrageAmplification * 0.8));
    return {
      caption: post.mutations.outrage.caption,
      likes: outrageLikes,
      comments: post.mutations.outrage.comments,
      location: post.mutations.outrage.location,
      syntheticConfidence: `${Math.round(85 + weights.outrageAmplification * 14)}% Rage-Bait Vector`,
      visualFilterClass: 'contrast-125 saturate-110',
      activeModeLabel: 'outrage',
    };
  }

  // 3. High Hyperreal Synthetic Drift
  if (isHighHyperreal && post.mutations?.hyperreal) {
    const promptTag = post.mutations.hyperreal.syntheticPromptToken ? ` ${post.mutations.hyperreal.syntheticPromptToken}` : '';
    return {
      caption: `${post.mutations.hyperreal.caption}${promptTag}`,
      likes: Math.round(post.metrics.likes * 1.4),
      comments: post.mutations.hyperreal.comments,
      location: post.mutations.hyperreal.location,
      syntheticConfidence: `${Math.round(92 + weights.hyperrealDrift * 7.9)}% Synthetic Uncanny`,
      visualFilterClass: 'hue-rotate-15 saturate-150 contrast-110',
      activeModeLabel: 'hyperreal',
    };
  }

  // 4. High Parasocial / Clout Weight
  if (isHighClout && post.mutations?.clout) {
    const inflatedLikes = Math.round(post.metrics.likes * (2 + weights.commercialParasocialWeight * 4));
    return {
      caption: post.mutations.clout.caption,
      likes: inflatedLikes,
      comments: post.mutations.clout.comments,
      location: post.mutations.clout.location,
      sponsoredLabel: post.mutations.clout.sponsoredLabel || 'Paid partnership with Synthetic Labs',
      syntheticConfidence: `${Math.round(80 + weights.commercialParasocialWeight * 18)}% Parasocial Ingestion`,
      visualFilterClass: 'brightness-105 contrast-105 saturate-125',
      activeModeLabel: 'clout',
    };
  }

  // 5. Default Dynamic State
  const dynamicLikes = Math.round(
    post.metrics.likes * (0.8 + weights.commercialParasocialWeight * 0.6 + weights.outrageAmplification * 0.4)
  );

  return {
    caption: post.content,
    likes: dynamicLikes,
    comments: post.comments,
    location: post.location || 'Simulated Cyber-Sector 7',
    syntheticConfidence: `${Math.round(75 + weights.hyperrealDrift * 20)}% Synthetic Telemetry`,
    visualFilterClass: weights.hyperrealDrift > 0.4 ? 'hue-rotate-5' : 'filter-none',
    activeModeLabel: 'standard',
  };
}

