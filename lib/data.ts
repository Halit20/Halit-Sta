/* Central content source for the Halit Statovci brand site. */

export const PROFILE = {
  name: "Halit Statovci",
  title: "Full-Cycle AI Engineer & Digital Solutions Builder",
  location: "Kosovo",
  availability: "Available for selected projects · Kosovo / Remote",
  // Brand-safe placeholder (not the LGS company inbox).
  email: "hello@halitstatovci.com",
  heroLead: "I build the full digital side of a business —",
  heroEmphasis: "from idea to launch.",
  heroSupport:
    "Websites, platforms, AI workflows, branding, media, and the infrastructure to run them — designed, built, and shipped by one operator instead of five vendors.",
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
    desc: "Systems that think alongside the business — reducing repetitive work and accelerating decisions.",
  },
  {
    id: "web",
    tag: "02",
    title: "Web",
    line: "Platforms & products",
    desc: "Websites, dashboards and marketplaces engineered to convert, scale and last.",
  },
  {
    id: "branding",
    tag: "03",
    title: "Branding",
    line: "Identity & design",
    desc: "A consistent, serious visual language across every digital and physical touchpoint.",
  },
  {
    id: "media",
    tag: "04",
    title: "Media",
    line: "Cinematic content",
    desc: "Video, photo and drone production that earns attention and tells the right story.",
  },
  {
    id: "infra",
    tag: "05",
    title: "Infrastructure",
    line: "Deploy & operate",
    desc: "From local build to live production — domains, servers, SSL and clean deployment.",
  },
];

export const PROOF_POINTS = [
  { label: "Full-Cycle AI Engineering", sub: "Idea → launch" },
  { label: "B.Sc. Computer Science & Engineering", sub: "Universum Int. College" },
  { label: "Erasmus+ Germany", sub: "International experience" },
  { label: "Ministry of Defence IT", sub: "Institutional environment" },
  { label: "Web • Systems • AI • Branding • Media", sub: "One operator" },
  { label: "Infrastructure & Deployment", sub: "Production-ready" },
];

export type Service = {
  num: string;
  title: string;
  description: string;
  includes: string[];
  bestFor: string;
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
    description:
      "From a sharp landing page to a full marketplace or admin panel — built to convert, load fast, and scale without a rebuild later.",
    includes: [
      "Business websites",
      "Landing pages",
      "Dashboards",
      "Marketplaces",
      "Admin panels",
      "Custom platforms",
    ],
    bestFor: "Businesses that have outgrown a template and need a real platform.",
    icon: "web",
  },
  {
    num: "02",
    title: "AI & Automation",
    description:
      "Practical AI and automation that removes repetitive work — internal tools, prompt systems, and workflows wired into how the business already runs.",
    includes: [
      "AI workflows",
      "Prompt systems",
      "Business automations",
      "Internal tools",
      "Productivity systems",
      "AI-assisted development",
    ],
    bestFor: "Teams losing hours to manual, repeatable tasks.",
    icon: "ai",
  },
  {
    num: "03",
    title: "Branding & Design",
    description:
      "A serious, consistent visual identity — logo direction, colour, type, and a system that holds together across web, social, and print.",
    includes: [
      "Logo direction",
      "Brand identity",
      "Business cards",
      "Social media visuals",
      "Print assets",
      "Design systems",
    ],
    bestFor: "Brands that look different on every channel.",
    icon: "brand",
  },
  {
    num: "04",
    title: "Video, Photo & Drone Content",
    description:
      "Cinematic content for brands, places, and products — shot, flown, and edited end to end, including aerial work with DJI drones.",
    includes: [
      "Video editing",
      "Reels",
      "Photography",
      "Drone footage",
      "Thumbnails",
      "Social content",
    ],
    bestFor: "Businesses that need scroll-stopping visuals, not stock.",
    icon: "media",
  },
  {
    num: "05",
    title: "Infrastructure & Deployment",
    description:
      "The part most freelancers hand off — taking a project from local code to a stable, secure production server with domains, SSL, and clean deploys.",
    includes: ["Hosting", "Domains", "SSL", "Linux", "Docker", "Nginx", "Plesk"],
    bestFor: "Projects that need to go live properly and stay up.",
    icon: "infra",
  },
  {
    num: "06",
    title: "Digital Consulting",
    description:
      "Clarity before code — deciding what to build, how to structure it, and the order to execute, so budget goes to the right things.",
    includes: [
      "Digital strategy",
      "Technical planning",
      "Solution architecture",
      "Business digitalization",
      "Workflow planning",
      "Project execution",
    ],
    bestFor: "Owners unsure what to build first — or whether to at all.",
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
  built: string;
  result: string;
  tags: string[];
  hue: string; // accent hue for abstract visual
};

