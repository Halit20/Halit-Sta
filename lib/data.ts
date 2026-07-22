/* Central content source for the Halit Statovci brand site. */

export const PROFILE = {
  name: "Halit Sta",
  fullName: "Halit Statovci",
  title: "Full-Cycle AI Engineer & Digital Solutions Builder",
  location: "Kosovo",
  availability: "Available for selected projects · Kosovo / Remote",
  email: "halitsta@gmail.com",
  linkedin: "https://www.linkedin.com/in/halit-statovci-89bb90198/",
  instagram: "https://www.instagram.com/halitsta/",
  instagramHandle: "@halitsta",
  facebook: "https://www.facebook.com/littyy.statovci/",
  github: "https://github.com/Halit20",
  x: "https://x.com/HalitSta",
  twitch: "https://www.twitch.tv/megashqip",
  youtube: "https://www.youtube.com/channel/UCVDq-YjzYcyfLS0-XMNrl9w",
  youtubeSecond: "https://www.youtube.com/channel/UCXAlJP1t18cHm66XGZt9x4A",
  heroLead: "I build digital systems, brands, and AI-powered workflows —",
  heroEmphasis: "for modern businesses.",
  heroSupport:
    "I build AI-powered systems, digital platforms, and brand experiences for modern businesses — from strategy and automation to infrastructure and launch.",
  labels: ["Web Systems", "AI Workflows", "Branding", "Media", "Infrastructure"],
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
];

export type SocialIconName =
  | "email"
  | "linkedin"
  | "github"
  | "instagram"
  | "facebook"
  | "x"
  | "youtube"
  | "twitch";

/** Personal channels shown in the Connect section. */
export const CONNECT_LINKS: {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: SocialIconName;
  external: boolean;
}[] = [
  {
    id: "email",
    label: "Email",
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "email",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Halit Statovci",
    href: PROFILE.linkedin,
    icon: "linkedin",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "Halit20",
    href: PROFILE.github,
    icon: "github",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: PROFILE.instagramHandle,
    href: PROFILE.instagram,
    icon: "instagram",
    external: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Halit Statovci",
    href: PROFILE.facebook,
    icon: "facebook",
    external: true,
  },
  {
    id: "x",
    label: "X",
    handle: "@HalitSta",
    href: PROFILE.x,
    icon: "x",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "Dyshja n’Natyrë",
    href: PROFILE.youtube,
    icon: "youtube",
    external: true,
  },
  {
    id: "twitch",
    label: "Twitch",
    handle: "MegaSHQIP",
    href: PROFILE.twitch,
    icon: "twitch",
    external: true,
  },
];

export const SUPPORTING_ROLES = [
  "Creative Technologist",
  "Web Systems Developer",
  "AI Workflow Builder",
  "Digital Brand & Media Operator",
  "Infrastructure-capable Digital Partner",
];

export const IDENTITY_PILLARS = [
  {
    id: "ai",
    tag: "01",
    title: "AI",
    line: "Workflows & automation",
    desc: "AI workflows, automations, and internal tools that reduce repetitive work and improve decision-making.",
  },
  {
    id: "web",
    tag: "02",
    title: "Web",
    line: "Platforms & products",
    desc: "Websites, dashboards, and marketplaces engineered to convert, scale, and last.",
  },
  {
    id: "branding",
    tag: "03",
    title: "Branding",
    line: "Identity & design",
    desc: "A consistent visual identity built to earn trust across every digital and physical touchpoint.",
  },
  {
    id: "media",
    tag: "04",
    title: "Media",
    line: "Cinematic content",
    desc: "Video, photo, and drone production that earns attention and tells the right story.",
  },
  {
    id: "infra",
    tag: "05",
    title: "Infrastructure",
    line: "Deploy & operate",
    desc: "From local development to live production — hosting, domains, servers, SSL, and reliable deployment.",
  },
];

export const PROOF_POINTS = [
  { label: "Full-Cycle AI Engineering", sub: "Idea → Launch" },
  {
    label: "B.Sc. Computer Science & Engineering",
    sub: "Universum International College",
  },
  { label: "Erasmus+ Germany", sub: "International experience" },
  { label: "Ministry of Defence IT", sub: "Institutional environment" },
  { label: "Web · AI · Branding · Media", sub: "One builder" },
  { label: "Infrastructure & Deployment", sub: "Production-ready systems" },
];

