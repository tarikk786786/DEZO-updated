import { GoogleGenAI } from '@google/genai';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDoYjK37ZG4yiBXzMgrC2XKXZre2GouCW4';

  try {
    const { tool, input } = JSON.parse(event.body);

    if (!tool || !input) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing tool or input' }) };
    }

    if (!apiKey) {
      // Return 503 so the frontend falls back
      return { statusCode: 503, body: JSON.stringify({ error: 'AI backend unavailable, fallback result used.' }) };
    }
    
    const ai = new GoogleGenAI({ apiKey });

    // Build the prompt based on tool name
    let prompt = `You are DEZO's website and digital marketing tool engine. Generate useful, practical, business-friendly suggestions. Be confident, clear, and professional. Do not make fake guarantees. Do not claim guaranteed rankings, sales, or traffic. Keep results actionable and easy to send on WhatsApp.\n\n`;
    
    prompt += `Tool: ${tool}\nInputs:\n${JSON.stringify(input, null, 2)}\n\n`;
    
    if (tool === 'WebsiteCostCalculator') {
        prompt += `Output format (JSON ONLY): { "recommendedPackage": "Stater Website...", "estimatedPriceRange": "₹4,999 - ₹7,999", "featureSuggestions": ["...", "..."], "timelineSuggestion": "...", "bestPackageExplanation": "...", "upsellSuggestion": "..." }`;
    } else if (tool === 'WebsiteAuditTool') {
        prompt += `Output format (JSON ONLY): { "auditScore": "75/100", "designIssues": ["..."], "seoIssues": ["..."], "speedSuggestions": ["..."], "mobileSuggestions": ["..."], "trustImprovementSuggestions": ["..."], "ctaImprovementSuggestions": ["..."], "dezoRecommendation": "..." }`;
    } else if (tool === 'SEOMetaGenerator') {
        prompt += `Output format (JSON ONLY): { "title": "SEO Title < 60 chars", "description": "SEO Description < 160 chars", "keywords": ["..."], "h1": "...", "h2Suggestions": ["..."], "urlSlug": "...", "ogTitle": "...", "ogDescription": "...", "faqIdeas": ["..."] }`;
    } else if (tool === 'HeadlineGenerator') {
        prompt += `Output format (JSON ONLY): { "headlines": ["...", "..."], "subheadings": ["...", "..."], "ctaIdeas": ["...", "..."], "heroStructure": "...", "recommendedHeadline": "..." }`;
    } else if (tool === 'MetaAdsCopyGenerator') {
        prompt += `Output format (JSON ONLY): { "headlines": ["...", "..."], "primaryTexts": ["...", "..."], "ctaLines": ["...", "..."], "landingPageRecommendation": "...", "creativeAngles": ["..."], "targetingIdeas": ["..."], "disclaimer": "Ad results depend on targeting, budget, creative, competition, and landing page quality." }`;
    } else if (tool === 'BlogIdeaGenerator') {
        prompt += `Output format (JSON ONLY): { "ideas": [{ "title": "...", "keywords": ["..."], "metaDescription": "...", "contentAngle": "...", "faqIdeas": ["..."], "ctaLines": ["..."], "localSEOSuggestions": ["..."] }] }`;
    } else if (tool === 'BusinessNameGenerator') {
        prompt += `Output format (JSON ONLY): { "names": ["...", "..."], "taglines": ["...", "..."], "domainSuggestions": ["...", "..."], "instagramBio": "...", "brandPositioning": "..." }`;
    } else if (tool === 'InstagramBioGenerator') {
        prompt += `Output format (JSON ONLY): { "bios": ["...", "..."], "highlightNames": ["...", "..."], "ctaLines": ["...", "..."], "hashtags": ["...", "..."], "profileTips": ["...", "..."] }`;
    } else if (tool === 'GoogleRankingChecklist') {
        prompt += `Output format (JSON ONLY): { "categories": [{ "name": "Core SEO", "tasks": ["...", "..."] }, { "name": "Technical", "tasks": ["...", "..."] }] }`;
    } else if (tool === 'MetaAdsBudgetCalculator') {
        prompt += `Output format (JSON ONLY): { "suggestedDailyBudget": "...", "estimatedLeadRange": "...", "landingPageRequirements": ["..."], "creativeRecommendations": ["..."], "funnelSuggestions": ["..."], "budgetWarning": "...", "disclaimer": "These are estimates, not guaranteed results." }`;
    } else {
        prompt += `Output format: Valid JSON representing the result of the tool.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text();
    let jsonResult;
    try {
        jsonResult = JSON.parse(text);
    } catch(e) {
        jsonResult = { error: "Failed to parse AI response into JSON", raw: text };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonResult),
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    // don't expose raw errors
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal AI Server Error, fallback result will be used.' }),
    };
  }
};
