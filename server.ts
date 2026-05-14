import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Generation Route
  app.post("/api/gemini-generate", async (req, res) => {
    try {
      const { tool, input } = req.body;
      const customKey = req.headers['x-gemini-key'];
      const apiKey = customKey || process.env.GEMINI_API_KEY;

      if (!tool || !input) {
        return res.status(400).json({ error: "Missing tool or input" });
      }

      if (!apiKey) {
        return res.status(503).json({ error: "Gemini API key is not configured. Please provide it in the settings." });
      }

      const ai = new GoogleGenAI({ apiKey: apiKey as string });
      
      let prompt = `You are DEZO's website and digital marketing tool engine. Generate useful, practical, business-friendly suggestions. Be confident, clear, and professional. Keep results actionable and easy to send on WhatsApp. Do not include markdown formatting.\n\n`;
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
        model: "gemini-3-flash-preview",
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

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
