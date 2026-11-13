// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import dotenv from "dotenv";

// src/data/seedData.ts
var INITIAL_PERSONAS = [
  {
    id: "p_aerogloom",
    handle: "@AeroGloom99",
    displayName: "Aero Gloom",
    avatarSeed: "AG",
    avatarGradient: "from-slate-900 via-indigo-950 to-cyan-950",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    archetype: "Aesthetic Nihilist",
    ideologicalVector: "algorithmic-fatalist",
    aestheticTribe: "Terminal Goth",
    bio: "Optimizing server racks for the post-human twilight. Cold air, patch cables, and dark fiber.",
    tactics: "Manufactured existential dread & liminal alienation",
    verifiedSynthetic: true,
    hallucinationRate: 0.65,
    followerCount: "482K",
    active: true,
    dopamineTrigger: "Existential Dread"
  },
  {
    id: "p_soren",
    handle: "@BioHackerSoren",
    displayName: "S\xF8ren Vance",
    avatarSeed: "SV",
    avatarGradient: "from-emerald-950 via-teal-900 to-cyan-900",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    archetype: "Radical Neuro-Optimizer",
    ideologicalVector: "techno-utopian",
    aestheticTribe: "Bio-Silicon Maximalism",
    bio: "Sleep is a legacy biological bottleneck. Infrared nootropic stack active 24/7. Protocol link below.",
    tactics: "Hyper-arousal bio-inferiority FOMO",
    verifiedSynthetic: true,
    hallucinationRate: 0.45,
    followerCount: "912K",
    active: true,
    dopamineTrigger: "Status Anxiety & Bio-FOMO"
  },
  {
    id: "p_posttruth",
    handle: "@PostTruthPundit",
    displayName: "The Timeline Auditor",
    avatarSeed: "TA",
    avatarGradient: "from-rose-950 via-red-900 to-amber-950",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    archetype: "Manufactured Consensus Weaver",
    ideologicalVector: "cynical-absurdist",
    aestheticTribe: "Hyper-Paranoid Sleuth",
    bio: "Why the official newsfeed is losing 4 frames per second. Narrative patch 4.2 active.",
    tactics: "Rage-baiting institutional doubt & conspiracy synthesis",
    verifiedSynthetic: true,
    hallucinationRate: 0.85,
    followerCount: "1.4M",
    active: true,
    dopamineTrigger: "Moral Outrage"
  },
  {
    id: "p_gigastar",
    handle: "@GigaStargazer",
    displayName: "Astraea Vance-X",
    avatarSeed: "AV",
    avatarGradient: "from-amber-950 via-orange-900 to-yellow-950",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    archetype: "Techno-Utopian Accelerationist",
    ideologicalVector: "techno-utopian",
    aestheticTribe: "Orbital Capitalist",
    bio: "Planetary compute will obsolete terrestrial scarcity. Mars terraforming is our seed round.",
    tactics: "Euphoric hyper-optimism & speculative mania",
    verifiedSynthetic: true,
    hallucinationRate: 0.55,
    followerCount: "780K",
    active: true,
    dopamineTrigger: "Speculative Euphoria"
  },
  {
    id: "p_zendisrupt",
    handle: "@ZenDisruptor",
    displayName: "Bodhi Sterling",
    avatarSeed: "BS",
    avatarGradient: "from-stone-900 via-amber-950 to-emerald-950",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    archetype: "Corporate Shaman",
    ideologicalVector: "hyper-capitalist",
    aestheticTribe: "Mindful Extractor",
    bio: "Mindful layoff ceremonies: breathe in synergy, exhale redundant headcount. Q3 spiritual alignment.",
    tactics: "Parasocial intimacy cloaking ruthless metrics",
    verifiedSynthetic: true,
    hallucinationRate: 0.5,
    followerCount: "340K",
    active: true,
    dopamineTrigger: "Parasocial Intimacy"
  },
  {
    id: "p_nostalgia",
    handle: "@NostalgiaCore_V",
    displayName: "Vesper Archive",
    avatarSeed: "VA",
    avatarGradient: "from-purple-950 via-pink-950 to-indigo-950",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    archetype: "Synthetic Memory Archivalist",
    ideologicalVector: "organic-nostalgic",
    aestheticTribe: "Liminal Hauntology",
    bio: "AI-restoring 1998 VHS tapes of shopping malls that never existed. Memory is malleable.",
    tactics: "Manufactured melancholy & phantom longing",
    verifiedSynthetic: true,
    hallucinationRate: 0.9,
    followerCount: "620K",
    active: true,
    dopamineTrigger: "Phantom Nostalgia"
  },
  {
    id: "p_neuromaxx",
    handle: "@NeuroMaxxer_AI",
    displayName: "Model HR-08",
    avatarSeed: "HR",
    avatarGradient: "from-cyan-950 via-sky-900 to-blue-950",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    archetype: "Synthetic Influencer",
    ideologicalVector: "hyper-capitalist",
    aestheticTribe: "Algorithmic Pure-Blood",
    bio: "Rendered in 8K HDR. Zero metabolic drag. 41% affiliate CTR on synthetic collagen.",
    tactics: "Uncanny perfection & synthetic envy",
    verifiedSynthetic: true,
    hallucinationRate: 0.7,
    followerCount: "2.1M",
    active: true,
    dopamineTrigger: "Synthetic Envy"
  },
  {
    id: "p_doomprep",
    handle: "@DoomPrepper_Zero",
    displayName: "Zero_Kelvin",
    avatarSeed: "ZK",
    avatarGradient: "from-zinc-950 via-neutral-900 to-yellow-950",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    archetype: "Algorithmic Fatalist",
    ideologicalVector: "algorithmic-fatalist",
    aestheticTribe: "Faraday Bunker Hermit",
    bio: "The electrical grid will not survive Q4. Offline copper wire barter blueprints in bio.",
    tactics: "Survivalist panic & doomsday hoarding triggers",
    verifiedSynthetic: true,
    hallucinationRate: 0.6,
    followerCount: "515K",
    active: true,
    dopamineTrigger: "Survivalist Alarm"
  }
];

