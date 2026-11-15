/** Project UI screenshots and media definitions */
export type WorkMedia = {
  id: string;
  section: string;
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

const fatgs = (
  id: string,
  section: string,
  title: string,
  caption: string,
  width = 1200,
  height = 720
): WorkMedia => ({
  id,
  section,
  src: `/images/projects/fatgs/${id}.png`,
  title,
  caption,
  width,
  height,
});

const tt = (
  id: string,
  section: string,
  title: string,
  caption: string,
  width = 1200,
  height = 720
): WorkMedia => ({
  id,
  section,
  src: `/images/projects/tt_tracker/${id}.svg`,
  title,
  caption,
  width,
  height,
});

const prisms = (
  id: string,
  section: string,
  title: string,
  caption: string,
  width = 1200,
  height = 720
): WorkMedia => ({
  id,
  section,
  src: `/images/projects/prisms/${id}.png`,
  title,
  caption,
  width,
  height,
});

const skillapt = (
  id: string,
  section: string,
  title: string,
  caption: string,
  width = 1440,
  height = 900
): WorkMedia => ({
  id,
  section,
  src: `/images/projects/skillapt/${id}.png`,
  title,
  caption,
  width,
  height,
});

export const workMedia: Record<string, WorkMedia[]> = {
  skillapt: [
    skillapt(
      "home-light",
      "cover",
      "skillapt Home",
      "Landing page of the web portal with search, the install command and a terminal preview."
    ),
    skillapt(
      "home-dark",
      "starting-point",
      "Home in the Dark Theme",
      "The same page in the dark theme, which loads without a flash of the wrong theme."
    ),
    skillapt(
      "docs",
      "package-manager-cli",
      "Documentation",
      "Getting-started guide rendered from the markdown files in the repository."
    ),
    skillapt(
      "browse",
      "web-portal",
      "Browse Skills",
      "Search, category and compatibility filters, sorting and pagination for the skill catalog."
    ),
    skillapt(
      "browse-dark",
      "web-portal",
      "Browse Skills, Dark Theme",
      "The catalog in the dark theme."
    ),
    skillapt(
      "skill-detail",
      "web-portal",
      "Skill Detail Page",
      "Rendered README, install command, version history and security summary for a skill."
    ),
    skillapt(
      "security",
      "trust-and-security",
      "Security Model",
      "Repository provenance, automated scanning, visible permissions, and tips to follow before installing a skill."
    ),
    skillapt(
      "publish",
      "publishing-flow",
      "Publish a Skill",
      "Publishing guide covering the package layout, the manifest, and the 5 MB and 25 MB safety limits."
    ),
    skillapt(
      "dashboard",
      "publishing-flow",
      "Publisher Dashboard",
      "GitHub sign-in gate for managing skills, yanking versions and creating CLI tokens."
    ),
  ],
  fatgs: [
    fatgs(
      "studio",
      "cover",
      "FATGS Timetable Studio",
      "Academic Timetable Builder with year, semester and section selection and the shared theory room configuration.",
      1440,
      900
    ),
    fatgs(
      "handoff",
      "starting-point",
      "Semester Handoff & Completeness Status",
      "Per-section generation status across nine sections, with a completeness check before JSON export for TT_TRACKER.",
      1272,
      378
    ),
    fatgs(
      "rooms",
      "scheduling-problem",
      "Shared Theory Rooms",
      "Four classrooms shared by the CS and CD undergraduate sections, each selectable without duplicates.",
      1272,
      372
    ),
    fatgs(
      "allocation",
      "faculty-allocation",
      "Faculty Allocation Matrix",
      "Compulsory theory subjects and practical laboratories with course codes, credits and assigned faculty.",
      1272,
      557
    ),
    fatgs(
      "timetable",
      "timetable-workflow",
      "Generated Timetable",
      "Conflict-free weekly grid with the lunch block, and G1 and G2 lab groups scheduled in separate laboratories.",
      1272,
      485
    ),
  ],
  tt_tracker: [
    tt(
      "cover",
      "cover",
      "TT_TRACKER Dashboard",
      "Academic Timetable Tracking and Management System dashboard.",
      1600,
      900
    ),
    tt(
      "schedule-overview",
      "starting-point",
      "Schedule Navigation",
      "Class-wise timetable view showing daily lectures and period timings."
    ),
    tt(
      "faculty-view",
      "timetable-views",
      "Faculty and Class Views",
      "Multi-perspective timetable filtering by professor or student batch."
    ),
    tt(
      "rescheduling",
      "schedule-workflows",
      "Rescheduling & Cancellation Interface",
      "Structured workflows to adjust periods, assign substitute rooms, or log cancellations."
    ),
    tt(
      "room-check",
      "room-availability",
      "Room Availability Inspection (Planned)",
      "Planned capability to identify unoccupied lecture halls across campus slots."
    ),
    tt(
      "data-models",
      "data-management",
      "Timetable Data Models",
      "Mongoose document schemas storing weekly periods, batches, and instructor assignments."
    ),
  ],
  prisms: [
    prisms(
      "landing",
      "cover",
      "PRISMS Portal",
      "Institutional landing page of the PhD Research & Institutional Scholars Management System at NIT Hamirpur.",
      1440,
      900
    ),
    prisms(
      "student-dashboard",
      "starting-point",
      "Scholar Dashboard",
      "Student portal showing the active submission reference, status, supervisor, and PhD milestones.",
      1440,
      900
    ),
    prisms(
      "workflow",
      "institutional-problem",
      "Doctoral Thesis Approval Workflow",
      "The five statutory review stages from scholar submission to final Senate approval, shown in the portal.",
      1440,
      900
    ),
    prisms(
      "student-submit",
      "thesis-submission",
      "Thesis Submission Wizard",
      "Three-step submission flow, starting with dissertation title, abstract and keywords.",
      1440,
      900
    ),
    prisms(
      "student-details",
      "thesis-submission",
      "Submission Details & Reader",
      "Submitted thesis with its approval stage and an in-portal PDF reader.",
      1440,
      900
    ),
    prisms(
      "faculty-dashboard",
      "future-modules",
      "Supervisor Dashboard",
      "Pending reviews, supervised scholars and the review queue for the supervisor role.",
      1440,
      900
    ),
    prisms(
      "faculty-queue",
      "future-modules",
      "Approval Queue",
      "Submissions awaiting a decision, with reference, scholar, stage and a link into the review workspace.",
      1440,
      900
    ),
    prisms(
      "faculty-review",
      "future-modules",
      "Review Workspace",
      "View-only thesis reader beside the decision panel: forward to the next authority, return for revision, or reject.",
      1440,
      900
    ),
  ],
};

// Alias for URL consistency
workMedia["tt-tracker"] = workMedia.tt_tracker;
