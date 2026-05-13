exports.handler = async function (event, context) {
  // Use NEWS_API_KEY from environment variables
  const apiKey = process.env.NEWS_API_KEY;

  const fallbackData = [
    {
      id: "1",
      title: "React 19 RC Features Unveiled: What You Need to Know",
      summary: "The latest release candidate for React 19 brings powerful new hooks and concurrent rendering improvements that will make web apps significantly faster.",
      source: "Web Dev Weekly",
      category: "Web Development",
      url: "https://dezo.in",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Google's Latest Core Update: Impact on SEO and Rankings",
      summary: "The newest Google core update emphasizes original content and penalizes high-scale low-value AI generated pages. Make sure your SEO strategy is updated.",
      source: "Search Engine Journal Radar",
      category: "SEO Updates",
      url: "https://dezo.in",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      title: "Meta Ads Introduces New AI-Driven Campaign Optimization",
      summary: "Advertisers can now let Meta's AI dynamically optimize ad formats and placements, reportedly lowering CPA by up to 20% in recent beta tests.",
      source: "Marketing Times",
      category: "Meta Ads",
      url: "https://dezo.in",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "4",
      title: "The Ultimate Guide to Improving Core Web Vitals in 2024",
      summary: "INP (Interaction to Next Paint) has fully replaced FID. Here is how modern web development agencies are tweaking their architecture for near-zero delay.",
      source: "Frontend Masters",
      category: "Website Speed",
      url: "https://dezo.in",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
    },
    {
      id: "5",
      title: "Startups Leveraging Generative AI to Scale Rapidly",
      summary: "How seed-stage startups are outsourcing their MVP development to AI coding assistants and validating markets at unprecedented speeds.",
      source: "Startup Pulse",
      category: "Startup Growth",
      url: "https://dezo.in",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];

  if (!apiKey) {
    // Return fallback data if no API key is provided
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ articles: fallbackData, isFallback: true }),
    };
  }

  try {
    // You can use a real News API here (e.g. newsapi.org or gnews.io)
    // Example using GNews API:
    const response = await fetch(`https://gnews.io/api/v4/search?q="web development" OR "SEO" OR "Meta Ads" OR "AI"&lang=en&max=5&apikey=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const formattedArticles = data.articles.map((article, index) => ({
      id: index.toString(),
      title: article.title,
      summary: article.description,
      source: article.source.name,
      category: getCategoryFromTitle(article.title),
      url: article.url,
      publishedAt: article.publishedAt,
    }));

    // Cache control: Tell CDN to cache for 15 minutes (900 seconds)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800'
      },
      body: JSON.stringify({ articles: formattedArticles, isFallback: false }),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    // Graceful fallback on error
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ articles: fallbackData, isFallback: true }),
    };
  }
};

function getCategoryFromTitle(title) {
  const t = title.toLowerCase();
  if (t.includes('seo')) return 'SEO Updates';
  if (t.includes('google') && t.includes('ranking')) return 'Google Ranking';
  if (t.includes('meta') || t.includes('facebook') || t.includes('ads')) return 'Meta Ads';
  if (t.includes('ai') || t.includes('openai') || t.includes('marketing tool')) return 'AI Marketing Tools';
  if (t.includes('speed') || t.includes('performance') || t.includes('vitals')) return 'Website Speed';
  if (t.includes('frontend') || t.includes('react') || t.includes('next') || t.includes('vue')) return 'Frontend Trends';
  if (t.includes('startup') || t.includes('growth') || t.includes('business')) return 'Business Growth';
  if (t.includes('marketing') || t.includes('digital')) return 'Digital Marketing';
  return 'Web Development';
}
