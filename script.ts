import fs from 'fs';
import path from 'path';

const dir = 'src/components/tools';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "Expert" with "Pro" for tool text, but keep export names and getExpertAdvice intact
    content = content.replace(/Expert-powered/g, 'Pro');
    content = content.replace(/Expert Strategy/g, 'Pro Strategy');
    content = content.replace(/Expert Projections/g, 'Pro Projections');
    content = content.replace(/Expert suggests/g, 'Pro suggests');
    content = content.replace(/Writing Expert Ads/g, 'Writing Pro Ads');
    content = content.replace(/Your Expert Ad Strategy/g, 'Your Pro Ad Strategy');
    content = content.replace(/Expert Bios/g, 'Pro Bios');
    content = content.replace(/Expert Website/g, 'Pro Website');
    content = content.replace(/Calculate Expert Estimate/g, 'Calculate Pro Estimate');
    content = content.replace(/Expert Recommendation/g, 'Pro Recommendation');
    content = content.replace(/Expert-crafted/g, 'Pro-crafted');
    content = content.replace(/Expert Audit/g, 'Pro Audit');
    content = content.replace(/Expert Topics/g, 'Pro Topics');
    content = content.replace(/Expert Content/g, 'Pro Content');
    content = content.replace(/Expert Brand/g, 'Pro Brand');
    content = content.replace(/Expert generated/g, 'Pro generated');
    content = content.replace(/Expert Checklist/g, 'Pro Checklist');
    content = content.replace(/Expert SEO/g, 'Pro SEO');
    content = content.replace(/Calculating Expert/g, 'Calculating Pro');
    content = content.replace(/Get Expert/g, 'Get Pro');
    
    // Replace Bot with Zap
    content = content.replace(/<Bot/g, '<Zap');
    content = content.replace(/ Bot,/g, ' Zap,');
    content = content.replace(/\{ Bot/g, '{ Zap');
    content = content.replace(/\{Bot,/g, '{Zap,');

    fs.writeFileSync(filePath, content);
  }
}

let growthTools = fs.readFileSync('src/components/GrowthTools.tsx', 'utf8');
growthTools = growthTools.replace(/expert-crafted/g, 'pro-crafted');
fs.writeFileSync('src/components/GrowthTools.tsx', growthTools);

console.log("Done");