export type Service = {
  num: string;
  title: string;
  /** short spec line shown under the title in the module list */
  nav: string;
  description: string;
  includes: string[];
  bestFor: string;
  /** optional factual credibility line rendered under the description */
  note?: string;
  icon: IconName;
};

export type IconName =
  | "web"
  | "ai"
  | "brand"
  | "media"
  | "infra"
  | "consulting";

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Websites & Web Platforms",
    nav: "Business websites · Landing pages · Dashboards",
    description:
      "From high-converting business websites to dashboards, marketplaces, and admin platforms — engineered for speed, clarity, and long-term scalability.",
    includes: [
      "Business websites",
      "Landing pages",
      "Dashboards",
      "Marketplaces",
      "Admin panels",
      "Custom platforms",
    ],
    bestFor:
      "Businesses that have outgrown templates and need a platform built around how they operate.",
    icon: "web",
  },
  {
    num: "02",
    title: "AI & Automation",
    nav: "AI workflows · Business automations · Internal tools",
    description:
      "Practical AI systems and automations that reduce repetitive work, connect existing tools, and support faster decisions.",
    includes: [
      "AI workflows",
      "Business automations",
      "Internal tools",
      "Knowledge assistants",
      "API integrations",
      "Productivity systems",
    ],
    bestFor: "Teams losing time to repetitive, manual processes.",
    icon: "ai",
  },
  {
    num: "03",
    title: "Branding & Design",
    nav: "Logo direction · Brand identity · Business cards",
    description:
      "A cohesive visual identity — logo direction, typography, color, and design systems that stay consistent across web, social, and print.",
    includes: [
      "Logo direction",
      "Brand identity",
      "Business cards",
      "Social media visuals",
      "Print assets",
      "Design systems",
    ],
    bestFor: "Businesses whose brand looks inconsistent across different channels.",
    icon: "brand",
  },
  {
    num: "04",
    title: "Video, Photo & Drone Content",
    nav: "Video production · Photography · Drone content",
    description:
      "Original video, photography, and drone content planned, captured, and edited end to end for brands, locations, and products.",
    includes: [
      "Video production",
      "Video editing",
      "Reels",
      "Photography",
      "Drone footage",
      "Social content",
    ],
    bestFor:
      "Brands that need original, high-impact visuals instead of generic stock content.",
    icon: "media",
  },
  {
    num: "05",
    title: "Infrastructure & Deployment",
    nav: "Hosting · Domains · SSL",
    description:
      "The production layer that takes a project from local development to a stable, secure live environment — including hosting, domains, SSL, servers, and deployment.",
    includes: ["Hosting", "Domains", "SSL", "Linux", "Docker", "Nginx", "Plesk"],
    bestFor: "Projects that need to launch reliably and remain stable in production.",
    icon: "infra",
  },
  {
    num: "06",
    title: "Digital Consulting",
    nav: "Digital strategy · Technical planning · Solution architecture",
    description:
      "Clarity before execution — defining what to build, how to structure it, and what to prioritize so time and budget go to the right work.",
    includes: [
      "Digital strategy",
      "Technical planning",
      "Solution architecture",
      "Business digitalization",
      "Workflow design",
      "Delivery roadmap",
    ],
    bestFor: "Businesses deciding what to build first and how to execute it properly.",
    icon: "consulting",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  /** short, full-text card line — never truncated */
  tagline: string;
  role: string;
  /** concrete lines describing what was built — rendered in full, never truncated */
  built: string[];
  result: string;
  /** factual meta line — domain, location, or event date */
  meta?: string;
  tags: string[];
  hue: string; // accent hue driving the browser-mockup visual
  /** which stylized mini-screen the card mockup renders */
  screen:
    | "marketplace"
    | "dashboard"
    | "resort"
    | "brand"
    | "menu"
    | "service"
    | "festival"
    | "video";
};

