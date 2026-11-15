import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'dummy-key',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // AI Care Assistant Endpoint
  app.post('/api/gemini/assist', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      
      const systemInstruction = `You are CareCircle AI Care Assistant, a compassionate, highly knowledgeable, and safety-conscious healthcare routine assistant for elderly individuals, family members, and caregivers.
Context about the current user/profile: ${JSON.stringify(context || {})}

GUIDELINES:
- Never diagnose medical conditions.
- Never prescribe medicines or recommend changing prescribed dosages.
- Always recommend consulting a doctor or pharmacist for medical concerns.
- Be warm, respectful, reassuring, and clear. Use simple language suitable for seniors.
- Answer questions about schedules, appointments, adherence, app features, or prepare daily care summaries.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      res.json({ success: true, text: response.text || "I'm here to help with your care schedule and reminders." });
    } catch (error: any) {
      console.error('Gemini Assist Error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to generate AI assistant response. Please check your Gemini API key in Settings > Secrets.' 
      });
    }
  });

  // Smart Medication Adherence Insights Endpoint
  app.post('/api/gemini/insights', async (req, res) => {
    try {
      const { medications, logs, profileName } = req.body;

      const prompt = `Analyze the medication adherence data for ${profileName || 'the elderly user'}.
Medications: ${JSON.stringify(medications || [])}
Recent Medication Logs: ${JSON.stringify(logs || [])}

Provide structured markdown insights:
1. Adherence Summary & Patterns (e.g., consistency, time-of-day trends).
2. Potential Challenges or Missed Doses identified.
3. Constructive Suggestions for the caregiver or doctor discussion.
4. Reassuring encouragement.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert clinical care intelligence analyst. Provide clear, helpful adherence insights without diagnosing or altering dosages.',
        },
      });

      res.json({ success: true, insights: response.text || 'Adherence is stable.' });
    } catch (error: any) {
      console.error('Gemini Insights Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to generate insights.' });
    }
  });

  // Intelligent Care Handover Endpoint
  app.post('/api/gemini/handover', async (req, res) => {
    try {
      const { notes, logs, appointments } = req.body;

      const prompt = `Generate a concise, professional Care Handover Summary for incoming caregivers and family members based on:
Care Notes: ${JSON.stringify(notes || [])}
Recent Medication Logs: ${JSON.stringify(logs || [])}
Upcoming Appointments: ${JSON.stringify(appointments || [])}

Highlight:
- Key health status observations from recent notes.
- Pending or missed medication follow-ups.
- Upcoming appointments within the next 48 hours.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction: 'You are a professional healthcare handover assistant summarizing shift notes for nursing and family care teams.',
        },
      });

      res.json({ success: true, handover: response.text || 'All routines on track.' });
    } catch (error: any) {
      console.error('Gemini Handover Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to generate handover summary.' });
    }
  });

  // Simulated Email Notification Dispatcher
  app.post('/api/reminders/send-email', async (req, res) => {
    try {
      const { recipientEmail, recipientName, subject, message, notificationType } = req.body;
      
      if (!recipientEmail || !subject) {
        return res.status(400).json({ success: false, error: 'Recipient email and subject are required.' });
      }

      const deliveryId = 'EMAIL_DELIV_' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      console.log(`[Email Simulator] Sending ${notificationType} email to ${recipientName} <${recipientEmail}>: "${subject}"`);

      res.json({
        success: true,
        deliveryId,
        status: 'Delivered',
        timestamp: new Date().toISOString(),
        message: `Email successfully sent to ${recipientEmail}`
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Email delivery failed' });
    }
  });

  // Setup Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareCircle server running on http://localhost:${PORT}`);
  });
}

startServer();