export const PROJECTS: Project[] = [
  {
    id: "lgs-marketplace",
    title: "LGS Marketplace",
    category: "Marketplace / Web Platform",
    tagline:
      "A multi-seller marketplace — from listing flows to admin review, built deployment-ready.",
    role: "Full-stack development & deployment",
    built:
      "Listing creation flows, category structure, and a seller experience for managing products, with admin-side review logic and a clear listing/pricing structure. Architected and packaged so it ships straight to production.",
    result:
      "A scalable marketplace foundation the business can keep adding sellers and categories to without re-architecting.",
    tags: ["React", "Laravel", "MySQL", "Infrastructure"],
    hue: "199",
  },
  {
    id: "lgs-dash",
    title: "LGS Dash SaaS",
    category: "SaaS Dashboard / UI Engineering",
    tagline:
      "Refining a SaaS dashboard into a consistent, on-brand product interface.",
    role: "UI engineering & design system",
    built:
      "Dashboard UI refinement, dark/light mode polish, and a pass on component consistency — aligning spacing, states, and patterns to the brand so the whole SaaS interface feels like one product.",
    result:
      "A cleaner, more trustworthy interface that's easier to extend as new dashboard modules are added.",
    tags: ["React", "TypeScript", "Design System", "Dark/Light"],
    hue: "210",
  },
  {
    id: "batllava",
    title: "Batllava Premium Resort",
    category: "Hospitality / Social Media / Web Presence",
    tagline:
      "Content direction and social presentation for a premium lakeside resort brand.",
    role: "Content direction & social media",
    built:
      "Hospitality content direction, social media presentation, and visual storytelling — shaping how the resort communicates atmosphere, location, and experience across its channels.",
    result:
      "A more premium, coherent brand presence that matches the positioning of the resort itself.",
    tags: ["Branding", "Social Media", "Content", "Video"],
    hue: "32",
  },
  {
    id: "trimi-dekor",
    title: "Trimi Dekor",
    category: "Branding / Construction / Website",
    tagline:
      "Premium identity and website direction for a construction & decoration business.",
    role: "Brand positioning & web presentation",
    built:
      "Construction and décor brand positioning with clear service structure, a premium identity direction, and website presentation built around credibility and trust.",
    result:
      "A serious, professional presence that helps the business win higher-value, trust-driven clients.",
    tags: ["Branding", "Web Design", "Identity"],
    hue: "24",
  },
  {
    id: "gerdoc-pizza",
    title: "Gerdoc Pizza",
    category: "Restaurant / Ordering Experience",
    tagline:
      "A restaurant website built around the menu and a clear path to order.",
    role: "Web design & conversion",
    built:
      "A restaurant website with clean product and menu presentation plus a direct ordering/contact flow — structured so a hungry local visitor reaches an order in as few steps as possible.",
    result:
      "A focused local presence that turns visits into calls and orders.",
    tags: ["Web Design", "Menu UX", "Local Conversion"],
    hue: "8",
  },
  {
    id: "rohrreinigung-peter",
    title: "Rohrreinigung-Peter",
    category: "German Service Website / Lead Generation",
    tagline:
      "A German drainage-service site engineered for regional leads.",
    role: "Service web & lead generation",
    built:
      "A German-language service website with regional targeting, a clear service structure, and contact forms positioned for conversion — built so local searches turn into enquiries.",
    result:
      "A lead-focused site that presents the service clearly and routes visitors straight to contact.",
    tags: ["Web Design", "Local SEO", "Forms", "Lead Gen"],
    hue: "205",
  },
  {
    id: "shqip-horizon",
    title: "Shqip Horizon Festival",
    category: "Event Landing Page",
    tagline:
      "A high-energy festival landing page with countdown and event structure.",
    role: "Landing page design & build",
    built:
      "An event landing page with a countdown, clear event structure, and an energetic visual treatment — fully responsive so it performs on the phones most attendees actually use.",
    result:
      "A focused page that builds anticipation and points everyone to the key event details.",
    tags: ["Landing Page", "Countdown", "Responsive", "Branding"],
    hue: "280",
  },
  {
    id: "dyshja",
    title: "Dyshja n'Natyrë",
    category: "Creative Media / Outdoor Content",
    tagline:
      "An outdoor media brand — drone, filming, editing, and storytelling, end to end.",
    role: "Creator · filming, drone & editing",
    built:
      "An original outdoor media project: drone and on-the-ground filming, cinematic editing, thumbnail design, and storytelling — produced and published across social platforms.",
    result:
      "A growing content brand that doubles as a live portfolio of the media work Halit offers to clients.",
    tags: ["Drone", "Filming", "Editing", "Storytelling"],
    hue: "150",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding the business, goals, audience, problems, and opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Defining the structure, design direction, technology, content, and execution plan.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Creating the interface, system, brand assets, workflows, content, and technical implementation.",
  },
  {
    num: "04",
    title: "Launch & Deployment",
    desc: "Taking the project live with hosting, domain, SSL, optimization, and final checks.",
  },
  {
    num: "05",
    title: "Improve & Scale",
    desc: "Iterating with better content, automation, performance, analytics, and new features.",
  },
];

