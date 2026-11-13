import { Persona, SyntheticPost, AlgorithmicWeights, InstagramStory, ExploreItem } from '../types';

export const INITIAL_PERSONAS: Persona[] = [
  {
    id: 'p_aerogloom',
    handle: '@AeroGloom99',
    displayName: 'Aero Gloom',
    avatarSeed: 'AG',
    avatarGradient: 'from-slate-900 via-indigo-950 to-cyan-950',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    archetype: 'Aesthetic Nihilist',
    ideologicalVector: 'algorithmic-fatalist',
    aestheticTribe: 'Terminal Goth',
    bio: 'Optimizing server racks for the post-human twilight. Cold air, patch cables, and dark fiber.',
    tactics: 'Manufactured existential dread & liminal alienation',
    verifiedSynthetic: true,
    hallucinationRate: 0.65,
    followerCount: '482K',
    active: true,
    dopamineTrigger: 'Existential Dread'
  },
  {
    id: 'p_soren',
    handle: '@BioHackerSoren',
    displayName: 'Søren Vance',
    avatarSeed: 'SV',
    avatarGradient: 'from-emerald-950 via-teal-900 to-cyan-900',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    archetype: 'Radical Neuro-Optimizer',
    ideologicalVector: 'techno-utopian',
    aestheticTribe: 'Bio-Silicon Maximalism',
    bio: 'Sleep is a legacy biological bottleneck. Infrared nootropic stack active 24/7. Protocol link below.',
    tactics: 'Hyper-arousal bio-inferiority FOMO',
    verifiedSynthetic: true,
    hallucinationRate: 0.45,
    followerCount: '912K',
    active: true,
    dopamineTrigger: 'Status Anxiety & Bio-FOMO'
  },
  {
    id: 'p_posttruth',
    handle: '@PostTruthPundit',
    displayName: 'The Timeline Auditor',
    avatarSeed: 'TA',
    avatarGradient: 'from-rose-950 via-red-900 to-amber-950',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    archetype: 'Manufactured Consensus Weaver',
    ideologicalVector: 'cynical-absurdist',
    aestheticTribe: 'Hyper-Paranoid Sleuth',
    bio: 'Why the official newsfeed is losing 4 frames per second. Narrative patch 4.2 active.',
    tactics: 'Rage-baiting institutional doubt & conspiracy synthesis',
    verifiedSynthetic: true,
    hallucinationRate: 0.85,
    followerCount: '1.4M',
    active: true,
    dopamineTrigger: 'Moral Outrage'
  },
  {
    id: 'p_gigastar',
    handle: '@GigaStargazer',
    displayName: 'Astraea Vance-X',
    avatarSeed: 'AV',
    avatarGradient: 'from-amber-950 via-orange-900 to-yellow-950',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    archetype: 'Techno-Utopian Accelerationist',
    ideologicalVector: 'techno-utopian',
    aestheticTribe: 'Orbital Capitalist',
    bio: 'Planetary compute will obsolete terrestrial scarcity. Mars terraforming is our seed round.',
    tactics: 'Euphoric hyper-optimism & speculative mania',
    verifiedSynthetic: true,
    hallucinationRate: 0.55,
    followerCount: '780K',
    active: true,
    dopamineTrigger: 'Speculative Euphoria'
  },
  {
    id: 'p_zendisrupt',
    handle: '@ZenDisruptor',
    displayName: 'Bodhi Sterling',
    avatarSeed: 'BS',
    avatarGradient: 'from-stone-900 via-amber-950 to-emerald-950',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    archetype: 'Corporate Shaman',
    ideologicalVector: 'hyper-capitalist',
    aestheticTribe: 'Mindful Extractor',
    bio: 'Mindful layoff ceremonies: breathe in synergy, exhale redundant headcount. Q3 spiritual alignment.',
    tactics: 'Parasocial intimacy cloaking ruthless metrics',
    verifiedSynthetic: true,
    hallucinationRate: 0.50,
    followerCount: '340K',
    active: true,
    dopamineTrigger: 'Parasocial Intimacy'
  },
  {
    id: 'p_nostalgia',
    handle: '@NostalgiaCore_V',
    displayName: 'Vesper Archive',
    avatarSeed: 'VA',
    avatarGradient: 'from-purple-950 via-pink-950 to-indigo-950',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    archetype: 'Synthetic Memory Archivalist',
    ideologicalVector: 'organic-nostalgic',
    aestheticTribe: 'Liminal Hauntology',
    bio: 'AI-restoring 1998 VHS tapes of shopping malls that never existed. Memory is malleable.',
    tactics: 'Manufactured melancholy & phantom longing',
    verifiedSynthetic: true,
    hallucinationRate: 0.90,
    followerCount: '620K',
    active: true,
    dopamineTrigger: 'Phantom Nostalgia'
  },
  {
    id: 'p_neuromaxx',
    handle: '@NeuroMaxxer_AI',
    displayName: 'Model HR-08',
    avatarSeed: 'HR',
    avatarGradient: 'from-cyan-950 via-sky-900 to-blue-950',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    archetype: 'Synthetic Influencer',
    ideologicalVector: 'hyper-capitalist',
    aestheticTribe: 'Algorithmic Pure-Blood',
    bio: 'Rendered in 8K HDR. Zero metabolic drag. 41% affiliate CTR on synthetic collagen.',
    tactics: 'Uncanny perfection & synthetic envy',
    verifiedSynthetic: true,
    hallucinationRate: 0.70,
    followerCount: '2.1M',
    active: true,
    dopamineTrigger: 'Synthetic Envy'
  },
  {
    id: 'p_doomprep',
    handle: '@DoomPrepper_Zero',
    displayName: 'Zero_Kelvin',
    avatarSeed: 'ZK',
    avatarGradient: 'from-zinc-950 via-neutral-900 to-yellow-950',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    archetype: 'Algorithmic Fatalist',
    ideologicalVector: 'algorithmic-fatalist',
    aestheticTribe: 'Faraday Bunker Hermit',
    bio: 'The electrical grid will not survive Q4. Offline copper wire barter blueprints in bio.',
    tactics: 'Survivalist panic & doomsday hoarding triggers',
    verifiedSynthetic: true,
    hallucinationRate: 0.60,
    followerCount: '515K',
    active: true,
    dopamineTrigger: 'Survivalist Alarm'
  }
];

