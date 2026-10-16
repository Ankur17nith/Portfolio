"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { projects, socials } from "@/lib/data";
import styles from "./ProjectShowcase.module.css";

const selected = projects;
const captions: Record<string, { title: string; role: string }> = {
  fatgs: {
    title: "Academic timetable generation through structured scheduling.",
    role: "Scheduling Logic · Faculty Allocation · Data Modeling",
  },
  tt_tracker: {
    title: "Manage academic schedules and handle timetable changes.",
    role: "React · Node.js · Express.js · MongoDB · Mongoose",
  },
  prisms: {
    title: "Building a structured digital workflow for PhD research administration.",
    role: "Research Administration · Thesis Submission Module",
  },
};
const number = (i: number) => String(i + 1).padStart(2, "0");

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (index: number, focus = false) => {
    const next = (index + selected.length) % selected.length;
    setActive(next);
    if (focus) buttons.current[next]?.focus({ preventScroll: true });
  };
  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = buttons.current.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
        ? selected.length - 1
        : ["ArrowDown", "ArrowRight"].includes(event.key)
        ? index + 1
        : ["ArrowUp", "ArrowLeft"].includes(event.key)
        ? index - 1
        : null;
    if (next !== null) {
      event.preventDefault();
      move(next, true);
    }
  };
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>02 / SELECTED PROJECTS</span>
          <h2 id="projects-heading">Small ideas. Real products.</h2>
        </div>
        <a href={socials.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={15} />
        </a>
      </header>
      <div className={styles.layout}>
        <div className={styles.index}>
          <div
            className={styles.choices}
            role="group"
            aria-label="Choose a project"
            onKeyDown={navigate}
          >
            {selected.map((p, i) => (
              <button
                key={p.slug}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                aria-pressed={active === i}
                aria-controls={`project-${p.slug}`}
                onClick={() => move(i)}
              >
                <span className={styles.number}>{number(i)}</span>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.tagline}</small>
                </span>
              </button>
            ))}
          </div>
          <div className={styles.pager}>
            <button onClick={() => move(active - 1)} aria-label="Previous project">
              <ArrowLeft size={17} />
            </button>
            <span aria-live="polite">
              {number(active)} / {String(selected.length).padStart(2, "0")}
            </span>
            <button onClick={() => move(active + 1)} aria-label="Next project">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <div className={styles.previews}>
          {selected.map((p, i) => (
            <article
              key={p.slug}
              id={`project-${p.slug}`}
              className={`${styles.project} ${active === i ? styles.active : ""}`}
              aria-labelledby={`title-${p.slug}`}
            >
              <div className={styles.mobileLabel}>
                <span>{number(i)}</span>
                <strong>{p.name}</strong>
                <small>{p.year}</small>
              </div>
              {p.image && (
                <div className={styles.image}>
                  <Image
                    src={p.image}
                    alt={`${p.name} product interface`}
                    width={1200}
                    height={750}
                    sizes="(max-width:700px) 90vw, (max-width:1180px) 60vw, 730px"
                  />
                </div>
              )}
              <div className={styles.description}>
                <span className={styles.context}>
                  ACADEMIC / PRACTICAL · {p.year}
                </span>
                <h3 id={`title-${p.slug}`}>{captions[p.slug]?.title ?? p.name}</h3>
                <p>{p.tagline}</p>
              </div>
              <dl className={styles.meta}>
                <div>
                  <dt>MY PART</dt>
                  <dd>{captions[p.slug]?.role ?? p.role}</dd>
                </div>
                <div>
                  <dt>BUILT WITH</dt>
                  <dd>
                    {p.stack.slice(0, 4).join(" · ")}
                  </dd>
                </div>
              </dl>
              <div className={styles.actions}>
                <details>
                  <summary>
                    Behind the build <Plus size={14} />
                  </summary>
                  <p>{p.description}</p>
                  {p.details?.slice(0, 2).map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </details>
                <Link href={`/work/${p.slug}`}>
                  Explore project <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className={styles.hint}>Choose a project to explore the work behind it.</p>
    </section>
  );
}
