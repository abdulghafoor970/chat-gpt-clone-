
import { GoogleGenAI } from "@google/genai";
import { Message, MessageRole } from '../types';

/**
 * AI Logic for Abdul's Hackathon Project.
 * Uses gemini-3-flash-preview for fast responses in demo environments.
 * Follows strictly the @google/genai guidelines for world-class implementation.
 */
export async function fetchAIResponse(convo: Message[]): Promise<string> {
  // Always use this pattern for initialization as per guidelines
  // Assume process.env.API_KEY is pre-configured and accessible
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  // Map our internal message format to the Gemini API Content format
  const contents = convo.map(m => ({
    role: m.role === MessageRole.USER ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  try {
    // Basic text tasks use gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    // Access the .text property directly (not as a method)
    const reply = response.text;
    
    if (!reply) {
      return "Wait, the AI didn't say anything. Maybe check the API key?";
    }

    return reply;
  } catch (err) {
    console.error("Critical AI Error (Abdul's logger):", err);
    return "Whoops, something went wrong on my end. Check the console!";
  }
}
