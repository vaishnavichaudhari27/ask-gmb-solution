import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Eye,
  Globe2,
  Gem,
  Headphones,
  HeartPulse,
  Hospital,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  PhoneCall,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { usePremiumMotion } from './usePremiumMotion.js'
import logo from './assets/ask-gmb-logo-user.png'
import aboutTeamImage from './assets/ask-gmb-team-collaboration.jpg'
import growthBuildingImage from './assets/ask-gmb-growth-building.jpg'
import homepageHeroImage from './assets/ask-gmb-homepage-hero.png'
import industriesDoctorImage from './assets/ask-gmb-industries-doctor.png'
import industriesHeroImage from './assets/ask-gmb-industries-hero.png'
import industriesStorefrontImage from './assets/ask-gmb-industries-storefront.png'
import laptopGrowthImage from './assets/ask-gmb-laptop-growth.jpg'
import officeReceptionImage from './assets/ask-gmb-office-reception.jpg'
import processPlantImage from './assets/ask-gmb-process-plant.jpg'
import servicesHeroImage from './assets/ask-gmb-services-hero.png'
import siteConfig from './siteConfig.js'
import './App.css'
import './reference-design.css'

const whatsappMessage =
  'Hello ASK GMB Solution, I would like to know more about your digital marketing and website development services.'
const whatsappHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`
const directionsUrl = siteConfig.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`

// 5. SERVICES (Google Business Profile & Local SEO marked prominent as core services)
const services = [
  {
    title: 'Google Business Profile Management',
    seoTitle: `Google Business Profile Management in ${siteConfig.city}`,
    path: '/google-business-profile',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=82',
    isCore: true,
    tag: 'Core Specialty',
    description: 'Work with a Google Business Profile expert to keep your profile accurate and useful, and build a stronger foundation for local discovery and customer enquiries.',
    category: 'Digital Growth',
    features: [
      'Profile verification & complete optimization',
      'Category & primary service keyword alignment',
      'Review strategy and thoughtful response guidance',
      'Useful profile updates, posts, and photos',
    ],
  },
  {
    title: 'Local SEO',
    seoTitle: `Local SEO Agency in ${siteConfig.city}`,
    path: '/local-seo',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
    isCore: true,
    tag: 'Core Specialty',
    description: 'Strengthen your local presence so nearby customers can find clear, relevant information about your practice or business.',
    category: 'Digital Growth',
    features: [
      'High-intent local keyword research',
      'NAP citation consistency audits across directories',
      'Geo-targeted landing page architecture',
      'Google Maps ranking signals & local link signals',
    ],
  },
  {
    title: 'Search Engine Optimization',
    seoTitle: `Search Engine Optimization Services in ${siteConfig.city}`,
    path: '/search-engine-optimization',
    aliases: ['/seo'],
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=82',
    description: 'Comprehensive search engine optimization built on deep technical audits, on-page content relevance, and organic authority growth.',
    category: 'Digital Growth',
    features: [
      'In-depth technical SEO audits & indexing checks',
      'On-page title, schema & content hierarchy',
      'Competitive keyword opportunity gap analysis',
      'Transparent reporting on organic keyword visibility',
    ],
  },
  {
    title: 'Professional Website Design & Development',
    seoTitle: `Website Development Company in ${siteConfig.city}`,
    path: '/website-design-development',
    aliases: ['/website-designing'],
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=82',
    description: 'Bespoke, high-converting digital storefronts tailored to build immediate trust, explain your offerings, and turn visitors into paying clients.',
    category: 'Technology Solutions',
    features: [
      'Modern, clean UI/UX visual design',
      'Flawless mobile & multi-device responsiveness',
      'Clear visual hierarchy & conversion architecture',
      'Fast load times and accessible user flows',
    ],
  },
  {
    title: 'React JS Development',
    seoTitle: 'React JS Development Services',
    path: '/react-development',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=82',
    description: 'Modern web applications built with reusable React components, thoughtful interactions, and maintainable frontend architecture.',
    category: 'Technology Solutions',
    features: [
      'Reusable component-driven frontend architecture',
      'Single Page Application (SPA) speed & responsiveness',
      'Clean API integrations and state management',
      'Production-ready optimization & modern tooling',
    ],
  },
  {
    title: 'WordPress Development',
    seoTitle: `WordPress Website Development in ${siteConfig.city}`,
    path: '/wordpress-development',
    icon: Globe2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=82',
    description: 'Scalable, custom WordPress websites engineered for effortless content editing, robust security, and seamless digital marketing operations.',
    category: 'Technology Solutions',
    features: [
      'Custom block & theme development',
      'Zero-bloat, speed-optimized builds',
      'Straightforward client content administration',
      'Essential security hardening & SEO plugins',
    ],
  },
  {
    title: 'Website Maintenance & Hosting',
    seoTitle: 'Website Maintenance & Hosting Services',
    path: '/website-maintenance-hosting',
    aliases: ['/website-maintenance', '/hosting-support'],
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=82',
    description: 'Dependable website care, hosting coordination, security updates, backups, and practical technical support to keep your site reliable.',
    category: 'Technology Solutions',
    features: [
      'Core, theme & plugin update planning',
      'Hosting setup, SSL, and domain support',
      'Backups, uptime monitoring, and security checks',
      'Ongoing troubleshooting and content updates',
    ],
  },
  {
    title: 'Custom Web Solutions',
    path: '/custom-web-solutions',
    icon: Globe2,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=82',
    description: 'Purpose-built web tools and integrations designed around the way your business works, from customer portals to tailored digital workflows.',
    category: 'Technology Solutions',
    features: [
      'Discovery and technical solution planning',
      'Custom interfaces and business workflows',
      'API integrations and third-party connections',
      'Maintainable, scalable implementation',
    ],
  },
  {
    title: 'Google Maps Ranking Improvement',
    seoTitle: `Google Maps Ranking Services in ${siteConfig.city}`,
    path: '/google-maps-ranking',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
    description: 'Improve the clarity and consistency of your local presence with practical Google Maps optimization and location-focused SEO.',
    category: 'Digital Growth',
    features: [
      'Google Business Profile and category review',
      'Accurate location and service information',
      'Local landing page and citation recommendations',
      'Progress tracking without ranking guarantees',
    ],
  },
  {
    title: 'Google Reviews Management',
    seoTitle: `Google Reviews Management Services in ${siteConfig.city}`,
    path: '/google-reviews-management',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=82',
    description: 'Build a thoughtful review experience with ethical feedback requests, timely responses, and clear guidance for your team.',
    category: 'Digital Growth',
    features: [
      'Review response guidance and tone of voice',
      'Compliant customer feedback workflows',
      'Escalation guidance for sensitive feedback',
      'Review trend monitoring and reporting',
    ],
  },
  {
    title: 'GBP Verification and Suspension Assistance',
    seoTitle: `GBP Verification and Suspension Assistance in ${siteConfig.city}`,
    path: '/gbp-verification-suspension',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=82',
    description: 'Practical guidance for Google Business Profile verification and policy-based suspension issues, with no promise of reinstatement.',
    category: 'Digital Growth',
    features: [
      'Profile and eligibility information review',
      'Verification preparation and troubleshooting',
      'Policy-focused suspension documentation guidance',
      'Appeal preparation support without outcome guarantees',
    ],
  },
  {
    title: 'Mobile App Development',
    seoTitle: `Mobile App Development Services in ${siteConfig.city}`,
    path: '/mobile-app-development',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=82',
    description: 'Intuitive mobile application experiences designed for iOS and Android, focusing on customer convenience and appointment booking.',
    category: 'Technology Solutions',
    features: [
      'Cross-platform Android & iOS planning',
      'Healthcare & appointment booking workflows',
      'User-centric interactive UI/UX prototyping',
      'API connectivity & notifications support',
    ],
  },
  {
    title: 'Digital Marketing & Growth',
    seoTitle: `Digital Marketing & Growth Services in ${siteConfig.city}`,
    path: '/digital-marketing-growth',
    icon: TrendingUp,
    image: laptopGrowthImage,
    description: 'Bring search visibility, useful content, and clear customer journeys together in a practical growth plan for your business.',
    category: 'Digital Growth',
    features: [
      'Digital channel and customer journey review',
      'Content and local visibility planning',
      'Campaign alignment with business goals',
      'Clear measurement and regular optimization',
    ],
  },
]

// 9. WORK PROCESS
const processSteps = [
  { step: '01', title: 'Understand', desc: 'Learn about your business, goals and audience.', icon: Search },
  { step: '02', title: 'Plan', desc: 'Create a customized digital strategy and roadmap.', icon: Target },
  { step: '03', title: 'Execute', desc: 'Implement the strategy with expertise.', icon: Layers3 },
  { step: '04', title: 'Track & Grow', desc: 'Monitor performance, optimize and scale continuously.', icon: TrendingUp },
]

// 10. INDUSTRIES WE SERVE
const industriesData = [
  {
    title: 'Doctors',
    subtitle: 'Specialists & Independent Practitioners',
    desc: 'Support patient discovery with clear doctor and practice information, service details, and convenient contact options.',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    icon: Stethoscope,
  },
  {
    title: 'Clinics',
    subtitle: 'Dental, Eye & Specialty Clinics',
    desc: 'Help nearby patients find clear service information, location details, and practical ways to contact your clinic.',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    icon: HeartPulse,
  },
  {
    title: 'Hospitals',
    subtitle: 'Multi-Specialty & Healthcare Centers',
    desc: 'Organized department directories, clear emergency contacts, doctor rosters, and accurate Google location maps for complex healthcare centers.',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    icon: Hospital,
  },
  {
    title: 'Healthcare Businesses',
    subtitle: 'Diagnostics, Labs & Wellness',
    desc: 'Present clear information about tests, sample collection enquiries, and your business profile across online channels.',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icon: ShieldCheck,
  },
  {
    title: 'Local Businesses',
    subtitle: 'Retail, Services & Showrooms',
    desc: 'Make it easier for nearby customers to discover your services, location, and contact information online.',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    icon: Store,
  },
  {
    title: 'Small & Medium Businesses',
    subtitle: 'Growing Enterprises & B2B',
    desc: 'Establish a credible digital presence that rivals enterprise competitors with fast modern websites, SEO positioning, and lead generation.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    icon: Rocket,
  },
]

const industryFocusAreas = [
  {
    id: 'healthcare',
    title: 'Healthcare Industry',
    subtitle: 'Doctors | Clinics | Hospitals',
    description: 'Comprehensive digital growth solutions for doctors, clinics, hospitals and healthcare centers.',
    homeDescription: 'Digital solutions for doctors, clinics and hospitals.',
    image: industriesDoctorImage,
    homeImage: industriesData[0].img,
    icon: HeartPulse,
    services: [
      'Doctors & Specialists',
      'Clinics & Dental Clinics',
      'Hospitals & Healthcare Centers',
      'Diagnostics & Wellness Centers',
      'Specialty & Multispecialty Clinics',
    ],
    homeServices: [
      'Doctors & Specialists',
      'Clinics & Dental Clinics',
      'Hospitals & Healthcare Centers',
      'Diagnostics & Wellness Centers',
    ],
  },
  {
    id: 'general-businesses',
    title: 'General Businesses',
    subtitle: 'Local Businesses | Startups | Service Providers',
    description: 'Digital marketing and technology solutions to help local and service businesses grow online.',
    homeDescription: 'Growth-focused solutions for local and service businesses.',
    image: industriesStorefrontImage,
    homeImage: industriesStorefrontImage,
    icon: Store,
    services: [
      'Local Businesses',
      'Startups',
      'Service Providers',
      'Educational & Training Institutes',
      'Other Service-Based Businesses',
    ],
    homeServices: [
      'Local Businesses',
      'Startups',
      'Service Providers',
      'Educational & Training Institutes',
    ],
  },
]