export const EXPERIENCE = [
  {
    org: "Light Gears Solutions / Lele Pro",
    role: "Full-Cycle AI Engineering · Web Systems · Infrastructure",
    period: "Current",
    desc: "I work across the full product lifecycle — building marketplace and SaaS platforms in React and Laravel, refining dashboard interfaces and design systems, wiring in AI-assisted workflows, and handling deployment on Linux/Docker/Nginx so what I build actually ships and stays live.",
  },
  {
    org: "Ministry of Defence of Kosovo",
    role: "IT Experience · Technical Support · Systems",
    period: "Institutional",
    desc: "Hands-on IT inside a large institutional environment: diagnosing hardware and software issues, troubleshooting networks, working with servers, and supporting a sizeable base of users — where reliability and clear process mattered more than shortcuts.",
  },
  {
    org: "Freelance & Client Projects",
    role: "Digital Solutions · Web · Branding · Content",
    period: "Ongoing",
    desc: "Direct client work for local and international businesses — designing and building websites, shaping brand identities, producing social content, and setting up the hosting and domains behind them. Often the only person on the project, from first call to launch.",
  },
  {
    org: "Dyshja n'Natyrë",
    role: "Creative Media · Drone · Storytelling",
    period: "Creator project",
    desc: "My own outdoor media brand — planning, filming (ground and drone), editing, and publishing hiking, camping, and adventure content. It's where I sharpen the storytelling and editing eye I bring to client media work.",
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
      "Node / Express",
      "Tailwind CSS",
      "MySQL / MariaDB",
    ],
  },
  {
    category: "Infrastructure & Deployment",
    items: [
      "Linux",
      "Docker",
      "Docker Compose",
      "Nginx",
      "Plesk",
      "SSH",
      "SSL / Certbot",
      "Gitea",
      "Tailscale",
    ],
  },
  {
    category: "AI & Workflow",
    items: [
      "ChatGPT",
      "Claude",
      "Codex",
      "AI-assisted development",
      "Prompt systems",
      "Workflow automation",
      "Technical documentation",
    ],
  },
  {
    category: "Creative & Production",
    items: [
      "Figma",
      "Canva",
      "CapCut",
      "Sony ZV-E10",
      "DJI Mini 2",
      "DJI Avata 2",
      "iPhone 16",
      "Drone content",
      "Video editing",
    ],
  },
];