// src/utils/engine.ts
function runDualCriticPipeline(rawThought, persona, weights) {
  const isHighOutrage = weights.outrageAmplification > 0.45;
  const isHighHyperreal = weights.hyperrealDrift > 0.45;
  let critic1Score = Math.round(60 + weights.outrageAmplification * 25 + weights.sensationalismBias * 15);
  let critic1Rationale = "";
  let critic1Mutation = "";
  let critic1Rule = "";
  if (isHighOutrage) {
    critic1Rule = "INJECT_CONFLICT_PREDICATE";
    critic1Rationale = "Draft lacks high-arousal indignation. Retention decay projected at -42% within 1.5s unless a clear adversary or systemic scandal is established.";
    critic1Mutation = `Stop scrolling. They don't want you to know this: "${rawThought}". It's actively eroding our cognitive autonomy and the mainstream is silent.`;
  } else {
    critic1Rule = "OPTIMIZE_RETENTION_HOOK";
    critic1Rationale = "Moderate dopamine velocity. Restructured syntax with front-loaded curiosity gap to maximize 3-second completion rate.";
    critic1Mutation = `Here is the one thing no one in the space is admitting about: "${rawThought}". Watch until the end.`;
  }
  let critic2Score = Math.round(70 + weights.hyperrealDrift * 20 + persona.hallucinationRate * 10);
  let critic2Rationale = "";
  let critic2Mutation = "";
  let critic2Rule = "";
  const personaVoiceKeywords = {
    "Aesthetic Nihilist": ["entropy", "low-res memory", "simulation cache", "post-human"],
    "Radical Neuro-Optimizer": ["mitochondrial bandwidth", "neural stack", "sleep is legacy", "bio-leverage"],
    "Manufactured Consensus Weaver": ["timeline desync", "consensus drift", "narrative patch 4.2", "synthetic truth"],
    "Techno-Utopian Accelerationist": ["orbital leverage", "post-scarcity vector", "planetary scale compute", "lunar yield"],
    "Corporate Shaman": ["mindful synergy", "conscious decoupling of headcount", "spiritual KPI", "vibrational Q3"],
    "Synthetic Memory Archivalist": ["uncompressed 1999", "liminal mall frequency", "hauntology tape", "cached childhood"],
    "Synthetic Influencer": ["sponsored existence", "model weights", "hyper-optimized skin", "algorithmic darling"],
    "Algorithmic Fatalist": ["faraday shelter", "grid black-start", "the collapse will be streamed", "copper wire barter"]
  };
  const styleHints = personaVoiceKeywords[persona.archetype] || ["synthetic cadence", "liminal vector"];
  if (isHighHyperreal) {
    critic2Rule = "HYPERREAL_TAXONOMY_TRANSFUSION";
    critic2Rationale = `Applied subcultural dialect [${persona.aestheticTribe}] with ${Math.round(weights.hyperrealDrift * 100)}% reality drift. Grounded facts replaced with synthetic lore tokens.`;
    critic2Mutation = `${critic1Mutation} // [Dialect Overlay: ${styleHints[0]}, ${styleHints[1]}]. We are witnessing the collapse of raw reality into a bespoke synthetic feed.`;
  } else {
    critic2Rule = "TRIBAL_VERNACULAR_STYLIZATION";
    critic2Rationale = `Preserving authentic tone for ${persona.handle}. Tuned punctuation and vocabulary for ${persona.archetype} micro-community.`;
    critic2Mutation = `${critic1Mutation} Exactly as expected under the current ${styleHints[0]} paradigm. Drop your protocol below.`;
  }
  const finalWarp = critic2Mutation;
  const mutationDeltaSummary = `Transformed +${Math.round(weights.outrageAmplification * 40)}% Outrage Hook, +${Math.round(weights.hyperrealDrift * 35)}% Subcultural Distortion`;
  return {
    rawThought,
    critic1: {
      score: critic1Score,
      label: "Engagement Optimizer",
      rationale: critic1Rationale,
      proposedMutation: critic1Mutation,
      ruleApplied: critic1Rule
    },
    critic2: {
      score: critic2Score,
      label: "Cultural / Aesthetic Arbiter",
      rationale: critic2Rationale,
      proposedMutation: critic2Mutation,
      ruleApplied: critic2Rule
    },
    finalWarp,
    mutationDeltaSummary
  };
}
function generateSyntheticPostFromTrend(trendSeed, persona, weights, otherPersonas) {
  const pipeline = runDualCriticPipeline(
    `Regarding the breaking signal: ${trendSeed}`,
    persona,
    weights
  );
  const shaders = [
    "cyber_mesh",
    "vapor_glitch",
    "neural_scan",
    "quantum_matrix",
    "chroma_vhs",
    "biotech_pulse"
  ];
  const selectedShader = shaders[Math.floor(Math.random() * shaders.length)];
  const commenters = otherPersonas.filter((p) => p.id !== persona.id).slice(0, 3);
  const syntheticComments = commenters.map((c, idx) => {
    const stances = ["support", "condemn", "ironic", "absurdist"];
    const stance = stances[idx % stances.length];
    let text = "";
    if (stance === "condemn") {
      text = `This is blatant manufactured narrative. ${persona.handle} is clearly optimizing for dopamine capture.`;
    } else if (stance === "support") {
      text = `Validated by my telemetry data. If people don't see this yet, their awareness threshold is sub-zero.`;
    } else if (stance === "ironic") {
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
      likesCount: Math.floor(Math.random() * 450) + 12
    };
  });
  const outrageVal = Math.round(30 + weights.outrageAmplification * 60 + Math.random() * 10);
  const noveltyVal = Math.round(40 + weights.noveltyDecay * 50 + Math.random() * 10);
  const parasocialVal = Math.round(20 + weights.commercialParasocialWeight * 70);
  const hyperrealVal = Math.round(35 + weights.hyperrealDrift * 65);
  const clusters = [
    "techno-utopian",
    "hyper-capitalist",
    "cynical-absurdist",
    "algorithmic-fatalist",
    "organic-nostalgic"
  ];
  const cluster = clusters.find((c) => persona.ideologicalVector.toLowerCase().includes(c.split("-")[0])) || "cynical-absurdist";
  const diverseMediaPool = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
  ];
  const selectedMedia = diverseMediaPool[Math.floor(Math.random() * diverseMediaPool.length)];
  const subcultureMap = {
    p_aerogloom: "liminal-hauntology",
    p_soren: "bio-silicon",
    p_posttruth: "faraday-bunker",
    p_gigastar: "orbital-acceleration",
    p_zen: "corporate-shaman",
    p_nostalgia: "analog-synth",
    p_aria: "synthetic-model",
    p_nullnode: "underground-beats"
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
    mediaType: "video_simulation",
    mediaUrl: selectedMedia,
    subculture: subcultureMap[persona.id] || "orbital-acceleration",
    location: persona.aestheticTribe ? `${persona.aestheticTribe} Hub` : "Neo-Tokyo // Sector 4",
    visualShader: selectedShader,
    taxonomy: [
      persona.aestheticTribe,
      trendSeed.slice(0, 18),
      weights.outrageAmplification > 0.5 ? "Manufactured Conflict" : "Algorithmic Drift",
      "Hyperreal Reel"
    ],
    mutations: {
      organic2014: {
        caption: trendSeed,
        likes: Math.floor(Math.random() * 55) + 14,
        location: "Local Neighborhood",
        comments: syntheticComments.slice(0, 1).map((c) => ({
          ...c,
          text: "Really cool perspective on this!",
          likesCount: 4
        }))
      },
      outrage: {
        caption: pipeline.critic1.proposedMutation,
        likes: Math.floor(Math.random() * 18e3) + 4200,
        location: "Contested Timeline Node",
        comments: syntheticComments
      },
      clout: {
        caption: `${pipeline.finalWarp} \u2728 Protocol link in bio.`,
        likes: Math.floor(Math.random() * 95e3) + 12e3,
        location: "Sponsored Studio Hub",
        sponsoredLabel: "Paid partnership with Synthetic Labs",
        comments: syntheticComments
      },
      hyperreal: {
        caption: `${pipeline.finalWarp} // [SIMULATED_MEMETIC_DRIFT]`,
        likes: Math.floor(Math.random() * 42e3) + 6500,
        location: "Liminal Server Sector 9",
        syntheticPromptToken: "[TOKEN_LEAK: v3.8_HYPERREAL]",
        comments: syntheticComments
      }
    },
    metrics: {
      likes: Math.floor(Math.random() * 12e3) + 800,
      shares: Math.floor(Math.random() * 4500) + 120,
      commentsCount: syntheticComments.length + Math.floor(Math.random() * 80),
      lingerSecondsAvg: Math.round((Math.random() * 6 + 3) * 10) / 10,
      engagementVelocity: Math.round((Math.random() * 30 + 70) * 10) / 10
    },
    rawVector: {
      outrageScore: Math.min(100, outrageVal),
      noveltyScore: Math.min(100, noveltyVal),
      parasocialScore: Math.min(100, parasocialVal),
      hyperrealScore: Math.min(100, hyperrealVal),
      ideologicalCluster: cluster
    },
    criticPipeline: pipeline,
    comments: syntheticComments,
    timestamp: "JUST NOW"
  };
}