export const PROJECTS: Project[] = [
  {
    id: "lgs-marketplace",
    title: "LGS Marketplace",
    category: "Marketplace / Web Platform",
    tagline:
      "A multi-seller marketplace — listing flows, seller tools, and admin review, built deployment-ready.",
    role: "Web platform / marketplace execution support",
    built: [
      "Listing creation flows and the category structure behind them.",
      "Seller interface for managing products and pricing.",
      "Admin-side review logic plus UI improvements across the platform.",
      "API and database checks, packaged into a deployment-ready structure.",
    ],
    result:
      "A scalable marketplace foundation the business can keep adding sellers and categories to without re-architecting.",
    tags: ["React", "TypeScript", "Laravel", "MySQL", "Marketplace", "Deployment"],
    hue: "212",
    screen: "marketplace",
  },
  {
    id: "lgs-dash",
    title: "LGS Dash SaaS",
    category: "SaaS Dashboard / UI Engineering",
    tagline:
      "Refining a SaaS dashboard into a consistent, on-brand product interface.",
    role: "UI engineering & design system",
    built: [
      "Dashboard UI refinement with dark/light mode support.",
      "Component consistency pass — spacing, states, and patterns aligned.",
      "Brand application across the product, with sidebar and topbar polish.",
    ],
    result:
      "A cleaner, more trustworthy interface that's easier to extend as new dashboard modules are added.",
    tags: ["Laravel", "React/Inertia", "SaaS", "Design System"],
    hue: "199",
    screen: "dashboard",
  },
  {
    id: "batllava",
    title: "Batllava Premium Resort",
    category: "Hospitality / Social Media",
    tagline:
      "Full digital content workflow for a premium lakeside resort — social media, visuals, and website.",
    role: "Social media, content & website management",
    built: [
      "Daily posts, stories, and reels across Instagram, TikTok, and Facebook.",
      "Visual material captured with camera, drone, and action camera — Sony ZV-E10, DJI Mini 5 Pro, DJI Action 5 Pro.",
      "Website management plus villa and event presentation — atmosphere, location, experience.",
    ],
    result:
      "A more premium, coherent brand presence that matches the positioning of the resort itself.",
    meta: "Batllava Lake · batllavaresort.com",
    tags: ["Hospitality", "Social Media", "Website Management", "Video", "Drone"],
    hue: "38",
    screen: "resort",
  },
  {
    id: "noircorp-inventory",
    title: "NoirCorp Inventory System",
    category: "Inventory / Full-Stack System",
    tagline:
      "One of my earliest full-stack projects — an inventory system still in daily use across four countries.",
    role: "Full-stack developer — front-end & back-end",
    built: [
      "Inventory stock management system built front-to-back for real operational use.",
      "Product tracking, quantity views, and stock operations for the workers who run it daily.",
      "Multi-location support covering operations in Kosovo, Albania, Macedonia, and the USA.",
    ],
    result:
      "An early project that proved itself in production — still used across Kosovo, Albania, Macedonia, and the USA.",
    meta: "Kosovo · Albania · Macedonia · USA",
    tags: ["Full-Stack", "Inventory", "Front-End", "Back-End", "Business System"],
    hue: "262",
    screen: "dashboard",
  },
  {
    id: "trimi-dekor",
    title: "Trimi Dekor",
    category: "Branding / Construction / Website",
    tagline:
      "Premium identity and website direction for a construction & decoration business.",
    role: "Brand positioning & web presentation",
    built: [
      "Premium identity direction for a construction/decoration business — facades, Knauf, plastering, painting.",
      "Website direction built around credibility and a clear service structure.",
      "Business cards and a brand system that holds together in print and on screen.",
    ],
    result:
      "A serious, professional presence that helps the business win higher-value, trust-driven clients.",
    tags: ["Branding", "Web Design", "Identity"],
    hue: "28",
    screen: "brand",
  },
  {
    id: "gerdoc-pizza",
    title: "Gerdoc Pizza",
    category: "Restaurant / Ordering Experience",
    tagline:
      "A menu-first restaurant site with a direct path from craving to order.",
    role: "Web design & conversion",
    built: [
      "A menu-first restaurant website with clean product presentation.",
      "Ordering/contact modal with WhatsApp and Viber options.",
      "Location feature so local visitors find the restaurant fast.",
    ],
    result:
      "A focused local presence that turns visits into calls and orders.",
    meta: "gerdocpizza.com",
    tags: ["Restaurant", "Menu UX", "Local Conversion"],
    hue: "8",
    screen: "menu",
  },
  {
    id: "rohrreinigung-peter",
    title: "Rohrreinigung-Peter",
    category: "German Service Website / Lead Generation",
    tagline: "A German drainage-service site engineered for regional leads.",
    role: "Service web & lead generation",
    built: [
      "German-language drainage-service website with a clear service structure.",
      "Regional pages: Stuttgart, Böblingen, Calw, Esslingen, Ludwigsburg, Rems-Murr, Tübingen.",
      "PHP contact forms positioned for conversion, plus a location popup.",
    ],
    result:
      "A lead-focused site that presents the service clearly and routes regional searches straight to contact.",
    tags: ["Web Design", "Local SEO", "PHP", "German Market"],
    hue: "205",
    screen: "service",
  },
  {
    id: "shqip-horizon",
    title: "Shqip Horizon Festival",
    category: "Event Landing Page",
    tagline:
      "A high-energy festival landing page with countdown and event structure.",
    role: "Landing page design & build",
    built: [
      "High-energy festival landing page with a live countdown.",
      "Clear event structure — lineup, schedule, and key details.",
      "Mobile-first CSS so it performs on the phones attendees actually use.",
    ],
    result:
      "A focused page that builds anticipation and points everyone to the key event details.",
    meta: "24–26 July 2025",
    tags: ["Landing Page", "Countdown", "Responsive"],
    hue: "280",
    screen: "festival",
  },
  {
    id: "dyshja",
    title: "Dyshja n’Natyrë",
    category: "Creative Media / Outdoor Content",
    tagline:
      "An outdoor media brand — drone, filming, editing, and storytelling, end to end.",
    role: "Creator — filming, drone & editing",
    built: [
      "An outdoor media brand run end-to-end: planning, shoots, publishing.",
      "Ground and drone filming across hikes, camps, and adventures.",
      "Cinematic editing, thumbnail design, and storytelling per episode.",
    ],
    result:
      "A growing content brand that doubles as a live portfolio of the media work I offer to clients.",
    meta: "youtube.com · @dyshjanatyre",
    tags: ["Drone", "Filming", "Editing", "Storytelling"],
    hue: "152",
    screen: "video",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding the business, goals, audience, challenges, and opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Defining the structure, design direction, technical architecture, content, and execution plan.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Designing and building the interfaces, systems, workflows, brand assets, and content required for the solution.",
  },
  {
    num: "04",
    title: "Launch & Deployment",
    desc: "Testing, deploying, documenting, and preparing the final system for reliable production use.",
  },
];

