/**
 * Case-study data for the Work section.
 *
 * Thumbnails are real desktop screenshots captured from the live sites
 * (public/projects/*.webp). Login-protected systems show only their public
 * login screen (`protected: true`). Projects without a live URL fall back to
 * the stylized ProjectVisual mock (hue + screen).
 */

export type ProjectFilter =
  | "websites"
  | "systems"
  | "saas"
  | "hospitality"
  | "social"
  | "creative"
  | "platforms";

export const PROJECT_FILTERS: { key: ProjectFilter | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "websites", label: "Websites" },
  { key: "systems", label: "Systems" },
  { key: "saas", label: "SaaS" },
  { key: "hospitality", label: "Hospitality" },
  { key: "social", label: "Social Media" },
  { key: "creative", label: "Creative Media" },
  { key: "platforms", label: "Platforms" },
];

export type FallbackScreen =
  | "marketplace"
  | "dashboard"
  | "resort"
  | "brand"
  | "menu"
  | "service"
  | "festival"
  | "video";

export type CaseStudy = {
  id: string;
  title: string;
  /** public live URL — renders a Visit Website button */
  url?: string;
  /** clean label for the URL / address bar */
  urlLabel?: string;
  category: string;
  filters: ProjectFilter[];
  /** one-sentence card line — short, never truncated */
  summary: string;
  role: string;
  built: string[];
  purpose: string;
  tags: string[];
  /** real screenshot under /projects — relative for file:// support */
  thumbnail?: string;
  featured?: boolean;
  /** login-protected system: only the public login screen is shown */
  protected?: boolean;
  /** stylized fallback visual when no real screenshot exists */
  hue?: string;
  screen?: FallbackScreen;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "gerdoc-pizza",
    title: "Gerdoc Pizza",
    url: "https://gerdocpizza.com/",
    urlLabel: "gerdocpizza.com",
    category: "Restaurant / Online Ordering System",
    filters: ["websites", "systems", "hospitality"],
    summary:
      "An advanced online ordering website for a pizzeria — menu, cart, and a 100% localized checkout flow.",
    role: "Design, build & ordering system",
    built: [
      "Menu-first restaurant website with clean product presentation and cart flow.",
      "Online ordering built for how Kosovo actually addresses: a fully localized flow using house numbers instead of standard street forms.",
      "Ordering and contact paths with WhatsApp and Viber options, plus location so local visitors find the restaurant fast.",
    ],
    purpose:
      "Turn local cravings into orders with a flow that matches how customers in Kosovo really order and receive food.",
    tags: ["Restaurant", "Online Ordering", "Localization", "Kosovo", "Advanced System"],
    thumbnail: "projects/gerdoc-pizza.webp",
    featured: true,
  },
  {
    id: "lgs-marketplace",
    title: "LGS Marketplace",
    url: "https://market.light-gears.de/",
    urlLabel: "market.light-gears.de",
    category: "Marketplace / Online Accounts Platform",
    filters: ["platforms", "systems"],
    summary:
      "A marketplace platform for structured buying and selling of online accounts — listings, seller tools, admin review.",
    role: "Web platform / marketplace execution support",
    built: [
      "Listing creation flows and the category structure behind them.",
      "Seller interface for managing products and pricing.",
      "Admin-side review logic plus UI improvements across the platform.",
      "API and database checks, packaged into a deployment-ready structure.",
    ],
    purpose:
      "A scalable marketplace foundation the business can keep adding sellers and categories to without re-architecting.",
    tags: ["Marketplace", "Listings", "React", "Laravel", "Digital Products"],
    thumbnail: "projects/lgs-marketplace.webp",
    featured: true,
  },
  {
    id: "batllava",
    title: "Batllava Premium Resort",
    url: "https://www.batllavaresort.com/",
    urlLabel: "batllavaresort.com",
    category: "Hospitality / Resort / Digital Presence",
    filters: ["websites", "hospitality", "social"],
    summary:
      "A premium resort website connected to a full managed digital presence — social, listings, reviews, and content.",
    role: "Website, social media & platform management",
    built: [
      "Resort website with villa presentation, booking search, and event content.",
      "Daily posts, stories, and reels across Instagram, TikTok, and Facebook on a weekly content plan.",
      "Google Maps, Booking.com, and Airbnb listing management — reviews, images, and presentation.",
      "Visual material captured with camera, drone, and action camera — Sony ZV-E10, DJI Mini 5 Pro, DJI Avata 2, DJI Action 5 Pro.",
    ],
    purpose:
      "One coherent premium presence across every channel a guest touches — from the first reel to the booking page.",
    tags: ["Resort", "Hospitality", "Social Media", "Listings", "Content"],
    thumbnail: "projects/batllava-premium-resort.webp",
    featured: true,
  },
  {
    id: "mint-walldorf",
    title: "Mint Dine & Bar — Walldorf",
    url: "https://mint-walldorf.de/",
    urlLabel: "mint-walldorf.de",
    category: "Restaurant Website / Table Reservation",
    filters: ["websites", "hospitality"],
    summary:
      "A restaurant website for fresh Asian cuisine at the lake in Walldorf, built around online table reservation.",
    role: "Web design & build",
    built: [
      "Atmosphere-first presentation of the restaurant, terrace, and lakeside setting.",
      "Online table reservation flow as the site's primary action.",
      "Menu and hospitality content structured for discovery and booking.",
    ],
    purpose:
      "Let the setting sell the visit — and make reserving a table the easiest thing on the page.",
    tags: ["Restaurant", "Reservation", "Germany", "Hospitality"],
    thumbnail: "projects/mint-walldorf.webp",
    featured: true,
  },
  {
    id: "energytech-inventory",
    title: "Energy Tech Inventory System",
    url: "https://inv.energytech-ks.com.light-gears.de/login.php",
    urlLabel: "inv.energytech-ks.com",
    category: "Inventory Management System / Internal Tool",
    filters: ["systems"],
    summary:
      "A custom inventory system for maintenance and stock management — operational control for internal workflows.",
    role: "Full-stack development",
    built: [
      "Custom inventory management for maintenance parts and stock levels.",
      "Inventory visibility and stock operations for the people who run it daily.",
      "Internal business workflows built around how the operation actually moves.",
    ],
    purpose:
      "Operational control: know what exists, where it is, and what needs restocking — without spreadsheets.",
    tags: ["Inventory", "Management System", "PHP", "Internal Tool"],
    thumbnail: "projects/energytech-inventory-login.webp",
    protected: true,
    featured: true,
  },
  {
    id: "lgs-dash",
    title: "LGS Dash",
    url: "https://dash.light-gears.de/",
    urlLabel: "dash.light-gears.de",
    category: "SaaS Dashboard / Business Platform",
    filters: ["saas", "platforms"],
    summary:
      "A SaaS dashboard customized and optimized for client needs — usability, consistency, and brand alignment.",
    role: "UI engineering & design system",
    built: [
      "Dashboard UI refinement with dark/light mode support.",
      "Component consistency pass — spacing, states, and patterns aligned.",
      "Brand application across the product, with sidebar and topbar polish.",
    ],
    purpose:
      "A cleaner, more trustworthy interface that's easier to extend as new dashboard modules are added.",
    tags: ["SaaS", "Dashboard", "Design System", "UI Optimization"],
    thumbnail: "projects/lgs-dash-login.webp",
    protected: true,
  },
  {
    id: "mpv-gmbh",
    title: "MPV GmbH Platform",
    url: "https://mpv-gmbh.light-gears.de/#/login",
    urlLabel: "mpv-gmbh.light-gears.de",
    category: "Medical / Healthcare Platform",
    filters: ["saas", "systems", "platforms"],
    summary:
      "A healthcare platform environment for professional use — clinical dashboard access behind a clean login.",
    role: "Platform development support",
    built: [
      "System environment for professional healthcare use.",
      "Clean, trust-first login and access flow for clinical users.",
      "Platform interface work aligned with privacy-first operation.",
    ],
    purpose:
      "A professional system environment where clarity and trust matter more than decoration.",
    tags: ["Medical", "Healthcare", "Platform", "System"],
    thumbnail: "projects/mpv-gmbh-login.webp",
    protected: true,
  },
  {
    id: "aspire-academy-london",
    title: "Aspire Academy London",
    url: "https://aspireacademylondon.com/",
    urlLabel: "aspireacademylondon.com",
    category: "Education Website / London",
    filters: ["websites"],
    summary:
      "A website for a London tutoring academy — GCSE and A-Level courses presented with academic seriousness.",
    role: "Web design & build",
    built: [
      "Course and subject presentation for GCSE and A-Level tutoring (Maths, Sciences, English).",
      "Clear structure for session format, small-group teaching, and pricing.",
      "A professional academic brand presence with a direct enrolment path.",
    ],
    purpose:
      "Give parents and students a credible, clear picture of the academy — and a simple way to join.",
    tags: ["Education", "Courses", "London", "Web Design"],
    thumbnail: "projects/aspire-academy-london.webp",
    featured: true,
  },
  {
    id: "krasniqi-detailing",
    title: "Krasniqi Detailing Co",
    urlLabel: "krasniqidetailingco.com",
    category: "Car Detailing / Booking System / London",
    filters: ["websites", "systems"],
    summary:
      "A website and booking system for home car wash and detailing services in London.",
    role: "Web design, build & booking flow",
    built: [
      "Service website for at-home car wash and detailing in London.",
      "Booking system so customers reserve detailing or washing slots directly.",
      "Local-business structure: services, coverage, and contact without friction.",
    ],
    purpose:
      "Let a local service take reservations like a real operation — not through DMs.",
    tags: ["Car Detailing", "Booking", "London", "Local Business"],
    thumbnail: "projects/krasniqi-detailing-co.webp",
  },
  {
    id: "energytech-ks",
    title: "Energy Tech",
    url: "https://energytech-ks.light-gears.de/",
    urlLabel: "energytech-ks.light-gears.de",
    category: "Energy / Manufacturing Website",
    filters: ["websites"],
    summary:
      "A technical business website for a Kosovar manufacturer of heat pumps and compressed air dryers.",
    role: "Web design & build",
    built: [
      "Product presentation for DC inverter heat pumps and compressed air dryers.",
      "Technology, manufacturing process, and certification content (ISO-certified production).",
      "Quotation and technical inquiry paths for residential, commercial, and industrial buyers.",
    ],
    purpose:
      "Present serious in-house manufacturing to European markets with the clarity technical buyers expect.",
    tags: ["Energy", "Manufacturing", "Technical Business", "Kosovo"],
    thumbnail: "projects/energytech-ks.webp",
  },
  {
    id: "nitro-festival",
    title: "Nitro Festival",
    url: "https://nitro-festival.light-gears.de/",
    urlLabel: "nitro-festival.light-gears.de",
    category: "Festival Website / Event Landing Page",
    filters: ["websites"],
    summary:
      "A festival landing page built to carry event energy — information, visuals, and visitor engagement.",
    role: "Landing page design & build",
    built: [
      "High-energy event presentation with the festival's visual identity.",
      "Event information structured for fast scanning — what, where, when.",
      "Engagement paths pointing visitors to the moments that matter.",
    ],
    purpose:
      "Make the event feel big before it happens — and give visitors the details without digging.",
    tags: ["Festival", "Event", "Landing Page", "Web Design"],
    thumbnail: "projects/nitro-festival.webp",
  },
  {
    id: "al-monte",
    title: "Al Monte",
    url: "https://www.al-monte.de/",
    urlLabel: "al-monte.de",
    category: "Restaurant Website / Germany",
    filters: ["websites", "hospitality"],
    summary:
      "A restaurant website for Al Monte in Germany — brand, food experience, location, and contact in one clean format.",
    role: "Web design & build",
    built: [
      "Restaurant brand presentation with a food-first visual approach.",
      "Location and contact structured for quick decisions.",
      "A clean digital format that matches the in-house experience.",
    ],
    purpose:
      "Give the restaurant a digital presence as considered as its plates.",
    tags: ["Restaurant", "Germany", "Hospitality", "Website"],
    thumbnail: "projects/al-monte.webp",
  },
  {
    id: "coll-hills-kitchen",
    title: "Coll-Hill's Kitchen",
    url: "https://coll-hills-kitchen.com/",
    urlLabel: "coll-hills-kitchen.com",
    category: "Restaurant & Lounge / Hospitality",
    filters: ["websites", "hospitality"],
    summary:
      "A hospitality website for an African restaurant and lounge in Karlsruhe — kitchen, atmosphere, and reservation.",
    role: "Web design & build",
    built: [
      "Presentation of authentic African cuisine with modern plating and lounge atmosphere.",
      "Menu exploration and reservation booking as the core visitor flow.",
      "Structure that carries a decade of culinary experience with confidence.",
    ],
    purpose:
      "Translate a distinctive kitchen and lounge concept into a site that fills tables.",
    tags: ["Restaurant", "Lounge", "Hospitality", "Germany"],
    thumbnail: "projects/coll-hills-kitchen.webp",
  },
  {
    id: "blender-fahrzeugtechnik",
    title: "Blender Fahrzeugtechnik",
    url: "https://blender-fahrzeugtechnik.de/",
    urlLabel: "blender-fahrzeugtechnik.de",
    category: "Automotive / Fahrzeugtechnik Website",
    filters: ["websites"],
    summary:
      "A business website for a certified German vehicle workshop — inspections, repairs, and appointment contact.",
    role: "Web design & build",
    built: [
      "Service presentation: inspections, oil service, repairs, glass, and air conditioning.",
      "Credibility structure around master certification and DEKRA partnership.",
      "Clear opening hours and appointment contact for customers.",
    ],
    purpose:
      "Present a certified workshop the way customers judge one: competent, clear, and easy to book.",
    tags: ["Automotive", "Fahrzeugtechnik", "Germany", "Business"],
    thumbnail: "projects/blender-fahrzeugtechnik.webp",
  },
  {
    id: "artanhaus-gebaeudetechnik",
    title: "Artan Haus & Gebäudetechnik",
    url: "https://artanhaus-gebaeudetechnik.de/",
    urlLabel: "artanhaus-gebaeudetechnik.de",
    category: "Building Technology / Service Website",
    filters: ["websites"],
    summary:
      "A German building technology website — sanitary, heating, and maintenance services presented for lead flow.",
    role: "Web design & build",
    built: [
      "Service structure across bathrooms, heating systems, heat pumps, and solar technology.",
      "Positioning around energy-efficient, sustainable complete packages — planning through completion.",
      "Lead and contact flow tuned for a regional service business.",
    ],
    purpose:
      "Turn regional searches for building services into qualified inquiries.",
    tags: ["Gebäudetechnik", "German Market", "Service Website", "Lead Generation"],
    thumbnail: "projects/artanhaus-gebaeudetechnik.webp",
  },
  {
    id: "perparim-mont",
    title: "Perparimi Mont",
    url: "https://www.perparim-mont.com/",
    urlLabel: "perparim-mont.com",
    category: "Construction / Montage / Business Website",
    filters: ["websites"],
    summary:
      "A business website for a metal construction and montage company — projects, services, and credibility.",
    role: "Web design & build",
    built: [
      "Presentation of metal constructions, panel mounting, sheet metal, and ventilation work.",
      "Project gallery as proof of commercial and industrial delivery.",
      "Service descriptions and inquiry forms for new contracts.",
    ],
    purpose:
      "Give an industrial contractor a portfolio and contact platform that wins serious work.",
    tags: ["Construction", "Montage", "Business", "Website"],
    thumbnail: "projects/perparim-mont.webp",
  },
  {
    id: "lasa-bau",
    title: "LaSa Bau",
    url: "https://lasa-bau.de/",
    urlLabel: "lasa-bau.de",
    category: "Construction Website / Germany",
    filters: ["websites"],
    summary:
      "A German construction business website — renovation and building services structured around trust and leads.",
    role: "Web design & build",
    built: [
      "Service presentation across interior finishing, house renovation, and bathroom remodeling.",
      "Trust structure: quality, reliability, and transparent communication up front.",
      "Regional lead generation for Kronau and the surrounding area.",
    ],
    purpose:
      "Make choosing a builder feel safe — and contacting one feel easy.",
    tags: ["Construction", "Germany", "Lead Generation", "Website"],
    thumbnail: "projects/lasa-bau.webp",
  },
  {
    id: "rudari-gartenbau",
    title: "Rudari Gartenbau",
    url: "https://www.rudari-gartenbau.de/",
    urlLabel: "rudari-gartenbau.de",
    category: "Garden / Landscaping Website",
    filters: ["websites"],
    summary:
      "A landscaping company website — garden construction, paving, and tree care presented with real project proof.",
    role: "Web design & build",
    built: [
      "Service presentation: Gartenbau, Pflasterbau, Baumpflege, terraces, and fencing.",
      "Project portfolio and process sections that show how the work actually runs.",
      "Inquiry flow for private and commercial outdoor projects.",
    ],
    purpose:
      "Turn a decade of outdoor craftsmanship into an online presence that generates inquiries.",
    tags: ["Gartenbau", "Landscaping", "Service Business", "Germany"],
    thumbnail: "projects/rudari-gartenbau.webp",
  },
  {
    id: "kurtaj",
    title: "Kurtaj Dachdeckerei",
    url: "https://kurtaj.light-gears.de/",
    urlLabel: "kurtaj.light-gears.de",
    category: "Roofing / Business Website",
    filters: ["websites"],
    summary:
      "A roofing company website — flat roofs, waterproofing, and green roofs for the Stuttgart region.",
    role: "Web design & build",
    built: [
      "Service structure across flat roof work, waterproofing, green roofs, and roof windows.",
      "Positioning around personal consultation, clean execution, and durable solutions.",
      "Regional presentation for residential and commercial clients.",
    ],
    purpose:
      "Present a craft business operating since 2007 with the digital seriousness it earned on roofs.",
    tags: ["Roofing", "Germany", "Business", "Website"],
    thumbnail: "projects/kurtaj.webp",
  },
  {
    id: "ecofruits-ks",
    title: "Eco Fruits",
    url: "https://ecofruits-ks.com/",
    urlLabel: "ecofruits-ks.com",
    category: "Food / Agriculture / Business Website",
    filters: ["websites"],
    summary:
      "A business website for a Kosovar fruit and vegetable processing company — brand, products, and identity.",
    role: "Web design & build",
    built: [
      "Brand presentation for a fruit and vegetable processing and preserving company.",
      "Brands and product structure with a clean bilingual-ready format.",
      "Company story and contact paths for offers and partnerships.",
    ],
    purpose:
      "From nature to the table: a clean online identity for a growing food producer.",
    tags: ["Food", "Agriculture", "Kosovo", "Business"],
    thumbnail: "projects/ecofruits-ks.webp",
  },
  {
    id: "noircorp-inventory",
    title: "NoirCorp Inventory System",
    category: "Inventory / Full-Stack System",
    filters: ["systems"],
    summary:
      "One of my earliest full-stack projects — an inventory system still in daily use across four countries.",
    role: "Full-stack developer — front-end & back-end",
    built: [
      "Inventory stock management system built front-to-back for real operational use.",
      "Product tracking, quantity views, and stock operations for the workers who run it daily.",
      "Multi-location support covering operations in Kosovo, Albania, Macedonia, and the USA.",
    ],
    purpose:
      "An early project that proved itself in production — still used across Kosovo, Albania, Macedonia, and the USA.",
    tags: ["Full-Stack", "Inventory", "Business System"],
    hue: "262",
    screen: "dashboard",
  },
  {
    id: "trimi-dekor",
    title: "Trimi Dekor",
    category: "Branding / Construction / Website",
    filters: ["websites"],
    summary:
      "Premium identity and website direction for a construction & decoration business.",
    role: "Brand positioning & web presentation",
    built: [
      "Premium identity direction for a construction/decoration business — facades, Knauf, plastering, painting.",
      "Website direction built around credibility and a clear service structure.",
      "Business cards and a brand system that holds together in print and on screen.",
    ],
    purpose:
      "A serious, professional presence that helps the business win higher-value, trust-driven clients.",
    tags: ["Branding", "Web Design", "Identity"],
    hue: "28",
    screen: "brand",
  },
  {
    id: "rohrreinigung-peter",
    title: "Rohrreinigung-Peter",
    category: "German Service Website / Lead Generation",
    filters: ["websites"],
    summary: "A German drainage-service site engineered for regional leads.",
    role: "Service web & lead generation",
    built: [
      "German-language drainage-service website with a clear service structure.",
      "Regional pages: Stuttgart, Böblingen, Calw, Esslingen, Ludwigsburg, Rems-Murr, Tübingen.",
      "PHP contact forms positioned for conversion, plus a location popup.",
    ],
    purpose:
      "A lead-focused site that presents the service clearly and routes regional searches straight to contact.",
    tags: ["Web Design", "Local SEO", "German Market"],
    hue: "205",
    screen: "service",
  },
  {
    id: "shqip-horizon",
    title: "Shqip Horizon Festival",
    category: "Event Landing Page",
    filters: ["websites"],
    summary:
      "A high-energy festival landing page with countdown and event structure.",
    role: "Landing page design & build",
    built: [
      "High-energy festival landing page with a live countdown.",
      "Clear event structure — lineup, schedule, and key details.",
      "Mobile-first CSS so it performs on the phones attendees actually use.",
    ],
    purpose:
      "A focused page that builds anticipation and points everyone to the key event details.",
    tags: ["Landing Page", "Countdown", "Responsive"],
    hue: "280",
    screen: "festival",
  },
  {
    id: "dyshja",
    title: "Dyshja n'Natyrë",
    url: "https://www.youtube.com/@DyshjanNatyr%C3%AB",
    urlLabel: "youtube.com · @DyshjanNatyrë",
    category: "Creative Media / Outdoor Content",
    filters: ["creative"],
    summary:
      "A cinematic outdoor media brand — drone, filming, editing, and storytelling, end to end.",
    role: "Creator — filming, drone & editing",
    built: [
      "An outdoor media brand run end-to-end: planning, shoots, publishing.",
      "Ground and drone filming across hikes, camps, and adventures.",
      "Cinematic editing, thumbnail design, and storytelling per episode.",
    ],
    purpose:
      "A growing content brand that doubles as a live portfolio of the media work I offer to clients — see the dedicated section below.",
    tags: ["Drone", "Filming", "Editing", "Storytelling"],
    thumbnail: "projects/dyshja-natyre.webp",
    hue: "152",
    screen: "video",
  },
];
