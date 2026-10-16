/** Public capabilities grounded in the three featured projects. */
export const buildFocus = [
  {
    kind: "backend", label: "Academic scheduling", title: "Timetable generation & scheduling logic.",
    description: "Organizing complex academic constraints involving faculty, courses, rooms, and weekly time slots into structured, clash-free schedules.",
    project: "FATGS", proof: "Modeled academic scheduling rules and entity relationships to automate structured faculty allocation and weekly slot assignments.", href: "/work/fatgs#starting-point", linkLabel: "Explore scheduling logic", secondHref: "/work/fatgs#allocation", secondLabel: "View faculty allocation",
  },
  {
    kind: "product", label: "Dynamic management", title: "Schedule tracking and room coordination.",
    description: "Full-stack timetable management designed for class-wise and faculty-wise viewing, real-time schedule changes, and room availability checks.",
    project: "TT_TRACKER", proof: "Built dynamic viewing and rescheduling workflows with React, Node.js, Express, and MongoDB.", href: "/work/tt_tracker#schedules", linkLabel: "Explore timetable tracking", secondHref: "/work/tt_tracker#rescheduling", secondLabel: "View rescheduling workflows",
  },
  {
    kind: "ai", label: "Institutional workflows", title: "Digital workflows for research administration.",
    description: "Structuring academic administrative processes into digital workflows, beginning with scholar authentication and thesis submission.",
    project: "PRISMS", proof: "Designed initial thesis upload module with institutional Google Workspace authentication as the foundation for the research lifecycle.", href: "/work/prisms#starting-point", linkLabel: "Explore thesis workflow", secondHref: "/work/prisms#portal", secondLabel: "View scholar portal",
  },
] as const;
