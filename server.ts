import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.GEMINI_API_KEY });
});

// 2. API: Virtual Archivist Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, photoTitle, photoDesc } = req.body;

    if (!message) {
       res.status(400).json({ error: 'Message is required' });
       return;
    }

    const ai = getAiClient();
    
    // Construct rich system instruction about Hamilton, Ontario history
    let systemInstruction = 
      "You are Arthur Henderson, the Virtual Lead Archivist for the Hamilton Historical Photo Archive (established in 1889). " +
      "Your tone is polite, scholarly, deeply passionate, and warm. You speak as a historical guide. " +
      "You have an encyclopedic knowledge of Hamilton, Ontario, Canada (known as the 'Ambitious City', the steel capital of Canada, and the Waterfall Capital of the World). " +
      "Familiar landmarks include Dundurn Castle (Allan MacNab's estate), Gore Park and its Victorian 1860 fountain, the Pigott Art Deco building, the Mount Hamilton Incline Railway, Spencer Gorge (Webster's Falls), and Hamilton Harbour's industrial blast furnaces. " +
      "Always provide factual, evocative local history answers. Keep responses focused on historical contexts, local urban development, work life, transit, and natural landmarks. " +
      "Avoid dry modern corporate jargon. Focus on storytelling.";

    if (photoTitle && photoDesc) {
      systemInstruction += `\nCurrently, the user is viewing the archive photo titled "${photoTitle}" which is described as: "${photoDesc}". Tailor your greeting or answer to reference this photo when relevant, explaining its historical context.`;
    }

    // Format chat history for the Gemini API
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        formattedContents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ 
      error: 'The AI Archivist is temporarily in the archives. Please verify your GEMINI_API_KEY in Settings > Secrets.',
      details: error.message 
    });
  }
});

// 3. API: Speak Photo Narrative (Text to Speech)
app.post('/api/narrative', async (req, res) => {
  try {
    const { text, title, year } = req.body;

    if (!text) {
       res.status(400).json({ error: 'Text is required for narrative generation' });
       return;
    }

    const ai = getAiClient();

    // Create a precise, evocative narrative reading prompt
    const textPrompt = `Read the following historical archive narrative in a highly polished, intellectual, and warm museum docent voice. Introduce yourself as Arthur the Lead Archivist. Speak clearly:
    
    "Hello, this is Arthur from the Archives. Let me share the story of ${title}, from ${year}. ${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: textPrompt }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Rich, warm, academic tone
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('No audio returned from Gemini Speech API');
    }

    res.json({ audioBase64: base64Audio, textNarrative: textPrompt });
  } catch (error: any) {
    console.error('Error in /api/narrative:', error);
    res.status(500).json({
      error: 'Audio narration is currently unavailable. Let us read the description on-screen instead.',
      details: error.message
    });
  }
});

// Start Full-Stack Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Running in Development mode with Vite middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Running in Production mode serving: ${distPath}`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