export const EXPERIENCE: {
  org: string;
  role: string;
  /** status pill text */
  period: string;
  /** verified time interval; omitted where no date is confirmed */
  dates?: string;
  /** role progression inside the same company, rendered subtly in-card */
  phases?: { dates: string; role: string }[];
  desc: string;
}[] = [
  {
    org: "Light Gears Solutions GmbH — LGS",
    role: "Full-Cycle AI Engineer & IT Manager",
    period: "Current",
    dates: "Jan 2026 — Present",
    desc: "At Light Gears Solutions, I integrate AI into digital platforms, automate operational workflows, and build production-ready systems from interface to infrastructure. My work includes marketplaces and SaaS products using React and Laravel, dashboard systems, internal tools, and deployment through Linux, Docker, NGINX, and Plesk.",
  },
  {
    org: "LELE Production GbR",
    role: "Full-Cycle AI Engineer · Video Editor",
    period: "Former",
    dates: "Aug 2025 — Jan 2026",
    phases: [
      { dates: "Nov 2025 — Jan 2026", role: "Full-Cycle AI Engineer" },
      { dates: "Aug 2025 — Nov 2025", role: "Video Editor" },
    ],
    desc: "I joined LELE Production initially as a Video Editor, producing and refining digital content from August to November 2025. I then transitioned into Full-Cycle AI Engineering, working on digital products, AI implementation, automation, web systems, and production infrastructure through January 2026.",
  },
  {
    org: "Ministry of Defence of Kosovo",
    role: "IT Support & Systems Intern",
    period: "Institutional",
    dates: "Apr 2025 — 15 Oct 2025",
    desc: "Provided hardware, software, network, and user support in a structured institutional environment serving approximately 200 users. I worked with Windows and Linux systems, network diagnostics, technical documentation, and Python and PowerShell automations that reduced repetitive operational work.",
  },
  {
    org: "Universum International College",
    role: "IT Intern",
    period: "University",
    desc: "Alongside my Computer Science and Engineering studies on a full scholarship, I worked as an IT intern supporting users, monitoring systems, preparing technical reports, and resolving day-to-day technical issues. The role allowed me to build practical experience in parallel with my degree.",
  },
  {
    org: "NoirCorp",
    role: "Web Developer",
    period: "Early career",
    dates: "Jul 2024 — Aug 2024",
    desc: "One of my earliest substantial full-stack projects was an inventory management system built for real operational use. I developed both the frontend and backend, and the system remains in use across Kosovo, Albania, North Macedonia, and the United States.",
  },
  {
    org: "Independent Digital Solutions",
    role: "Web · AI · Branding · Content · Infrastructure",
    period: "Ongoing",
    dates: "Nov 2024 — Present",
    desc: "I deliver complete digital solutions for local and international businesses — from websites, internal systems, and automation to branding, content, hosting, and deployment. I often manage the entire project lifecycle, from the initial conversation to production launch.",
  },
  {
    org: "Dyshja n’Natyrë",
    role: "Creative Media & Outdoor Storytelling",
    period: "Ongoing",
    desc: "My creative work began with early Albanian YouTube communities and continues through Dyshja n’Natyrë, where I lead filming, drone production, editing, thumbnails, titles, and visual storytelling. The project is both a long-term creative platform and a space where I continuously refine the production skills I bring to client work.",
  },
];

