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
    image: "/images/projects/fatgs.svg",
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
    image: "/images/projects/prisms.svg",
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