export const EDUCATION = [
  {
    title: "B.Sc. Computer Science & Engineering",
    org: "Universum International College",
    note: "The engineering foundation behind the systems I build — algorithms, software design, and how real platforms are structured.",
  },
  {
    title: "100% Merit Scholarship",
    org: "Awarded for academic performance",
    note: "Full-tuition merit scholarship earned through results, not application — recognition of consistent top performance.",
  },
  {
    title: "Erasmus+ — Germany",
    org: "International exchange program",
    note: "Selected for the EU Erasmus+ program in Germany: cross-border academic and technical experience in a different engineering culture.",
  },
  {
    title: "Institutional IT Experience",
    org: "Ministry of Defence of Kosovo",
    note: "Real systems and support work inside a serious institutional environment — the kind of setting where uptime and process are non-negotiable.",
  },
  {
    title: "Shipped Client & Product Work",
    org: "Web · SaaS · Branding · Media · Infrastructure",
    note: "A portfolio of work that's live and maintained — not coursework. Designed, built, deployed, and kept running.",
  },
];

export const CREATIVE = [
  { title: "Hiking & Exploration", tag: "Outdoor" },
  { title: "Camping", tag: "Outdoor" },
  { title: "Drone Flying", tag: "Aerial" },
  { title: "Cinematic Editing", tag: "Production" },
  { title: "Video Storytelling", tag: "Content" },
  { title: "Dyshja n'Natyrë", tag: "Project" },
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
    text: "Halit's creative side combines cinematic storytelling, outdoor exploration, drone visuals, photography, editing, and social media content — the same eye for attention that shapes every brand he builds.",
    tags: ["Storytelling", "Editing", "Outdoor", "Social"],
  },
  {
    id: "media-videos",
    label: "Videos",
    icon: "videos",
    code: "REC 00:12",
    meta: "4K · 25fps",
    title: "Video editing & short-form.",
    text: "Video editing, reels, short-form content, commercial visuals, and storytelling — cut for pace, clarity, and retention across every platform.",
    tags: ["Editing", "Commercial", "Short-form", "Color"],
  },
  {
    id: "media-drone",
    label: "Drone",
    icon: "drone",
    code: "ALT 120m",
    meta: "D-LOG · 4K",
    title: "Aerial & cinematic perspectives.",
    text: "Aerial visuals, landscape shots, movement, and cinematic perspectives — DJI Mini 2 and DJI Avata 2 style content that adds scale and motion to any story.",
    tags: ["Aerial", "Landscape", "FPV", "Movement"],
  },
  {
    id: "media-photography",
    label: "Photography",
    icon: "photo",
    code: "f/1.8 · ISO 200",
    meta: "RAW · 24MP",
    title: "Brand & lifestyle photography.",
    text: "Brand visuals, lifestyle shots, product and business photos, and clean social media imagery — composed and graded for a consistent, premium feel.",
    tags: ["Brand", "Lifestyle", "Product", "Social"],
  },
  {
    id: "media-reels",
    label: "Reels",
    icon: "reels",
    code: "9:16 VERT",
    meta: "1080 · 30fps",
    title: "Short-form vertical content.",
    text: "Short-form vertical content for Instagram, TikTok, and social platforms — hooks, pacing, captions, and edits built for the feed.",
    tags: ["Instagram", "TikTok", "Hooks", "Vertical"],
  },
  {
    id: "media-gear",
    label: "Gear",
    icon: "gear",
    code: "KIT 05",
    meta: "READY",
    title: "The creator toolkit.",
    text: "Sony ZV-E10, DJI Mini 2, DJI Avata 2, iPhone 16, and a tuned editing workflow — a compact, capable kit that goes from idea to published quickly.",
    tags: ["Sony ZV-E10", "DJI Mini 2", "DJI Avata 2", "iPhone 16"],
  },
  {
    id: "media-contact",
    label: "Contact",
    icon: "contact",
    code: "● LIVE",
    meta: "OPEN",
    title: "Book creative work.",
    text: "Need video, drone, photo, or social media content for your business? Let's plan a shoot and build content that earns attention.",
    tags: ["Video", "Drone", "Photo", "Social"],
  },
];