// 7. WHY CHOOSE US
const whyChooseFeatures = [
  {
    title: 'Google Business Profile Expertise',
    desc: 'Practical support with profile accuracy, listing setup, and local search best practices.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=82',
  },
  {
    title: 'Healthcare Industry Knowledge',
    desc: 'Deep familiarity with the sensitivity, patient privacy standards, and specialized local search needs of doctors, clinics, and hospitals.',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=82',
  },
  {
    title: 'Local SEO Strategy',
    desc: 'Focused optimization to help relevant nearby customers discover your business and services.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
  },
  {
    title: 'Modern Website Development',
    desc: 'High-performance engineering using modern frameworks like React and custom WordPress for speed, clean UX, and conversions.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=82',
  },
  {
    title: 'Responsive Design',
    desc: 'Responsive layouts designed to keep content and interactions clear across common screen sizes.',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=82',
  },
  {
    title: 'Direct Technical Support',
    desc: 'Prompt, human-led assistance for hosting, domains, technical bugs, and ongoing digital updates without frustrating wait times.',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=82',
  },
]

const homeStats = [
  { value: '5+', label: 'Years of Experience', icon: Calendar },
  { value: '200+', label: 'Business Profiles Managed', icon: Users },
  { value: '100+', label: 'Websites Developed', icon: Code2 },
  { value: '95%', label: 'Client Satisfaction', icon: Star },
]

const aboutStats = [
  { value: '5+', label: 'Years of Experience', icon: Calendar },
  { value: '200+', label: 'Business Profiles Managed', icon: Users },
  { value: '100+', label: 'Websites Developed', icon: Code2 },
  { value: '95%', label: 'Client Satisfaction', icon: Star },
]

const homepageServicePaths = [
  '/google-business-profile',
  '/google-maps-ranking',
  '/local-seo',
  '/search-engine-optimization',
  '/google-reviews-management',
  '/gbp-verification-suspension',
]

const technologyServicePaths = [
  '/website-design-development',
  '/react-development',
  '/wordpress-development',
  '/website-maintenance-hosting',
  '/custom-web-solutions',
  '/mobile-app-development',
]

const homepageServices = homepageServicePaths.map((path) => services.find((service) => service.path === path))
const servicesPageHighlightPaths = [
  ...homepageServicePaths,
  '/website-design-development',
  '/mobile-app-development',
  '/digital-marketing-growth',
]
const servicesPageHighlights = servicesPageHighlightPaths.map((path) =>
  services.find((service) => service.path === path),
)

const contactServiceOptions = [
  'Google Business Profile Management',
  'Google Maps Ranking Improvement',
  'Local SEO Services',
  'Search Engine Optimization',
  'Google Reviews Management',
  'GBP Verification Assistance',
  'Website Design & Development',
  'React JS Development',
  'WordPress Development',
  'Mobile App Development',
  'Website Maintenance & Hosting',
  'Custom Web Solutions',
  'Digital Marketing & Growth',
  'Other',
]

const referenceServiceDescriptions = {
  '/google-business-profile': 'Optimize, manage and grow your GBP presence.',
  '/google-maps-ranking': 'Improve local visibility on Google Maps.',
  '/local-seo': 'Get found by local customers and increase enquiries.',
  '/search-engine-optimization': 'Improve search rankings and increase organic traffic.',
  '/google-reviews-management': 'Build trust and a strong online reputation.',
  '/gbp-verification-suspension': 'Get expert support for verification, suspension and profile recovery.',
  '/website-design-development': 'Build SEO-friendly, responsive and fast websites for healthcare and local businesses.',
  '/mobile-app-development': 'Custom mobile apps to manage appointments, patients and business operations.',
  '/digital-marketing-growth': 'Result-driven digital marketing strategies to increase visibility, patient calls and business growth.',
}

const referenceServiceIcons = {
  '/google-business-profile': Store,
  '/google-maps-ranking': MapPin,
  '/local-seo': Search,
  '/search-engine-optimization': BarChart3,
  '/google-reviews-management': Star,
  '/gbp-verification-suspension': ShieldCheck,
}

const articles = [
  {
    slug: 'google-business-profile-optimization-guide',
    category: 'Google Business Profile',
    title: 'A practical guide to Google Business Profile optimization',
    summary: 'A clear starting point for reviewing your business information and keeping your profile useful to local customers.',
    sections: [
      ['Start with accurate business details', 'Review your business name, address, phone, opening hours, website, and service information. Keep these details consistent with the information customers see on your website and at your location.'],
      ['Choose relevant categories and services', 'Select categories that describe the work your business actually provides. Add service details that help visitors understand what to expect, and avoid using unrelated terms as a shortcut for visibility.'],
      ['Keep the profile current', 'Use genuine photos, timely updates, and clear responses to customer questions. A maintained profile helps people make informed decisions before they contact you.'],
    ],
  },
  {
    slug: 'improve-google-maps-visibility',
    category: 'Google Business Profile',
    title: 'How to improve your Google Maps visibility',
    summary: 'Practical ways to make your location information clearer and your local presence more consistent.',
    sections: [
      ['Make your location information clear', 'Ensure your address, service area, contact details, and opening hours are accurate. If customers visit you, make it easy to understand where to find the business.'],
      ['Build useful local pages', 'A website page for each real location or service area can answer local customer questions. Write for people first and avoid creating thin pages for places you do not serve.'],
      ['Review and improve over time', 'Check that business details stay consistent and use customer questions to improve your profile and website content. Search visibility can vary; avoid promises of a particular placement.'],
    ],
  },
  {
    slug: 'google-business-profile-for-doctors',
    category: 'Google Business Profile',
    title: 'Google Business Profile considerations for doctors',
    summary: 'Information healthcare practices can review to help patients find accurate practice details online.',
    sections: [
      ['Prioritize correct practice information', 'Keep the practice name, location, phone, hours, and appointment information accurate. Patients should be able to confirm basic details without confusion.'],
      ['Use respectful, privacy-aware communication', 'Respond professionally to public feedback, and do not disclose or confirm private patient information in public replies. Follow the privacy and professional obligations that apply to your practice.'],
      ['Make services understandable', 'Describe services in plain language and make it clear how patients can contact the practice for questions or appointments.'],
    ],
  },
  {
    slug: 'common-google-business-profile-mistakes',
    category: 'Google Business Profile',
    title: 'Common Google Business Profile mistakes to avoid',
    summary: 'A simple review list for catching outdated or confusing business profile information.',
    sections: [
      ['Outdated hours or contact information', 'Incorrect opening hours, phone numbers, or website links can make it harder for customers to reach you. Review them whenever your business details change.'],
      ['Unclear categories and descriptions', 'Choose accurate categories and explain your real services. Avoid adding unrelated keywords to your business name or profile details.'],
      ['Ignoring customer feedback', 'A considered response can clarify information and show customers their feedback was noticed. Keep replies professional and protect private information.'],
    ],
  },
  {
    slug: 'local-seo-strategies-small-businesses',
    category: 'Local SEO',
    title: 'Local SEO strategies for small businesses',
    summary: 'Foundational local search work that helps customers understand what you offer and where you serve.',
    sections: [
      ['Clarify your service and location', 'Explain the services you provide and the locations you genuinely serve. Clear website copy helps both customers and search engines understand relevance.'],
      ['Keep business details consistent', 'Review your website and public business listings for accurate contact details, opening hours, and location information.'],
      ['Create genuinely helpful local content', 'Answer real customer questions about your services, process, and service area. Useful content is more valuable than repeating location keywords unnaturally.'],
    ],
  },
  {
    slug: 'local-seo-clinics-hospitals',
    category: 'Local SEO',
    title: 'How local SEO can help clinics and hospitals',
    summary: 'Ways healthcare organizations can make essential location and service information easier to find.',
    sections: [
      ['Make essential details easy to verify', 'Keep location, contact, department, and appointment details clear and current across your website and profiles.'],
      ['Structure service information carefully', 'Use understandable service descriptions and link visitors to appropriate information. Have qualified staff review clinical content for accuracy.'],
      ['Respect patient privacy', 'Avoid sharing private health information in public responses or marketing content. Healthcare organizations should follow applicable privacy and professional standards.'],
    ],
  },
  {
    slug: 'importance-local-keyword-research',
    category: 'Local SEO',
    title: 'The importance of local keyword research',
    summary: 'A people-first approach to understanding the phrases local customers use when looking for services.',
    sections: [
      ['Start with customer language', 'Ask how customers describe their needs and what questions they ask before choosing a service. This gives keyword research a practical foundation.'],
      ['Group terms by intent', 'Separate research, comparison, and contact-oriented searches. Matching pages to user intent makes information easier to navigate.'],
      ['Use keywords naturally', 'Place relevant wording in useful page titles, headings, and copy without awkward repetition. The page should remain clear and genuinely helpful.'],
    ],
  },
  {
    slug: 'react-js-vs-wordpress',
    category: 'Website Development',
    title: 'React JS vs WordPress: choosing a website approach',
    summary: 'Compare two popular approaches by considering your content, workflows, integrations, and maintenance needs.',
    sections: [
      ['When WordPress may fit', 'WordPress can suit organizations that need a familiar content management workflow and a broad ecosystem of themes and extensions. The right setup still needs maintenance and careful extension choices.'],
      ['When React may fit', 'React is useful for interactive interfaces and custom application experiences. It typically requires a development workflow for changes and may need a separate content management solution.'],
      ['Choose around your needs', 'Consider who will update the site, the features you need, performance expectations, accessibility, and long-term support rather than choosing by trend alone.'],
    ],
  },
  {
    slug: 'why-business-needs-professional-website',
    category: 'Website Development',
    title: 'Why your business needs a professional website',
    summary: 'A website can give customers a dependable place to understand your services and contact your business.',
    sections: [
      ['Explain your offer clearly', 'A well-structured website helps visitors understand what you do, who you serve, and what they can do next.'],
      ['Support customer confidence', 'Accurate contact details, useful service information, and a consistent brand experience help customers evaluate your business.'],
      ['Build a foundation you control', 'Your website gives you a central destination for information and campaigns that is not limited to a social profile.'],
    ],
  },
  {
    slug: 'responsive-website-design-importance',
    category: 'Website Development',
    title: 'Why responsive website design matters',
    summary: 'Responsive design helps customers navigate and use your site across phones, tablets, and computers.',
    sections: [
      ['Make content fit the screen', 'Layouts should adapt to different screen sizes so text, images, and controls remain understandable without unnecessary horizontal scrolling.'],
      ['Keep interactions comfortable', 'Touch targets, forms, and navigation should work for keyboard, pointer, and touch users. Test real pages at narrow widths.'],
      ['Check the complete experience', 'Review reading order, image behavior, loading, and key tasks on more than one device size before launch.'],
    ],
  },
  {
    slug: 'website-maintenance-best-practices',
    category: 'Website Development',
    title: 'Website maintenance best practices',
    summary: 'A practical routine for keeping a website updated, monitored, and easier to recover.',
    sections: [
      ['Plan updates and backups', 'Maintain a regular update routine and know how to restore a recent backup. Test restore procedures where practical.'],
      ['Review security and functionality', 'Check that forms, links, and important user journeys still work after updates. Use appropriate security practices for your platform and hosting.'],
      ['Monitor performance and content', 'Review page behavior, broken links, and outdated information. Make maintenance an ongoing task instead of waiting for an urgent issue.'],
    ],
  },
  {
    slug: 'seo-strategies-business-growth',
    category: 'Digital Marketing',
    title: 'SEO strategies that support business growth',
    summary: 'Build search visibility around useful content, sound technical foundations, and clear customer journeys.',
    sections: [
      ['Understand what customers need', 'Research the questions and services relevant to your audience, then create pages that answer them clearly.'],
      ['Improve technical foundations', 'Review crawlability, page structure, mobile behavior, and performance issues that make important content harder to use or discover.'],
      ['Measure meaningful outcomes', 'Use appropriate analytics to understand visits and enquiries. Search positions change, so avoid guarantees and focus on ongoing improvement.'],
    ],
  },
  {
    slug: 'online-business-visibility',
    category: 'Digital Marketing',
    title: 'Building online visibility for your business',
    summary: 'Bring your website, business profiles, and customer communication together into a consistent presence.',
    sections: [
      ['Start with accurate information', 'Align your core business description, contact details, and service information across the places customers find you.'],
      ['Use channels with purpose', 'Choose marketing channels based on your audience and goals. Keep messages consistent and direct visitors to useful next steps.'],
      ['Learn and adjust', 'Review customer questions and campaign outcomes. Use what you learn to improve content and service information over time.'],
    ],
  },
]

