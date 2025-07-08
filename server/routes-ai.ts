import type { Express } from "express";
import OpenAI from "openai";

// Only initialize OpenAI if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export function registerAIRoutes(app: Express) {
  // AI Chat endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, language, systemPrompt, context } = req.body;

      if (!openai) {
        return res.status(503).json({ 
          error: "AI service not available",
          fallback: true
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: systemPrompt || `You are an AI assistant for Kru English, an online English learning platform. Respond helpfully and professionally in ${language === 'th' ? 'Thai' : 'English'}.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at this time.";

      res.json({
        response: aiResponse,
        language,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({ 
        error: "Failed to generate AI response",
        message: error.message,
        fallback: true
      });
    }
  });

  // AI course recommendations
  app.post("/api/ai/recommend-course", async (req, res) => {
    try {
      const { level, goals, experience, language } = req.body;

      if (!openai) {
        return res.status(503).json({ 
          error: "AI service not available",
          fallback: true
        });
      }

      const prompt = language === 'th' 
        ? `ผู้เรียนมีระดับภาษาอังกฤษ: ${level}, เป้าหมาย: ${goals}, ประสบการณ์: ${experience}
           แนะนำคอร์สที่เหมาะสม จากคอร์สต่อไปนี้:
           1. General English (390฿) - พื้นฐานทั่วไป
           2. CEFR Platinum (790฿) - เตรียมสอบระดับสากล
           3. Combo Small Group (1,390฿) - กลุ่มเล็กเข้มข้น
           ตอบเป็นภาษาไทยและอธิบายเหตุผล`
        : `Student has English level: ${level}, goals: ${goals}, experience: ${experience}
           Recommend the most suitable course from:
           1. General English (390 THB) - General foundation
           2. CEFR Platinum (790 THB) - International exam preparation
           3. Combo Small Group (1,390 THB) - Intensive small groups
           Respond in English with reasoning.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an educational advisor for Kru English. Provide personalized course recommendations based on student needs."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      res.json({
        recommendation: response.choices[0]?.message?.content,
        language,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('AI Recommendation Error:', error);
      res.status(500).json({ 
        error: "Failed to generate course recommendation",
        message: error.message
      });
    }
  });

  // AI level assessment
  app.post("/api/ai/assess-level", async (req, res) => {
    try {
      const { answers, language } = req.body;

      if (!openai) {
        return res.status(503).json({ 
          error: "AI service not available",
          fallback: true
        });
      }

      const prompt = language === 'th'
        ? `ประเมินระดับภาษาอังกฤษจากคำตอบต่อไปนี้: ${JSON.stringify(answers)}
           ให้ระดับ A1, A2, B1, หรือ B2 พร้อมคำอธิบายและคำแนะนำการเรียนต่อ
           ตอบเป็นภาษาไทย`
        : `Assess English level from these answers: ${JSON.stringify(answers)}
           Provide level A1, A2, B1, or B2 with explanation and learning recommendations.
           Respond in English.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an English level assessment expert. Analyze answers and provide accurate CEFR level assessment."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.5,
      });

      res.json({
        assessment: response.choices[0]?.message?.content,
        language,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('AI Assessment Error:', error);
      res.status(500).json({ 
        error: "Failed to assess level",
        message: error.message
      });
    }
  });
}