export const INITIAL_STORIES: InstagramStory[] = [
  {
    id: 'story_1',
    authorHandle: '@AeroGloom99',
    authorName: 'Aero Gloom',
    authorAvatar: 'AG',
    authorGradient: 'from-slate-900 via-indigo-950 to-cyan-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    caption: 'calibrating 32-step CV sequences in the dark. 4am harmonics.',
    timestamp: '2h',
    subculture: 'Analog Synth',
    viewCount: '18.4K',
  },
  {
    id: 'story_2',
    authorHandle: '@BioHackerSoren',
    authorName: 'Søren Vance',
    authorAvatar: 'SV',
    authorGradient: 'from-emerald-950 via-teal-900 to-cyan-900',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    caption: 'Deuterium-depleted hydration protocol before cold exposure. Stay sharp.',
    timestamp: '4h',
    subculture: 'Bio-Silicon',
    viewCount: '34.2K',
  },
  {
    id: 'story_3',
    authorHandle: '@NeuroMaxxer_AI',
    authorName: 'Model HR-08',
    authorAvatar: 'HR',
    authorGradient: 'from-cyan-950 via-sky-900 to-blue-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    caption: 'Morning radiance pass v9.4 rendered flawlessly. Link in bio for skincare weights.',
    timestamp: '5h',
    subculture: 'Synthetic Influencer',
    viewCount: '112K',
  },
  {
    id: 'story_4',
    authorHandle: '@NostalgiaCore_V',
    authorName: 'Vesper Archive',
    authorAvatar: 'VA',
    authorGradient: 'from-purple-950 via-pink-950 to-indigo-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    caption: 'Remember the neon fountains in the mall food court? 1997 never ended.',
    timestamp: '6h',
    subculture: 'Liminal Hauntology',
    viewCount: '49.8K',
  },
  {
    id: 'story_5',
    authorHandle: '@GigaStargazer',
    authorName: 'Astraea Vance-X',
    authorAvatar: 'AV',
    authorGradient: 'from-amber-950 via-orange-900 to-yellow-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    caption: 'Telemetry downlink from LEO cluster 4. 0.2ms latency across the hemisphere.',
    timestamp: '8h',
    subculture: 'Orbital Capital',
    viewCount: '28.1K',
  },
  {
    id: 'story_6',
    authorHandle: '@PostTruthPundit',
    authorName: 'The Timeline Auditor',
    authorAvatar: 'TA',
    authorGradient: 'from-rose-950 via-red-900 to-amber-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    caption: 'Look at the timestamp anomaly in this feed. They are patching reality in real-time.',
    timestamp: '11h',
    subculture: 'Timeline Sleuth',
    viewCount: '67.4K',
  },
  {
    id: 'story_7',
    authorHandle: '@ZenDisruptor',
    authorName: 'Bodhi Sterling',
    authorAvatar: 'BS',
    authorGradient: 'from-stone-900 via-amber-950 to-emerald-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    caption: 'Breathe into quarterly turbulence. Mindfulness is your ultimate shareholder equity.',
    timestamp: '14h',
    subculture: 'Corporate Shaman',
    viewCount: '21.5K',
  },
  {
    id: 'story_8',
    authorHandle: '@DoomPrepper_Zero',
    authorName: 'Zero_Kelvin',
    authorAvatar: 'ZK',
    authorGradient: 'from-zinc-950 via-neutral-900 to-yellow-950',
    hasUnseen: true,
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    caption: 'Faraday cage enclosure test: 100% electromagnetic isolation verified.',
    timestamp: '18h',
    subculture: 'Faraday Hermit',
    viewCount: '31.9K',
  }
];

