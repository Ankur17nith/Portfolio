/* ============================================================
   About, "A trailer, not the movie."
   Short punchy paragraphs. Max 2 lines each.
   Experience cards with current vs past differentiation.
   ============================================================ */

"use client";

import { experience } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { HoverText } from "@/components/shared/HoverText";
import styles from "./About.module.css";

export function About() {
  return (
    <section id={SECTION_IDS.about} className={styles.section}>
      <div className={styles.container}>
        <SectionLabel label="About" />

        <HoverText as="h2" variant="heading" className={styles.heading} font="600 24px Quicksand">
            Learning by building.
          </HoverText>

        <div className={styles.body}>
          <p>I&apos;m Ankur Gupta, a Computer Science student at the National Institute of Technology Hamirpur. I&apos;m interested in backend engineering, full-stack development, databases, and understanding how software systems work beyond the user interface.</p>
          <p>I enjoy learning through practical implementation and building applications that solve real problems. My projects include FATGS, TT_TRACKER, and PRISMS, which reflect my interest in academic scheduling, timetable management, and research administration software.</p>
          <p>I&apos;m continuing to strengthen my programming fundamentals, backend development skills, and understanding of software architecture through hands-on projects.</p>
        </div>

        {/* Experience Cards */}
        <div className={styles.cards}>
          {experience.map((exp) => (
            <div
              key={exp.company}
              className={`${styles.card} ${exp.current ? styles.cardCurrent : ""}`}
            >
              <div className={styles.cardTop}>
                <HoverText as="span" variant="card-heading" className={styles.cardCompany} font="600 16px Quicksand">
                  {exp.company}
                </HoverText>
                {exp.current && (
                  <span className={styles.currentBadge}>now</span>
                )}
              </div>
              <span className={styles.cardRole}>{exp.role}</span>
              <span className={styles.cardPeriod}>{exp.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
