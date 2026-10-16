import Link from "next/link";
import { Braces, Workflow, Sparkles, Database, PanelsTopLeft, Terminal } from "lucide-react";
import styles from "./Skills.module.css";

const skills = [
  { name: "Backend development", tools: "Node.js · Express.js · REST APIs", level: "Core focus", icon: Braces, proof: "Implemented server logic, routing, and backend request processing across academic projects.", href: "/work/fatgs", source: "FATGS" },
  { name: "Databases & modeling", tools: "MongoDB · Mongoose", level: "Core focus", icon: Database, proof: "Modeled schemas for academic timetables, faculty slots, and scholar management workflows.", href: "/work/tt_tracker", source: "TT_TRACKER" },
  { name: "Systems programming", tools: "C and C++", level: "Foundation", icon: Workflow, proof: "Programming fundamentals, data structures, and algorithmic problem-solving at NIT Hamirpur.", href: "/work", source: "NIT Hamirpur" },
  { name: "Full-stack web", tools: "React · JavaScript · TypeScript", level: "Core focus", icon: PanelsTopLeft, proof: "Built dynamic client views for timetable management, room availability, and thesis uploads.", href: "/work/tt_tracker", source: "TT_TRACKER" },
  { name: "Styling & UI", tools: "HTML · CSS · Tailwind CSS", level: "Core focus", icon: Sparkles, proof: "Developed responsive interfaces and modern layouts for academic administration platforms.", href: "/work/prisms", source: "PRISMS" },
  { name: "Developer tools", tools: "Git · GitHub · Postman · Figma", level: "Core focus", icon: Terminal, proof: "Version control workflows, API testing and verification, and interface prototyping.", href: "https://github.com/Ankur17nith", source: "GitHub" },
];

export function Skills() {
  return <div className={styles.workshop}>
    <header className={styles.intro}>
      <span className={styles.eyebrow}>Tools behind the work.</span>
      <h2>Tech I work with.</h2>
      <p>Technologies supported by my profile and practical projects across backend systems and web applications.</p>
      <div className={styles.legend}><span>◇ Practical project work</span><span>◆ Core technical focus</span></div>
      <small>Learning by building practical, reliable applications.</small>
    </header>
    <div className={styles.rack}>
      {skills.map(({ name, tools, level, icon: Icon, proof, href, source }, index) => <article className={styles.tool} key={name} style={{ animationDelay: `${index * 65}ms` }}>
        <div className={styles.socket} aria-hidden="true"><Icon size={25} strokeWidth={1.5} /><span>0{index + 1}</span></div>
        <div className={styles.description}>
          <div className={styles.title}><h3>{name}</h3><span className={styles.level}><b aria-hidden="true">{level === "Core focus" ? "◆" : "◇"}</b>{level}</span></div>
          <p className={styles.tools}>{tools}</p>
          <p className={styles.proof}>{proof}</p>
          <Link href={href} className={styles.evidence}>See the work <span> / {source} ↗</span></Link>
        </div>
      </article>)}
    </div>
    <footer className={styles.note}>Learning by building. Always strengthening fundamentals.</footer>
  </div>;
}