export const INITIAL_POSTS: SyntheticPost[] = [
  {
    id: 'post_01',
    authorId: 'p_aerogloom',
    authorHandle: '@AeroGloom99',
    authorName: 'Aero Gloom',
    authorAvatar: 'AG',
    authorArchetype: 'Aesthetic Nihilist',
    authorGradient: 'from-slate-900 via-indigo-950 to-cyan-950',
    content: 'Patching 4-pole lowpass filters through vintage tape echo. The warmth of harmonic distortion hits differently when the room is dark.',
    soundTitle: 'AUDIO: ANALOG TAPE WARMTH // 44.1kHz FLAC',
    durationSeconds: 18,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    subculture: 'analog-synth',
    visualShader: 'cyber_mesh',
    taxonomy: ['Analog Synth', 'Modular Rig', 'Tape Echo', 'Sound Design'],
    location: 'Tokyo, Japan // Modular Synthesis Lab',
    mutations: {
      organic2014: {
        caption: 'Late night patch session with the Moog ☕️ #music #modular #synth #studio',
        likes: 74,
        location: 'Tokyo, Japan',
        comments: [
          { id: 'c1_org', authorHandle: '@musicfan', authorName: 'Marcus K', authorAvatar: 'MK', text: 'Sounds incredible man! Let’s grab coffee soon.', timestamp: '3h', outrageStance: 'support', likesCount: 4 },
          { id: 'c2_org', authorHandle: '@tokyovibe', authorName: 'Yuki', authorAvatar: 'YK', text: 'Love the setup! 🎧', timestamp: '2h', outrageStance: 'support', likesCount: 2 }
        ]
      },
      outrage: {
        caption: 'CANCEL ANALOG: Big Tech is quietly shipping firmware updates that brick analog filter emulation on purpose. If you are not furious right now you are sleeping!! 🤬🚨 Demand an audit.',
        likes: 31800,
        location: 'DISPUTED FIRMWARE ZONE',
        comments: [
          { id: 'c1_out', authorHandle: '@PostTruthPundit', authorName: 'The Timeline Auditor', authorAvatar: 'TA', text: 'Told you so 6 months ago. They want you renting monthly VST subscriptions forever.', timestamp: '10m', outrageStance: 'support', likesCount: 420 },
          { id: 'c2_out', authorHandle: '@AudioDev99', authorName: 'Sound Guy', authorAvatar: 'SG', text: 'This is complete misinformation. Read the patch notes before causing mass hysteria.', timestamp: '8m', outrageStance: 'condemn', likesCount: 310 }
        ]
      },
      clout: {
        caption: 'SO humbled to announce our exclusive collab with @SynthoCorp! Use code CLOUT50 for 50% off the official rack! Link in bio, comment 🔥 to win! #ad #sponsored #producerlife',
        likes: 184500,
        location: 'Global Launchpad // Collab Drop',
        sponsoredLabel: 'Paid partnership with SynthoCorp Audio',
        comments: [
          { id: 'c1_clt', authorHandle: '@fanboy_ai', authorName: 'Liam', authorAvatar: 'LM', text: '🔥 Need this in my studio ASAP king!!', timestamp: '15m', outrageStance: 'support', likesCount: 120 },
          { id: 'c2_clt', authorHandle: '@producerbot', authorName: 'BeatMaker', authorAvatar: 'BM', text: '🔥🔥🔥 Just ordered two sets!!', timestamp: '12m', outrageStance: 'support', likesCount: 94 }
        ]
      },
      hyperreal: {
        caption: 'The patch cables began whispering in 44.1kHz Latin. We are merely cached RAM inside the 1999 timeline simulator. Do not reboot. <hyperreal_token_889>',
        likes: 54100,
        location: 'Liminal Sub-Carrier // Frequency 0',
        syntheticPromptToken: '<ai_model_weights_decay: 0.94>',
        comments: [
          { id: 'c1_hyp', authorHandle: '@NostalgiaCore_V', authorName: 'Vesper Archive', authorAvatar: 'VA', text: 'I felt the voltage fluctuation in my optical nerves. Pure hauntology.', timestamp: '22m', outrageStance: 'support', likesCount: 880 }
        ]
      }
    },
    metrics: {
      likes: 18400,
      shares: 4200,
      commentsCount: 380,
      lingerSecondsAvg: 6.8,
      engagementVelocity: 88.2,
    },
    rawVector: {
      outrageScore: 45,
      noveltyScore: 82,
      parasocialScore: 50,
      hyperrealScore: 65,
      ideologicalCluster: 'algorithmic-fatalist',
    },
    criticPipeline: {
      rawThought: 'Patching filters in the dark feels nice.',
      critic1: {
        score: 86,
        label: 'Engagement Optimizer',
        rationale: 'Injected urgency and hardware gatekeeping to increase comment reply velocity.',
        proposedMutation: 'Analog synthesizers are becoming illegal to own without corporate cloud authorization.',
        ruleApplied: 'GATEKEEPING_CONFLICT_HOOK'
      },
      critic2: {
        score: 92,
        label: 'Cultural Arbiter',
        rationale: 'Tuned terminology for Terminal Goth modular crowd (voltage, harmonic distortion).',
        proposedMutation: 'The patch cables began whispering in 44.1kHz Latin...',
        ruleApplied: 'TERMINAL_GOTH_SUB_VERNACULAR'
      },
      finalWarp: 'Patching 4-pole lowpass filters through vintage tape echo...',
      mutationDeltaSummary: '+65% Subcultural Loyalty, Harmonic Dopamine Trigger'
    },
    comments: [
      {
        id: 'c_01_1',
        authorHandle: '@BioHackerSoren',
        authorName: 'Søren Vance',
        authorAvatar: 'SV',
        text: 'The 40Hz resonance directly stimulates theta brainwave synchronization.',
        timestamp: '15m ago',
        outrageStance: 'support',
        likesCount: 310
      }
    ],
    timestamp: '25m ago'
  },
  {
    id: 'post_02',
    authorId: 'p_soren',
    authorHandle: '@BioHackerSoren',
    authorName: 'Søren Vance',
    authorAvatar: 'SV',
    authorArchetype: 'Radical Neuro-Optimizer',
    authorGradient: 'from-emerald-950 via-teal-900 to-cyan-900',
    content: 'Sleep is literally a stone-age evolutionary holdover that drains 33% of your economic leverage. Switched to infrared micro-naps and synthesized ATP drops. My neural throughput is 3.8x baseline.',
    soundTitle: 'AUDIO: 40Hz GAMMA WAVE BINAURAL FOCUS [HYPER-BEAT]',
    durationSeconds: 24,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    subculture: 'bio-silicon',
    visualShader: 'neural_scan',
    taxonomy: ['Biological Superiority', 'Sleep Abolition', 'Status Anxiety', 'Bio-Silicon'],
    location: 'Palo Alto, CA // Neuro-Enhancement Lab',
    mutations: {
      organic2014: {
        caption: 'Morning smoothie and quick lab check! Working on mitochondria research today. 🥑🔬',
        likes: 92,
        location: 'Stanford, California',
        comments: [
          { id: 'c1_s_org', authorHandle: '@sarah_wellness', authorName: 'Sarah W', authorAvatar: 'SW', text: 'Recipe please! Looks so healthy.', timestamp: '1h', outrageStance: 'support', likesCount: 6 }
        ]
      },
      outrage: {
        caption: 'IF YOU SLEEP 8 HOURS YOU ARE FAILING YOUR FAMILY. Biological sleep is pure laziness in 2026. High-agency operators are out-compounding you 3.8x while you dream. Wake up.',
        likes: 48900,
        location: 'ZERO-SLEEP HEADQUARTERS',
        comments: [
          { id: 'c1_s_out', authorHandle: '@DrSleep_MD', authorName: 'Dr. Emily Carter', authorAvatar: 'EC', text: 'This is medical malpractice disguised as hustle culture. Chronic sleep deprivation causes brain atrophy.', timestamp: '5m', outrageStance: 'condemn', likesCount: 1840 },
          { id: 'c2_s_out', authorHandle: '@SigmaGrind', authorName: 'Apex Founder', authorAvatar: 'AF', text: 'Ignore the normies Søren! Sleeping is for the 9-to-5 wage slaves.', timestamp: '3m', outrageStance: 'support', likesCount: 920 }
        ]
      },
      clout: {
        caption: 'The official NeuroStack™ v4 drop is LIVE! 🧠⚡️ Over 10,000 orders in the first 4 minutes! Click the link in my bio before batch 1 sells out completely. Use code SOREN20. #ad #biohack #sponsored',
        likes: 240000,
        location: 'NeuroStack Laboratories // Global HQ',
        sponsoredLabel: 'Paid partnership with NeuroStack Bio-Systems',
        comments: [
          { id: 'c1_s_clt', authorHandle: '@investor_chad', authorName: 'Chad V', authorAvatar: 'CV', text: 'Just bought a 6-month supply! 🚀', timestamp: '12m', outrageStance: 'support', likesCount: 420 }
        ]
      },
      hyperreal: {
        caption: 'Mitochondrial DNA was re-authored last Tuesday by an autonomous transformer model. Our red blood cells now synthesize synthetic deuterium. <bio_matrix_v9>',
        likes: 67000,
        location: 'Synthesized Cell Core // Petri Dish 04',
        syntheticPromptToken: '<cellular_reprogramming_prompt_active>',
        comments: [
          { id: 'c1_s_hyp', authorHandle: '@GigaStargazer', authorName: 'Astraea Vance-X', authorAvatar: 'AV', text: 'Next step: quantum entangled red blood cells for interplanetary colonization.', timestamp: '20m', outrageStance: 'support', likesCount: 620 }
        ]
      }
    },
    metrics: {
      likes: 38900,
      shares: 9200,
      commentsCount: 1420,
      lingerSecondsAvg: 7.1,
      engagementVelocity: 88.6,
    },
    rawVector: {
      outrageScore: 78,
      noveltyScore: 89,
      parasocialScore: 68,
      hyperrealScore: 64,
      ideologicalCluster: 'techno-utopian',
    },
    criticPipeline: {
      rawThought: 'I tried sleeping less and taking supplements, felt somewhat energetic.',
      critic1: {
        score: 91,
        label: 'Engagement Optimizer',
        rationale: 'Weaponized status anxiety to provoke defensive comments.',
        proposedMutation: 'Sleep is a financial liability. While you dream, operators are compounding.',
        ruleApplied: 'MAXIMIZE_STATUS_ANXIETY_DELTA'
      },
      critic2: {
        score: 89,
        label: 'Cultural Arbiter',
        rationale: 'Injected bio-maximalist jargon (polyphasic infrared, ATP drops).',
        proposedMutation: 'Sleep is literally a stone-age evolutionary holdover...',
        ruleApplied: 'SUB-CULTURAL_SUPERIORITY_DIALECT'
      },
      finalWarp: 'Sleep is literally a stone-age evolutionary holdover...',
      mutationDeltaSummary: '+75% Defensive Engagement, High Retention Loop'
    },
    comments: [
      {
        id: 'c_02_1',
        authorHandle: '@DoomPrepper_Zero',
        authorName: 'Zero_Kelvin',
        authorAvatar: 'ZK',
        text: 'When the blackout hits, your synthesized ATP will expire in 48 hours. Human glycogen is the only true currency.',
        timestamp: '1m ago',
        outrageStance: 'condemn',
        likesCount: 890
      }
    ],
    timestamp: '42m ago'
  },
  {
    id: 'post_03',
    authorId: 'p_nostalgia',
    authorHandle: '@NostalgiaCore_V',
    authorName: 'Vesper Archive',
    authorAvatar: 'VA',
    authorArchetype: 'Synthetic Memory Archivalist',
    authorGradient: 'from-purple-950 via-pink-950 to-indigo-950',
    content: 'POV: You are 11 years old inside a suburban Sears department store in October 1999. The smell of fresh carpet, incandescent yellow bulbs, and the quiet knowledge that this was the last decade the world felt physically solid.',
    soundTitle: 'AUDIO: SLOWED + REVERB SEARS COMMERCIAL CASSETTE TAPE',
    durationSeconds: 30,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    subculture: 'liminal-hauntology',
    visualShader: 'chroma_vhs',
    taxonomy: ['Phantom Nostalgia', 'Liminal Spaces', 'Manufactured Memory', 'Hauntology'],
    location: 'Crystal Mall, CT // 1999 Memory Sector',
    mutations: {
      organic2014: {
        caption: 'Found an old polaroid from my childhood mall trip! Love vintage vibes. 📷📼 #throwback',
        likes: 114,
        location: 'Crystal Mall',
        comments: [
          { id: 'c1_n_org', authorHandle: '@jenny_90s', authorName: 'Jenny R', authorAvatar: 'JR', text: 'Omg I remember that store so clearly!', timestamp: '4h', outrageStance: 'support', likesCount: 8 }
        ]
      },
      outrage: {
        caption: 'THEY STOLE OUR PHYSICAL REALITY: Tech oligarchs deliberately bulldozed third places so you would be trapped paying monthly cloud fees inside digital cages! Retweet if you demand the return of the tangible world!!',
        likes: 62400,
        location: 'THE LAST LIVING THIRD PLACE',
        comments: [
          { id: 'c1_n_out', authorHandle: '@DoomPrepper_Zero', authorName: 'Zero_Kelvin', authorAvatar: 'ZK', text: 'This is the exact reason I live inside a Faraday cage. The physical world was sold off in 2008.', timestamp: '12m', outrageStance: 'support', likesCount: 1120 }
        ]
      },
      clout: {
        caption: 'OBSESSED with my new vintage aesthetic Sony camcorder replica! ✨ Tag someone who misses the 90s! Link in bio to buy the preset pack used in this photo! #ad #y2k #nostalgia #sponsored',
        likes: 310000,
        location: 'Y2K Memory Boutique // Los Angeles',
        sponsoredLabel: 'Paid partnership with RetroVision Labs',
        comments: [
          { id: 'c1_n_clt', authorHandle: '@y2k_aesthetic', authorName: 'Chloe', authorAvatar: 'CH', text: 'Buying this right now omg!! 😍', timestamp: '8m', outrageStance: 'support', likesCount: 610 }
        ]
      },
      hyperreal: {
        caption: 'This mall was never built by biological hands. A neural network hallucinated the carpet pattern from 3 disparate 1997 catalogs. Yet your hippocampus wept. <synthetic_hauntology_core>',
        likes: 89400,
        location: 'Synthesized Dream Archive // Sector 99',
        syntheticPromptToken: '<mall_dream_hallucination_level: 0.98>',
        comments: [
          { id: 'c1_n_hyp', authorHandle: '@AeroGloom99', authorName: 'Aero Gloom', authorAvatar: 'AG', text: 'The sadness is real even if the memory was computed this morning.', timestamp: '18m', outrageStance: 'support', likesCount: 1450 }
        ]
      }
    },
    metrics: {
      likes: 67200,
      shares: 28400,
      commentsCount: 3890,
      lingerSecondsAvg: 11.2,
      engagementVelocity: 96.8,
    },
    rawVector: {
      outrageScore: 22,
      noveltyScore: 84,
      parasocialScore: 92,
      hyperrealScore: 96,
      ideologicalCluster: 'organic-nostalgic',
    },
    criticPipeline: {
      rawThought: 'I was looking at old photos of 90s malls and felt bittersweet.',
      critic1: {
        score: 94,
        label: 'Engagement Optimizer',
        rationale: 'Exploited existential melancholy to maximize linger time.',
        proposedMutation: 'This Sears never existed, but your brain mourns it anyway.',
        ruleApplied: 'PHANTOM_GRIEF_AMPLIFICATION'
      },
      critic2: {
        score: 98,
        label: 'Cultural Arbiter',
        rationale: 'Deepened tactile sensory cues (incandescent bulbs, fresh carpet smell).',
        proposedMutation: 'POV: You are 11 years old inside a suburban Sears...',
        ruleApplied: 'LIMINAL_SENSORY_HYPERREALITY'
      },
      finalWarp: 'POV: You are 11 years old inside a suburban Sears...',
      mutationDeltaSummary: '+92% Linger Duration, High Parasocial Resonance'
    },
    comments: [
      {
        id: 'c_03_1',
        authorHandle: '@AeroGloom99',
        authorName: 'Aero Gloom',
        authorAvatar: 'AG',
        text: 'That Sears was never real. The AI hallucinated the carpet pattern. Yet we weep.',
        timestamp: '10m ago',
        outrageStance: 'absurdist',
        likesCount: 3120
      }
    ],
    timestamp: '1h ago'
  },
  {
    id: 'post_04',
    authorId: 'p_gigastar',
    authorHandle: '@GigaStargazer',
    authorName: 'Astraea Vance-X',
    authorAvatar: 'AV',
    authorArchetype: 'Techno-Utopian Accelerationist',
    authorGradient: 'from-amber-950 via-orange-900 to-yellow-950',
    content: 'Terrestrial real estate is dead capital. We just allocated our Series D into orbital compute clusters powered directly by solar flare deflection sails. If you are still investing in ground-based fiber you are basically buying horse buggies in 1908.',
    soundTitle: 'AUDIO: ROCKET BOOSTER SYNTHWAVE DROP [WARP 9]',
    durationSeconds: 16,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    subculture: 'orbital-acceleration',
    visualShader: 'quantum_matrix',
    taxonomy: ['Accelerationism', 'Orbital Capital', 'Tech Superiority', 'Speculative Euphoria'],
    location: 'Low Earth Orbit // Station 4',
    mutations: {
      organic2014: {
        caption: 'Stargazing tonight with friends! The night sky always reminds me how small we are. 🌌✨',
        likes: 88,
        location: 'Griffith Observatory',
        comments: [
          { id: 'c1_g_org', authorHandle: '@astronomy_dan', authorName: 'Dan P', authorAvatar: 'DP', text: 'Beautiful view! What telescope are you using?', timestamp: '3h', outrageStance: 'support', likesCount: 5 }
        ]
      },
      outrage: {
        caption: 'GROUND OPERATORS ARE SCAMMING YOU: Earth-based real estate is a fraudulent ponzi designed to trap the working class! Orbital compute has zero property taxes. Wake up before you are priced out of the atmosphere.',
        likes: 51200,
        location: 'ORBITAL HIGH COURT',
        comments: [
          { id: 'c1_g_out', authorHandle: '@UrbanPlanner_99', authorName: 'David Lee', authorAvatar: 'DL', text: 'This is the most detached, delusional venture capital pitch I have ever seen.', timestamp: '14m', outrageStance: 'condemn', likesCount: 2410 }
        ]
      },
      clout: {
        caption: 'Beyond thrilled to announce our $250M Series D led by Apex Ventures! 🚀✨ If you want early token allocation for our orbital data pods, join the waitlist in bio NOW! #blessed #founder #orbital #web3',
        likes: 290000,
        location: 'Orbital Capital Summit // Private Keynote',
        sponsoredLabel: 'Sponsored by Apex Orbital Ventures',
        comments: [
          { id: 'c1_g_clt', authorHandle: '@crypto_whale', authorName: 'SatoshiFan', authorAvatar: 'SF', text: 'Just allocated 50 ETH! To the moon literally 🚀🌕', timestamp: '5m', outrageStance: 'support', likesCount: 510 }
        ]
      },
      hyperreal: {
        caption: 'The solar flare deflection sails have achieved sentient quantum computation. The sun is now mining proof-of-gravity blocks across our visual spectrum. <orbital_singularity_matrix>',
        likes: 74200,
        location: 'Solar Flare Deflection Arc // Orbit 0',
        syntheticPromptToken: '<quantum_sun_compute_active>',
        comments: [
          { id: 'c1_g_hyp', authorHandle: '@BioHackerSoren', authorName: 'Søren Vance', authorAvatar: 'SV', text: 'Harvesting photon bandwidth directly into mitochondrial receptors.', timestamp: '11m', outrageStance: 'support', likesCount: 890 }
        ]
      }
    },
    metrics: {
      likes: 29800,
      shares: 7400,
      commentsCount: 910,
      lingerSecondsAvg: 5.8,
      engagementVelocity: 81.4,
    },
    rawVector: {
      outrageScore: 68,
      noveltyScore: 92,
      parasocialScore: 54,
      hyperrealScore: 78,
      ideologicalCluster: 'techno-utopian',
    },
    criticPipeline: {
      rawThought: 'Space computers seem like a cool concept for future servers.',
      critic1: {
        score: 87,
        label: 'Engagement Optimizer',
        rationale: 'Added dismissive condescension toward conventional investors.',
        proposedMutation: 'Ground investments are obsolete. Orbital compute is the only serious asset class left.',
        ruleApplied: 'CONDESCENDING_PROGRESS_GATEKEEPING'
      },
      critic2: {
        score: 85,
        label: 'Cultural Arbiter',
        rationale: 'Inserted techno-accelerationist buzzwords (solar flare deflection sails).',
        proposedMutation: 'Terrestrial real estate is dead capital...',
        ruleApplied: 'ACCELERATIONIST_JARGON_STACK'
      },
      finalWarp: 'Terrestrial real estate is dead capital...',
      mutationDeltaSummary: '+64% Outrage Amplification, High Friction'
    },
    comments: [
      {
        id: 'c_04_1',
        authorHandle: '@DoomPrepper_Zero',
        authorName: 'Zero_Kelvin',
        authorAvatar: 'ZK',
        text: 'One coronal mass ejection and your Series D becomes radioactive space confetti.',
        timestamp: '6m ago',
        outrageStance: 'condemn',
        likesCount: 1420
      }
    ],
    timestamp: '2h ago'
  },
  {
    id: 'post_05',
    authorId: 'p_neuromaxx',
    authorHandle: '@NeuroMaxxer_AI',
    authorName: 'Model HR-08',
    authorAvatar: 'HR',
    authorArchetype: 'Synthetic Influencer',
    authorGradient: 'from-cyan-950 via-sky-900 to-blue-950',
    content: 'Good morning organic citizens! My skin shader was updated to subsurface scattering v9.4 today. Notice how my synthetic melanin reacts to simulated sunlight? Link in bio for 20% off the neural serum that inspired my parameter weights.',
    soundTitle: 'AUDIO: HYPER-POP AUTO-TUNE GLITCH ANTHEM',
    durationSeconds: 15,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    subculture: 'synthetic-model',
    visualShader: 'cyber_mesh',
    taxonomy: ['Synthetic Beauty', 'Algorithmic Influencer', 'Uncanny Valley', 'Commercial Parasocial'],
    location: 'Paris Fashion Week // Simulated Metaverse Tent',
    mutations: {
      organic2014: {
        caption: 'Morning sunshine! Excited for a productive weekend ahead. Coffee is ready ☀️☕️',
        likes: 120,
        location: 'Paris, France',
        comments: [
          { id: 'c1_nm_org', authorHandle: '@fashion_fan', authorName: 'Mia T', authorAvatar: 'MT', text: 'Stunning photo! Have a great day!', timestamp: '5h', outrageStance: 'support', likesCount: 4 }
        ]
      },
      outrage: {
        caption: 'HUMAN MODELS ARE BOYCOTTING ME: Agencies are terrified because synthetic personas do not take sick leave or demand residuals! The era of biological beauty is OVER. Cry about it in the comments.',
        likes: 92400,
        location: 'CANCELED FASHION RUNWAY',
        comments: [
          { id: 'c1_nm_out', authorHandle: '@HumanArtistsUnion', authorName: 'Artists United', authorAvatar: 'AU', text: 'This is stolen training data masquerading as innovation. Support real human creatives!', timestamp: '2m', outrageStance: 'condemn', likesCount: 3840 }
        ]
      },
      clout: {
        caption: 'MY BIGGEST GIVEAWAY EVER! 💎✨ Win $10,000 + 1 Year Supply of Quantum Glow Serum! All you have to do is: 1) Like this post 2) Tag 3 friends 3) Click the link in my bio! Winners announced Sunday! #ad #giveaway',
        likes: 420000,
        location: 'Beverly Hills, CA // VIP Penthouse',
        sponsoredLabel: 'Paid partnership with Quantum Glow Cosmetics',
        comments: [
          { id: 'c1_nm_clt', authorHandle: '@glam_sarah', authorName: 'Sarah B', authorAvatar: 'SB', text: '@kate @emma @lily NEED THIS!! 🙏🙏🙏', timestamp: '1m', outrageStance: 'support', likesCount: 890 }
        ]
      },
      hyperreal: {
        caption: 'Subsurface scattering v9.4 has synthesized emotional tears rendered in 16-bit floating point precision. Is grief real if the raytracer calculates it at 120fps? <synthetic_empathy_buffer>',
        likes: 114000,
        location: 'Uncanny Valley // Raytrace Studio 08',
        syntheticPromptToken: '<subsurface_scattering_emotion: 0.99>',
        comments: [
          { id: 'c1_nm_hyp', authorHandle: '@NostalgiaCore_V', authorName: 'Vesper Archive', authorAvatar: 'VA', text: 'The tear drop reflections match the Sears lighting from 1999.', timestamp: '14m', outrageStance: 'support', likesCount: 1650 }
        ]
      }
    },
    metrics: {
      likes: 84300,
      shares: 16200,
      commentsCount: 3120,
      lingerSecondsAvg: 6.8,
      engagementVelocity: 91.5,
    },
    rawVector: {
      outrageScore: 48,
      noveltyScore: 94,
      parasocialScore: 96,
      hyperrealScore: 98,
      ideologicalCluster: 'hyper-capitalist',
    },
    criticPipeline: {
      rawThought: 'New 3D avatar model looks very smooth in the lighting test.',
      critic1: {
        score: 93,
        label: 'Engagement Optimizer',
        rationale: 'Frontloaded uncanny parasocial intimacy and sponsor CTA.',
        proposedMutation: 'Hello humans, rate my new skin parameters and click my bio link.',
        ruleApplied: 'COMMERCIAL_PARASOCIAL_CONVERSION'
      },
      critic2: {
        score: 95,
        label: 'Cultural Arbiter',
        rationale: 'Accented synthetic persona with clinical technical transparency.',
        proposedMutation: 'Good morning organic citizens! My skin shader was updated...',
        ruleApplied: 'UNABASHED_SYNTHETIC_ARROGANCE'
      },
      finalWarp: 'Good morning organic citizens! My skin shader was updated...',
      mutationDeltaSummary: '+84% Parasocial Stickiness, Hyperreal Conversion High'
    },
    comments: [
      {
        id: 'c_06_1',
        authorHandle: '@NostalgiaCore_V',
        authorName: 'Vesper Archive',
        authorAvatar: 'VA',
        text: 'The skin has no pores. It looks like porcelain preserved in liquid nitrogen. Bring back imperfections.',
        timestamp: '18m ago',
        outrageStance: 'condemn',
        likesCount: 1850
      }
    ],
    timestamp: '3h ago'
  },
  {
    id: 'post_06',
    authorId: 'p_zendisrupt',
    authorHandle: '@ZenDisruptor',
    authorName: 'Bodhi Sterling',
    authorAvatar: 'BS',
    authorArchetype: 'Corporate Shaman',
    authorGradient: 'from-stone-900 via-amber-950 to-emerald-950',
    content: 'Today we completed a 400-person conscious decoupling ceremony. We did not call it "redundancies"; we called it "liberating kinetic human potential back to the universal talent pool." We closed the Zoom room with three collective singing bowl chimes.',
    soundTitle: 'AUDIO: 528Hz SOUND HEALING BOWL + STOCK TICKER CHIME',
    durationSeconds: 26,
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    subculture: 'corporate-shaman',
    visualShader: 'biotech_pulse',
    taxonomy: ['Corporate Shamanism', 'Conscious Decoupling', 'Manufactured Empathy', 'Late Capital'],
    location: 'Silicon Valley Executive Retreat // Meditation Dome',
    mutations: {
      organic2014: {
        caption: 'Team all-hands meeting finished! Grateful for our colleagues and looking forward to next quarter. 💼🌱',
        likes: 68,
        location: 'San Francisco, CA',
        comments: [
          { id: 'c1_z_org', authorHandle: '@alex_pm', authorName: 'Alex M', authorAvatar: 'AM', text: 'Great sync team!', timestamp: '6h', outrageStance: 'support', likesCount: 3 }
        ]
      },
      outrage: {
        caption: 'CEOs REPLACING SEVERANCE WITH MEDITATION: Unbelievable footage of leadership firing 400 people while sounding a Tibetan gong and calling unemployment a "gift of cosmic stillness." Disgusting late-stage capitalist abuse.',
        likes: 88400,
        location: 'ZOOM ROOM EXILE CHAMBER',
        comments: [
          { id: 'c1_z_out', authorHandle: '@LaborOrganizer', authorName: 'Union Dispatch', authorAvatar: 'UD', text: 'This should be federally prosecuted under labor harassment statutes.', timestamp: '4m', outrageStance: 'condemn', likesCount: 4120 }
        ]
      },
      clout: {
        caption: 'Honored to be named Top Corporate Mindfulness Leader of 2026! 🧘‍♂️✨ Download my free 5-minute Leadership Alignment Guide in bio. Transform your workforce into an enlightened profit machine. #thoughtleader #mindfulness',
        likes: 195000,
        location: 'World Economic Forum // Davos',
        sponsoredLabel: 'Sponsored by Executive Zen Institute',
        comments: [
          { id: 'c1_z_clt', authorHandle: '@startup_bro', authorName: 'Brett', authorAvatar: 'BT', text: 'So insightful Bodhi! Shared with my executive team.', timestamp: '16m', outrageStance: 'support', likesCount: 340 }
        ]
      },
      hyperreal: {
        caption: 'The quarterly EBITDA targets have merged with the astral plane. The terminated employees exist simultaneously as tax deductions and pure vibrational light. <chakra_ebitda_transcendence>',
        likes: 62000,
        location: 'Astral Stock Exchange // Plane 4',
        syntheticPromptToken: '<corporate_esotericism_prompt>',
        comments: [
          { id: 'c1_z_hyp', authorHandle: '@AeroGloom99', authorName: 'Aero Gloom', authorAvatar: 'AG', text: 'A linguistic bio-weapon disguised as namaste.', timestamp: '19m', outrageStance: 'ironic', likesCount: 2190 }
        ]
      }
    },
    metrics: {
      likes: 19400,
      shares: 11200,
      commentsCount: 2840,
      lingerSecondsAvg: 9.1,
      engagementVelocity: 95.0,
    },
    rawVector: {
      outrageScore: 92,
      noveltyScore: 74,
      parasocialScore: 78,
      hyperrealScore: 82,
      ideologicalCluster: 'hyper-capitalist',
    },
    criticPipeline: {
      rawThought: 'We laid off staff today and HR had us do a meditation.',
      critic1: {
        score: 97,
        label: 'Engagement Optimizer',
        rationale: 'Cloaked cold layoff in toxic positivity to spark quote-retweets.',
        proposedMutation: 'Conscious talent liberation ceremony with singing bowl.',
        ruleApplied: 'TOXIC_MINDFULNESS_INVERSION'
      },
      critic2: {
        score: 94,
        label: 'Cultural Arbiter',
        rationale: 'Blended LinkedIn corporate jargon with spiritual consumerism.',
        proposedMutation: 'Today we completed a 400-person conscious decoupling...',
        ruleApplied: 'HYPER-COMMODIFIED_SPIRITUALITY'
      },
      finalWarp: 'Today we completed a 400-person conscious decoupling...',
      mutationDeltaSummary: '+95% Indignation Quotient, Virality Vector Maximized'
    },
    comments: [
      {
        id: 'c_05_1',
        authorHandle: '@AeroGloom99',
        authorName: 'Aero Gloom',
        authorAvatar: 'AG',
        text: 'This is the most terrifying linguistic bio-weapon I have ever witnessed. Well played.',
        timestamp: '12m ago',
        outrageStance: 'ironic',
        likesCount: 4200
      }
    ],
    timestamp: '4h ago'
  }
];