// 14. SOCIAL MEDIA ICONS (OFFICIAL BRAND COLORS)
function SocialLinks({ className = '' }) {
  const items = [
    {
      key: 'instagram',
      label: 'Instagram',
      href: siteConfig.instagram,
      aria: 'Visit ASK GMB Solution on Instagram',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      href: siteConfig.facebook,
      aria: 'Visit ASK GMB Solution on Facebook',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: siteConfig.linkedin,
      aria: 'Connect with ASK GMB Solution on LinkedIn',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: whatsappHref,
      aria: 'Message ASK GMB Solution on WhatsApp',
    },
    {
      key: 'youtube',
      label: 'YouTube',
      href: siteConfig.youtube,
      aria: 'Watch ASK GMB Solution on YouTube',
    },
  ]

  return (
    <div aria-label="Social media links" className={`social-links ${className}`}>
      {items.filter(({ href }) => href).map(({ key, label, href, aria }) => (
        <a
          aria-label={aria}
          className={`social-icon social-${key}`}
          href={href}
          key={key}
          rel="noopener noreferrer"
          target="_blank"
          title={label}
        >
          <BrandIcon name={key} />
        </a>
      ))}
    </div>
  )
}

function BrandIcon({ name }) {
  if (name === 'instagram') {
    return (
      <svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <rect height="18" rx="5" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
      </svg>
    )
  }
  if (name === 'facebook') {
    return (
      <svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  }
  if (name === 'linkedin') {
    return (
      <svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  return <BrandWhatsApp />
}

function BrandWhatsApp({ size = 20 }) {
  return (
    <svg aria-hidden="true" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M12.04 2a9.85 9.85 0 0 0-8.48 14.86L2.2 22l5.28-1.38A9.9 9.9 0 1 0 12.04 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-3.13.82.84-3.05-.2-.32a8.08 8.08 0 1 1 6.91 3.86Zm4.44-6.05c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.19 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

// 13. SCHEDULE A CALL BUTTON (MUST INCLUDE VISIBLE PHONE/CALL ICON BEFORE TEXT)
function ScheduleCallButton({ className = '', variant = 'primary' }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className={`schedule-control ${className}`} ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`button button-schedule button-${variant}`}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span className="btn-call-icon">
          <PhoneCall aria-hidden="true" size={18} />
        </span>
        <span className="schedule-btn-text">Schedule a Call</span>
        <ChevronDown aria-hidden="true" className={`schedule-chevron ${isOpen ? 'rotate' : ''}`} size={16} />
      </button>

      {isOpen && (
        <div className="schedule-menu shadow-premium">
          <div className="schedule-menu-header">
            <span className="schedule-menu-badge">Direct Line</span>
            <p className="schedule-menu-title">Speak with our strategist</p>
            <p className="booking-note">Connect directly with our {siteConfig.city} team to discuss your digital growth:</p>
          </div>
          <div className="schedule-options-list">
            <a className="schedule-option direct-call-opt" href={`tel:${siteConfig.phone}`}>
              <span className="opt-icon"><Phone size={17} /></span>
              <div className="opt-meta">
                <span className="opt-label">Direct Phone Call</span>
                <span className="opt-val">{siteConfig.displayPhone}</span>
              </div>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <a className="schedule-option whatsapp-opt" href={whatsappHref} rel="noopener noreferrer" target="_blank">
              <span className="opt-icon"><BrandWhatsApp size={18} /></span>
              <div className="opt-meta">
                <span className="opt-label">Instant WhatsApp Chat</span>
                <span className="opt-val">{siteConfig.displayPhone}</span>
              </div>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            {siteConfig.calendly && (
              <a
                className="schedule-option contact-opt"
                href={siteConfig.calendly}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="opt-icon"><Calendar size={17} /></span>
                <div className="opt-meta">
                  <span className="opt-label">Book on Calendly</span>
                  <span className="opt-val">Choose an available time</span>
                </div>
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            )}
            <Link className="schedule-option contact-opt" onClick={() => setIsOpen(false)} to="/contact">
              <span className="opt-icon"><Calendar size={17} /></span>
              <div className="opt-meta">
                <span className="opt-label">Request Consultation</span>
                <span className="opt-val">Send project requirements</span>
              </div>
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// 13. HEADER AND NAVIGATION
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false)
  const [activeDesktopServicesGroup, setActiveDesktopServicesGroup] = useState(0)
  const [activeMobileServicesGroup, setActiveMobileServicesGroup] = useState(null)
  const location = useLocation()
  const navServiceGroups = [
    {
      title: 'Digital Growth Services',
      services: services.filter((service) => homepageServicePaths.includes(service.path)),
    },
    {
      title: 'Technology Solutions',
      services: services.filter((service) => technologyServicePaths.includes(service.path)),
    },
  ]
  const isServiceRoute = location.pathname === '/services' || services.some((service) => service.path === location.pathname)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 20)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen)
    return () => document.body.classList.remove('mobile-menu-open')
  }, [isMobileMenuOpen])

  return (
    <>
    <div className="top-contact-bar">
      <div className="top-contact-inner page-container">
        <a
          aria-label="View ASK GMB Solution office location on Google Maps"
          className="top-contact-address"
          href={siteConfig.mapsUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <MapPin aria-hidden="true" size={15} />
          <span>{siteConfig.address}</span>
        </a>
        <div className="top-contact-details">
          <a href={`tel:${siteConfig.phone}`}>
            <PhoneCall aria-hidden="true" size={14} />
            <span>Call: {siteConfig.displayPhone}</span>
          </a>
          <span aria-hidden="true" className="top-contact-separator">•</span>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" size={15} />
            <span>{siteConfig.email}</span>
          </a>
        </div>
      </div>
    </div>
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav aria-label="Main navigation" className="navigation page-container">
        <Link aria-label={`${siteConfig.companyName} home`} className="brand" to="/">
          <img alt={siteConfig.companyName} className="brand-logo" src={logo} />
        </Link>

        <div className="desktop-nav">
          <div className="nav-links">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about">
              About Us
            </NavLink>
            <div
              className={`nav-service-dropdown ${isDesktopServicesOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setIsDesktopServicesOpen(true)}
              onMouseLeave={() => setIsDesktopServicesOpen(false)}
            >
              <div className="nav-services-trigger-row">
                <NavLink className={`nav-link ${isServiceRoute ? 'active' : ''}`} to="/services">Services</NavLink>
                <button
                  aria-expanded={isDesktopServicesOpen}
                  aria-label="Open services menu"
                  className="nav-services-toggle"
                  onClick={() => setIsDesktopServicesOpen(true)}
                  onFocus={() => setIsDesktopServicesOpen(true)}
                  type="button"
                >
                  <ChevronDown aria-hidden="true" size={15} />
                </button>
              </div>
              <div className="nav-service-menu">
                <div aria-label="Service categories" className="nav-service-categories">
                  {navServiceGroups.map((group, index) => (
                    <button
                      aria-expanded={activeDesktopServicesGroup === index}
                      className={`nav-service-category ${activeDesktopServicesGroup === index ? 'is-active' : ''}`}
                      key={group.title}
                      onFocus={() => setActiveDesktopServicesGroup(index)}
                      onMouseEnter={() => setActiveDesktopServicesGroup(index)}
                      type="button"
                    >
                      {group.title}
                      <ArrowRight aria-hidden="true" size={16} />
                    </button>
                  ))}
                </div>
                <div className="nav-service-submenu">
                  <strong>{navServiceGroups[activeDesktopServicesGroup].title}</strong>
                  {navServiceGroups[activeDesktopServicesGroup].services.map((service) => (
                      <Link
                        key={service.path}
                        onClick={() => setIsDesktopServicesOpen(false)}
                        to={service.path}
                      >
                        {service.title}
                      </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink className={({ isActive }) => `nav-link nav-link-industries ${isActive ? 'active' : ''}`} to="/industries-we-serve">
              Industries <ChevronDown aria-hidden="true" size={14} />
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/our-process">
              Our Process
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/blogs">
              Blogs
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact">
              Contact Us
            </NavLink>
          </div>
          <div className="nav-cta-wrapper">
            <ScheduleCallButton className="nav-schedule" />
          </div>
        </div>

        <button
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          type="button"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div
          className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
          id="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="mobile-nav-inner" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-nav-links">
              <NavLink className="mobile-link" to="/">Home</NavLink>
              <NavLink className="mobile-link" to="/about">About Us</NavLink>
              <div className="mobile-services-group">
                <div className="mobile-services-heading">
                  <NavLink className="mobile-link" to="/services">Services</NavLink>
                  <button
                    aria-expanded={isMobileServicesOpen}
                    aria-label="Show service links"
                    className="mobile-services-toggle"
                    onClick={() => setIsMobileServicesOpen((open) => !open)}
                    type="button"
                  >
                    <ChevronDown aria-hidden="true" size={18} />
                  </button>
                </div>
                {isMobileServicesOpen && (
                  <div className="mobile-service-menu">
                    {navServiceGroups.map((group, index) => (
                      <div className="mobile-service-menu-group" key={group.title}>
                        <button
                          aria-expanded={activeMobileServicesGroup === index}
                          className={`mobile-service-category ${activeMobileServicesGroup === index ? 'is-active' : ''}`}
                          onClick={() => setActiveMobileServicesGroup((active) => active === index ? null : index)}
                          type="button"
                        >
                          {group.title}
                          <ChevronDown aria-hidden="true" size={16} />
                        </button>
                        {activeMobileServicesGroup === index && group.services.map((service) => (
                          <Link key={service.path} onClick={() => setIsMobileMenuOpen(false)} to={service.path}>
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <NavLink className="mobile-link" to="/industries-we-serve">Industries We Serve</NavLink>
              <NavLink className="mobile-link" to="/our-process">Our Process</NavLink>
              <NavLink className="mobile-link" to="/blogs">Blogs</NavLink>
              <NavLink className="mobile-link" to="/contact">Contact Us</NavLink>
            </div>

            <div className="mobile-drawer-footer">
              <ScheduleCallButton className="mobile-schedule-btn" />
              <div className="mobile-quick-contact">
                <a className="mobile-phone-link" href={`tel:${siteConfig.phone}`}>
                  <Phone size={17} /> {siteConfig.displayPhone}
                </a>
                <a className="mobile-wa-link" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                  <BrandWhatsApp size={18} /> Message on WhatsApp
                </a>
              </div>
              <SocialLinks className="mobile-socials" />
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  )
}

function Metadata({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    const pageTitle = `${title} | ${siteConfig.companyName}`
    document.title = pageTitle
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.append(metaDescription)
    }
    metaDescription.content = description

    const updateMeta = (selector, attribute, value) => {
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, selector.includes('property=') ? selector.match(/property="([^"]+)"/)[1] : selector.match(/name="([^"]+)"/)[1])
        document.head.append(tag)
      }
      tag.content = value
    }

    updateMeta('meta[property="og:title"]', 'property', pageTitle)
    updateMeta('meta[property="og:description"]', 'property', description)
    updateMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
    updateMeta('meta[name="twitter:title"]', 'name', pageTitle)
    updateMeta('meta[name="twitter:description"]', 'name', description)

    if (siteConfig.siteUrl) {
      const pageUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${location.pathname}`
      updateMeta('meta[property="og:url"]', 'property', pageUrl)
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = pageUrl
    } else {
      document.querySelector('meta[property="og:url"]')?.remove()
      document.querySelector('link[rel="canonical"]')?.remove()
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      name: siteConfig.companyName,
      description,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      url: siteConfig.siteUrl || undefined,
      hasMap: siteConfig.mapsUrl || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.streetAddress,
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        postalCode: siteConfig.postalCode,
        addressCountry: siteConfig.countryCode,
      },
      sameAs: [siteConfig.instagram, siteConfig.facebook, siteConfig.linkedin, siteConfig.youtube].filter(Boolean),
    }
    let structuredData = document.querySelector('#local-business-schema')
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'local-business-schema'
      structuredData.type = 'application/ld+json'
      document.head.append(structuredData)
    }
    structuredData.textContent = JSON.stringify(jsonLd)
  }, [description, location.pathname, title])

  return null
}