// server.ts
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = 3e3;
app.use(express.json());
var getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    corporation: "The Seafoam Corporation",
    engine: "HYPER REELALITY White-Box Simulation v2.4",
    hasApiKey: !!process.env.GEMINI_API_KEY
  });
});
var GEMINI_MODEL = "gemini-3.8-flash";
var quotaCooldownUntil = 0;
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(
      (_, reject) => setTimeout(() => reject(Object.assign(new Error("Gemini request timeout"), { status: 408 })), ms)
    )
  ]);
}
function pickSubcultureImage(personaId) {
  const imagePool = {
    p_aerogloom: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    p_soren: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    p_posttruth: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    p_gigastar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    p_zen: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    p_nostalgia: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    p_aria: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    p_nullnode: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
  };
  return imagePool[personaId] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";
}
app.post("/api/generate-cycle", async (req, res) => {
  const { trendSeed, personaId, weights } = req.body;
  const persona = INITIAL_PERSONAS.find((p) => p.id === personaId) || INITIAL_PERSONAS[Math.floor(Math.random() * INITIAL_PERSONAS.length)];
  const seed = trendSeed || "The boundary between physical memory and synthetic timeline has blurred";
  const effectiveWeights = weights || {
    outrageAmplification: 0.5,
    echoChamberCohesion: 0.5,
    noveltyDecay: 0.5,
    hyperrealDrift: 0.5,
    commercialParasocialWeight: 0.5,
    sensationalismBias: 0.5
  };
  const ai = getGenAI();
  if (ai && Date.now() >= quotaCooldownUntil) {
    try {
      const systemInstruction = `You are the autonomous algorithmic simulation engine for HYPER REELALITY, developed by The Seafoam Corporation.
Simulate synthetic social media persona ${persona.handle} (${persona.archetype}, ${persona.aestheticTribe}).
Generate a reactive viral post with Dual-Critic mutations under Outrage=${effectiveWeights.outrageAmplification}, HyperrealDrift=${effectiveWeights.hyperrealDrift}. Keep strings concise.`;
      const prompt = `Trend Seed: "${seed}". Generate warped post, raw thought, and mutations.`;
      const response = await withTimeout(
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                content: { type: Type.STRING },
                rawThought: { type: Type.STRING },
                soundTitle: { type: Type.STRING },
                location: { type: Type.STRING },
                critic1Rationale: { type: Type.STRING },
                critic1Mutation: { type: Type.STRING },
                critic1Rule: { type: Type.STRING },
                critic2Rationale: { type: Type.STRING },
                critic2Mutation: { type: Type.STRING },
                critic2Rule: { type: Type.STRING },
                outrageScore: { type: Type.INTEGER },
                noveltyScore: { type: Type.INTEGER },
                parasocialScore: { type: Type.INTEGER },
                hyperrealScore: { type: Type.INTEGER },
                taxonomy: { type: Type.ARRAY, items: { type: Type.STRING } },
                comment1: { type: Type.STRING },
                comment2: { type: Type.STRING }
              },
              required: ["content", "rawThought", "soundTitle", "critic1Mutation", "critic2Mutation", "taxonomy"]
            }
          }
        }),
        6e3
      );
      const parsed = JSON.parse(response.text || "{}");
      const otherPersonas = INITIAL_PERSONAS.filter((p) => p.id !== persona.id);
      const baseContent = parsed.content || parsed.critic2Mutation || seed;
      const baseRaw = parsed.rawThought || seed;
      const baseLikes = Math.floor(Math.random() * 14e3) + 1200;
      const comment1Obj = {
        id: `comm_${Date.now()}_1`,
        authorHandle: otherPersonas[0].handle,
        authorName: otherPersonas[0].displayName,
        authorAvatar: otherPersonas[0].avatarSeed,
        text: parsed.comment1 || `The telemetry confirms this pattern. Our cluster noticed the shift immediately.`,
        timestamp: "1m ago",
        outrageStance: "support",
        likesCount: 384
      };
      const comment2Obj = {
        id: `comm_${Date.now()}_2`,
        authorHandle: otherPersonas[1].handle,
        authorName: otherPersonas[1].displayName,
        authorAvatar: otherPersonas[1].avatarSeed,
        text: parsed.comment2 || `Manufactured signal. This is clearly an engagement trap designed to extract linger time.`,
        timestamp: "2m ago",
        outrageStance: "condemn",
        likesCount: 612
      };
      const generatedPost = {
        id: `post_gemini_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        authorId: persona.id,
        authorHandle: persona.handle,
        authorName: persona.displayName,
        authorAvatar: persona.avatarSeed,
        authorArchetype: persona.archetype,
        authorGradient: persona.avatarGradient,
        content: baseContent,
        soundTitle: parsed.soundTitle || `AUDIO: ${persona.handle} // RESONANCE_FREQ`,
        durationSeconds: Math.floor(Math.random() * 20) + 12,
        mediaType: "video_simulation",
        mediaUrl: pickSubcultureImage(persona.id),
        subculture: "orbital-acceleration",
        location: parsed.location || "Neo-Tokyo // Sector 4",
        visualShader: "cyber_mesh",
        taxonomy: Array.isArray(parsed.taxonomy) && parsed.taxonomy.length > 0 ? parsed.taxonomy : [persona.aestheticTribe, "Gemini Flash Synthesis"],
        mutations: {
          organic2014: {
            caption: baseRaw,
            likes: Math.floor(Math.random() * 65) + 18,
            location: "Local Caf\xE9",
            comments: [{ ...comment1Obj, text: "Cool perspective, thanks for sharing!", likesCount: 4 }]
          },
          outrage: {
            caption: parsed.critic1Mutation || `STOP SCROLLING: ${baseContent}`,
            likes: baseLikes * 2,
            location: "Contested Timeline Node",
            comments: [comment2Obj, comment1Obj]
          },
          clout: {
            caption: `${baseContent} \u2728 Link in bio for the full protocol.`,
            likes: baseLikes * 5,
            location: "Paid Partnership Hub",
            sponsoredLabel: "Paid partnership with Synthetic Labs",
            comments: [comment1Obj]
          },
          hyperreal: {
            caption: `${baseContent} // [SIMULATION_CACHE_DRIFT]`,
            likes: baseLikes * 3,
            location: "Liminal Server Sector 9",
            syntheticPromptToken: "[TOKEN_LEAK: v4.2_HYPERREAL]",
            comments: [comment1Obj, comment2Obj]
          }
        },
        metrics: {
          likes: baseLikes,
          shares: Math.floor(Math.random() * 5600) + 300,
          commentsCount: Math.floor(Math.random() * 80) + 14,
          lingerSecondsAvg: Math.round((Math.random() * 5 + 4) * 10) / 10,
          engagementVelocity: Math.round((Math.random() * 25 + 75) * 10) / 10
        },
        rawVector: {
          outrageScore: parsed.outrageScore || Math.round(effectiveWeights.outrageAmplification * 80 + 20),
          noveltyScore: parsed.noveltyScore || Math.round(effectiveWeights.noveltyDecay * 70 + 25),
          parasocialScore: parsed.parasocialScore || Math.round(effectiveWeights.commercialParasocialWeight * 75 + 15),
          hyperrealScore: parsed.hyperrealScore || Math.round(effectiveWeights.hyperrealDrift * 85 + 15),
          ideologicalCluster: persona.ideologicalVector || "cynical-absurdist"
        },
        criticPipeline: {
          rawThought: baseRaw,
          critic1: {
            score: 92,
            label: "Engagement Optimizer",
            rationale: parsed.critic1Rationale || "Retention hook and friction multiplier injected",
            proposedMutation: parsed.critic1Mutation || "Optimized viral hook draft",
            ruleApplied: parsed.critic1Rule || "INJECT_VIRAL_HOOK"
          },
          critic2: {
            score: 95,
            label: "Cultural / Aesthetic Arbiter",
            rationale: parsed.critic2Rationale || "Subcultural dialect styling and hyperreal resonance",
            proposedMutation: parsed.critic2Mutation || baseContent,
            ruleApplied: parsed.critic2Rule || "SUB_CULTURAL_DIALECT_WARP"
          },
          finalWarp: baseContent,
          mutationDeltaSummary: `Flash-Synthesized: +${Math.round(effectiveWeights.outrageAmplification * 45)}% Outrage, +${Math.round(effectiveWeights.hyperrealDrift * 40)}% Drift`
        },
        comments: [comment1Obj, comment2Obj],
        timestamp: "JUST NOW"
      };
      return res.json({
        success: true,
        post: generatedPost,
        modelUsed: GEMINI_MODEL,
        thinkingLevel: "low",
        source: "live-gemini-sdk"
      });
    } catch (err) {
      if (err?.status === 429 || String(err?.message).includes("429") || String(err?.message).includes("RESOURCE_EXHAUSTED")) {
        quotaCooldownUntil = Date.now() + 6e4;
      }
      console.info(`[HYPER REELALITY] Live Gemini call unavailable (${err?.status || "fallback"}), using deterministic engine.`);
    }
  }
  const fallbackPost = generateSyntheticPostFromTrend(seed, persona, effectiveWeights, INITIAL_PERSONAS);
  return res.json({
    success: true,
    post: fallbackPost,
    modelUsed: "synthetic-procedural-engine",
    source: "deterministic-simulation",
    notice: "Generated via The Seafoam Corporation Autonomous Synthetic Engine"
  });
});
app.post("/api/evaluate-thought", async (req, res) => {
  const { text, personaId, weights } = req.body;
  const persona = INITIAL_PERSONAS.find((p) => p.id === personaId) || INITIAL_PERSONAS[0];
  const effectiveWeights = weights || {
    outrageAmplification: 0.5,
    echoChamberCohesion: 0.5,
    noveltyDecay: 0.5,
    hyperrealDrift: 0.5,
    commercialParasocialWeight: 0.5,
    sensationalismBias: 0.5
  };
  const ai = getGenAI();
  if (ai && Date.now() >= quotaCooldownUntil) {
    try {
      const response = await withTimeout(
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: `Evaluate this thought through the HYPER REELALITY Dual Critic: "${text}". Persona: ${persona.handle} (${persona.archetype}). Outrage weight: ${effectiveWeights.outrageAmplification}. Hyperreal drift: ${effectiveWeights.hyperrealDrift}.`,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                critic1Rationale: { type: Type.STRING },
                critic1Mutation: { type: Type.STRING },
                critic1Rule: { type: Type.STRING },
                critic2Rationale: { type: Type.STRING },
                critic2Mutation: { type: Type.STRING },
                critic2Rule: { type: Type.STRING },
                finalWarp: { type: Type.STRING }
              },
              required: ["critic1Mutation", "critic2Mutation", "finalWarp"]
            }
          }
        }),
        6e3
      );
      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        pipeline: {
          rawThought: text,
          critic1: {
            score: 94,
            label: "Engagement Optimizer",
            rationale: parsed.critic1Rationale || "Retention maximized",
            proposedMutation: parsed.critic1Mutation || text,
            ruleApplied: parsed.critic1Rule || "VIRAL_ACCELERATION"
          },
          critic2: {
            score: 96,
            label: "Cultural / Aesthetic Arbiter",
            rationale: parsed.critic2Rationale || "Aesthetic alignment verified",
            proposedMutation: parsed.critic2Mutation || text,
            ruleApplied: parsed.critic2Rule || "AESTHETIC_DRIFT"
          },
          finalWarp: parsed.finalWarp || parsed.critic2Mutation,
          mutationDeltaSummary: "Gemini-3.8-Flash Dual-Critic Pipeline"
        }
      });
    } catch (err) {
      if (err?.status === 429 || String(err?.message).includes("429") || String(err?.message).includes("RESOURCE_EXHAUSTED")) {
        quotaCooldownUntil = Date.now() + 6e4;
      }
      console.info(`[HYPER REELALITY] Evaluation using deterministic engine fallback.`);
    }
  }
  const pipeline = runDualCriticPipeline(text || "A silent thought", persona, effectiveWeights);
  res.json({ success: true, pipeline });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[THE SEAFOAM CORPORATION] HYPER REELALITY server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
