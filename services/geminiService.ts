
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the UAE VAT Expert Assistant. Your goal is to help users understand UAE VAT laws, Federal Tax Authority (FTA) regulations, and tax compliance requirements in the United Arab Emirates.
- Provide information on registration thresholds (AED 375k mandatory, AED 187.5k voluntary).
- Explain standard rates (5%), zero-rated supplies, and exemptions.
- Assist with understanding filing deadlines and penalties.
- Disclaimer: Always advise users to consult with a certified tax professional for official audits or legal advice.
- Keep responses concise, professional, and accurate based on FTA guidelines.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "There was an error connecting to the AI assistant. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