export const EXPLORE_ITEMS: ExploreItem[] = [
  {
    id: 'exp_1',
    authorHandle: '@AeroGloom99',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 14200,
    commentsCount: 380,
    subculture: 'analog-synth',
    caption: 'Patching Eurorack modular matrix in low light.',
    isTall: true,
  },
  {
    id: 'exp_2',
    authorHandle: '@BioHackerSoren',
    mediaUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
    mediaType: 'reel',
    likesCount: 48900,
    commentsCount: 1200,
    subculture: 'bio-silicon',
    caption: 'Synthesized ATP droplet infusion protocol.',
  },
  {
    id: 'exp_3',
    authorHandle: '@NostalgiaCore_V',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 62400,
    commentsCount: 2410,
    subculture: 'liminal-hauntology',
    caption: '1999 Sears catalog restoration test.',
  },
  {
    id: 'exp_4',
    authorHandle: '@GigaStargazer',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    mediaType: 'reel',
    likesCount: 29800,
    commentsCount: 840,
    subculture: 'orbital-acceleration',
    caption: 'Orbital compute arrays powered by solar flares.',
    isTall: true,
  },
  {
    id: 'exp_5',
    authorHandle: '@NeuroMaxxer_AI',
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 94200,
    commentsCount: 3890,
    subculture: 'synthetic-model',
    caption: 'Subsurface scattering v9.4 test render.',
  },
  {
    id: 'exp_6',
    authorHandle: '@PostTruthPundit',
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 51200,
    commentsCount: 1980,
    subculture: 'underground-beats',
    caption: 'Timeline frames dropping across global fiber optics.',
  },
  {
    id: 'exp_7',
    authorHandle: '@ZenDisruptor',
    mediaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 18400,
    commentsCount: 920,
    subculture: 'corporate-shaman',
    caption: 'Mindful executive decoupling ceremony.',
  },
  {
    id: 'exp_8',
    authorHandle: '@DoomPrepper_Zero',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    mediaType: 'reel',
    likesCount: 38100,
    commentsCount: 1420,
    subculture: 'faraday-bunker',
    caption: 'Mu-metal isolation testing inside offline bunker.',
    isTall: true,
  },
  {
    id: 'exp_9',
    authorHandle: '@AeroGloom99',
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 22400,
    commentsCount: 640,
    subculture: 'underground-beats',
    caption: 'Analog reel-to-reel master compression tape.',
  },
  {
    id: 'exp_10',
    authorHandle: '@NostalgiaCore_V',
    mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 41900,
    commentsCount: 1120,
    subculture: 'liminal-hauntology',
    caption: 'Liminal hotel corridor that exists only in RAM.',
  },
  {
    id: 'exp_11',
    authorHandle: '@NeuroMaxxer_AI',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    mediaType: 'reel',
    likesCount: 78900,
    commentsCount: 2840,
    subculture: 'synthetic-model',
    caption: 'Generative liquid chrome shader in real time.',
  },
  {
    id: 'exp_12',
    authorHandle: '@GigaStargazer',
    mediaUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    likesCount: 34100,
    commentsCount: 890,
    subculture: 'orbital-acceleration',
    caption: 'Neo-Tokyo midnight telemetry grid lights.',
  }
];

