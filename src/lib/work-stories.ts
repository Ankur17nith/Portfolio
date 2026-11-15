export interface WorkFeature {
  id: string;
  title: string;
  outcome: string;
  how: string;
  tech: string;
  article?: string;
}

export interface WorkStory {
  slug: string;
  name: string;
  role: string;
  period: string;
  tagline: string;
  heading: string;
  introduction: string;
  ownership: string;
  image: string;
  caption: string;
  proof: { value: string; label: string }[];
  features: WorkFeature[];
  status: string;
}

export const workStories: WorkStory[] = [
  {
    slug: "skillapt",
    name: "skillapt",
    role: "CLI, Registry & Web Portal",
    period: "Personal Project · 2026",
    tagline: "A secure package manager for AI agent skills: install, lock, verify, pack and publish.",
    heading: "A Secure Package Manager for AI Agent Skills",
    introduction:
      "skillapt is a package manager for AI agent skills (SKILL.md plus helper files). It lets you install skills from a registry or straight from GitHub, lock them, verify their integrity, and sync them into Claude, Cursor, Codex and Antigravity.",
    ownership:
      "I built all three parts: the TypeScript CLI, the registry API on Cloudflare Workers, and the React web portal, including the archive validation, lockfile and token-security design.",
    image: "/images/projects/skillapt/home-light.png",
    caption: "skillapt · Home page of the web portal with the install command and terminal preview.",
    proof: [
      { value: "3 repos", label: "CLI, registry, web portal" },
      { value: "14 commands", label: "init to publish and doctor" },
      { value: "SHA-256", label: "Verified before extraction" },
    ],
    status:
      "All three repositories are built and tested. No public hosted registry is running yet: the portal runs in demo mode on bundled sample skills, and the registry is self-hostable on Cloudflare's free tier.",
    features: [
      {
        id: "package-manager-cli",
        title: "A package manager for agent skills.",
        outcome:
          "Makes skill installs reproducible with a manifest and a lockfile instead of copy-pasting from repositories.",
        how:
          "The CLI scaffolds skills with init, resolves registry names or GitHub sources, writes skills.json and skills.lock.json, supports install --frozen for CI, and syncs installed skills into the skill directories of Claude, Cursor, Codex and Antigravity.",
        tech: "Node.js 22 · TypeScript · commander",
      },
      {
        id: "registry-api",
        title: "A registry that runs on the free tier.",
        outcome:
          "Stores and serves skill packages as immutable releases without any paid infrastructure.",
        how:
          "The registry is a Hono application on Cloudflare Workers with D1 for metadata, R2 for create-only .tgz archives, a Durable Object rate limiter and a daily cleanup cron. Republishing an existing version returns 409.",
        tech: "Cloudflare Workers · Hono · D1 · R2",
      },
      {
        id: "web-portal",
        title: "A portal for discovering skills.",
        outcome:
          "Lets people search, filter and inspect skills before installing them.",
        how:
          "The React portal offers fuzzy search with a command palette, category and compatibility filters, skill pages with install commands and version history, and docs rendered from markdown. With no registry configured it runs entirely on bundled sample data.",
        tech: "React 19 · React Router 7 · Vite · Tailwind CSS v4",
      },
      {
        id: "trust-and-security",
        title: "Security at every layer.",
        outcome:
          "Treats every skill as untrusted input and makes tampering detectable.",
        how:
          "Archives are checked against strict limits, symlinks, devices and path traversal are rejected, lifecycle scripts never run, integrity digests are re-checked from the lockfile, and the portal ships a strict Content-Security-Policy with no third-party requests.",
        tech: "SHA-256 · zod · Archive Validation · CSP",
      },
      {
        id: "publishing-flow",
        title: "Publishing and token management.",
        outcome:
          "Gives publishers a safe way to ship, yank and restore versions.",
        how:
          "Packages are created with pack and shipped with publish. GitHub OAuth protects the dashboard, where publishers view their skills, yank or restore versions, and create CLI tokens that are shown once and stored only as hashes.",
        tech: "GitHub OAuth · API Tokens · Dashboard",
      },
    ],
  },
  {
    slug: "fatgs",
    name: "FATGS",
    role: "Scheduling Logic & Data Modeling",
    period: "Academic Project · 2025",
    tagline: "Academic timetable generation through structured scheduling and faculty allocation.",
    heading: "Faculty Allocation and Timetable Generation System",
    introduction:
      "FATGS is a timetable generation system designed to organize academic scheduling requirements involving faculty, classes, subjects, rooms, and weekly time slots.",
    ownership:
      "I designed and implemented the scheduling logic, academic master data model, constraint validation, and timetable generation workflow.",
    image: "/images/projects/fatgs/studio.png",
    caption:
      "FATGS · Faculty Allocation & Timetable Generation System.",
    proof: [
      { value: "Scheduling", label: "Logic & constraints" },
      { value: "Allocation", label: "Faculty & classrooms" },
      { value: "Structured", label: "Timetable output" },
    ],
    status:
      "Active academic project. Focuses on structured scheduling rules, faculty allocation, and timetable output without conflicting assignments.",
    features: [
      {
        id: "scheduling-problem",
        title: "The academic scheduling problem.",
        outcome:
          "Prevents faculty double-booking and room overlap while satisfying weekly curriculum requirements.",
        how:
          "Generating academic timetables requires coordinating faculty assignments, class groups, room suitability, subjects, and scheduling constraints. The system structures these requirements into defined validation rules before slot assignment.",
        tech: "Scheduling Logic · Constraint Validation",
      },
      {
        id: "data-modeling",
        title: "Structuring academic master data.",
        outcome:
          "Provides a consistent data model for courses, professors, batches, and physical classrooms.",
        how:
          "The system models academic timetable information and applies scheduling rules to produce structured timetable output. It supports academic master data, slot information, faculty allocation, and timetable generation workflows.",
        tech: "Data Modeling · Schema Design",
      },
      {
        id: "faculty-allocation",
        title: "Rules for faculty and room allocation.",
        outcome:
          "Ensures balanced teaching allocations and verifies room suitability for scheduled subjects.",
        how:
          "Faculty preferences and subject requirements are matched against available time slots and room capacities. Conflict checks verify that neither an instructor nor a classroom is assigned to concurrent sessions.",
        tech: "Faculty Allocation · Slot Assignment",
      },
      {
        id: "timetable-workflow",
        title: "Timetable generation and output workflow.",
        outcome:
          "Produces structured weekly timetables organized by class group and faculty schedule.",
        how:
          "The workflow processes master records and slot constraints through structured scheduling steps to output complete weekly schedules.",
        tech: "Timetable Generation · Output Formatting",
      },
    ],
  },
  {
    slug: "tt_tracker",
    name: "TT_TRACKER",
    role: "Full-Stack Developer",
    period: "Collaborative Project · 2025",
    tagline: "Manage academic schedules and handle timetable changes more effectively.",
    heading: "Academic Timetable Tracking and Management System",
    introduction:
      "TT_TRACKER is a full-stack academic timetable management project designed to provide class-wise and faculty-wise timetable views and support schedule changes, cancellations, and room availability checks.",
    ownership:
      "I contributed to the full-stack architecture, backend REST APIs in Node.js/Express, MongoDB schemas, and timetable viewing interfaces.",
    image: "/images/projects/tt_tracker.svg",
    caption:
      "TT_TRACKER · Timetable viewing and management interface.",
    proof: [
      { value: "React + Node", label: "Full-stack stack" },
      { value: "MongoDB", label: "Timetable schemas" },
      { value: "Schedules", label: "Class & faculty views" },
    ],
    status:
      "Core timetable viewing and schedule management implemented; room availability checks and notification alerts represent planned development.",
    features: [
      {
        id: "timetable-views",
        title: "Class-wise and faculty-wise timetable views.",
        outcome:
          "Gives students and faculty members clear, distinct timetable views of daily and weekly schedules.",
        how:
          "Static timetables are difficult to manage when classes are rescheduled, cancelled, or moved to another room. The application provides dedicated views for classes and faculty members.",
        tech: "React · Node.js · Express.js",
      },
      {
        id: "schedule-workflows",
        title: "Handling rescheduling and cancellations.",
        outcome:
          "Supports updating schedule entries for rescheduled or cancelled periods.",
        how:
          "The application uses a structured timetable data model and management workflows to make schedules easier to view and update. Rescheduling workflows allow updates to individual session entries.",
        tech: "Express.js · REST APIs · MongoDB",
      },
      {
        id: "room-availability",
        title: "Room availability checks (Planned).",
        outcome:
          "Helps identify free classrooms and avoid room conflicts dynamically.",
        how:
          "Its intended functionality includes managing upcoming schedule changes and identifying available rooms across periods. Planned logic inspects period occupation across rooms.",
        tech: "Planned Functionality · Conflict Detection",
      },
      {
        id: "data-management",
        title: "Timetable data modeling with Mongoose.",
        outcome:
          "Flexible document storage representing days, periods, subjects, and room identifiers.",
        how:
          "The MongoDB schema models daily schedule blocks, faculty references, and course entities to allow fast querying by class batch or instructor.",
        tech: "MongoDB · Mongoose · Schema Architecture",
      },
    ],
  },
  {
    slug: "prisms",
    name: "PRISMS",
    role: "Research Administration Systems",
    period: "Academic Project · 2026",
    tagline: "Building a structured digital workflow for PhD research administration.",
    heading: "PhD Research & Institutional Scholars Management System",
    introduction:
      "PRISMS is an academic administration project intended to support the lifecycle of PhD scholars, beginning with a thesis submission and upload module and providing a foundation for additional research administration workflows.",
    ownership:
      "Developing the initial thesis submission module, institutional authentication workflow, and document management foundation.",
    image: "/images/projects/prisms/landing.png",
    caption:
      "PRISMS · Digital workflow for PhD research administration.",
    proof: [
      { value: "Thesis Module", label: "Current development scope" },
      { value: "College Gmail", label: "Intended authentication" },
      { value: "9 Stages", label: "Planned research lifecycle" },
    ],
    status:
      "Thesis submission module is the current development scope. Broader lifecycle modules represent planned future milestones.",
    features: [
      {
        id: "institutional-problem",
        title: "Managing research administration workflows.",
        outcome:
          "Creates a structured digital foundation for complex, multi-stage academic processes.",
        how:
          "Research administration involves multiple stages, academic documents, submissions, reviews, and institutional processes. Managing these workflows without a centralized system can make tracking and coordination difficult.",
        tech: "Research Administration · Institutional Workflows",
      },
      {
        id: "thesis-submission",
        title: "Thesis submission module (Current Scope).",
        outcome:
          "Enables PhD scholars to submit thesis documents through a structured digital workflow.",
        how:
          "The initial development scope focuses on the thesis submission module. PhD scholars should be able to authenticate using their institutional college Gmail accounts and submit their thesis documents through a structured digital workflow.",
        tech: "Document Upload · Workflow Management",
      },
      {
        id: "auth-workflow",
        title: "Institutional Gmail authentication (Intended).",
        outcome:
          "Restricts submission access to authenticated scholars with college email verification.",
        how:
          "PhD scholars should be able to authenticate using their institutional college Gmail accounts to verify scholar identity before document submission.",
        tech: "OAuth 2.0 · Institutional Authentication",
      },
      {
        id: "future-modules",
        title: "Planned broader research lifecycle.",
        outcome:
          "Architectural plan to support research milestones from coursework to degree completion.",
        how:
          "Develop the thesis submission module as the foundation of a larger PhD administration platform. Structure the system so future modules can support additional stages of the research lifecycle: PhD coursework, Comprehensive examination, State-of-the-art examination, Fellowship enhancement, Open seminar, Final evaluation and oral examination, Certificate issuance, and Archival of completed PhD scholars.",
        tech: "Planned Lifecycle Architecture",
      },
    ],
  },
];

export const getWorkStory = (slug: string) =>
  workStories.find((story) => story.slug === slug || (slug === "tt-tracker" && story.slug === "tt_tracker"));
