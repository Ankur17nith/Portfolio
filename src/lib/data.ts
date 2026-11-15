/* ============================================================
   DATA LAYER, All portfolio content lives here.
   Single source of truth. No hardcoded strings in components.
   ============================================================ */

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  category: "founder" | "freelance" | "fulltime";
  url?: string;
  github?: string;
  playStore?: string;
  image?: string;
  stack: string[];
  details?: string[];
  metrics?: string;
  story?: { problem: string; system: string; outcome: string; flow: string[] };
  year: string;
  status: "active" | "shipped" | "archived";
  location?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  url?: string;
  site?: string;
}

export const siteConfig = {
  name: "Ankur Gupta",
  title: "Ankur Gupta | Backend Developer",
  tagline: "The backend behind a better product.",
  description:
    "I'm a Computer Science student at NIT Hamirpur focused on backend development, full-stack applications, and building reliable software through practical projects.",
  url: "https://ankur17nith.github.io",
} as const;

export const socials: {
  github: string;
  email: string;
  linkedin?: string;
  x?: string;
} = {
  github: "https://github.com/Ankur17nith",
  email: "ankurgupta.official17@gmail.com",
};

export const experience: Experience[] = [];

export const projects: Project[] = [
  {
    slug: "skillapt",
    name: "skillapt",
    tagline: "A secure package manager for AI agent skills: install, lock, verify, pack and publish.",
    description:
      "skillapt is a package manager for AI agent skills (SKILL.md plus helper files). It ships as three connected repositories: a TypeScript CLI, a registry API on Cloudflare Workers, and a React web portal for browsing, documentation and publishing.",
    role: "CLI · Registry API · Web Portal · Package Security",
    category: "founder",
    url: "/work/skillapt",
    github: "https://github.com/Ankur17nith/skillapt",
    image: "/images/projects/skillapt/home-light.png",
    stack: ["TypeScript", "Node.js", "React", "Cloudflare Workers", "Hono", "D1 + R2", "Tailwind CSS", "Vite"],
    story: {
      problem: "Agent skills are prompts and code that an AI agent trusts, yet they are copy-pasted from random repositories with no versioning, integrity checks or review step.",
      system: "A CLI installs skills from a registry or straight from GitHub, records them in skills.json and skills.lock.json, verifies SHA-256 digests before extraction, and syncs them into Claude, Cursor, Codex and Antigravity. A Cloudflare Workers registry stores immutable releases, and a React portal handles discovery and publishing.",
      outcome: "Reproducible, verified skill installs across agents, with a registry and web portal that can be self-hosted on Cloudflare's free tier.",
      flow: ["Author & Pack", "Publish to Registry", "Verify & Lock", "Sync to Agents"],
    },
    details: [
      "Agent skills are prompts and code that an AI agent trusts, yet they are copy-pasted from random repositories with no versioning, integrity checks or review step.",
      "The skillapt CLI (Node.js 22, TypeScript) provides init, install, search, info, outdated, update, list, remove, login, logout, pack, publish, yank and doctor, with a skills.json manifest and skills.lock.json lockfile and install --frozen for CI.",
      "The registry (Hono on Cloudflare Workers with D1, R2 and a Durable Object rate limiter) stores immutable releases, validates archives strictly and hashes API tokens before storing them.",
      "The web portal (React 19, React Router 7, Vite, Tailwind CSS v4) offers fuzzy search with a command palette, skill pages, docs rendered from markdown, a publisher dashboard, and light and dark themes.",
    ],
    year: "2026",
    status: "active",
  },
  {
    slug: "fatgs",
    name: "FATGS",
    tagline: "Academic timetable generation through structured scheduling and faculty allocation.",
    description:
      "FATGS is a timetable generation system designed to organize academic scheduling requirements involving faculty, classes, subjects, rooms, and weekly time slots.",
    role: "Scheduling Logic · Faculty Allocation · Timetable Generation · Data Modeling",
    category: "founder",
    url: "https://github.com/Ankur17nith/FATGS",
    github: "https://github.com/Ankur17nith/FATGS",
    image: "/images/projects/fatgs.svg",
    stack: ["Scheduling Logic", "Faculty Allocation", "Data Modeling", "Timetable Generation", "C++", "Python"],
    story: {
      problem: "Generating academic timetables requires coordinating faculty assignments, class groups, room suitability, subjects, and scheduling constraints.",
      system: "The system models academic timetable information and applies scheduling rules to produce structured timetable output. It supports academic master data, slot information, faculty allocation, and timetable generation workflows.",
      outcome: "Structured timetable generation supporting academic requirements and constraint checks.",
      flow: ["Academic Master Data", "Slot & Room Rules", "Faculty Allocation", "Timetable Generation"],
    },
    details: [
      "Generating academic timetables requires coordinating faculty assignments, class groups, room suitability, subjects, and scheduling constraints.",
      "The system models academic timetable information and applies scheduling rules to produce structured timetable output. It supports academic master data, slot information, faculty allocation, and timetable generation workflows.",
      "Defines structured schemas for teachers, student batches, course subjects, classrooms, and time slots.",
      "Implements scheduling logic to prevent faculty double-booking and room assignment overlap across the weekly calendar.",
    ],
    year: "2025",
    status: "active",
  },
  {
    slug: "tt_tracker",
    name: "TT_TRACKER",
    tagline: "Manage academic schedules and handle timetable changes more effectively.",
    description:
      "TT_TRACKER is a full-stack academic timetable management project designed to provide class-wise and faculty-wise timetable views and support schedule changes, cancellations, and room availability checks.",
    role: "React · Node.js · Express.js · MongoDB · Mongoose",
    category: "founder",
    url: "https://github.com/itzzadi04/TT_TRACKER",
    github: "https://github.com/itzzadi04/TT_TRACKER",
    image: "/images/projects/tt_tracker.svg",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    story: {
      problem: "Static timetables are difficult to manage when classes are rescheduled, cancelled, or moved to another room.",
      system: "The application uses a structured timetable data model and management workflows to make schedules easier to view and update. Its intended functionality includes managing upcoming schedule changes and identifying available rooms.",
      outcome: "Class-wise and faculty-wise schedule visibility with support for dynamic schedule adjustments.",
      flow: ["Timetable Data Model", "Class & Faculty Views", "Change Workflows", "Room Availability"],
    },
    details: [
      "Static timetables are difficult to manage when classes are rescheduled, cancelled, or moved to another room.",
      "The application uses a structured timetable data model and management workflows to make schedules easier to view and update. Its intended functionality includes managing upcoming schedule changes and identifying available rooms.",
      "Implemented timetable viewing for class-wise and faculty-wise schedules with clear day-to-day navigation.",
      "Designed data schemas in MongoDB and Mongoose to handle weekly periods, room mappings, and schedule updates.",
      "Planned functionality includes automated room availability lookup and instant schedule change notices.",
    ],
    year: "2025",
    status: "active",
  },
  {
    slug: "prisms",
    name: "PRISMS",
    tagline: "Building a structured digital workflow for PhD research administration.",
    description:
      "PRISMS is an academic administration project intended to support the lifecycle of PhD scholars, beginning with a thesis submission and upload module and providing a foundation for additional research administration workflows.",
    role: "Research Administration · Thesis Submission Module",
    category: "founder",
    url: "/work/prisms",
    github: "https://github.com/Ankur17nith",
    image: "/images/projects/prisms.svg",
    stack: ["Node.js", "Express.js", "MongoDB", "Institutional Auth", "Document Workflows"],
    story: {
      problem: "Research administration involves multiple stages, academic documents, submissions, reviews, and institutional processes. Managing these workflows without a centralized system can make tracking and coordination difficult.",
      system: "Develop the thesis submission module as the foundation of a larger PhD administration platform. Structure the system so future modules can support additional stages of the research lifecycle.",
      outcome: "A centralized digital workflow beginning with authenticated thesis submission for PhD scholars.",
      flow: ["Institutional Auth", "Thesis Submission", "Document Review", "Lifecycle Archival"],
    },
    details: [
      "Research administration involves multiple stages, academic documents, submissions, reviews, and institutional processes. Managing these workflows without a centralized system can make tracking and coordination difficult.",
      "Develop the thesis submission module as the foundation of a larger PhD administration platform. Structure the system so future modules can support additional stages of the research lifecycle.",
      "The initial development scope focuses on the thesis submission module. PhD scholars should be able to authenticate using their institutional college Gmail accounts and submit their thesis documents through a structured digital workflow.",
      "Planned broader lifecycle modules include PhD coursework, comprehensive examination, state-of-the-art examination, fellowship enhancement, open seminar, final evaluation and oral examination, certificate issuance, and archival of completed scholars.",
    ],
    year: "2026",
    status: "active",
  },
];

export const tools = {
  languages: [
    "TypeScript and JavaScript",
    "Python",
    "C and C++",
  ],
  frontend: [
    "HTML and CSS",
    "Tailwind CSS",
    "Bootstrap",
    "React",
    "EJS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "MongoDB and Mongoose",
    "Cloudflare Workers",
  ],
  infrastructure: [
    "Git and GitHub",
    "Docker",
    "Linux",
    "Postman",
    "Figma",
  ],
  also: "TypeScript and JavaScript, Python, C and C++, HTML and CSS, Tailwind CSS, Bootstrap, React, EJS, Node.js, Express.js, MongoDB and Mongoose, Cloudflare Workers, Git and GitHub, Docker, Linux, Postman, and Figma.",
} as const;