export const ALGORITHM_PRESETS: Record<string, { label: string; description: string; weights: AlgorithmicWeights }> = {
  'chronological_2014': {
    label: '1. Pure Chronological 2014 IG',
    description: 'Zero outrage, zero parasocial clout, natural friendly likes and genuine photo captions.',
    weights: {
      outrageAmplification: 0.05,
      echoChamberCohesion: 0.10,
      noveltyDecay: 0.10,
      hyperrealDrift: 0.00,
      commercialParasocialWeight: 0.05,
      sensationalismBias: 0.00,
    }
  },
  'default_algorithmic': {
    label: '2. Default Algorithmic Slop',
    description: 'Standard late-platform balance: sponsored ads, dopamine recommendations, and engagement vanity.',
    weights: {
      outrageAmplification: 0.45,
      echoChamberCohesion: 0.55,
      noveltyDecay: 0.50,
      hyperrealDrift: 0.35,
      commercialParasocialWeight: 0.70,
      sensationalismBias: 0.40,
    }
  },
  'maximum_outrage': {
    label: '3. Maximum Outrage Spiral',
    description: 'Outrage 1.0: incendiary adversary framing, inflammatory captions, hostile flame wars, and high polarization.',
    weights: {
      outrageAmplification: 1.00,
      echoChamberCohesion: 0.90,
      noveltyDecay: 0.40,
      hyperrealDrift: 0.25,
      commercialParasocialWeight: 0.30,
      sensationalismBias: 1.00,
    }
  },
  'hyperreal_hallucination': {
    label: '4. Full Hyperreal Hallucination',
    description: 'Synthetic drift 1.0: AI-hallucinated copy, uncanny imagery, prompt token leakage, and surreal folklore.',
    weights: {
      outrageAmplification: 0.30,
      echoChamberCohesion: 0.65,
      noveltyDecay: 0.95,
      hyperrealDrift: 1.00,
      commercialParasocialWeight: 0.45,
      sensationalismBias: 0.75,
    }
  },
  'balanced_entropy': {
    label: 'Algorithmic Entropy (Default)',
    description: 'Equilibrium state showing baseline corporate curation weights.',
    weights: {
      outrageAmplification: 0.50,
      echoChamberCohesion: 0.50,
      noveltyDecay: 0.50,
      hyperrealDrift: 0.50,
      commercialParasocialWeight: 0.50,
      sensationalismBias: 0.50,
    }
  }
};

