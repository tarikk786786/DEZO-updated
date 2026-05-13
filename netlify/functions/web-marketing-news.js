export async function handler(event, context) {
  // Use a public free endpoint for Hacker News stories, DEV.to, etc.
  try {
    const devToResponse = await fetch('https://dev.to/api/articles?tag=webdev&top=1&per_page=5');
    const devToData = await devToResponse.json();
    
    // Hacker news top stories (we get IDs, then have to fetch each, so we just do 3 items)
    const hnResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const hnTopIds = await hnResponse.json();
    
    const hnStories = await Promise.all(
      hnTopIds.slice(0, 3).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(r => r.json()))
    );

    const formatData = [];
    
    if (devToData && devToData.length) {
      devToData.forEach(item => {
        formatData.push({
          id: `devto-${item.id}`,
          title: item.title,
          url: item.url,
          source: 'DEV Community',
          category: 'Web Dev',
          time: item.published_at
        });
      });
    }

    if (hnStories && hnStories.length) {
      hnStories.forEach(item => {
        if (!item) return;
        formatData.push({
          id: `hn-${item.id}`,
          title: item.title,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          source: 'Hacker News',
          category: 'Tech News',
          time: new Date(item.time * 1000).toISOString()
        });
      });
    }

    // fallback info if APIs empty
    if (formatData.length === 0) {
      formatData.push({
        id: 'fallback',
        title: 'Google releases new Core Web Vitals guidelines for 2026',
        url: '#',
        source: 'Google Search Central',
        category: 'SEO',
        time: new Date().toISOString()
      });
    }

    // Sort by time
    formatData.sort((a,b) => new Date(b.time) - new Date(a.time));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ news: formatData })
    };
  } catch (error) {
    console.error("News Fetch Error:", error);
    // Return fallback data
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        news: [
          { id: 'fallback-1', title: 'How AI is Changing SEO Strategies', url: '#', source: 'Search Engine Land', category: 'SEO', time: new Date().toISOString() },
          { id: 'fallback-2', title: 'Meta Ads ROI Optimization Tips', url: '#', source: 'Meta Business', category: 'Meta Ads', time: new Date().toISOString() },
          { id: 'fallback-3', title: 'React 19 Server Components Explained', url: '#', source: 'React Blog', category: 'Web Dev', time: new Date().toISOString() }
        ] 
      })
    };
  }
}