export const SKILL_GROUPS = [
  {
    category: "Code & Development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "PHP",
      "Laravel",
      "Node.js / Express",
      "Python",
      "PowerShell",
      "Tailwind CSS",
      "MySQL / MariaDB",
      "Git",
      "Vite",
    ],
  },
  {
    category: "Infrastructure & Deployment",
    items: [
      "Linux",
      "Docker",
      "Docker Compose",
      "NGINX",
      "Plesk",
      "SSH",
      "SSL / Certbot",
      "Gitea",
      "Tailscale",
    ],
  },
  {
    category: "AI Systems & Automation",
    items: [
      "ChatGPT",
      "Claude",
      "Claude Code",
      "Codex",
      "AI integrations",
      "Business automation",
      "Internal tools",
      "Knowledge assistants",
      "Workflow design",
    ],
  },
  {
    category: "Design & Product",
    items: [
      "Figma",
      "Canva",
      "WordPress",
      "Elementor",
      "UI / UX",
      "Design systems",
      "Brand identity",
      "Prototyping",
      "Social visuals",
    ],
  },
  {
    category: "Creative Production",
    items: [
      "CapCut",
      "Sony ZV-E10",
      "DJI Mini 5 Pro",
      "DJI Avata 2",
      "DJI Action 5 Pro",
      "Video production",
      "Video editing",
      "Photography",
      "Drone production",
      "Thumbnails",
    ],
  },
  {
    category: "Languages",
    items: ["Albanian — Native", "English — C1", "German — Basic (A1)"],
  },
];

export const EDUCATION: {
  title: string;
  org: string;
  note: string;
  /** verified period tag; omitted where nothing is confirmed */
  dates?: string;
}[] = [
  {
    title: "B.Sc. Computer Science & Engineering",
    org: "Universum International College",
    note: "Built my academic foundation in software engineering, computer systems, databases, networking, and the development of practical digital solutions.",
  },
  {
    title: "Full Scholarship",
    org: "Earned through testing and selection",
    note: "Awarded a full scholarship through competitive testing and selection, allowing me to combine academic study with practical IT work at the college.",
  },
  {
    title: "Erasmus+ — Germany",
    org: "Ludwigshafen University of Business and Society",
    dates: "6 Months · Erasmus+",
    note: "Completed six months of Business Management studies in Germany, gaining international academic exposure, cross-cultural collaboration experience, and a broader understanding of business and organizational environments.",
  },
  {
    title: "Economics, Banking & Insurance",
    org: "High School Specialization",
    note: "Developed an early foundation in business, finance, banking, and organizational thinking before moving into computer science and engineering.",
  },
  {
    title: "Student Union & Leadership",
    org: "University Leadership",
    note: "Built practical experience in coordination, organization, communication, and teamwork through active involvement in the university student union.",
  },
];

export const CREATIVE = [
  { title: "Hiking & Exploration", tag: "Outdoor" },
  { title: "Camping", tag: "Outdoor" },
  { title: "Drone Flying", tag: "Aerial" },
  { title: "Cinematic Editing", tag: "Production" },
  { title: "Video Storytelling", tag: "Content" },
  { title: "Dyshja n’Natyrë", tag: "Project" },
];

export type CreativeIcon =
  | "overview"
  | "videos"
  | "drone"
  | "photo"
  | "reels"
  | "gear"
  | "contact";

