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
  src: `/images/projects/fatgs/${id}.svg`,
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
  src: `/images/projects/prisms/${id}.svg`,
  title,
  caption,
  width,
  height,
});

export const workMedia: Record<string, WorkMedia[]> = {
  fatgs: [
    fatgs(
      "cover",
      "cover",
      "The FATGS Master Workspace",
      "Faculty Allocation and Timetable Generation System overview and weekly slot configuration.",
      1600,
      900
    ),
    fatgs(
      "data-entry",
      "starting-point",
      "Academic Master Data",
      "Structured inputs for faculty profiles, course catalogs, student cohorts, and classrooms."
    ),
    fatgs(
      "constraints",
      "scheduling-problem",
      "Scheduling Constraints Validation",
      "Constraint validation ensuring no faculty double-booking and checking classroom capacity."
    ),
    fatgs(
      "schema",
      "data-modeling",
      "Slot & Entity Relational Models",
      "Data structures defining weekly periods, course credit hours, and department mappings."
    ),
    fatgs(
      "allocation",
      "faculty-allocation",
      "Faculty Allocation Matrix",
      "Matching instructors to required subject hours while balancing teaching loads."
    ),
    fatgs(
      "timetable-output",
      "timetable-workflow",
      "Generated Timetable Matrix",
      "Exportable weekly schedules presented class-wise and faculty-wise.",
      1600,
      900
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
      "cover",
      "cover",
      "PRISMS Scholars Platform",
      "PhD Research & Institutional Scholars Management System.",
      1600,
      900
    ),
    prisms(
      "portal-overview",
      "starting-point",
      "Scholars Administration Portal",
      "Centralized administrative workflow for PhD scholars and research committees."
    ),
    prisms(
      "lifecycle-stages",
      "institutional-problem",
      "Institutional Workflow Lifecycle",
      "Structured representation of the PhD research stages from coursework to degree conferral."
    ),
    prisms(
      "thesis-upload",
      "thesis-submission",
      "Thesis Submission Module (Current Scope)",
      "Digital document submission workflow with dissertation metadata and supervisor attribution."
    ),
    prisms(
      "college-auth",
      "auth-workflow",
      "Institutional Authentication (Intended)",
      "Intended scholar verification using institutional college Gmail accounts."
    ),
    prisms(
      "planned-modules",
      "future-modules",
      "Planned Research Lifecycle Modules",
      "Roadmap modules covering comprehensive exams, progress seminars, and thesis defense."
    ),
  ],
};

// Alias for URL consistency
workMedia["tt-tracker"] = workMedia.tt_tracker;