// 2. TYPOGRAPHY - SECTION HEADINGS (38–46px)
function SectionHeading({ eyebrow, title, description, centered = true }) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className="eyebrow-container">
          <span className="eyebrow-badge">
            <Sparkles className="eyebrow-sparkle" size={14} />
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-subtitle">{description}</p>}
    </div>
  )
}

function PageHero({ eyebrow, title, description, image, images, children }) {
  const prefersReducedMotion = useReducedMotion()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length < 2 || prefersReducedMotion) return undefined

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((index) => (index + 1) % images.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [images, prefersReducedMotion])

  const activeImage = images?.[activeImageIndex] || { src: image, alt: title }

  return (
    <section className="page-hero">
      <div className="page-hero-bg-glow" />
      <div className="page-container page-hero-grid">
        <div className="page-hero-copy">
          <Breadcrumbs current={title} />
          <span className="eyebrow-badge">
            <Sparkles size={14} /> {eyebrow}
          </span>
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-desc">{description}</p>
          <div className="page-hero-actions">
            {children || (
              <>
                <Link className="button button-orange" to="/contact">
                  Talk to Our Team <ArrowRight size={18} />
                </Link>
                <ScheduleCallButton />
              </>
            )}
          </div>
        </div>
        <div className="page-hero-image-wrap">
          <div className={`page-hero-image-frame shadow-premium ${images?.length > 1 ? 'has-carousel' : ''}`}>
            <motion.img
              animate={{ opacity: 1, scale: 1 }}
              alt={activeImage.alt}
              className="page-hero-image"
              fetchPriority={activeImageIndex === 0 ? 'high' : 'auto'}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
              key={activeImage.src}
              src={activeImage.src}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
            {images?.length > 1 && (
              <div aria-label="Choose an industry image" className="page-hero-carousel-indicators" role="group">
                {images.map((slide, index) => (
                  <button
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={index === activeImageIndex}
                    className={index === activeImageIndex ? 'is-active' : ''}
                    key={slide.src}
                    onClick={() => setActiveImageIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// 4. TRUST AND HIGHLIGHTS SECTION
function TrustSection() {
  return (
    <section aria-label="ASK GMB Solution at a glance" className="reference-stats-section">
      <div className="page-container">
        <div className="reference-stat-bar">
          {homeStats.map(({ value, label, icon: Icon }) => (
            <div className="reference-stat" key={label}>
              <span className="reference-stat-icon"><Icon aria-hidden="true" size={38} /></span>
              <span className="reference-stat-copy">
                <strong>{value}</strong>
                <span>{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3. HERO SECTION - INTERACTIVE 3D DASHBOARD COMPOSITION
function HeroDashboardComposition() {
  return (
    <div aria-label="Digital growth and technology services" className="reference-hero-visual">
      <img
        alt="Digital growth dashboard with Google Business Profile management, local SEO, website development and growth services"
        className="reference-hero-laptop"
        fetchPriority="high"
        src={homepageHeroImage}
      />
    </div>
  )
}

// 9. WORK PROCESS SECTION
function ProcessSection() {
  return (
    <section className="reference-home-process">
      <div className="page-container">
        <div className="reference-process-intro">
          <div className="reference-process-copy">
            <span className="reference-eyebrow">OUR PROCESS</span>
            <h2>How We Work</h2>
            <p>A simple, proven process to grow your online presence and get better results.</p>
            <Link className="reference-button reference-button-primary" to="/our-process">
              Learn More About Our Process <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="reference-process-visual">
            <img alt="Laptop displaying local search analytics and business growth" loading="lazy" src={laptopGrowthImage} />
            <img alt="" className="reference-process-plant" loading="lazy" src={processPlantImage} />
          </div>
        </div>
        <div className="reference-process-cards">
          {processSteps.map(({ step, title, desc, icon: Icon }, index) => (
            <div className="reference-process-item" key={step}>
              <article className="reference-process-card">
                <span className="reference-process-icon"><Icon aria-hidden="true" size={30} /></span>
                <span className="reference-process-number">{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
              {index < processSteps.length - 1 && (
                <ArrowRight aria-hidden="true" className="reference-process-arrow" size={24} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCategories() {
  return (
    <section aria-label="Our main service areas" className="reference-category-section">
      <div className="page-container reference-category-grid">
        <Link className="reference-category-card reference-category-growth" to="/google-business-profile">
          <span className="reference-category-icon"><BarChart3 aria-hidden="true" size={46} /></span>
          <div className="reference-category-copy">
            <h2>Digital Growth</h2>
            <p>Be found, get more patients and grow your business.</p>
          </div>
          <span aria-hidden="true" className="reference-category-arrow"><ArrowRight size={22} /></span>
        </Link>
        <Link className="reference-category-card reference-category-technology" to="/website-design-development">
          <span className="reference-category-icon"><Code2 aria-hidden="true" size={46} /></span>
          <div className="reference-category-copy">
            <h2>Technology Solutions</h2>
            <p>Build, manage and scale your digital presence.</p>
          </div>
          <span aria-hidden="true" className="reference-category-arrow"><ArrowRight size={22} /></span>
        </Link>
      </div>
    </section>
  )
}

function ReferenceServiceCard({ service, title = service.title, description, showButton = false, icon: IconOverride }) {
  const Icon = IconOverride || service.icon

  return (
    <article className="reference-service-card">
      <Link
        aria-label={`Learn more about ${title}`}
        className={`reference-service-card-link ${showButton ? 'has-button' : ''}`}
        to={service.path}
      >
        <span className="reference-service-icon"><Icon aria-hidden="true" size={30} /></span>
        <h3>{title}</h3>
        <p>{description || service.cardDescription || service.description}</p>
        {showButton ? (
          <span aria-hidden="true" className="reference-service-button">
            Learn More <ArrowRight size={17} />
          </span>
        ) : (
          <span aria-hidden="true" className="reference-service-arrow"><ArrowRight size={20} /></span>
        )}
      </Link>
    </article>
  )
}

function HomeAboutSection() {
  return (
    <section aria-label="About ASK GMB Solution" className="reference-home-about">
      <div className="page-container">
        <div className="reference-home-about-card">
          <div className="reference-home-about-copy">
            <span className="reference-eyebrow">ABOUT ASK GMB SOLUTION</span>
            <h2>Your Trusted Partner for Digital Growth</h2>
            <p>
              ASK GMB Solution helps businesses build a strong online presence with result-driven digital
              marketing and modern technology solutions.
            </p>
            <Link className="reference-button reference-button-primary" to="/about">
              Know More About Us <ArrowRight aria-hidden="true" size={19} />
            </Link>
          </div>
          <div className="reference-home-about-visual">
            <img
              alt="Modern glass business building with Google Business Profile and growth analytics"
              loading="lazy"
              src={growthBuildingImage}
            />
          </div>
          <div aria-label="ASK GMB Solution achievements" className="reference-home-about-stats" role="group">
            {homeStats.map(({ value, label, icon: Icon }) => (
              <div className="reference-mini-stat" key={label}>
                <Icon aria-hidden="true" size={42} />
                <span><strong>{value}</strong><span>{label}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeServicesSection() {
  const serviceTitles = {
    '/local-seo': 'Local SEO Services',
    '/search-engine-optimization': 'Search Engine Optimization (SEO)',
    '/gbp-verification-suspension': 'GBP Verification & Suspension Assistance',
  }

  return (
    <section className="reference-home-services" id="services">
      <div className="page-container">
        <div className="reference-section-heading">
          <span className="reference-eyebrow">OUR SERVICES</span>
          <h2>Digital Growth Services for Your Business</h2>
          <p>End-to-end digital solutions to improve your online visibility, attract more customers and grow your business.</p>
        </div>
        <div className="reference-services-grid reference-services-grid-six">
          {homepageServices.map((service) => (
            <ReferenceServiceCard
              description={referenceServiceDescriptions[service.path]}
              icon={referenceServiceIcons[service.path]}
              key={service.path}
              service={service}
              title={serviceTitles[service.path] || service.title}
            />
          ))}
        </div>
        <div className="reference-section-action">
          <Link className="reference-button reference-button-primary" to="/services">
            View All Services <ArrowRight aria-hidden="true" size={19} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function HomeIndustriesSection() {
  return (
    <section className="reference-home-industries">
      <div className="page-container">
        <div className="reference-home-industries-intro">
          <div className="reference-home-industries-copy">
            <span className="reference-eyebrow">
              <Building2 aria-hidden="true" size={13} />
              INDUSTRIES WE SERVE
            </span>
            <h2>Solutions Tailored<br />for <span>Your Industry</span></h2>
            <p>Industry-focused digital and technology solutions that drive measurable growth.</p>
          </div>
          <img
            alt="Modern glass office building surrounded by trees"
            loading="lazy"
            src={industriesHeroImage}
          />
        </div>
        <div className="reference-industry-focus-grid reference-home-industry-grid">
          {industryFocusAreas.map((industry) => (
            <IndustryFocusCard industry={industry} key={industry.id} variant="home" />
          ))}
        </div>
        <div className="reference-section-action">
          <Link className="reference-button reference-button-outline" to="/industries-we-serve">
            View All Industries <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function HomeWhySection() {
  return (
    <section className="reference-home-why">
      <div className="page-container">
        <div className="reference-section-heading">
          <span className="reference-eyebrow">WHY CHOOSE US</span>
          <h2>Built Around What Actually Drives Results</h2>
          <p>We combine deep local SEO technicality with high-standard web engineering to deliver tangible business outcomes.</p>
        </div>
        <div className="reference-why-grid">
          {whyChooseFeatures.map(({ title, desc, icon: Icon, image }) => (
            <article className="reference-why-card" key={title}>
              <div className="reference-why-image"><img alt={title} loading="lazy" src={image} /></div>
              <div className="reference-why-content">
                <span className="reference-why-icon"><Icon aria-hidden="true" size={23} /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeContactSection() {
  return (
    <section className="reference-home-contact">
      <div className="page-container">
        <div className="reference-home-contact-hero">
          <div className="reference-home-contact-copy">
            <span className="reference-eyebrow">GET IN TOUCH</span>
            <h2>Let’s Grow Your Business Together</h2>
            <p>Have a project in mind? Get in touch with our team to discuss your goals and find the right digital solution.</p>
          </div>
          <img
            alt="Laptop showing local business growth analytics between office plants"
            loading="lazy"
            src={servicesHeroImage}
          />
        </div>
        <div className="reference-contact-quick-links">
          <a href={`tel:${siteConfig.phone}`}>
            <Phone aria-hidden="true" size={28} />
            <span><strong>Call Us</strong><small>Get in touch with our experts.</small></span>
          </a>
          <a href={whatsappHref} rel="noopener noreferrer" target="_blank">
            <BrandWhatsApp size={28} />
            <span><strong>WhatsApp</strong><small>Chat with us instantly.</small></span>
          </a>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" size={28} />
            <span><strong>Email Us</strong><small>Write to us for any enquiries.</small></span>
          </a>
        </div>
        <div className="reference-home-contact-grid">
          <ContactForm compact />
          <aside className="reference-map-card">
            <div className="reference-map-heading">
              <MapPin aria-hidden="true" size={23} />
              <h3>Our Location</h3>
            </div>
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title={`ASK GMB Solution office location in ${siteConfig.city}`}
            />
            <p>{siteConfig.address}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

const faqItems = [
  {
    question: 'Who does ASK GMB Solution work with?',
    answer: 'We support healthcare businesses such as doctors, clinics, and hospitals, as well as local businesses, startups, and service providers.',
  },
  {
    question: 'Can you help improve our Google Maps visibility?',
    answer: 'We review your profile, website, and local presence, then recommend practical improvements. Search positions vary by location and competition, so we never promise a particular rank.',
  },
  {
    question: 'Do you build both React and WordPress websites?',
    answer: 'Yes. We can help choose an approach based on your content workflow, features, integrations, and long-term maintenance needs.',
  },
  {
    question: 'Can we work with you if we already have a website or profile?',
    answer: 'Absolutely. We can review what you already have and focus on useful improvements before recommending a rebuild.',
  },
  {
    question: 'How do we get started?',
    answer: 'Share your goals through the contact form, phone, or WhatsApp. We’ll learn about your business and discuss practical next steps.',
  },
]

function FaqSection() {
  return (
    <section className="content-section faq-home-section">
      <div className="page-container faq-home-layout">
        <div className="faq-home-intro">
          <span className="eyebrow-badge"><Sparkles size={14} /> GOOD TO KNOW</span>
          <h2 className="section-title">A few questions, answered.</h2>
          <p className="section-subtitle">A clear, considered start to your next digital project.</p>
          <Link className="button button-secondary" to="/contact">Talk to our team <ArrowRight size={17} /></Link>
        </div>
        <div className="faq-accordion-group">
          {faqItems.map(({ question, answer }) => (
            <details className="faq-item shadow-card" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// 12. CTA SECTION (NAVY & BLUE GRADIENT)
function FinalCta({
  title = 'Ready to Grow Your Business Online?',
  description = "Let's build a powerful digital presence for your business.",
}) {
  return (
    <section className="final-cta-section">
      <div className="final-cta-glow-left" />
      <div className="final-cta-glow-right" />
      <div className="page-container">
        <div className="final-cta-box shadow-premium">
          <div className="final-cta-content">
            <span className="eyebrow-badge eyebrow-light">
              <Sparkles size={14} /> YOUR DIGITAL GROWTH PARTNER
            </span>
            <h2 className="cta-headline">{title}</h2>
            <p className="cta-subheading">{description}</p>
            <div className="cta-btn-group">
              <Link className="button button-orange button-large" to="/contact">
                Get Started <ArrowRight size={18} />
              </Link>
              <ScheduleCallButton className="cta-schedule-btn" />
            </div>
            <div className="cta-trust-strip">
              <span><Check size={16} /> Google Business Profile Management</span>
              <span><Check size={16} /> Local SEO Strategy</span>
              <span><Check size={16} /> Modern React & WordPress Web</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// HOME PAGE
function HomePage() {
  return (
    <>
      <Metadata
        description={`Complete digital growth and technology solutions for doctors, clinics, hospitals and businesses from ASK GMB Solution in ${siteConfig.city}.`}
        title={`Digital Marketing Agency in ${siteConfig.city}`}
      />
      <main className="reference-home">
        <section className="reference-home-hero">
          <div aria-hidden="true" className="reference-hero-wave" />
          <div className="page-container reference-home-hero-grid">
            <div className="reference-home-hero-copy">
              <span className="reference-eyebrow">DIGITAL GROWTH &amp; TECHNOLOGY AGENCY</span>
              <h1>
                Grow Your Digital<br />
                Presence.<br />
                <em>Build Your Future.</em>
              </h1>
              <p>
                Complete digital growth and technology solutions for Doctors, Clinics, Hospitals and Businesses.
              </p>
              <div className="reference-home-hero-actions">
                <Link className="reference-button reference-button-primary" to="/services">
                  Explore Our Services <ArrowRight aria-hidden="true" size={19} />
                </Link>
                <Link className="reference-button reference-button-outline" to="/our-process">
                  <Play aria-hidden="true" fill="currentColor" size={16} /> See How We Work
                </Link>
              </div>
            </div>
            <HeroDashboardComposition />
          </div>
        </section>
        <TrustSection />
        <ServiceCategories />
        <HomeAboutSection />
        <HomeServicesSection />
        <HomeIndustriesSection />
        <HomeWhySection />
        <ProcessSection />
        <FinalCta
          description="Tell us what you want to improve. We’ll map out practical next steps for your business, customers, and team."
          title="Ready to Grow Your Business?"
        />
        <FaqSection />
        <HomeContactSection />
      </main>
    </>
  )
}

function Breadcrumbs({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="reference-breadcrumbs">
      <Link to="/">Home</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

function ServicesPage() {
  const serviceTitles = {
    '/local-seo': 'Local SEO Services',
    '/search-engine-optimization': 'Search Engine Optimization (SEO)',
    '/gbp-verification-suspension': 'GBP Verification & Suspension Assistance',
    '/website-design-development': 'Website Development',
  }

  return (
    <>
      <Metadata
        description={`Explore digital growth and technology services from ASK GMB Solution in ${siteConfig.city}, including Google Business Profile management, Local SEO and web development.`}
        title={`Digital Marketing & Website Development Services in ${siteConfig.city}`}
      />
      <main className="reference-services-page">
        <section className="reference-services-hero">
          <div className="page-container reference-services-hero-grid">
            <div className="reference-services-hero-copy">
              <Breadcrumbs current="Services" />
              <h1>Our Services</h1>
              <p>End-to-end digital growth and technology solutions to strengthen your online presence and grow your business.</p>
            </div>
            <div className="reference-services-hero-visual">
              <img
                alt="Laptop displaying local ranking and business growth analytics between office plants"
                fetchPriority="high"
                src={servicesHeroImage}
              />
            </div>
          </div>
        </section>
        <div className="page-container">
          <div aria-label="How we work" className="reference-services-promise">
            <div><Target aria-hidden="true" size={32} /><strong>Result-Driven<br />Approach</strong></div>
            <div><Users aria-hidden="true" size={32} /><strong>Healthcare<br />Industry Expertise</strong></div>
            <div><ShieldCheck aria-hidden="true" size={32} /><strong>Transparent<br />Process</strong></div>
            <div><Headphones aria-hidden="true" size={32} /><strong>Dedicated<br />Support</strong></div>
          </div>
        </div>
        <section className="reference-services-catalog">
          <div className="page-container">
            <div className="reference-section-heading">
              <span className="reference-eyebrow">OUR SERVICES</span>
              <h2>Complete Digital Growth Solutions</h2>
            </div>
            <div className="reference-services-grid reference-services-grid-nine">
              {servicesPageHighlights.map((service) => (
                <ReferenceServiceCard
                  description={referenceServiceDescriptions[service.path]}
                  icon={referenceServiceIcons[service.path]}
                  key={service.path}
                  service={service}
                  showButton
                  title={serviceTitles[service.path] || service.title}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function IndustryFocusCard({ industry, variant = 'main' }) {
  const isHome = variant === 'home'
  const Icon = industry.id === 'healthcare' ? Hospital : industry.icon
  const ServiceCheck = isHome ? Check : CheckCircle2
  const image = isHome ? industry.homeImage || industry.image : industry.image
  const description = isHome ? industry.homeDescription || industry.description : industry.description
  const services = isHome ? industry.homeServices || industry.services : industry.services

  return (
    <article
      className={`reference-industry-focus-card reference-industry-focus-card-${variant} reference-industry-focus-card-${industry.id}`}
      id={industry.id}
    >
      <img alt={industry.title} loading="lazy" src={image} />
      <div className="reference-industry-focus-content">
        <span className="reference-industry-icon"><Icon aria-hidden="true" size={24} /></span>
        <h3>{industry.title}</h3>
        <p>{description}</p>
        <ul>
          {services.map((service) => (
            <li key={service}><ServiceCheck aria-hidden="true" size={16} />{service}</li>
          ))}
        </ul>
        <Link className="reference-button reference-button-primary" to="/services">
          Explore {industry.id === 'healthcare' ? 'Healthcare' : 'Business'} Solutions
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  )
}

function IndustriesPage() {
  return (
    <>
      <Metadata
        description={`ASK GMB Solution supports doctors, clinics, hospitals, local businesses, startups, and service providers in ${siteConfig.city} with thoughtful digital growth and technology.`}
        title="Industries We Serve | Healthcare & Local Business"
      />
      <main className="reference-industries-page">
        <section className="reference-industries-hero">
          <div className="page-container reference-industries-hero-grid">
            <div className="reference-industries-hero-copy">
              <Breadcrumbs current="Industries" />
              <h1>Industries We Serve</h1>
              <p>Industry-focused digital and technology solutions that drive measurable growth for healthcare and general businesses.</p>
            </div>
            <img
              alt="Modern glass office building with trees"
              fetchPriority="high"
              src={industriesHeroImage}
            />
          </div>
        </section>
        <div className="page-container">
          <div aria-label="Our industry-focused approach" className="reference-industries-promise">
            <div><Target aria-hidden="true" size={31} /><strong>Industry-Specific<br />Strategies</strong></div>
            <div><Users aria-hidden="true" size={31} /><strong>Experienced<br />Team</strong></div>
            <div><BarChart3 aria-hidden="true" size={31} /><strong>Result-Driven<br />Solutions</strong></div>
            <div><ShieldCheck aria-hidden="true" size={31} /><strong>Trusted by<br />Businesses</strong></div>
          </div>
        </div>
        <section className="reference-industries-content">
          <div className="page-container">
            <div className="reference-section-heading">
              <span className="reference-eyebrow">OUR INDUSTRIES</span>
              <h2>Delivering Digital Growth Across Key Industries</h2>
            </div>
            <div className="reference-industry-focus-grid">
              {industryFocusAreas.map((industry) => (
                <IndustryFocusCard industry={industry} key={industry.id} variant="main" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function ProcessPage() {
  return (
    <>
      <Metadata
        description="See how ASK GMB Solution understands your goals, plans a focused strategy, delivers the work, and continually tracks growth."
        title="Our Process | A Clear Digital Growth Roadmap"
      />
      <main className="reference-process-page">
        <section className="reference-process-page-hero">
          <div className="page-container reference-process-page-hero-grid">
            <div className="reference-process-page-copy">
              <Breadcrumbs current="Our Process" />
              <h1>Our Process</h1>
              <p>A clear, structured and result-oriented approach to grow your business online.</p>
            </div>
          </div>
        </section>
        <section aria-label="Our four-step process" className="reference-process-page-steps">
          <div className="page-container">
            <div className="reference-process-flow">
              <svg aria-hidden="true" className="reference-process-flow-path" preserveAspectRatio="none" viewBox="0 0 900 170">
                <path d="M112 31 C190 10 230 149 337 149 S470 28 562 28 S690 147 787 147" />
              </svg>
              {processSteps.map(({ step, title, desc, icon: Icon }, index) => (
                <article className={`reference-process-flow-card step-${index + 1}`} key={step}>
                  <span className="reference-process-flow-node"><Icon aria-hidden="true" size={31} /></span>
                  <span className="reference-process-number">{step}</span>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <Metadata
        description="Meet ASK GMB Solution, a digital growth and technology agency focused on helping healthcare and local businesses achieve real business results."
        title="About ASK GMB Solution | Digital Growth & Technology"
      />
      <main className="reference-about-page">
        <section className="reference-about-page-hero">
          <div className="page-container reference-about-page-hero-inner">
            <div className="reference-about-page-copy">
              <Breadcrumbs current="About Us" />
              <span className="reference-eyebrow">ABOUT ASK GMB SOLUTION</span>
              <h1>About<br />ASK GMB Solution</h1>
              <p>A digital growth and technology agency focused on real business results.</p>
            </div>
            <img
              alt="ASK GMB Solution office reception with the company logo"
              fetchPriority="high"
              src={officeReceptionImage}
            />
          </div>
        </section>
        <section className="reference-about-story-section">
          <div className="page-container">
            <div className="reference-about-story">
              <img
                alt="ASK GMB Solution team collaborating around a laptop"
                className="reference-about-team-image"
                loading="lazy"
                src={aboutTeamImage}
              />
              <div className="reference-about-story-copy">
                <span className="reference-eyebrow">WHO WE ARE</span>
                <h2>Your Partner for Digital Growth &amp; Technology</h2>
                <p>
                  ASK GMB Solution helps healthcare businesses and general businesses build a strong
                  online presence with result-driven digital marketing and modern technology solutions.
                </p>
              </div>
              <div className="reference-about-pillars">
                <article>
                  <span><Target aria-hidden="true" size={27} /></span>
                  <div><h3>Our Mission</h3><p>To empower businesses with powerful digital solutions that drive real growth.</p></div>
                </article>
                <article>
                  <span><Eye aria-hidden="true" size={27} /></span>
                  <div><h3>Our Vision</h3><p>To be a trusted and leading digital growth and technology agency for healthcare and local businesses.</p></div>
                </article>
                <article>
                  <span><Gem aria-hidden="true" size={27} /></span>
                  <div><h3>Our Values</h3><p>Trust, Transparency, Results, Innovation and Long-Term Partnership.</p></div>
                </article>
              </div>
            </div>
            <div aria-label="ASK GMB Solution achievements" className="reference-about-stats">
              {aboutStats.map(({ value, label, icon: Icon }) => (
                <div className="reference-about-stat" key={label}>
                  <Icon aria-hidden="true" size={39} />
                  <span><strong>{value}</strong><span>{label}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// SERVICE DETAIL TEMPLATE
function ServiceDetailPage({ service }) {
  const Icon = service.icon
  return (
    <>
      <Metadata description={service.description} title={service.seoTitle || service.title} />
      <main>
        <PageHero
          description={service.description}
          eyebrow={service.category.toUpperCase()}
          image={laptopGrowthImage}
          title={service.title}
        >
          <Link className="button button-orange button-large" to="/contact">
            Discuss Your Project <ArrowRight size={18} />
          </Link>
          <ScheduleCallButton />
        </PageHero>

        <section className="content-section">
          <div className="page-container service-detail-layout">
            <div className="service-detail-copy">
              <div className="detail-icon-bubble shadow-premium">
                <Icon size={32} />
              </div>
              <span className="eyebrow-badge"><Sparkles size={14} /> HOW WE CAN HELP</span>
              <h2>How {service.title} Supports Your Goals</h2>
              <p className="lead-text">{service.description}</p>
              <p>
                {service.category === 'Digital Growth'
                  ? 'We review your current profile, website and customer journey, then prioritize practical improvements around accurate information, local relevance and useful next steps.'
                  : 'We start with your audience, current tools and required workflows, then shape a responsive solution with clear delivery and maintenance expectations.'}
              </p>
            </div>

            <div className="feature-panel shadow-premium">
              <span className="feature-panel-tag">SERVICE PLAN</span>
              <h3>What We Deliver</h3>
              <ul className="detail-feature-list">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 className="feat-check" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link className="button button-orange mt-auto" to="/contact">
                Enquire About {service.title} <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="content-section soft-section">
          <div className="page-container">
            <SectionHeading
              centered
              description="We use a structured workflow and keep each stage aligned with your objectives."
              eyebrow="OUR WORKFLOW"
              title="How We Execute This Service"
            />
            <div className="process-grid">
              {processSteps.slice(0, 4).map((item) => (
                <div className="process-card shadow-card" key={item.step}>
                  <div className="process-number-badge">{item.step}</div>
                  <h3 className="process-step-title">{item.title}</h3>
                  <p className="process-step-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="page-container faq-section-wrapper">
            <SectionHeading
              centered
              description="Common inquiries about our scope, timelines, and execution parameters."
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title="Key Things to Consider"
            />
            <div className="faq-accordion-group">
              <details className="faq-item shadow-card">
                <summary>What does {service.title} include?</summary>
                <p>{service.description} We confirm the final scope and milestones with you before work begins.</p>
              </details>
              <details className="faq-item shadow-card">
                <summary>How do you decide what to prioritize?</summary>
                <p>
                  We review your current setup, goals and customer needs first. Recommendations are tailored to
                  {` ${service.category.toLowerCase()}`} and agreed before implementation.
                </p>
              </details>
              <details className="faq-item shadow-card">
                <summary>Can you work with what I already have?</summary>
                <p>Yes. We can review your existing website, profile or tools and recommend improvements without assuming you need to replace them.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="reference-related-services">
          <div className="page-container">
            <div className="reference-section-heading">
              <span className="reference-eyebrow">RELATED SERVICES</span>
              <h2>Other ways we can help</h2>
            </div>
            <div className="reference-services-grid reference-services-grid-three">
              {services
                .filter((item) => item.category === service.category && item.path !== service.path)
                .slice(0, 3)
                .map((item) => (
                  <ReferenceServiceCard
                    description={referenceServiceDescriptions[item.path]}
                    key={item.path}
                    service={item}
                    showButton
                  />
                ))}
            </div>
          </div>
        </section>

        <FinalCta title={`Let’s Discuss Your ${service.title}.`} />
      </main>
    </>
  )
}

// MOBILE APP PAGE
function MobileAppPage() {
  const appService = services.find((s) => s.title === 'Mobile App Development')
  return (
    <>
      <Metadata
        description="Custom mobile app development for Android and iOS. Specializing in healthcare applications, appointment booking workflows, and business utility apps."
        title="Mobile App Development Services"
      />
      <main>
        <PageHero
          description="Build intuitive, high-performance mobile application experiences for Android and iOS tailored around patient workflows, appointments, and seamless customer transactions."
          eyebrow="MOBILE APP DEVELOPMENT"
          image={laptopGrowthImage}
          title="Mobile Experiences Built Around Your Users"
        />

        <section className="content-section">
          <div className="page-container">
            <SectionHeading
              centered
              description="We analyze user journeys, required features, and platform specifics to engineer robust mobile solutions."
              eyebrow="APP CAPABILITIES"
              title="Tailored Mobile Solutions"
            />
            <div className="why-choose-grid">
              {[
                { title: 'Android App Development', desc: 'Native-feel applications targeting the massive Android smartphone ecosystem in India.', icon: Smartphone },
                { title: 'iOS App Development', desc: 'Refined, secure iPhone app experiences built to Apple Human Interface Guidelines.', icon: Smartphone },
                { title: 'Healthcare & Patient Apps', desc: 'Secure patient scheduling, prescription viewing, and consultation access apps.', icon: HeartPulse },
                { title: 'Appointment Booking Apps', desc: 'Streamlined booking systems with real-time calendar slot management.', icon: Calendar },
                { title: 'Business Workflow Apps', desc: 'Internal staff utilities, field reporting, and operational efficiency mobile tools.', icon: Rocket },
                { title: 'Custom Mobile Solutions', desc: 'API-driven bespoke architectures tailored to unique commercial business models.', icon: Code2 },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div className="why-card shadow-card" key={item.title}>
                    <div className="why-icon-box"><Icon size={26} /></div>
                    <h3 className="why-card-title">{item.title}</h3>
                    <p className="why-card-desc">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="content-section soft-section">
          <div className="page-container service-detail-layout">
            <div className="service-detail-copy">
              <span className="eyebrow-badge"><Sparkles size={14} /> MOBILE ARCHITECTURE</span>
              <h2>Plan an App Around Your Real User Needs</h2>
              <p>{appService.description} We focus first on core user retention, fast screens, and clean navigation before committing to complex codebases.</p>
              <p>We work closely with you to establish precise requirements, scalable backend APIs, and clear milestones.</p>
            </div>
            <div className="feature-panel shadow-premium">
              <span className="feature-panel-tag">Included Features</span>
              <h3>Core App Deliverables</h3>
              <ul className="detail-feature-list">
                {appService.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 className="feat-check" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link className="button button-orange mt-auto" to="/contact">
                Discuss an App Project <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <FinalCta
          description="Tell us what you want to make easier for your customers, patients, or team."
          title="Have a Mobile App Idea?"
        />
      </main>
    </>
  )
}

// BLOG PAGE
function BlogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(articles.map((article) => article.category))]

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category
    const matchesSearch = `${article.title} ${article.summary}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Metadata
        description="Practical insights, actionable guides, and best practices on Google Business Profile optimization, Local SEO, and modern website development from ASK GMB Solution."
        title="Digital Growth & Local SEO Blogs"
      />
      <main>
        <PageHero
          description="Explore practical insights, algorithm guidance, and actionable strategies on local search, healthcare marketing, and website engineering."
          eyebrow="ASK GMB SOLUTION KNOWLEDGE HUB"
          image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=80"
          title="Insights & Strategies for Digital Growth"
        />

        <section className="content-section">
          <div className="page-container">
            <div className="blog-filter-bar">
              <div className="blog-search-box shadow-card">
                <Search size={18} />
                <input
                  aria-label="Search articles"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles on Google Business Profile, Local SEO, Web..."
                  type="search"
                  value={search}
                />
              </div>

              <div className="category-chips">
                {categories.map((cat) => (
                  <button
                    className={`cat-chip ${category === cat ? 'active' : ''}`}
                    key={cat}
                    onClick={() => setCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <article className="article-card shadow-card" key={article.slug}>
                  <div className="article-meta-row">
                    <span className="article-category">{article.category}</span>
                  </div>
                  <h3 className="article-title">
                    <Link to={`/blogs/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="article-summary">{article.summary}</p>
                  <div className="article-footer">
                    <Link className="read-more-link" to={`/blogs/${article.slug}`}>
                      <span>Read Practical Guide</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="no-results-box">
                <Search size={36} />
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or select "All" categories.</p>
              </div>
            )}
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  )
}

// BLOG ARTICLE DETAIL PAGE
function BlogArticlePage({ article }) {
  return (
    <>
      <Metadata description={article.summary} title={article.title} />
      <main>
        <section className="article-hero-section">
          <div className="page-container article-hero-inner">
            <div className="article-breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blogs">Blogs</Link>
              <span>/</span>
              <span className="current">{article.category}</span>
            </div>
            <span className="eyebrow-badge"><Sparkles size={14} /> {article.category}</span>
            <h1 className="article-main-title">{article.title}</h1>
            <p className="article-lead-summary">{article.summary}</p>
          </div>
        </section>

        <article className="article-body-section">
          <div className="page-container article-layout">
            <div className="article-content-main">
              {article.sections.map(([heading, text], index) => (
                <section className="article-section-block" key={index}>
                  <h2>{heading}</h2>
                  <p>{text}</p>
                </section>
              ))}

              <div className="article-cta-box shadow-card">
                <h3>Need tailored advice for your local business?</h3>
                <p>We provide straightforward Google Business Profile optimization and high-performance website engineering for businesses in {siteConfig.city} and across {siteConfig.country}.</p>
                <div className="article-cta-actions">
                  <Link className="button button-orange" to="/contact">
                    Talk With Us <ArrowRight size={17} />
                  </Link>
                  <a className="button button-secondary" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                    <BrandWhatsApp size={18} /> Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <aside className="article-sidebar">
              <div className="sidebar-box shadow-card">
                <h3>About ASK GMB Solution</h3>
                <p>A digital growth agency based in {siteConfig.neighborhood}, {siteConfig.city}. We help doctors, clinics, and businesses improve their local online presence.</p>
                <ScheduleCallButton className="w-100" />
              </div>
            </aside>
          </div>
        </article>

        <FinalCta />
      </main>
    </>
  )
}

// CONTACT FORM
function ContactForm({ compact = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: 'Healthcare / Doctor / Clinic',
    serviceNeeded: compact ? '' : 'Google Business Profile Management',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const requiredValues = compact
      ? [formData.name, formData.phone, formData.email]
      : [
          formData.name,
          formData.phone,
          formData.email,
          formData.businessType,
          formData.serviceNeeded,
          formData.message,
        ]
    if (requiredValues.some((value) => !value.trim())) {
      setStatus({ type: 'error', message: 'Please fill out all required fields before submitting.' })
      return
    }

    if (!siteConfig.contactFormEndpoint) {
      const emailBody = [
        `Name: ${formData.name}`,
        `Phone / WhatsApp: ${formData.phone}`,
        `Email: ${formData.email}`,
        ...(compact ? [] : [`Business sector: ${formData.businessType}`]),
        `Service: ${formData.serviceNeeded}`,
        '',
        formData.message,
      ].join('\n')
      const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Website enquiry from ${formData.name}`)}&body=${encodeURIComponent(emailBody)}`
      window.location.href = mailto
      setStatus({
        type: 'notice',
        message: 'Your email app should open with this enquiry. Please review it and press Send; the enquiry has not been submitted yet.',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(compact ? { ...formData, businessType: '' } : formData),
      })
      if (!response.ok) throw new Error('Submission error')

      setStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
      })
      setFormData({
        name: '',
        phone: '',
        email: '',
        businessType: 'Healthcare / Doctor / Clinic',
        serviceNeeded: compact ? '' : 'Google Business Profile Management',
        message: '',
      })
    } catch {
      setStatus({
        type: 'error',
        message: `Unable to send message right now. Please call or WhatsApp us directly at ${siteConfig.displayPhone}.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className={`reference-form-card ${compact ? 'is-compact' : ''}`}
      onInvalidCapture={() => setStatus({ type: 'error', message: 'Please fill out all required fields before submitting.' })}
      onSubmit={handleSubmit}
    >
      <div className="reference-form-header">
        <span className="reference-eyebrow">{compact ? 'SEND US A MESSAGE' : 'GET A CONSULTATION'}</span>
        <h3>{compact ? 'Send Us a Message' : 'Request a Strategic Consultation'}</h3>
        <p>{compact ? 'Tell us about your goals and we will be in touch.' : 'Tell us about your business goals and current digital presence.'}</p>
      </div>

      <div className="reference-form-fields">
        <div className="reference-form-field">
          <label htmlFor={compact ? 'home-contact-name' : 'contact-name'}>{compact ? 'Full Name' : 'Your Full Name *'}</label>
          <input
            autoComplete="name"
            id={compact ? 'home-contact-name' : 'contact-name'}
            name="name"
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            type="text"
            value={formData.name}
          />
        </div>

        <div className="reference-form-field">
          <label htmlFor={compact ? 'home-contact-phone' : 'contact-phone'}>{compact ? 'Phone / WhatsApp' : 'Phone / WhatsApp Number *'}</label>
          <input
            autoComplete="tel"
            id={compact ? 'home-contact-phone' : 'contact-phone'}
            name="phone"
            onChange={handleChange}
            placeholder={compact ? 'Enter your number' : 'Enter your phone number'}
            required
            type="tel"
            value={formData.phone}
          />
        </div>

        <div className="reference-form-field">
          <label htmlFor={compact ? 'home-contact-email' : 'contact-email'}>{compact ? 'Email Address' : 'Email Address *'}</label>
          <input
            autoComplete="email"
            id={compact ? 'home-contact-email' : 'contact-email'}
            name="email"
            onChange={handleChange}
            placeholder={compact ? 'Enter your email' : 'name@business.com'}
            required
            type="email"
            value={formData.email}
          />
        </div>

        {!compact && (
          <div className="reference-form-field">
            <label htmlFor="contact-biz-type">Business Sector</label>
            <select
              id="contact-biz-type"
              name="businessType"
              onChange={handleChange}
              required={!compact}
              value={formData.businessType}
            >
              <option>Healthcare / Doctor / Clinic</option>
              <option>Hospital</option>
              <option>Dental Clinic</option>
              <option>General Business</option>
              <option>Local Business</option>
              <option>Startup</option>
              <option>Service Provider</option>
              <option>Other</option>
            </select>
          </div>
        )}

        <div className="reference-form-field">
          <label htmlFor={compact ? 'home-contact-service' : 'contact-service'}>
            {compact ? 'Service Needed' : 'Primary Service Needed'}
          </label>
          <select
            id={compact ? 'home-contact-service' : 'contact-service'}
            name="serviceNeeded"
            onChange={handleChange}
            required={!compact}
            value={formData.serviceNeeded}
          >
            {compact && <option disabled value="">Select a Service</option>}
            {contactServiceOptions.map((service) => <option key={service}>{service}</option>)}
          </select>
        </div>

        <div className="reference-form-field reference-form-field-full">
          <label htmlFor={compact ? 'home-contact-message' : 'contact-message'}>
            {compact ? 'Your Message' : 'Project Details or Questions'}
          </label>
          <textarea
            id={compact ? 'home-contact-message' : 'contact-message'}
            name="message"
            onChange={handleChange}
            placeholder={compact ? 'Tell us about your requirement...' : 'Share details about your business location, current website, or ranking goals...'}
            required={!compact}
            rows={4}
            value={formData.message}
          />
        </div>
      </div>

      <button className="reference-button reference-button-primary reference-form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting Details…' : compact ? 'Send Enquiry' : 'Submit Project Inquiry'} <ArrowRight size={18} />
      </button>

      {status.message && (
        <div aria-live="polite" className={`reference-form-status status-${status.type}`}>
          {status.message}
        </div>
      )}
    </form>
  )
}

// CONTACT PAGE
function ContactPage() {
  return (
    <>
      <Metadata
        description={`Contact ASK GMB Solution in ${siteConfig.city} to discuss your digital growth, technology and website development goals.`}
        title="Contact ASK GMB Solution | Request a Consultation"
      />
      <main className="reference-contact-page">
        <section className="reference-contact-hero">
          <div className="page-container reference-contact-hero-grid">
            <div className="reference-contact-hero-copy">
              <Breadcrumbs current="Contact Us" />
              <span className="reference-eyebrow">GET IN TOUCH</span>
              <h1>Let’s Talk About Your Business Growth</h1>
              <p>Tell us about your goals and find the right digital growth and technology solutions.</p>
            </div>
            <img
              alt="Modern business building representing ASK GMB Solution's technology services"
              fetchPriority="high"
              src={growthBuildingImage}
            />
          </div>
        </section>

        <section className="reference-contact-details">
          <div className="page-container reference-contact-layout">
            <aside className="reference-contact-sidebar">
              <section className="reference-contact-panel">
                <span className="reference-eyebrow">GET IN TOUCH</span>
                <h2>Get in Touch</h2>
                <a className="reference-contact-method" href={`tel:${siteConfig.phone}`}>
                  <span><Phone aria-hidden="true" size={22} /></span>
                  <span><strong>Call Us</strong><small>Talk to our team.</small></span>
                </a>
                <a className="reference-contact-method" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                  <span><BrandWhatsApp size={22} /></span>
                  <span><strong>WhatsApp</strong><small>Chat with us instantly.</small></span>
                </a>
                <a className="reference-contact-method" href={`mailto:${siteConfig.email}`}>
                  <span><Mail aria-hidden="true" size={22} /></span>
                  <span><strong>Email Us</strong><small>Write to us for enquiries.</small></span>
                </a>
                <a className="reference-contact-method" href={directionsUrl} rel="noopener noreferrer" target="_blank">
                  <span><MapPin aria-hidden="true" size={22} /></span>
                  <span><strong>Our Office</strong><small>{siteConfig.address}</small></span>
                </a>
                <div className="reference-contact-social">
                  <span>Follow Our Official Channels</span>
                  <SocialLinks />
                </div>
              </section>
              <section className="reference-contact-map">
                <h2><MapPin aria-hidden="true" size={22} /> Our Location</h2>
                <iframe
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                  title={`ASK GMB Solution office location map in ${siteConfig.neighborhood}, ${siteConfig.city}`}
                />
                <a href={directionsUrl} rel="noopener noreferrer" target="_blank">
                  Get Directions <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </section>
            </aside>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  )
}

// 16. FOOTER REDESIGN (PREMIUM 4-COLUMN FOOTER)
function Footer({ showInlineSocials }) {
  return (
    <footer className={`site-footer${showInlineSocials ? ' is-socials-in-footer' : ''}`}>
      <div className="footer-glow" />
      <div className="page-container footer-top-grid">
        {/* Column 1: Logo & Agency Bio & Social */}
        <div className="footer-col-brand">
          <Link aria-label={`${siteConfig.companyName} home`} className="footer-logo-link" to="/">
            <img alt={siteConfig.companyName} className="footer-logo-img" loading="lazy" src={logo} />
          </Link>
          <p className="footer-tagline">{siteConfig.tagline}</p>
          <p className="footer-desc">
            A digital marketing and website engineering agency in {siteConfig.city}.
            We specialize in Google Business Profile management, Local SEO, and high-performance React & WordPress development.
          </p>
          <div className="footer-social-box">
            <span className="footer-social-heading">Follow Our Official Channels</span>
            <SocialLinks />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">All Services</Link></li>
            <li><Link to="/industries-we-serve">Industries We Serve</Link></li>
            <li><Link to="/our-process">Our Process</Link></li>
            <li><Link to="/google-business-profile">Google Business Profile</Link></li>
            <li><Link to="/website-design-development">Website Design & Development</Link></li>
            <li><Link to="/mobile-app-development">Mobile App Development</Link></li>
            <li><Link to="/blogs">Knowledge Hub & Blogs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div className="footer-col">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-links-list">
            {[...services.filter((service) => service.category === 'Digital Growth'), ...services.filter((service) => service.category === 'Technology Solutions')].map((service) => (
              <li key={service.path}>
                <Link to={service.path}>
                  {service.title}
                  {service.isCore && <span className="footer-core-dot" title="Core Specialty" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div className="footer-col footer-contact-col">
          <h3 className="footer-heading">Contact Information</h3>
          <div className="footer-contact-details">
            <a className="footer-contact-item" href={`tel:${siteConfig.phone}`}>
              <span className="f-icon-bubble"><PhoneCall size={17} /></span>
              <div>
                <small>Direct Phone</small>
                <strong>{siteConfig.displayPhone}</strong>
              </div>
            </a>

            <a className="footer-contact-item" href={`mailto:${siteConfig.email}`}>
              <span className="f-icon-bubble"><Mail size={17} /></span>
              <div>
                <small>Official Email</small>
                <strong>{siteConfig.email}</strong>
              </div>
            </a>

            <a className="footer-contact-item" href={whatsappHref} rel="noopener noreferrer" target="_blank">
              <span className="f-icon-bubble f-whatsapp"><BrandWhatsApp size={18} /></span>
              <div>
                <small>WhatsApp Chat</small>
                <strong>Direct Message</strong>
              </div>
            </a>

            <div className="footer-contact-item office-loc">
              <span className="f-icon-bubble"><MapPin size={17} /></span>
              <div>
                <small>Office Headquarters</small>
                <p>{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="page-container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="legal-sep">•</span>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 15. FLOATING CONTACT BUTTONS (WHATSAPP & SCHEDULE CALL)
function FloatingContactActions() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const floatMenuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (floatMenuRef.current && !floatMenuRef.current.contains(event.target)) {
        setIsScheduleOpen(false)
      }
    }
    if (isScheduleOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isScheduleOpen])

  return (
    <div className="floating-actions-container">
      {/* Schedule a Call floating trigger (Primary Blue #1765E8) */}
      <div className="floating-schedule-wrapper" ref={floatMenuRef}>
        {isScheduleOpen && (
          <div className="floating-call-menu shadow-premium">
            <div className="f-menu-header">
              <strong>Quick Connect</strong>
              <button aria-label="Close menu" className="f-menu-close" onClick={() => setIsScheduleOpen(false)} type="button">
                <X size={16} />
              </button>
            </div>
            <div className="f-menu-options">
              <a className="f-menu-item" href={`tel:${siteConfig.phone}`}>
                <Phone size={16} />
                <span>Call {siteConfig.displayPhone}</span>
              </a>
              <a className="f-menu-item f-wa" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                <BrandWhatsApp size={17} />
                <span>Chat via WhatsApp</span>
              </a>
              {siteConfig.calendly && (
                <a className="f-menu-item" href={siteConfig.calendly} rel="noopener noreferrer" target="_blank">
                  <Calendar size={16} />
                  <span>Book on Calendly</span>
                </a>
              )}
              <Link className="f-menu-item" onClick={() => setIsScheduleOpen(false)} to="/contact">
                <Calendar size={16} />
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        )}

        <button
          aria-expanded={isScheduleOpen}
          aria-label="Schedule a Call"
          className="float-btn float-call-btn shadow-premium"
          onClick={() => setIsScheduleOpen((prev) => !prev)}
          title="Schedule a Call"
          type="button"
        >
          <Calendar size={22} />
          <span className="float-badge-label">Schedule Call</span>
        </button>
      </div>

      {/* WhatsApp floating button (Official WhatsApp Green #25D366) */}
      <a
        aria-label="Chat With Us"
        className="float-btn float-whatsapp-btn shadow-premium"
        href={whatsappHref}
        rel="noopener noreferrer"
        target="_blank"
        title="Chat With Us"
      >
        <BrandWhatsApp size={24} />
        <span className="float-badge-label">Chat With Us</span>
      </a>
    </div>
  )
}

function PolicyPage({ type }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'
  return (
    <>
      <Metadata description={`${title} for ${siteConfig.companyName}. Learn about our policies.`} title={title} />
      <main className="policy-page">
        <section className="page-hero">
          <div className="page-container policy-hero-inner">
            <span className="eyebrow-badge"><Sparkles size={14} /> LEGAL & COMPLIANCE</span>
            <h1 className="page-hero-title">{title}</h1>
            <p className="page-hero-desc">Last updated: {new Date().getFullYear()}</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-container policy-content-card shadow-card">
            {isPrivacy ? (
              <div className="policy-prose">
                <h2>1. Information We Collect</h2>
                <p>We respect your privacy. When you contact ASK GMB Solution through our website, phone, or WhatsApp, we collect details such as your name, contact number, email, and business requirements solely to provide our digital marketing and web services.</p>

                <h2>2. How We Use Information</h2>
                <p>Your information is used strictly to communicate regarding your service requests, consultations, and technical updates. We do not sell or rent customer data to third-party advertisers.</p>

                <h2>3. Google Business Profile & Client Data</h2>
                <p>For clients engaging in Google Business Profile management or Local SEO, access credentials and verification assets are managed securely and in accordance with Google Third-Party Policies.</p>

                <h2>4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at {siteConfig.email} or call {siteConfig.displayPhone}.</p>
              </div>
            ) : (
              <div className="policy-prose">
                <h2>1. Services Agreement</h2>
                <p>By engaging ASK GMB Solution for Google Business Profile management, Local SEO, or website development, you agree to these terms. All project milestones and deliverables are confirmed prior to project kickoff.</p>

                <h2>2. Search Rankings & Third-Party Platforms</h2>
                <p>While we apply established industry best practices for Google Business Profile optimization and Local SEO, search engine algorithms are subject to third-party updates. We prioritize genuine, durable search visibility over shortcuts.</p>

                <h2>3. Client Responsibilities</h2>
                <p>Clients agree to provide accurate business details, timely verification codes, and required media assets to enable effective campaign and website delivery.</p>

                <h2>4. Jurisdiction</h2>
                <p>These terms are governed by the applicable laws of {siteConfig.region}, {siteConfig.country}.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <Metadata description="The page you are looking for does not exist." title="Page Not Found" />
      <main className="not-found-page">
        <div className="page-container text-center">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-desc">The page you are looking for might have been moved or does not exist.</p>
          <div className="not-found-actions">
            <Link className="button button-orange button-large" to="/">
              Back to Home <ArrowRight size={17} />
            </Link>
            <Link className="button button-secondary button-large" to="/contact">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

function AppLayout() {
  const location = useLocation()
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const footer = document.querySelector('.site-footer')
    if (!footer) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsFooterVisible(entry.isIntersecting)
    })
    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  usePremiumMotion(location.pathname)

  const blogSlug = location.pathname.startsWith('/blogs/') ? location.pathname.split('/')[2] : null
  const article = blogSlug ? articles.find((item) => item.slug === blogSlug) : null

  return (
    <div className="design-refresh">
      <Header key={location.pathname} />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<ServicesPage />} path="/services" />
        <Route element={<IndustriesPage />} path="/industries-we-serve" />
        <Route element={<ProcessPage />} path="/our-process" />
        <Route element={<Navigate replace to="/services" />} path="/digital-marketing" />
        <Route element={<Navigate replace to="/services" />} path="/technologies" />
        <Route element={<MobileAppPage />} path="/mobile-app-development" />
        <Route element={<BlogPage />} path="/blogs" />
        {services.filter((service) => service.path !== '/mobile-app-development').map((service) => (
          <Route element={<ServiceDetailPage service={service} />} key={service.path} path={service.path} />
        ))}
        {services.flatMap((service) => (service.aliases || []).map((alias) => (
          <Route element={<Navigate replace to={service.path} />} key={alias} path={alias} />
        )))}
        <Route element={article ? <BlogArticlePage article={article} /> : <NotFoundPage />} path="/blogs/:slug" />
        <Route element={<ContactPage />} path="/contact" />
        <Route element={<PolicyPage type="privacy" />} path="/privacy-policy" />
        <Route element={<PolicyPage type="terms" />} path="/terms-and-conditions" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
      <Footer showInlineSocials={isFooterVisible} />
      <FloatingContactActions />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
