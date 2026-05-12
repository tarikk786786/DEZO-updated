import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeStyles } from './ThemeStyles';
import { Link } from 'react-router-dom';

const PageLayout = ({ title, h1, meta, children, schemaData }: any) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalMarketingAgency",
    "name": "DEZO",
    "url": "https://dezo.in/",
    "logo": "https://dezo.in/logo.png",
    "description": "DEZO is a web development and digital marketing agency in India building fast websites, ecommerce stores, landing pages, SEO systems, Meta Ads and Google Ads campaigns for business growth.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751024",
      "addressCountry": "IN"
    },
    "telephone": "+917787063088",
    "email": "contact@dezo.in",
    "priceRange": "$$"
  };

  return (
    <div className="min-h-screen bg-main-light text-main-dark font-sans scroll-smooth pt-20 lg:pt-28">
      <ThemeStyles />
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={meta} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={meta} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={meta} />
        <link rel="canonical" href={`https://dezo.in${window.location.pathname}`} />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        {schemaData && (
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        )}
      </Helmet>
      <main className="max-w-[90rem] mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="clamp-h2 font-black text-main-dark mb-6">{h1}</h1>
          <div className="prose prose-lg prose-slate max-w-none text-main-muted mb-12">
            {children}
          </div>
          <div className="mt-12 pt-12 border-t border-main-light">
            <h3 className="text-xl font-bold mb-6 text-main-dark">Explore Our Services</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/web-development-company-india" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Web Development</Link>
              <Link to="/website-development-bhubaneswar" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Web Dev in Bhubaneswar</Link>
              <Link to="/digital-marketing-agency-india" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Digital Marketing</Link>
              <Link to="/seo-services-india" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">SEO Services</Link>
              <Link to="/meta-ads-agency-india" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Meta Ads</Link>
              <Link to="/google-ads-agency-india" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Google Ads</Link>
              <Link to="/ecommerce-website-development" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Ecommerce</Link>
              <Link to="/landing-page-design-services" className="px-4 py-2 bg-panel-white border border-main-light rounded-full text-sm font-bold text-main-muted hover:text-brand-primary smooth-transition">Landing Pages</Link>
            </div>
          </div>
          <div className="bg-panel-white border border-main-light p-8 rounded-3xl mt-12 text-center shadow-sm">
            <h2 className="text-2xl font-black mb-4 text-main-dark">Ready to Start Your Project?</h2>
            <p className="mb-6 font-medium">Get a free website audit or consultation for your digital growth strategy.</p>
            <Link to="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold rounded-full hover:-translate-y-1 shadow-[0_10px_20px_rgba(124,58,237,0.4)] smooth-transition active:scale-95">Get Free Website Audit</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export const WebDevPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO creates premium, fast-loading, and mobile-friendly websites designed for maximum conversions."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Web Development Company in India",
        "item": "https://dezo.in/web-development-company-india"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Web Development Company in India - DEZO" 
    h1="Web Development Company in India" 
    meta="DEZO builds fast, modern and SEO-ready websites for businesses in India, including business websites, ecommerce stores, landing pages and custom web solutions."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Custom Business Website Development</h2>
    <p>As a leading web development company in India, DEZO creates premium, fast-loading, and mobile-friendly websites designed for maximum conversions. We focus on clean code, seamless user experience, and strong technical SEO structures to ensure your brand stands out in the competitive digital landscape.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Our Web Development Services</h2>
    <ul className="list-disc pl-5 mt-4 space-y-2">
      <li>React and Next.js custom applications</li>
      <li>Responsive, mobile-first business websites</li>
      <li>High-performance ecommerce platforms</li>
      <li>Conversion-optimized landing pages</li>
      <li>Website redesign and performance improvements</li>
    </ul>
    <p className="mt-6">We don't just build websites; we build scalable digital systems tailored to your specific business requirements, integrated with modern analytics, and optimized for lead generation. Our development process guarantees premium quality, fast performance, transparent process, SEO-ready structure, and reliable support after delivery.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">How long does it take to develop a custom website?</h3>
          <p className="mt-2 text-main-muted">A standard business website typically takes 2-4 weeks from design to launch, depending on the complexity and features required.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Are your websites mobile-friendly and SEO optimized?</h3>
          <p className="mt-2 text-main-muted">Yes, all our websites are built with a mobile-first approach and include technical SEO best practices out of the box to ensure high visibility on Google.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const BbsrWebDevPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development Bhubaneswar",
      "provider": {
        "@type": "LocalBusiness",
        "name": "DEZO"
      },
      "areaServed": "Bhubaneswar, Odisha",
      "description": "DEZO helps businesses in Bhubaneswar, Odisha build fast websites, improve Google visibility, and generate leads."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Website Development Bhubaneswar",
        "item": "https://dezo.in/website-development-bhubaneswar"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Website Development Company in Bhubaneswar - DEZO" 
    h1="Website Development Company in Bhubaneswar" 
    meta="DEZO provides website development in Bhubaneswar for businesses, startups and ecommerce brands looking for fast, mobile-friendly and SEO-ready websites."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Website Development & Digital Marketing Services in Bhubaneswar, Odisha</h2>
    <p>DEZO helps businesses in Bhubaneswar, Odisha and across India build fast websites, improve Google visibility, generate leads through SEO, and run Meta Ads and Google Ads campaigns. Known as a premier website development company in Bhubaneswar, our mission is to empower local businesses with world-class digital assets.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Leading Digital Marketing Agency in Bhubaneswar</h2>
    <p>Our deep understanding of the local market combined with global development standards makes us the ideal digital marketing agency in Bhubaneswar. We utilize cutting-edge technology to ensure that your website design in Odisha exceeds industry benchmarks and drives tangible business results.</p>
    
    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you provide local SEO services in Bhubaneswar?</h3>
          <p className="mt-2 text-main-muted">Yes, our SEO strategies are highly localized. We help businesses rank on the first page of Google for targeted keywords specific to Bhubaneswar and Odisha.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Can I meet your team in person?</h3>
          <p className="mt-2 text-main-muted">Absolutely. If you run a business in Bhubaneswar, our team would be happy to schedule an in-person consultation to discuss your digital strategy.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const DigitalMarketingPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Digital Marketing Services",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO crafts tailored marketing funnels that target your ideal audience and guide them to conversion."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Digital Marketing Agency India",
        "item": "https://dezo.in/digital-marketing-agency-india"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Digital Marketing Agency in India - DEZO" 
    h1="Digital Marketing Agency in India" 
    meta="DEZO helps Indian businesses grow with SEO, Meta Ads, Google Ads, landing pages, tracking setup and conversion-focused digital marketing strategies."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Comprehensive Digital Marketing Strategies</h2>
    <p>In today's digital era, having a website is not enough. You need consistent, high-quality traffic. As a results-driven digital marketing agency in India, DEZO crafts tailored marketing funnels that target your ideal audience and guide them to conversion.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Our Approach</h2>
    <p>We analyze your business goals, audit your current digital footprint, and implement data-backed marketing campaigns. Our expertise spans across search engine optimization, pay-per-click advertising, social media management, and robust pixel tracking. We provide premium quality, fast performance, transparent process, SEO-ready structure, and reliable support.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">What digital marketing services do you offer?</h3>
          <p className="mt-2 text-main-muted">We offer comprehensive 360-degree digital marketing services including SEO, Meta Ads management, Google Ads, content marketing, and conversion rate optimization.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">How do you measure a successful campaign?</h3>
          <p className="mt-2 text-main-muted">We measure success by ROI/ROAS, cost per lead (CPL), and high-intent traffic metrics via advanced tracking with Google Tag Manager and GA4.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const SeoServicesPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "SEO Services",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO provides data-driven SEO services in India targeting organic visibility and long-term brand authority."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "SEO Services India",
        "item": "https://dezo.in/seo-services-india"
      }]
    }
  ];

  return (
  <PageLayout 
    title="SEO Services in India - DEZO" 
    h1="SEO Services in India" 
    meta="DEZO provides SEO services in India including technical SEO, on-page SEO, local SEO, keyword optimization, content structure and website performance improvements."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Data-Driven SEO for Predictable Growth</h2>
    <p>Ranking on the first page of Google is crucial for long-term success. Our specialized SEO services in India are designed to improve your organic visibility, drive targeted traffic, and establish your brand as an authority.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">What We Optimize</h2>
    <p>We focus on all pillars of Search Engine Optimization: Technical SEO to ensure crawlability and fast page speeds; On-Page SEO for structured content and intelligent keyword placement; and Off-Page SEO to build high-quality backlinks and domain authority.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">How long does it take to see SEO results?</h3>
          <p className="mt-2 text-main-muted">SEO is a medium-to-long-term strategy. You can typically expect to see noticeable improvements in rankings and traffic within 3 to 6 months.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you do local SEO for businesses in my city?</h3>
          <p className="mt-2 text-main-muted">Yes, our local SEO services help you dominate the local pack and map results for users searching near your business location.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const MetaAdsPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Meta Ads Management",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO designs, launches, and optimizes Facebook and Instagram ad campaigns that deliver measurable ROAS."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Meta Ads Agency India",
        "item": "https://dezo.in/meta-ads-agency-india"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Meta Ads Agency in India - DEZO" 
    h1="Meta Ads Agency in India" 
    meta="DEZO creates and manages Meta Ads campaigns for businesses in India with high-converting creatives, landing pages, tracking and performance optimization."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">High-ROI Paid Social Advertising</h2>
    <p>Social media advertising is one of the fastest ways to scale your business. As an expert Meta Ads agency in India, DEZO designs, launches, and optimizes Facebook and Instagram ad campaigns that deliver measurable return on ad spend (ROAS).</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Our Campaign Framework</h2>
    <p>From audience segmentation and compelling ad creatives to rigorous A/B testing and pixel tracking setup, our methodology ensures that every dollar you spend is maximized for lead generation and ecommerce sales. Our process guarantees premium quality, transparent reporting, and continuous performance optimization.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you create the ad graphics and videos?</h3>
          <p className="mt-2 text-main-muted">Yes, our creative team designs high-converting statics, carousels, and video ad creatives optimized specifically for Meta placements.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">What budget is recommended for Meta Ads?</h3>
          <p className="mt-2 text-main-muted">We recommend a starting ad spend of at least ₹30,000 to ₹50,000 per month so the algorithm has enough data to optimize efficiently.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const GoogleAdsPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Google Ads Management",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO manages highly targeted Google Ads campaigns designed to minimize wasted spend and maximize conversions."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Google Ads Agency India",
        "item": "https://dezo.in/google-ads-agency-india"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Google Ads Agency in India - DEZO" 
    h1="Google Ads Agency in India" 
    meta="DEZO provides Google Ads management in India to capture high-intent search traffic, generate leads, and drive sales through Search, Display, and Performance Max campaigns."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Capture High-Intent Search Traffic</h2>
    <p>When customers search for your services on Google, you need to be at the top. DEZO manages highly targeted Google Ads campaigns designed to minimize wasted spend and maximize conversions.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">PPC Management Expertise</h2>
    <p>We handle keyword research, negative keyword optimization, compelling ad copy, and landing page alignment to ensure high Quality Scores and lower costs per click. Whether it's Search, Shopping, or Performance Max, we build scalable ad systems with transparent process.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you guarantee leads with Google Ads?</h3>
          <p className="mt-2 text-main-muted">While we don't use weak terms like "ironclad guarantee", we do promise premium quality setups, rigorous optimization, and transparent reporting to maximize your ROAS and lead generation potential.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Why are my current Google Ads too expensive?</h3>
          <p className="mt-2 text-main-muted">High costs often come from bad keyword targeting, low Quality Scores, and poor landing page experiences. We audit and fix all of these to lower your Cost Per Acquisition.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const EcommercePage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Ecommerce Website Development",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO provides robust ecommerce website development in India, crafting digital storefronts that turn visitors into loyal buyers."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Ecommerce Website Development",
        "item": "https://dezo.in/ecommerce-website-development"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Ecommerce Website Development in India - DEZO" 
    h1="Ecommerce Website Development" 
    meta="DEZO builds fast, scalable ecommerce websites in India designed to maximize sales, improve user experience, and rank on search engines."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Build an Online Store That Sells</h2>
    <p>Fast, secure, and user-friendly ecommerce stores are essential for modern retail. DEZO provides robust ecommerce website development in India, crafting digital storefronts that turn visitors into loyal buyers.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Features We Deliver</h2>
    <ul className="list-disc pl-5 mt-4 space-y-2">
      <li>Lightning-fast product load times and SEO-ready structure</li>
      <li>Secure payment gateway integrations (Razorpay, Stripe)</li>
      <li>Mobile-optimized checkout flows</li>
      <li>Inventory and order management systems</li>
      <li>Advanced analytics tracking setup</li>
    </ul>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">Which platform is best for my ecommerce store?</h3>
          <p className="mt-2 text-main-muted">Depending on your scale, we use Next.js for custom headless stores or robust platforms like Shopify and WooCommerce based on your specific operational needs and budget.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you help with payment gateway integration?</h3>
          <p className="mt-2 text-main-muted">Yes, we provide end-to-end setup including integrating Indian and International payment gateways securely.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const LandingPagePage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Landing Page Design",
      "provider": {
        "@type": "DigitalMarketingAgency",
        "name": "DEZO"
      },
      "areaServed": "India",
      "description": "DEZO designs high-converting landing pages for ad campaigns, product launches, and lead generation, focusing on speed and user psychology."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dezo.in/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Landing Page Design Services",
        "item": "https://dezo.in/landing-page-design-services"
      }]
    }
  ];

  return (
  <PageLayout 
    title="Landing Page Design Services - DEZO" 
    h1="Landing Page Design Services" 
    meta="DEZO designs high-converting landing pages for ad campaigns, product launches, and lead generation, focusing on speed and user psychology."
    schemaData={schema}
  >
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Convert Clicks Into Customers</h2>
    <p>Traffic is useless if it doesn't convert. Our landing page design services focus on user psychology, compelling copywriting, and frictionless UI/UX to ensure your ad campaigns yield the highest possible conversion rates.</p>
    <h2 className="text-2xl font-bold text-main-dark mb-4 mt-8">Why Our Landing Pages Win</h2>
    <p>We build perfectly structured, blazing-fast landing pages with clear call-to-actions, social proof injection, and a distraction-free experience. Every element is tested and optimized for one goal: acquiring leads and generating sales. We ensure premium quality and fast performance across all devices.</p>

    <div className="mt-12 bg-panel-white p-8 rounded-3xl border border-main-light">
      <h2 className="text-2xl font-bold text-main-dark mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-main-dark text-lg">What makes a high-converting landing page?</h3>
          <p className="mt-2 text-main-muted">Fast load speeds, clear messaging, compelling headlines, strong social proof (reviews/testimonials), and a frictionless lead capture form or checkout process.</p>
        </div>
        <div>
          <h3 className="font-bold text-main-dark text-lg">Do you integrate tracking tools on the landing page?</h3>
          <p className="mt-2 text-main-muted">Yes, every landing page comes with complete setup of Google Tag Manager, Google Analytics 4, Meta Pixel and any other required tracking systems so you never lose data.</p>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const ContactPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact DEZO",
    "description": "Contact DEZO for web development and digital marketing services."
  };
  return (
  <PageLayout 
    title="Contact DEZO - Web Development & Digital Marketing Agency" 
    h1="Contact DEZO" 
    meta="Get in touch with DEZO for custom web development, ecommerce solutions, SEO, Meta Ads and Google Ads services."
    schemaData={schema}
  >
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-main-dark mb-4">Let's Discuss Your Digital Growth</h2>
        <p className="mb-6 text-main-muted">Whether you need a new website, a high-converting landing page, or a digital marketing strategy, our team is ready to help.</p>
        <div className="space-y-4">
          <p><strong>Phone:</strong> +91 77870 63088</p>
          <p><strong>Email:</strong> contact@dezo.in</p>
          <p><strong>Address:</strong> Phase 2, Patia, Bhubaneswar, Odisha 751024</p>
        </div>
      </div>
      <div>
        <div className="bg-panel-white p-6 rounded-2xl border border-main-light shadow-sm text-center">
          <h3 className="text-xl font-bold text-main-dark mb-4">Schedule a Free Consultation</h3>
          <p className="mb-6 text-main-muted text-sm">We'll review your current digital presence and provide an actionable strategy.</p>
          <Link to="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-full hover:-translate-y-1 shadow-md smooth-transition">Open Contact Form</Link>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const PortfolioPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "DEZO Portfolio",
    "description": "View our latest web development and digital marketing projects."
  };
  return (
  <PageLayout 
    title="Our Portfolio - DEZO" 
    h1="Our Latest Work" 
    meta="Explore DEZO's portfolio of custom websites, ecommerce stores, and digital marketing campaigns."
    schemaData={schema}
  >
    <p className="text-xl text-main-muted mb-8 leading-relaxed">We have partnered with 50+ businesses across 10 industries to deliver premium digital solutions. From blazing fast landing pages to robust ecommerce platforms, view our recent projects.</p>
    <div className="text-center mt-8">
      <Link to="/" onClick={() => setTimeout(() => document.getElementById('latest-work')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold rounded-full shadow-lg hover:-translate-y-1 smooth-transition">View All Projects</Link>
    </div>
  </PageLayout>
  );
};

export const BlogPage = () => (
  <PageLayout 
    title="Digital Growth Blog - DEZO" 
    h1="Insights & Strategies for Digital Growth" 
    meta="Read DEZO's blog for expert insights on web development, SEO, Meta Ads, Google Ads, and strategies to grow your business online."
  >
    <div className="grid md:grid-cols-2 gap-8">
      {[
        "How to Choose the Best Web Development Company in India",
        "Why Every Business Needs an SEO-Friendly Website",
        "Meta Ads vs Google Ads: Which Is Better for Your Business?",
        "Ecommerce Website Development Checklist for Indian Businesses",
        "How Local SEO Helps Businesses in Bhubaneswar Grow"
      ].map((title, i) => (
        <div key={i} className="bg-panel-white p-6 rounded-2xl border border-main-light shadow-sm">
          <div className="text-xs font-bold text-[var(--primary)] mb-2 uppercase">Article</div>
          <h3 className="text-xl font-bold text-main-dark mb-4 leading-tight">{title}</h3>
          <span className="text-sm font-bold text-main-muted flex items-center gap-2 group cursor-pointer hover:text-[var(--primary)] smooth-transition">Read More →</span>
        </div>
      ))}
    </div>
  </PageLayout>
);
