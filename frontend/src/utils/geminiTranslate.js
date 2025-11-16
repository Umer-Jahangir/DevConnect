// utils/geminiTranslate.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export const translateText = async (text, targetLang) => {
  const prompt = `Translate the following text into ${targetLang} . Return only the translation like google translator, no explanations and not other things etc:\n"${text}"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
};
