export const servicesConfig = {
  'business-website': {
    id: 'business-website',
    categoryName: 'Business Website',
    heroTitle: 'Your Business Needs a Premium Website',
    heroSubtitle: 'Attract clients, build trust, and grow your brand. Free quote within 24 hours.',
    startingPrice: '₹50,000',
    estimatedDelivery: '2-4 weeks',
    placeholder: 'Describe your business website requirements...',
    questions: [
      { name: 'businessType', label: 'What type of business do you own?', type: 'text', placeholder: 'e.g. Consulting, Real Estate, Agency' },
      { name: 'pageCount', label: 'Roughly how many pages do you need?', type: 'select', options: ['1-5 pages', '5-10 pages', '10-20 pages', '20+ pages'] },
      { name: 'appointmentBooking', label: 'Do you need appointment booking?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'blogNeeded', label: 'Do you need a blog?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'cmsAccess', label: 'Do you need CMS access to edit content?', type: 'radio', options: ['Yes', 'No'] }
    ],
    budgets: ['₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,50,000', '₹2,50,000 - ₹5,00,000', '₹5,00,000+'],
    timelines: ['ASAP (Within 2 weeks)', 'Within 1 month', '1-2 months', 'No rush']
  },
  'ecommerce': {
    id: 'ecommerce',
    categoryName: 'E-commerce',
    heroTitle: 'Launch Your Online Store',
    heroSubtitle: 'High-converting e-commerce experiences built for growth.',
    startingPrice: '₹1,00,000',
    estimatedDelivery: '4-8 weeks',
    placeholder: 'Describe your online store requirements (e.g., specific features, design style, target audience)...',
    questions: [
      { name: 'productCount', label: 'How many products will you sell?', type: 'select', options: ['1-50', '50-500', '500-5000', '5000+'] },
      { name: 'paymentGateway', label: 'Do you need payment gateway integration?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'inventoryMgmt', label: 'Inventory management required?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'shippingIntegrations', label: 'Shipping integrations needed?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'multiVendor', label: 'Multi-vendor support required?', type: 'radio', options: ['Yes', 'No'] }
    ],
    budgets: ['₹1,00,000 - ₹2,50,000', '₹2,50,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', '₹10,00,000+'],
    timelines: ['Within 1 month', '1-2 months', '2-3 months', 'No rush']
  },
  'portfolio': {
    id: 'portfolio',
    categoryName: 'Portfolio',
    heroTitle: 'Showcase Your Work',
    heroSubtitle: 'Stunning portfolio websites that leave a lasting impression.',
    startingPrice: '₹40,000',
    estimatedDelivery: '2-4 weeks',
    placeholder: 'Describe your portfolio website goals...',
    questions: [
      { name: 'profession', label: 'What profession are you in?', type: 'text', placeholder: 'e.g. Photographer, Designer, Developer' },
      { name: 'projectGalleries', label: 'Do you need project galleries?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'caseStudies', label: 'Do you need case studies?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'testimonials', label: 'Do you need a testimonials section?', type: 'radio', options: ['Yes', 'No'] }
    ],
    budgets: ['₹40,000 - ₹80,000', '₹80,000 - ₹1,50,000', '₹1,50,000+'],
    timelines: ['ASAP (Within 2 weeks)', 'Within 1 month', '1-2 months']
  },
  'landing-page': {
    id: 'landing-page',
    categoryName: 'Landing Page',
    heroTitle: 'High-Conversion Landing Pages',
    heroSubtitle: 'Turn clicks into customers with psychologically-driven design.',
    startingPrice: '₹30,000',
    estimatedDelivery: '1-2 weeks',
    placeholder: 'Describe your landing page campaign objectives...',
    questions: [
      { name: 'primaryGoal', label: 'What is the primary conversion goal?', type: 'select', options: ['Lead Generation (Forms)', 'Sales/Checkout', 'App Downloads', 'Event Registration'] },
      { name: 'abTesting', label: 'Do you need A/B testing setup?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'analytics', label: 'Do you need analytics integration?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'adCampaigns', label: 'Is this supporting an advertising campaign?', type: 'radio', options: ['Yes', 'No'] }
    ],
    budgets: ['₹30,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000+'],
    timelines: ['ASAP (Within 1 week)', 'Within 2 weeks', 'Within 1 month']
  },
  'seo': {
    id: 'seo',
    categoryName: 'SEO',
    heroTitle: 'Dominate Search Rankings',
    heroSubtitle: 'Drive organic traffic and outrank your competitors.',
    startingPrice: '₹25,000/mo',
    estimatedDelivery: 'Ongoing',
    placeholder: 'Describe your SEO goals...',
    questions: [
      { name: 'existingUrl', label: 'Existing website URL?', type: 'text', placeholder: 'https://...' },
      { name: 'currentTraffic', label: 'Current monthly traffic?', type: 'select', options: ['0 - 1,000', '1,000 - 10,000', '10,000 - 50,000', '50,000+'] },
      { name: 'seoType', label: 'Local SEO or Global SEO?', type: 'select', options: ['Local SEO', 'Global/National SEO', 'Both'] },
      { name: 'targetKeywords', label: 'Target keywords (if known)?', type: 'text', placeholder: 'e.g. Best plumber in Delhi' }
    ],
    budgets: ['₹25,000 - ₹50,000/month', '₹50,000 - ₹1,00,000/month', '₹1,00,000+/month'],
    timelines: ['Start immediately', 'Start next month', 'Exploring options']
  },
  'redesign': {
    id: 'redesign',
    categoryName: 'Redesign',
    heroTitle: 'Modernize Your Digital Presence',
    heroSubtitle: 'Transform your outdated website into a modern conversion engine.',
    startingPrice: '₹60,000',
    estimatedDelivery: '3-6 weeks',
    placeholder: 'Describe your redesign requirements...',
    questions: [
      { name: 'existingUrl', label: 'Existing website URL?', type: 'text', placeholder: 'https://...' },
      { name: 'currentProblems', label: 'What problems exist with the current website?', type: 'textarea', placeholder: 'e.g. Slow, not mobile friendly, hard to update...' },
      { name: 'contentMigration', label: 'Do you need content migration?', type: 'radio', options: ['Yes, migrate everything', 'Yes, migrate some pages', 'No, we are writing new content'] }
    ],
    budgets: ['₹60,000 - ₹1,50,000', '₹1,50,000 - ₹3,00,000', '₹3,00,000+'],
    timelines: ['Within 1 month', '1-2 months', '2-3 months', 'No rush']
  },
  'maintenance': {
    id: 'maintenance',
    categoryName: 'Maintenance',
    heroTitle: 'Keep Your Site Running 24/7',
    heroSubtitle: 'Expert maintenance, security, and updates for your peace of mind.',
    startingPrice: '₹10,000/mo',
    estimatedDelivery: 'Immediate',
    placeholder: 'Describe your maintenance needs...',
    questions: [
      { name: 'platform', label: 'Website platform?', type: 'select', options: ['WordPress', 'React/Next.js', 'Shopify', 'Webflow', 'Other/Unknown'] },
      { name: 'planType', label: 'Monthly maintenance or one-time fix?', type: 'select', options: ['Monthly Maintenance', 'One-time Fix', 'Not sure'] },
      { name: 'security', label: 'Security monitoring required?', type: 'radio', options: ['Yes', 'No'] },
      { name: 'backups', label: 'Backup frequency needed?', type: 'select', options: ['Daily', 'Weekly', 'Monthly'] }
    ],
    budgets: ['₹10,000 - ₹25,000/month', '₹25,000 - ₹50,000/month', 'Custom Enterprise Plan'],
    timelines: ['Start immediately', 'Start next month']
  },
  'custom': {
    id: 'custom',
    categoryName: 'Custom Solution',
    heroTitle: 'Bespoke Digital Solutions',
    heroSubtitle: 'Complex web apps, portals, and tailored platforms built from scratch.',
    startingPrice: '₹2,50,000',
    estimatedDelivery: '2-4+ months',
    placeholder: 'Describe your custom solution...',
    questions: [
      { name: 'projectType', label: 'Web app or website?', type: 'select', options: ['Web App (SaaS, Portal, etc.)', 'Complex Website', 'Not sure'] },
      { name: 'integrations', label: 'Third-party integrations needed?', type: 'text', placeholder: 'e.g. Salesforce, Stripe, custom API...' },
      { name: 'userRoles', label: 'User roles required?', type: 'radio', options: ['Yes (Admin, User, etc.)', 'No'] },
      { name: 'specialFeatures', label: 'Any special features needed?', type: 'textarea', placeholder: 'e.g. Real-time chat, AI integration, complex dashboards...' }
    ],
    budgets: ['₹2,50,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', '₹10,00,000 - ₹25,00,000', '₹25,00,000+'],
    timelines: ['2-3 months', '3-6 months', '6+ months']
  }
};

export const defaultServiceConfig = {
  id: 'generic',
  categoryName: 'Other',
  heroTitle: 'Your Website Starts Here',
  heroSubtitle: 'Takes 3 minutes. Free quote in 24 hours. No technical knowledge needed.',
  startingPrice: 'Contact us',
  estimatedDelivery: 'Varies',
  placeholder: 'Tell us what you want to achieve...',
  questions: [],
  budgets: ['₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,50,000', '₹2,50,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', '₹10,00,000+'],
  timelines: ['ASAP (Within 2 weeks)', 'Within 1 month', '1-3 months', 'No rush']
};
