/* Central content source for the Halit Statovci brand site. */

export const PROFILE = {
  name: "Halit Statovci",
  title: "Full-Cycle AI Engineer & Digital Solutions Builder",
  location: "Kosovo",
  availability: "Available for selected projects · Kosovo / Remote",
  email: "halitsta@gmail.com",
  linkedin: "https://www.linkedin.com/in/halit-statovci-89bb90198/",
  instagram: "https://www.instagram.com/dyshjanatyre/",
  instagramHandle: "@dyshjanatyre",
  youtube: "https://www.youtube.com/channel/UCVDq-YjzYcyfLS0-XMNrl9w",
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
    note: "Includes experience building for the German market (Rohrreinigung-Peter), backed by academic exposure in Germany through Erasmus+ in Ludwigshafen.",
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
      "Content direction and social presentation for a premium lakeside resort.",
    role: "Content direction & social media",
    built: [
      "Direction for posts, stories, and reels across the resort's channels.",
      "Captions and hospitality communication in the brand's voice.",
      "Villa and event presentation — atmosphere, location, experience.",
    ],
    result:
      "A more premium, coherent brand presence that matches the positioning of the resort itself.",
    meta: "Batllavë, Podujevë · batllavaresort.com",
    tags: ["Hospitality", "Social Media", "Branding"],
    hue: "38",
    screen: "resort",
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
    title: "Dyshja n'Natyrë",
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
    org: "Creator Thread — MegaSHQIP → Dyshja n'Natyrë",
    role: "Creative Media · Drone · Storytelling",
    period: "Ongoing",
    desc: "The media thread runs the longest: I was one of the first Albanian-community YouTubers with MegaSHQIP in the gaming era, and today that instinct lives in Dyshja n'Natyrë — planning, filming (ground and drone), editing, and publishing outdoor content. It's where I sharpen the storytelling and editing eye I bring to client media work.",
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
  /** optional second paragraph — factual credibility line */
  note?: string;
  /** optional real external links (channel, socials) */
  links?: { label: string; href: string }[];
  /** optional real YouTube video, rendered as a click-to-load embed */
  video?: { id: string; title: string };
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
    text: "My creative side combines cinematic storytelling, outdoor exploration, drone visuals, photography, editing, and social media content — the same eye for attention that shapes every brand I build.",
    note: "Dyshja n'Natyrë is an active outdoor media brand (Haliti & Aldini) with brand-supported content — supported by @outdoor.meals.",
    links: [
      {
        label: "YouTube — Dyshja n'Natyrë",
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
    title: "Video editing & short-form.",
    text: "Video editing, reels, short-form content, commercial visuals, and storytelling — cut for pace, clarity, and retention across every platform.",
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
    text: "Aerial visuals, landscape shots, movement, and cinematic perspectives — DJI Mini 2 and DJI Avata 2 content that adds scale and motion to any story.",
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