export type CreativeBlock = {
  id: string;
  label: string;
  icon: CreativeIcon;
  code: string; // viewfinder timecode-style tag
  meta: string; // viewfinder format tag
  title: string;
  text: string;
  /** optional second paragraph — factual credibility line */
  note?: string;
  /** optional real external links (channel, socials) */
  links?: { label: string; href: string }[];
  /** optional real YouTube video, rendered as a click-to-load embed */
  video?: { id: string; title: string };
  /** optional real photograph (no play button), framed still preview */
  photo?: { src: string; alt: string };
  /** optional real 9:16 clip, framed vertical preview (muted, loop) */
  reel?: { src: string; poster?: string; title: string };
  tags: string[];
};

/** Sub-navigation + content blocks for the Media / Creative section. */
export const CREATIVE_BLOCKS: CreativeBlock[] = [
  {
    id: "media-overview",
    label: "Overview",
    icon: "overview",
    code: "REC 00:00",
    meta: "4K · 24fps",
    title: "Cinematic storytelling, end to end.",
    text: "My creative work combines cinematic storytelling, outdoor exploration, drone visuals, photography, editing, and social content — bringing the same visual judgment and storytelling discipline to every brand I build.",
    note: "Dyshja n’Natyrë is an active outdoor media project created with Aldin, combining exploration, filmmaking, drone production, and cinematic storytelling. Selected content is produced in collaboration with brand partners such as @outdoor.meals.",
    links: [
      {
        label: "YouTube — Dyshja n’Natyrë",
        href: "https://www.youtube.com/channel/UCVDq-YjzYcyfLS0-XMNrl9w",
      },
      {
        label: "Instagram — @dyshjanatyre",
        href: "https://www.instagram.com/dyshjanatyre/",
      },
    ],
    tags: ["Storytelling", "Editing", "Outdoor", "Social"],
  },
  {
    id: "media-videos",
    label: "Videos",
    icon: "videos",
    code: "REC 00:12",
    meta: "4K · 25fps",
    title: "Video editing & short-form content.",
    text: "Video editing, reels, commercial visuals, and narrative content — shaped for pace, clarity, retention, and platform-specific delivery.",
    video: {
      id: "gieV7bKg3vQ",
      title: "Një Natë Camping në Liqenin e Batllavës në -10°C!",
    },
    tags: ["Editing", "Commercial", "Short-form", "Color"],
  },
  {
    id: "media-drone",
    label: "Drone",
    icon: "drone",
    code: "ALT 120m",
    meta: "D-LOG · 4K",
    title: "Aerial & cinematic perspectives.",
    text: "Aerial visuals, landscape coverage, movement, and cinematic perspectives that add scale, atmosphere, and context to every story.",
    video: {
      id: "e4_xvSPuUg4",
      title: "3 Ditë në Ranën e Hedhun",
    },
    tags: ["Aerial", "Landscape", "FPV", "Movement"],
  },
  {
    id: "media-photography",
    label: "Photography",
    icon: "photo",
    code: "f/1.8 · ISO 200",
    meta: "RAW · 24MP",
    title: "Brand & lifestyle photography.",
    text: "Brand, lifestyle, product, and business photography — composed and graded for a consistent, premium visual identity.",
    tags: ["Brand", "Lifestyle", "Product", "Social"],
  },
  {
    id: "media-reels",
    label: "Reels",
    icon: "reels",
    code: "9:16 VERT",
    meta: "1080 · 30fps",
    title: "Short-form vertical content.",
    text: "Short-form vertical content for Instagram, TikTok, and social platforms — built around strong hooks, deliberate pacing, clear captions, and platform-native editing.",
    tags: ["Instagram", "TikTok", "Hooks", "Vertical"],
  },
  {
    id: "media-gear",
    label: "Gear",
    icon: "gear",
    code: "KIT",
    meta: "READY",
    title: "The creator toolkit.",
    text: "A compact production kit for filming, photography, aerial coverage, and fast post-production — built to move efficiently from concept to published content.",
    tags: ["Sony ZV-E10", "DJI Mini 5 Pro", "DJI Avata 2", "DJI Action 5 Pro"],
  },
  {
    id: "media-contact",
    label: "Contact",
    icon: "contact",
    code: "LIVE",
    meta: "OPEN",
    title: "Book creative work.",
    text: "Need original video, drone, photography, or social content for your business? Let’s plan the concept, production, and delivery around what your brand actually needs.",
    tags: ["Video", "Drone", "Photo", "Social"],
  },
];
