import styles from './EngineeringBrief.module.css';

interface BriefData {
  title: string;
  intro: string;
  decisions: [string, string, string][];
  flowTitle?: string;
  flowSteps?: [string, string][];
  flowNote?: string;
  evidenceSummary: string;
  evidenceDetails: [string, string][];
  evidenceText?: string;
  statusTitle: string;
  statusText: string;
}

const briefContent: Record<string, BriefData> = {
  fatgs: {
    title: "Structured academic scheduling & allocation.",
    intro:
      "FATGS is an academic timetable generation system designed to organize scheduling requirements involving faculty, classes, subjects, rooms, and weekly time slots.",
    decisions: [
      [
        "Model academic master data",
        "Structured representation of faculty profiles, course catalogs, classrooms, and time slots.",
        "#data-modeling",
      ],
      [
        "Enforce scheduling constraints",
        "Deterministic validation rules preventing concurrent instructor overlap and classroom double-booking.",
        "#scheduling-problem",
      ],
      [
        "Faculty & room allocation logic",
        "Matching qualified instructors to required subject hours while respecting room capacities.",
        "#faculty-allocation",
      ],
    ],
    flowTitle: "Timetable generation workflow · scheduling overview",
    flowSteps: [
      ["Master data input", "Courses, faculty, rooms"],
      ["Constraint validation", "Double-booking checks"],
      ["Slot allocation", "Teaching workload matching"],
      ["Timetable matrix", "Class & faculty output"],
    ],
    flowNote: "Output formats support weekly schedule matrices for both student batches and instructors.",
    evidenceSummary: "Scheduling constraints & verification",
    evidenceText:
      "Constraint validation prevents instructor overlap and checks room suitability against batch size. Master data integrity ensures all subject periods are accounted for in the weekly calendar.",
    evidenceDetails: [
      [
        "Faculty availability conflict",
        "Validation logic prevents assigning any instructor to more than one concurrent lecture.",
      ],
      [
        "Classroom capacity and type",
        "Rooms are matched by required facility type (e.g. laboratory vs. lecture hall) and capacity.",
      ],
      [
        "Weekly credit distribution",
        "Subject lecture hours are distributed across the academic week to prevent uneven scheduling.",
      ],
    ],
    statusTitle: "Project status & scope",
    statusText:
      "Active academic project focusing on structured scheduling rules, faculty allocation, and timetable output without conflicting assignments.",
  },
  tt_tracker: {
    title: "Timetable viewing and change management.",
    intro:
      "TT_TRACKER is a full-stack academic timetable management project designed to provide class-wise and faculty-wise timetable views and support schedule changes, cancellations, and room availability checks.",
    decisions: [
      [
        "Class-wise & faculty-wise views",
        "Interactive schedule navigation tailored for both student cohorts and academic instructors.",
        "#timetable-views",
      ],
      [
        "Rescheduling & cancellations",
        "Structured workflow to adjust session timings or mark cancellations without corrupting the timetable.",
        "#schedule-workflows",
      ],
      [
        "MongoDB timetable schemas",
        "Mongoose document models connecting days, periods, course entities, and room mappings.",
        "#data-management",
      ],
    ],
    flowTitle: "Timetable management workflow · implementation overview",
    flowSteps: [
      ["Timetable data store", "MongoDB schemas"],
      ["REST API routes", "Express controllers"],
      ["Frontend viewing", "React schedule views"],
      ["Change workflows", "Reschedule & cancellations"],
    ],
    flowNote: "Implemented features focus on timetable views and data management; room checks are planned.",
    evidenceSummary: "Implementation details & planned features",
    evidenceText:
      "Built with React, Node.js, Express.js, and MongoDB. Distinguishes implemented timetable viewing and data modeling from planned room availability checks.",
    evidenceDetails: [
      [
        "Schedule changes and cancellations",
        "Implemented workflows allow updating individual lecture entries and reflecting alterations in real time.",
      ],
      [
        "Multi-perspective timetable filtering",
        "Class views provide batch schedules; faculty views provide instructor schedules.",
      ],
      [
        "Room availability checks (Planned)",
        "Planned functionality to query period records for unoccupied classrooms during schedule reallocations.",
      ],
    ],
    statusTitle: "Implementation status",
    statusText:
      "Core timetable viewing and schedule management implemented. Dynamic room availability lookup and automated notifications are part of the planned roadmap.",
  },
  prisms: {
    title: "Structured digital workflow for PhD administration.",
    intro:
      "PRISMS is an academic administration project intended to support the lifecycle of PhD scholars, beginning with a thesis submission and upload module and providing a foundation for additional research administration workflows.",
    decisions: [
      [
        "Thesis submission module as initial scope",
        "Structured digital upload path for PhD scholars to submit completed dissertation drafts.",
        "#thesis-submission",
      ],
      [
        "Institutional Gmail authentication (Intended)",
        "Restricting access to registered research scholars through college email verification.",
        "#auth-workflow",
      ],
      [
        "Extensible research lifecycle",
        "Architecting a data foundation to support academic milestones from coursework to degree conferral.",
        "#future-modules",
      ],
    ],
    flowTitle: "PhD research administration · workflow architecture",
    flowSteps: [
      ["Institutional auth", "College Gmail login"],
      ["Thesis submission", "Upload & dissertation metadata"],
      ["Review workflow", "Committee inspection"],
      ["Lifecycle milestones", "Planned future modules"],
    ],
    flowNote: "Initial development scope is strictly the thesis submission module.",
    evidenceSummary: "Current scope & planned lifecycle",
    evidenceText:
      "Focuses on solving research administration fragmentation through a centralized digital workflow platform.",
    evidenceDetails: [
      [
        "Current thesis submission scope",
        "Scholars submit dissertation documents with title, abstract, supervisor attribution, and submission timestamps.",
      ],
      [
        "Intended institutional authentication",
        "OAuth authentication via institutional college Gmail accounts to verify scholar credentials.",
      ],
      [
        "Broader lifecycle milestones (Planned)",
        "Planned future support for coursework, comprehensive exams, state-of-the-art presentations, open seminars, oral defense, and completed scholar archival.",
      ],
    ],
    statusTitle: "Current development scope",
    statusText:
      "Initial development scope focuses on the thesis submission module. Planned broader lifecycle modules are future roadmap milestones.",
  },
};

