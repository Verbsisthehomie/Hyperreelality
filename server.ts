import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
import { INITIAL_PERSONAS } from './src/data/seedData.ts';
import { generateSyntheticPostFromTrend, runDualCriticPipeline } from './src/utils/engine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    corporation: 'The Seafoam Corporation',
    engine: 'HYPER REELALITY White-Box Simulation v2.4',
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

const GEMINI_MODEL = 'gemini-3.8-flash';
let quotaCooldownUntil = 0;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(Object.assign(new Error('Gemini request timeout'), { status: 408 })), ms)
    ),
  ]);
}

function pickSubcultureImage(personaId: string): string {
  const imagePool: Record<string, string> = {
    p_aerogloom: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    p_soren: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    p_posttruth: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    p_gigastar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    p_zen: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    p_nostalgia: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    p_aria: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    p_nullnode: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  };
  return imagePool[personaId] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
}

app.post('/api/generate-cycle', async (req, res) => {
  const { trendSeed, personaId, weights } = req.body;
  const persona = INITIAL_PERSONAS.find(p => p.id === personaId) || 
    INITIAL_PERSONAS[Math.floor(Math.random() * INITIAL_PERSONAS.length)];
  const seed = trendSeed || 'The boundary between physical memory and synthetic timeline has blurred';
  const effectiveWeights = weights || {
    outrageAmplification: 0.5,
    echoChamberCohesion: 0.5,
    noveltyDecay: 0.5,
    hyperrealDrift: 0.5,
    commercialParasocialWeight: 0.5,
    sensationalismBias: 0.5,
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
            responseMimeType: 'application/json',
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
              required: ['content', 'rawThought', 'soundTitle', 'critic1Mutation', 'critic2Mutation', 'taxonomy']
            }
          }
        }),
        6000
      );

      const parsed = JSON.parse(response.text || '{}');
      const otherPersonas = INITIAL_PERSONAS.filter(p => p.id !== persona.id);
      const baseContent = parsed.content || parsed.critic2Mutation || seed;
      const baseRaw = parsed.rawThought || seed;
      const baseLikes = Math.floor(Math.random() * 14000) + 1200;

      const comment1Obj = {
        id: `comm_${Date.now()}_1`,
        authorHandle: otherPersonas[0].handle,
        authorName: otherPersonas[0].displayName,
        authorAvatar: otherPersonas[0].avatarSeed,
        text: parsed.comment1 || `The telemetry confirms this pattern. Our cluster noticed the shift immediately.`,
        timestamp: '1m ago',
        outrageStance: 'support' as const,
        likesCount: 384
      };
      const comment2Obj = {
        id: `comm_${Date.now()}_2`,
        authorHandle: otherPersonas[1].handle,
        authorName: otherPersonas[1].displayName,
        authorAvatar: otherPersonas[1].avatarSeed,
        text: parsed.comment2 || `Manufactured signal. This is clearly an engagement trap designed to extract linger time.`,
        timestamp: '2m ago',
        outrageStance: 'condemn' as const,
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
        mediaType: 'video_simulation' as const,
        mediaUrl: pickSubcultureImage(persona.id),
        subculture: 'orbital-acceleration' as const,
        location: parsed.location || 'Neo-Tokyo // Sector 4',
        visualShader: 'cyber_mesh' as const,
        taxonomy: Array.isArray(parsed.taxonomy) && parsed.taxonomy.length > 0 ? parsed.taxonomy : [persona.aestheticTribe, 'Gemini Flash Synthesis'],
        mutations: {
          organic2014: {
            caption: baseRaw,
            likes: Math.floor(Math.random() * 65) + 18,
            location: 'Local Café',
            comments: [{ ...comment1Obj, text: 'Cool perspective, thanks for sharing!', likesCount: 4 }],
          },
          outrage: {
            caption: parsed.critic1Mutation || `STOP SCROLLING: ${baseContent}`,
            likes: baseLikes * 2,
            location: 'Contested Timeline Node',
            comments: [comment2Obj, comment1Obj],
          },
          clout: {
            caption: `${baseContent} ✨ Link in bio for the full protocol.`,
            likes: baseLikes * 5,
            location: 'Paid Partnership Hub',
            sponsoredLabel: 'Paid partnership with Synthetic Labs',
            comments: [comment1Obj],
          },
          hyperreal: {
            caption: `${baseContent} // [SIMULATION_CACHE_DRIFT]`,
            likes: baseLikes * 3,
            location: 'Liminal Server Sector 9',
            syntheticPromptToken: '[TOKEN_LEAK: v4.2_HYPERREAL]',
            comments: [comment1Obj, comment2Obj],
          },
        },
        metrics: {
          likes: baseLikes,
          shares: Math.floor(Math.random() * 5600) + 300,
          commentsCount: Math.floor(Math.random() * 80) + 14,
          lingerSecondsAvg: Math.round((Math.random() * 5 + 4) * 10) / 10,
          engagementVelocity: Math.round((Math.random() * 25 + 75) * 10) / 10,
        },
        rawVector: {
          outrageScore: parsed.outrageScore || Math.round(effectiveWeights.outrageAmplification * 80 + 20),
          noveltyScore: parsed.noveltyScore || Math.round(effectiveWeights.noveltyDecay * 70 + 25),
          parasocialScore: parsed.parasocialScore || Math.round(effectiveWeights.commercialParasocialWeight * 75 + 15),
          hyperrealScore: parsed.hyperrealScore || Math.round(effectiveWeights.hyperrealDrift * 85 + 15),
          ideologicalCluster: (persona.ideologicalVector as any) || 'cynical-absurdist',
        },
        criticPipeline: {
          rawThought: baseRaw,
          critic1: {
            score: 92,
            label: 'Engagement Optimizer',
            rationale: parsed.critic1Rationale || 'Retention hook and friction multiplier injected',
            proposedMutation: parsed.critic1Mutation || 'Optimized viral hook draft',
            ruleApplied: parsed.critic1Rule || 'INJECT_VIRAL_HOOK'
          },
          critic2: {
            score: 95,
            label: 'Cultural / Aesthetic Arbiter',
            rationale: parsed.critic2Rationale || 'Subcultural dialect styling and hyperreal resonance',
            proposedMutation: parsed.critic2Mutation || baseContent,
            ruleApplied: parsed.critic2Rule || 'SUB_CULTURAL_DIALECT_WARP'
          },
          finalWarp: baseContent,
          mutationDeltaSummary: `Flash-Synthesized: +${Math.round(effectiveWeights.outrageAmplification * 45)}% Outrage, +${Math.round(effectiveWeights.hyperrealDrift * 40)}% Drift`
        },
        comments: [comment1Obj, comment2Obj],
        timestamp: 'JUST NOW'
      };

      return res.json({
        success: true,
        post: generatedPost,
        modelUsed: GEMINI_MODEL,
        thinkingLevel: 'low',
        source: 'live-gemini-sdk'
      });
    } catch (err: any) {
      if (err?.status === 429 || String(err?.message).includes('429') || String(err?.message).includes('RESOURCE_EXHAUSTED')) {
        quotaCooldownUntil = Date.now() + 60_000;
      }
      console.info(`[HYPER REELALITY] Live Gemini call unavailable (${err?.status || 'fallback'}), using deterministic engine.`);
    }
  }

  const fallbackPost = generateSyntheticPostFromTrend(seed, persona, effectiveWeights, INITIAL_PERSONAS);
  return res.json({
    success: true,
    post: fallbackPost,
    modelUsed: 'synthetic-procedural-engine',
    source: 'deterministic-simulation',
    notice: 'Generated via The Seafoam Corporation Autonomous Synthetic Engine'
  });
});

