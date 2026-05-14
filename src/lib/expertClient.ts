export const getExpertAdvice = async (tool: string, input: any) => {
  try {
    const res = await fetch('/api/gemini-generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tool, input })
    });

    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    // Ignore error
  }

  // Fallbacks
  return getFallbackForTool(tool, input);
};

const getFallbackForTool = (tool: string, input: any) => {
  switch (tool) {
    case 'WebsiteCostCalculator':
      return {
        recommendedPackage: input.websiteType === 'Ecommerce Website' ? 'Ecommerce Website' : 'Business Growth Website',
        estimatedPriceRange: input.websiteType === 'Ecommerce Website' ? '₹12,999 - ₹25,000' : '₹7,999 - ₹15,000',
        featureSuggestions: ['Mobile-first design', 'Fast loading', 'WhatsApp integration'],
        timelineSuggestion: '2-4 weeks',
        bestPackageExplanation: 'This package provides the best balance of features and trust for your business.',
        upsellSuggestion: 'Add SEO optimization for ₹3,000 extra.'
      };
    case 'WebsiteAuditTool':
      return {
        auditScore: '65/100',
        designIssues: ['Outdated layout', 'Poor mobile optimization'],
        seoIssues: ['Missing meta descriptions', 'Slow page speed'],
        speedSuggestions: ['Optimize images', 'Minify CSS/JS'],
        mobileSuggestions: ['Improve touch targets', 'Use responsive fonts'],
        trustImprovementSuggestions: ['Add customer testimonials', 'Display clear contact info'],
        ctaImprovementSuggestions: ['Make buttons larger and more contrasting'],
        dezoRecommendation: 'We suggest a complete website revamp to improve your conversions and professional image.'
      };
    case 'SEOMetaGenerator':
      return {
        title: `Best ${input.businessType} in ${input.location} | ${input.brandName || 'Your Brand'}`,
        description: `Looking for top-rated ${input.pageTopic} in ${input.location}? Check out our premium services and exclusive offers today.`,
        keywords: [input.keyword, `${input.businessType} ${input.location}`, `Best ${input.pageTopic}`],
        h1: `Premium ${input.pageTopic} in ${input.location}`,
        h2Suggestions: [`Why Choose Our ${input.businessType}`, `Our Services`],
        urlSlug: `/${input.pageTopic.toLowerCase().replace(/ /g, '-')}`,
        ogTitle: `Top ${input.businessType} in ${input.location}`,
        ogDescription: `Get the best ${input.pageTopic}. Visit us for premium service and offers.`,
        faqIdeas: [`What is the cost of ${input.pageTopic}?`, `Do you provide ${input.pageTopic} in ${input.location}?`]
      };
    case 'HeadlineGenerator':
      return {
        headlines: [`Premium ${input.product} for ${input.targetCustomer}`, `Get Better Results with Our ${input.industry} Solutions.`],
        subheadings: [`Experience the best ${input.benefit} effortlessly.`, `Trusted by top professionals for consistent quality.`],
        ctaIdeas: [`Get Started Today`, `Claim Your Special Offer`],
        heroStructure: 'Headline, concise subheading, primary CTA button, secondary trust indicator.',
        recommendedHeadline: `${input.benefit} Fast With Our Trusted ${input.industry} Service.`
      };
    case 'MetaAdsCopyGenerator':
      return {
        headlines: [`Top Rated ${input.product} in ${input.location}`, `Stop Struggling - Get the Best ${input.product}`],
        primaryTexts: [`If you are looking for ${input.product}, check out our premium selection. ${input.offer}`, `Get exactly what you need with our top-rated service.`],
        ctaLines: [`Shop Now`, `Learn More`, `Get Offer`],
        landingPageRecommendation: `A dedicated landing page tailored exactly to "${input.product}" with the ${input.offer} prominently displayed.`,
        creativeAngles: ['Highlighting the speed and quality', 'Showing a before and after comparison'],
        targetingIdeas: ['Lookalike audiences of past converters', 'Interests related to your industry'],
        disclaimer: "Ad results depend on targeting, budget, creative, competition, and landing page quality."
      };
    case 'BlogIdeaGenerator':
      return {
        ideas: [
          {
            title: `The Ultimate Guide to ${input.targetService} in 2026`,
            keywords: [input.targetService, input.category],
            metaDescription: `Discover the top secrets and tips for mastering ${input.targetService}. Perfect for ${input.audience}.`,
            contentAngle: 'A comprehensive, step-by-step how-to guide.',
            faqIdeas: [`Why is ${input.targetService} important?`, `How to get started?`],
            ctaLines: [`Contact us for more details`, `Book a consultation`],
            localSEOSuggestions: [`Include ${input.location} in the article body`]
          }
        ]
      };
    case 'BusinessNameGenerator':
      return {
        names: [`${input.keyword} Pro`, `Elite ${input.keyword}`, `${input.industry} Masters`, `The ${input.keyword} Co.`],
        taglines: [`Delivering excellence every day.`, `Your trusted partner in ${input.industry}.`],
        domainSuggestions: [`${input.keyword.toLowerCase()}pro.com`, `elite${input.keyword.toLowerCase()}.in`],
        instagramBio: `Your premier destination for ${input.industry} in ${input.location}. 👇 Click below`,
        brandPositioning: `A premium, reliable provider focusing on high quality and customer satisfaction.`
      };
    case 'InstagramBioGenerator':
      return {
        bios: [`Premium ${input.mainService} 🌟\n📍 ${input.location}\n🔥 ${input.offer}\n👇 ${input.contactMethod}`],
        highlightNames: ['Services', 'Reviews', 'Contact', 'About'],
        ctaLines: [`Link in bio!`, `Message us to start`],
        hashtags: [`#${input.industry.replace(/ /g, '')}`, `#${input.location.replace(/ /g, '')}`],
        profileTips: ['Use a high-resolution logo', 'Add a clear tracking link']
      };
    case 'GoogleRankingChecklist':
      return {
        categories: [
          {
            name: 'Core SEO',
            tasks: ['Create XML Sitemap', 'Submit to Google Search Console']
          },
          {
            name: 'Technical',
            tasks: ['Ensure HTTPS', 'Fix 404 errors', 'Optimize Images']
          }
        ]
      };
    case 'MetaAdsBudgetCalculator':
      return {
        suggestedDailyBudget: `₹${(parseInt(input.monthlyBudget || '15000') / 30).toFixed(0)}`,
        estimatedLeadRange: '15 - 50 leads/month',
        landingPageRequirements: ['Fast load times (< 3s)', 'Clear hero CTA', 'Mobile-first design'],
        creativeRecommendations: ['Use video testimonials', 'Highlight the main offer'],
        funnelSuggestions: ['Send clicks directly to a dedicated landing page form'],
        budgetWarning: 'Your budget is a good starting point, but testing creative is necessary.',
        disclaimer: "These are estimates, not guaranteed results."
      };
    default:
      return { message: "Fallback logic executed." };
  }
};