export function EngineeringBrief({ slug }: { slug: string }) {
  const normalizedSlug = slug === "tt-tracker" ? "tt_tracker" : slug;
  const brief = briefContent[normalizedSlug] ?? briefContent.fatgs;

  return (
    <section className={styles.brief} aria-labelledby="brief-title" id="brief">
      <div className={styles.heading}>
        <span>THE ONE-MINUTE BRIEF</span>
        <a href="#starting-point">Read the full story ↓</a>
      </div>
      <h2 id="brief-title">{brief.title}</h2>
      <p className={styles.intro}>{brief.intro}</p>
      <div className={styles.decisions}>
        {brief.decisions.map(([title, text, href], i) => (
          <a href={href} key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <small>Inspect the decision ↗</small>
          </a>
        ))}
      </div>
      {brief.flowSteps && (
        <figure className={styles.flow}>
          <figcaption>{brief.flowTitle}</figcaption>
          <ol>
            {brief.flowSteps.map(([step, desc]) => (
              <li key={step}>
                <strong>{step}</strong>
                <span>{desc}</span>
              </li>
            ))}
          </ol>
          {brief.flowNote && <p>{brief.flowNote}</p>}
        </figure>
      )}
      <details className={styles.evidence}>
        <summary>
          {brief.evidenceSummary} <span>+</span>
        </summary>
        {brief.evidenceText && <p>{brief.evidenceText}</p>}
        <dl>
          {brief.evidenceDetails.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
      </details>
      <div className={styles.status}>
        <strong>{brief.statusTitle}</strong>
        <p>{brief.statusText}</p>
      </div>
    </section>
  );
}
