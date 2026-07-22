/**
 * Dyshja n’Natyrë — the dedicated cinematic outdoor content section.
 *
 * Videos are real public uploads from the channel. To add a new one manually,
 * append { id, title } below — the thumbnail resolves automatically from the
 * video id (https://i.ytimg.com/vi/<id>/hqdefault.jpg via ytThumb()).
 */

export const DYSHJA = {
  title: "Dyshja n’Natyrë",
  subtitle:
    "Cinematic outdoor storytelling for Albanian nature, adventure, and exploration.",
  story:
    "Dyshja n’Natyrë is a creative project by Halit Sta and Aldin Cakiqi — two lifelong friends combining outdoor exploration with cinematic production. Together, they plan, film, and edit stories across Albanian nature, from mountains and forests to the sea, camping, hiking, and adventure.",
  contentTypes: [
    "Cinematic outdoor videos",
    "Nature exploration",
    "Camping & hiking",
    "Challenges & adventure",
    "Sea & mountains",
    "Drone visuals",
    "Storytelling",
    "High-quality YouTube production",
  ],
  links: {
    youtube: "https://www.youtube.com/@DyshjanNatyr%C3%AB",
    instagram: "https://www.instagram.com/dyshjanatyre/",
    tiktok: "https://www.tiktok.com/@dyshjanatyre",
    facebook: "https://www.facebook.com/profile.php?id=61571813609209",
  },
};

/** Every episode starts 1–2 weeks before the camera does. */
export const DYSHJA_PLANNING = [
  { label: "Location", detail: "Destination research, access, and travel planning" },
  { label: "Logistics", detail: "Food, clothing, accommodation, timing, and transport" },
  { label: "Story", detail: "Concept, shot plan, narrative structure, and episode direction" },
  { label: "Preparation", detail: "Budget, safety, equipment, batteries, storage, and final checks" },
];

/** Real production numbers — the invisible weight behind each video. */
export const DYSHJA_PRODUCTION: {
  label: string;
  value: string;
  detail?: string;
}[] = [
  { label: "Raw material", value: "250–600 GB", detail: "per episode" },
  { label: "Edited project", value: "70–180 GB", detail: "working files" },
  { label: "Mastered for YouTube delivery", value: "4K · 30 FPS" },
  { label: "Planning", value: "1–2 weeks", detail: "before every shoot" },
];

export const DYSHJA_GEAR = [
  "Sony ZV-E10 + Kit Lens",
  "DJI Mini 2 Fly More Combo",
  "DJI Mini 5 Pro Fly More Combo",
  "DJI Avata 2 Fly More Combo",
  "DJI Action 5 Pro Adventure Combo",
];

export const DYSHJA_WORKFLOW = [
  { label: "Editing", value: "DaVinci Resolve · CapCut" },
  { label: "Music", value: "Envato" },
  {
    label: "Thumbnails",
    value: "Real Photography · Compositing · AI-Assisted Editing · Photoshop",
  },
];

export type DyshjaVideo = {
  id: string;
  title: string;
  duration?: string;
};

export function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function ytUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** Public uploads, newest first (channel trailer pinned last). */
export const DYSHJA_VIDEOS: DyshjaVideo[] = [
  { id: "m5H8Qq-W6R8", title: "2 Ditë Camping në Gjipe – Plazhi më i Egër i Shqipërisë" },
  { id: "gDwOq5nP4kA", title: "Hot Tent pranë liqenit në fillim të pranverës" },
  { id: "O21JhCkajck", title: "Një Natë Camping me Tendën e Re dhe Peshkim" },
  { id: "nT68n08XuH0", title: "24 Orë i Vetëm në Pyll – Tendë e Nxehtë me Stufë" },
  { id: "Trx4yo4WEjI", title: "24 Orë në Pyll – Pjekja e Pulës me Një Metodë të Veçantë" },
  { id: "o1pxqhCFc80", title: "Në Zemër të Alpeve Shqiptare, Thethi dhe Syri i Kaltër" },
  { id: "4vad2vj9E80", title: "24 Orë në Natyrë të Hapur, Pa Tendë" },
  { id: "7JP1in2tLD4", title: "Camping në Malet e Sharrit me Musafirin Tonë Arushën" },
  { id: "o7-fe2nbmkM", title: "Ekspedita 4 Ditore në Via Dinarica me Uta Ibrahimin" },
  { id: "WxZzOY2zTho", title: "2 Ditë Eksplorim i Bregdetit të Egër në Kepin e Rodonit" },
  { id: "jwOHg2xI1_U", title: "24 Orë në Malet e Sharrit – Camping dhe 20 KM drejt Liqenit të Jazhincës" },
  { id: "sLfkQuPqExA", title: "Kanioni i Langaricës – Kamping dhe Ecje e Paharrueshme" },
  { id: "e4_xvSPuUg4", title: "3 Ditë në Ranën e Hedhun – Aventurë Bregdetare që nuk Harrohet" },
  { id: "IwxS5I9ZbfQ", title: "24 Orë Mbijetesë Pa Ushqim – Ndodhi e Papritura" },
  { id: "cbUj2wlYuG8", title: "24 Orë në Pyll – Ndërtimi i Strehës prej Druri" },
  { id: "qjQek3OpTsU", title: "Hiking te Liqenati – Aventurë e Paharrueshme dhe Pamje të Mrekullueshme" },
  { id: "nSOELMNFmjY", title: "Camping mbi Minierën e Braktisur me Pamje Mahnitëse" },
  { id: "gieV7bKg3vQ", title: "Një Natë Camping në Liqenin e Batllavës në -10°C" },
  { id: "rus2jjYfJ84", title: "Dyshja n’Natyrë – Kush jemi dhe çfarë bëjmë!" },
];

/** Creator roots — origin story only, deliberately smaller than the rest. */
export const CREATOR_ROOTS = {
  title: "Creator roots — from gaming content to cinematic digital media.",
  text: "Before professional digital work, Halit began with gaming videos and streaming during the early days of Albanian online content. That period built practical experience in editing, audience attention, online communities, YouTube structure, thumbnails, titles, and consistent publishing — foundations that continue to shape his creative work today.",
  links: [
    {
      label: "YouTube — early channel",
      href: "https://www.youtube.com/channel/UCXAlJP1t18cHm66XGZt9x4A",
    },
    { label: "Twitch — megashqip", href: "https://www.twitch.tv/megashqip" },
  ],
  tags: ["YouTube", "Twitch", "Editing", "Community", "Early Creator Work"],
};
