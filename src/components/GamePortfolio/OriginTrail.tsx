"use client";
import { useState } from "react";
import { GraduationCap, Database, Braces } from "lucide-react";
import styles from "./Portfolio.module.css";
const chapters = [
  { label: "Foundation", icon: GraduationCap, text: "Studying Computer Science at NIT Hamirpur gave me a strong grounding in programming fundamentals, data structures, and algorithms." },
  { label: "Full-Stack", icon: Database, text: "Exploring web development with React, Node.js, Express, and MongoDB helped me understand how complete systems operate end to end." },
  { label: "Projects", icon: Braces, text: "Developing FATGS, TT_TRACKER, and PRISMS focused my interest on academic scheduling and administrative software." },
];
export function OriginTrail() {
 const [chapter, setChapter] = useState(2);
 return <aside className={styles.origin} aria-label="A little of my story">
   <span className={styles.originLabel}>A FEW STEPS THAT GOT ME HERE</span>
   <div className={styles.originTrail}>{chapters.map(({label,icon:Icon},i)=><button key={label} onClick={()=>setChapter(i)} aria-pressed={chapter===i} aria-controls="origin-note"><Icon size={17}/><span>{label}</span></button>)}</div>
   <p id="origin-note" aria-live="polite">{chapters[chapter].text}</p>
   <a href="/stories/journey">The story so far ↗</a>
 </aside>;
}