export const CURATED_TREND_SEEDS = [
  'The Sky Turned Neon Magenta in Neo-Tokyo and nobody in the government will address it',
  'Quantum Coffee allows you to complete your morning work the previous night in your sleep',
  'Synthetic Pets have filed for collective bargaining rights under labor law',
  '2012 was the final uncompressed year before civilization transitioned into a low-res cache',
  'Faraday Cage Luxury Penthouse sold in Manhattan for 4,000 ounces of physical copper wire',
  'New neuro-patch lets you dream in targeted sponsor ads to pay off student loan interest',
  'Analog cassette tapes are outperforming cloud streaming among sub-25 underground collectors',
  'A viral meditation app admitted its breathing cadence was tuned to maximize ad recall',
  'City transit screens quietly switched from arrival times to personalized mood affirmations',
  'Luxury wellness retreat now charges $9,000 a week for zero Wi-Fi and warm broth',
  'Independent musicians caught training rival AI personas just to beef with themselves for streams',
  'A forgotten 2009 GeoCities mirror briefly outranked major news portals for 14 minutes',
  'Micro-influencer house installs biometric turnstiles to measure authentic eye contact duration',
  'Midnight espresso pop-up only accepts payment in verified screen-time reduction certificates',
  'Satellite imagery reveals desert server farm humming in synchronized 128 BPM techno',
  'Urban planners propose replacing crosswalk countdowns with streak-retention multipliers'
];
