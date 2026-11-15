export interface StoryChapter {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface StoryNarrative {
  opening: string[];
  notes: Record<string, string[]>;
  chapters?: StoryChapter[];
  closing: string[];
}

export const narratives: Record<string, StoryNarrative> = {
  skillapt: {
    opening: [
      "AI agent skills, a SKILL.md file plus helper files, are effectively prompts and code that an agent trusts. Today they are usually copy-pasted from random repositories, which gives you no versioning, no integrity check and no review step.",
      "skillapt is a package manager built for that gap. It installs skills from a registry or from any public GitHub repository, records them in a manifest and a lockfile, verifies them before extraction, and syncs them into the skill directories of Claude, Cursor, Codex and Antigravity.",
      "The project is three repositories that work together: the skillapt CLI, the skillapt-registry API and the skillapt-web portal. I wanted to see one idea through the whole stack, from a terminal command to a database row to a web page.",
    ],
    notes: {
      "package-manager-cli": [
        "The CLI covers the full lifecycle with fourteen commands: init, install, search, info, outdated, update, list, remove, login, logout, pack, publish, yank and doctor.",
        "Installs are reproducible. skills.json declares what a project wants, skills.lock.json records exactly what was resolved, and install --frozen refuses to drift, which is what a CI pipeline needs.",
        "GitHub sources are pinned to a resolved commit SHA in the lockfile, so a branch moving later cannot silently change what gets installed. Skills can then be synced into an agent's directory with the --target flag.",
      ],
      "registry-api": [
        "The registry is built to cost nothing to host. A Hono app runs on Cloudflare Workers, D1 holds metadata, users, tokens and the audit log, and R2 holds the immutable .tgz archives.",
        "Releases are immutable by design. R2 writes are create-only and metadata is written in one atomic batch, so republishing a version returns 409 instead of replacing it. Owners can yank a bad version, which hides it from version ranges but keeps it downloadable for existing lockfiles.",
        "A Durable Object provides sliding-window rate limits, and a daily cron trigger cleans up. A read-only maintenance mode and a runbook cover operations.",
      ],
      "web-portal": [
        "The portal is a fast static site. It has fuzzy search with a Ctrl+K command palette, category and compatibility filters, sorting, pagination and URL-synced filters.",
        "Each skill page renders its README as GitHub-flavored markdown without raw HTML, shows the install command, the version history with yank status and a security summary, and includes an abuse-report form.",
        "Documentation lives as markdown files in the repository and is rendered at /docs. Light and dark themes load without a flash of the wrong theme, and automated axe-core checks run against every route in both themes.",
      ],
      "trust-and-security": [
        "The threat model starts from the assumption that a skill is hostile. SHA-256 digests are verified before extraction, archives have strict size and file-count limits, and symlinks, hardlinks, devices, absolute paths and .. segments are rejected.",
        "Lifecycle scripts never run, gzip decompression is capped to defend against decompression bombs, and declared permissions such as network, shell and filesystem are shown and need confirmation when elevated.",
        "Registry responses are validated with zod, redirects are HTTPS-only and drop the token when the origin changes, and the web portal uses a strict Content-Security-Policy where script-src is self and fonts are self-hosted.",
      ],
      "publishing-flow": [
        "A publisher scaffolds a skill with init, creates an archive with pack and ships it with publish. Unscoped names are first-come, while @scope/name packages are tied to the owning GitHub account.",
        "The dashboard signs in with GitHub OAuth using HTTP-only, Secure, SameSite cookies and CSRF checks. Publishers can yank and restore versions and create or revoke CLI tokens.",
        "Tokens look like apt_live_..., expire after 90 days by default, are shown once, and only their SHA-256 hash is stored.",
      ],
    },
    chapters: [
      {
        heading: "How the three repositories fit together",
        paragraphs: [
          "The CLI talks to the registry over HTTPS under /v1 with a bearer token. The web portal reads the same API through a CORS allowlist, and the build writes the registry URL into the portal's Content-Security-Policy so the browser can call only that one origin.",
        ],
        bullets: [
          "skillapt: the CLI, distributed through npm and requiring Node.js 22.12 or newer.",
          "skillapt-registry: the registry API on Cloudflare Workers, D1 and R2.",
          "skillapt-web: the React portal and documentation, deployed as static assets.",
        ],
      },
      {
        heading: "Registry versus GitHub sources",
        paragraphs: [
          "A registry install uses name@range, supports SemVer ranges, yanking and dependencies, and checks the SHA-256 from registry metadata. A GitHub install uses owner/repo/subpath@ref, needs no registry at all, and pins to a commit SHA.",
          "Content rule violations are errors for registry packages and warnings for GitHub sources, where a strict flag turns them into errors.",
        ],
      },
    ],
    closing: [
      "Building skillapt taught me how much of a package manager is really about trust: integrity checks, immutable releases, safe archive handling and careful token storage matter more than the install command itself.",
      "It also gave me practice shipping one product across a CLI, an edge API and a web frontend, with tests and CI in each repository.",
    ],
  },
  fatgs: {
    opening: [
      "Generating academic timetables requires coordinating faculty assignments, class groups, room suitability, subjects, and scheduling constraints. Without structured data models and automated scheduling rules, conflicts such as instructor overlap or double-booked classrooms easily occur.",
      "FATGS (Faculty Allocation and Timetable Generation System) is designed to organize academic scheduling requirements involving faculty members, classes, subjects, classrooms, and weekly time slots. The system models academic timetable information and applies scheduling rules to produce structured timetable output.",
      "This project focuses on data modeling, constraint definition, and practical scheduling workflows to automate timetable generation while respecting academic requirements.",
    ],
    notes: {
      "scheduling-problem": [
        "Academic scheduling involves multiple interdependent variables: teachers have specific subject proficiencies and availability; student batches have required course hours; and rooms have differing capacities and facilities.",
        "Manual timetable drafting often results in subtle conflicts that are difficult to diagnose before the semester begins. FATGS models these relationships explicitly, checking that assignments satisfy course credit distributions across the working week.",
        "The system treats double-booking prevention as an essential hard constraint: at no point can an instructor or a classroom be allocated to two concurrent sessions.",
      ],
      "data-modeling": [
        "The academic data model forms the core of FATGS. It defines entities for departments, faculty members, course subjects, student cohorts, lecture rooms, and time slot intervals.",
        "By establishing clean schemas and relational mappings across these master entities, scheduling queries can efficiently inspect slot occupancy and subject requirements.",
        "This master data approach ensures that changes to faculty availability or room allocations can be updated centrally without invalidating the broader scheduling framework.",
      ],
      "faculty-allocation": [
        "Faculty allocation coordinates instructor availability with subject distribution. The system maps teaching loads to prevent individual faculty over-allocation while ensuring all course topics have qualified instructors assigned.",
        "Room suitability matching checks that lab sessions are assigned to appropriate specialized spaces and regular lectures are assigned to classrooms that accommodate the batch size.",
        "Allocation rules process preferences and availability windows, applying deterministic assignment logic to slot faculty into open periods.",
      ],
      "timetable-workflow": [
        "The timetable generation workflow processes the master data and constraint sets sequentially. Unassigned periods are matched against eligible faculty-room combinations until the weekly schedule is filled.",
        "Generated timetables are formatted into both class-wise matrices and faculty-wise views. This allows students to view their cohort's weekly schedule while giving professors a consolidated calendar of their assigned hours.",
        "Output structures support review and export, providing academic administrators with transparent views of weekly slot allocations.",
      ],
    },
    closing: [
      "Building FATGS provided hands-on experience in modeling complex scheduling constraints and designing relational data structures for academic workflows.",
      "The project demonstrates how structured rules and algorithmic planning can simplify administrative coordination in educational institutions.",
    ],
  },
  tt_tracker: {
    opening: [
      "Static paper timetables and static notices are difficult to manage when classes are rescheduled, cancelled, or moved to another room. Communicating schedule adjustments across faculty and students requires a structured management system.",
      "TT_TRACKER is a full-stack academic timetable management project designed to provide class-wise and faculty-wise timetable views and support schedule changes, cancellations, and room availability checks.",
      "Built with React, Node.js, Express.js, and MongoDB, the project establishes a practical foundation for tracking academic schedules dynamically. In this overview, core timetable viewing and data modeling are implemented features, while automated room availability checks and notification alerts are part of planned functionality.",
    ],
    notes: {
      "timetable-views": [
        "Static timetables make it cumbersome for students and faculty to track day-to-day schedule variations. TT_TRACKER provides dedicated, interactive interfaces where schedules can be viewed by class batch or individual faculty member.",
        "The React frontend organizes daily periods into clear chronological time blocks, highlighting current and upcoming sessions for the week.",
        "Class views allow students to review their day's lectures, while faculty views give instructors an immediate overview of their teaching commitments.",
      ],
      "schedule-workflows": [
        "The application uses a structured timetable data model and management workflows to make schedules easier to view and update.",
        "When an instructor is unable to conduct a class or a lecture must be moved, the rescheduling workflow allows updating individual session entries with alternative timings or cancellation notices.",
        "Changes are stored in the backend and reflected immediately in the schedule views, preventing out-of-date information from remaining in circulation.",
      ],
      "room-availability": [
        "Its intended functionality includes managing upcoming schedule changes and identifying available rooms across campus periods.",
        "This feature is designed to scan timetable records for unoccupied lecture halls during any given time slot, helping administrators reallocate rooms quickly during schedule adjustments.",
        "While the data schema supports room queries, the automated conflict-free room suggestion interface remains an active planned milestone in the project roadmap.",
      ],
      "data-management": [
        "The backend utilizes Express.js and MongoDB with Mongoose schemas to represent periods, rooms, classes, and instructors.",
        "Document relationships link sessions to specific time slots, enabling efficient queries when rendering class-level or faculty-level schedule views.",
        "Clean REST API endpoints handle schedule queries and updates, maintaining data consistency across different days of the academic week.",
      ],
    },
    closing: [
      "TT_TRACKER addresses the real-world frustration of static academic scheduling by introducing full-stack data modeling and dynamic schedule updates.",
      "The project provided valuable practical experience with React component state, Express REST APIs, and MongoDB document relationships.",
    ],
  },
  prisms: {
    opening: [
      "Research administration involves multiple stages, academic documents, submissions, reviews, and institutional processes. Managing these workflows without a centralized system can make tracking and coordination difficult for scholars, supervisors, and administrative departments.",
      "PRISMS (PhD Research & Institutional Scholars Management System) is an academic administration project intended to support the lifecycle of PhD scholars, beginning with a thesis submission and upload module and providing a foundation for additional research administration workflows.",
      "The initial development scope focuses on the thesis submission module. PhD scholars should be able to authenticate using their institutional college Gmail accounts and submit their thesis documents through a structured digital workflow.",
    ],
    notes: {
      "institutional-problem": [
        "PhD research spans several years and involves extensive institutional coordination: coursework completion, comprehensive examinations, seminar evaluations, state-of-the-art presentations, and final thesis review.",
        "Managing these submissions through fragmented manual paperwork or unstructured emails risks lost files, missed deadlines, and poor transparency across academic review committees.",
        "PRISMS addresses this by designing a centralized digital workflow platform dedicated to the lifecycle of institutional scholars.",
      ],
      "thesis-submission": [
        "The current development scope centers specifically on the thesis submission module. Through this module, PhD scholars can upload completed thesis drafts, provide dissertation metadata, and assign supervisor attributions.",
        "The submission interface gathers required document attachments and logs submission timestamps to establish an authoritative academic audit trail.",
        "Supervisors and department review committees can access the submitted manuscripts through a structured review workflow.",
      ],
      "auth-workflow": [
        "To ensure academic integrity and secure access, PRISMS intends to integrate institutional authentication using college Gmail accounts.",
        "Authentication restricts thesis submission and administrative access exclusively to verified scholars and recognized institutional faculty members.",
        "This institutional login workflow establishes scholar identity upfront, linking each thesis document directly to verified scholar profiles.",
      ],
      "future-modules": [
        "The thesis submission module is conceived as the initial foundation for a comprehensive PhD lifecycle administration platform.",
        "Planned broader lifecycle workflows include: PhD coursework tracking, Comprehensive examination registration and grading, State-of-the-art examination records, Fellowship enhancement processing, Open seminar management, Final evaluation and oral examination coordination, Certificate issuance, and Archival of completed PhD scholars.",
        "These milestones represent the planned future architecture of PRISMS as development expands beyond the initial thesis submission scope.",
      ],
    },
    closing: [
      "PRISMS demonstrates how software engineering can bring structure and transparency to complex academic research administration.",
      "Focusing on the thesis submission module provides a solid starting point that can expand into a comprehensive platform for institutional scholars.",
    ],
  },
};

// Also support tt-tracker alias
narratives["tt-tracker"] = narratives.tt_tracker;
