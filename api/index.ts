import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// Set API key if not in env
if (!process.env.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = "AIzaSyCyRCjpY-fEeYiYwMMS0BOze-BEAxJqv1I";
}

// AI Generation Route
app.post("/api/gemini-generate", async (req, res) => {
  try {
    const { tool, input } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!tool || !input) {
      return res.status(400).json({ error: "Missing tool or input" });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey as string });
    
    let prompt = `You are an expert digital marketing assistant. Generate useful, practical, business-friendly suggestions. Be confident, clear, and professional. Keep results actionable and easy to send on WhatsApp. Do not include markdown formatting.\n\n`;
    prompt += `Tool: ${tool}\nInputs:\n${JSON.stringify(input, null, 2)}\n\n`;
    
    const formats: Record<string, string> = {
      WebsiteCostCalculator: `{ "recommendedPackage": "Stater Website...", "estimatedPriceRange": "₹4,999 - ₹7,999", "featureSuggestions": ["...", "..."], "timelineSuggestion": "...", "bestPackageExplanation": "...", "upsellSuggestion": "..." }`,
      WebsiteAuditTool: `{ "auditScore": "75/100", "designIssues": ["..."], "seoIssues": ["..."], "speedSuggestions": ["..."], "mobileSuggestions": ["..."], "trustImprovementSuggestions": ["..."], "ctaImprovementSuggestions": ["..."], "dezoRecommendation": "..." }`,
      SEOMetaGenerator: `{ "title": "SEO Title < 60 chars", "description": "SEO Description < 160 chars", "keywords": ["..."], "h1": "...", "h2Suggestions": ["..."], "urlSlug": "...", "ogTitle": "...", "ogDescription": "...", "faqIdeas": ["..."] }`,
      HeadlineGenerator: `{ "headlines": ["...", "..."], "subheadings": ["...", "..."], "ctaIdeas": ["...", "..."], "heroStructure": "...", "recommendedHeadline": "..." }`,
      MetaAdsCopyGenerator: `{ "headlines": ["...", "..."], "primaryTexts": ["...", "..."], "ctaLines": ["...", "..."], "landingPageRecommendation": "...", "creativeAngles": ["..."], "targetingIdeas": ["..."], "disclaimer": "..." }`,
      BlogIdeaGenerator: `{ "ideas": [{ "title": "...", "keywords": ["..."], "metaDescription": "...", "contentAngle": "...", "faqIdeas": ["..."], "ctaLines": ["..."], "localSEOSuggestions": ["..."] }] }`,
      BusinessNameGenerator: `{ "names": ["...", "..."], "taglines": ["...", "..."], "domainSuggestions": ["...", "..."], "instagramBio": "...", "brandPositioning": "..." }`,
      InstagramBioGenerator: `{ "bios": ["...", "..."], "highlightNames": ["...", "..."], "ctaLines": ["...", "..."], "hashtags": ["...", "..."], "profileTips": ["...", "..."] }`,
      GoogleRankingChecklist: `{ "categories": [{ "name": "Core SEO", "tasks": ["...", "..."] }, { "name": "Technical", "tasks": ["...", "..."] }] }`,
      MetaAdsBudgetCalculator: `{ "suggestedDailyBudget": "...", "estimatedLeadRange": "...", "landingPageRequirements": ["..."], "creativeRecommendations": ["..."], "funnelSuggestions": ["..."], "budgetWarning": "...", "disclaimer": "..." }`
    };

    if (formats[tool]) {
      prompt += `Output format (JSON ONLY): ${formats[tool]}`;
    } else {
      prompt += `Output format: Valid JSON representing the result of the tool.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    const jsonResult = JSON.parse(text);
    res.json(jsonResult);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal AI Server Error" });
  }
});

// News API for the Radar
app.get("/api/news", (req, res) => {
  const news = [
    { id: Date.now() + 1, title: 'Google updates Search Algorithm globally.', category: 'SEO', source: 'Search Engine Land', time: new Date().toISOString(), url: 'https://searchengineland.com' },
    { id: Date.now() + 2, title: 'Meta Ads introduces lower CPA targeting features for local businesses.', category: 'Social Ads', source: 'Social Media Today', time: new Date(Date.now() - 1800000).toISOString(), url: 'https://socialmediatoday.com' },
    { id: Date.now() + 3, title: 'Next.js 15 update: Improved server actions and faster builds.', category: 'Web Dev', source: 'Vercel', time: new Date(Date.now() - 3600000).toISOString(), url: 'https://nextjs.org' },
    { id: Date.now() + 4, title: 'Instagram Bio strategies that are converting 30% better in 2026.', category: 'Strategy', source: 'Marketing Brew', time: new Date(Date.now() - 7200000).toISOString(), url: 'https://marketingbrew.com' },
    { id: Date.now() + 5, title: 'Why mobile-first design is still the #1 priority for Google rankings.', category: 'SEO', source: 'Google Blog', time: new Date(Date.now() - 10800000).toISOString(), url: 'https://blog.google' }
  ];
  res.json(news.sort(() => Math.random() - 0.5));
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
