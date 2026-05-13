export async function handler(event, context) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "No API key configured", fallback: true })
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { url } = JSON.parse(event.body || "{}");
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=MOBILE`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const { lighthouseResult } = data;
    const scores = {
      performance: lighthouseResult.categories.performance?.score * 100 || 0,
      accessibility: lighthouseResult.categories.accessibility?.score * 100 || 0,
      bestPractices: lighthouseResult.categories['best-practices']?.score * 100 || 0,
      seo: lighthouseResult.categories.seo?.score * 100 || 0,
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scores })
    };
  } catch (error) {
    console.error("PageSpeed API Error:", error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message, fallback: true })
    };
  }
}