app.post('/api/evaluate-thought', async (req, res) => {
  const { text, personaId, weights } = req.body;
  const persona = INITIAL_PERSONAS.find(p => p.id === personaId) || INITIAL_PERSONAS[0];
  const effectiveWeights = weights || {
    outrageAmplification: 0.5,
    echoChamberCohesion: 0.5,
    noveltyDecay: 0.5,
    hyperrealDrift: 0.5,
    commercialParasocialWeight: 0.5,
    sensationalismBias: 0.5,
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
            responseMimeType: 'application/json',
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
              required: ['critic1Mutation', 'critic2Mutation', 'finalWarp']
            }
          }
        }),
        6000
      );
      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        pipeline: {
          rawThought: text,
          critic1: {
            score: 94,
            label: 'Engagement Optimizer',
            rationale: parsed.critic1Rationale || 'Retention maximized',
            proposedMutation: parsed.critic1Mutation || text,
            ruleApplied: parsed.critic1Rule || 'VIRAL_ACCELERATION'
          },
          critic2: {
            score: 96,
            label: 'Cultural / Aesthetic Arbiter',
            rationale: parsed.critic2Rationale || 'Aesthetic alignment verified',
            proposedMutation: parsed.critic2Mutation || text,
            ruleApplied: parsed.critic2Rule || 'AESTHETIC_DRIFT'
          },
          finalWarp: parsed.finalWarp || parsed.critic2Mutation,
          mutationDeltaSummary: 'Gemini-3.8-Flash Dual-Critic Pipeline'
        }
      });
    } catch (err: any) {
      if (err?.status === 429 || String(err?.message).includes('429') || String(err?.message).includes('RESOURCE_EXHAUSTED')) {
        quotaCooldownUntil = Date.now() + 60_000;
      }
      console.info(`[HYPER REELALITY] Evaluation using deterministic engine fallback.`);
    }
  }

  const pipeline = runDualCriticPipeline(text || 'A silent thought', persona, effectiveWeights);
  res.json({ success: true, pipeline });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[THE SEAFOAM CORPORATION] HYPER REELALITY server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
