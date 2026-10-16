import Link from "next/link";
import Image from "next/image";
import { projects, socials } from "@/lib/data";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const fatgs = projects.find((p) => p.slug === "fatgs");
  const ttTracker = projects.find((p) => p.slug === "tt_tracker");

  return (
    <section
      className={styles.section}
      id="selected-work"
      aria-labelledby="selected-heading"
    >
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span>01 / FEATURED PROJECTS</span>
          <h2 id="selected-heading">Small ideas. Real products.</h2>
          <p>
            Structured scheduling systems and academic management applications.
          </p>
        </header>
        {fatgs && (
          <article className={styles.feature}>
            <div>
              <span className={styles.eyebrow}>FATGS · ACADEMIC PROJECT</span>
              <h3>{fatgs.tagline}</h3>
              <p className={styles.role}>{fatgs.name}</p>
              <p>{fatgs.description}</p>
              <div className={styles.decisions}>
                <Link href="/work/fatgs#starting-point">
                  Scheduling constraints ↗
                </Link>
                <Link href="/work/fatgs#schema">
                  Academic data model ↗
                </Link>
                <Link href="/work/fatgs#allocation">
                  Faculty allocation workflow ↗
                </Link>
              </div>
              <Link className={styles.cta} href="/work/fatgs">
                Explore project →
              </Link>
            </div>
            <figure>
              <Image
                src="/images/projects/fatgs/cover.svg"
                alt="FATGS Timetable Overview"
                width={1440}
                height={960}
                sizes="(max-width:800px) 90vw, 45vw"
              />
              <figcaption>
                FATGS Faculty Allocation and Timetable Generation System
              </figcaption>
            </figure>
          </article>
        )}
        {ttTracker && (
          <article className={styles.feature}>
            <div>
              <span className={styles.eyebrow}>
                TT_TRACKER · FULL-STACK PROJECT
              </span>
              <h3>{ttTracker.tagline}</h3>
              <p className={styles.role}>{ttTracker.name}</p>
              <p>{ttTracker.description}</p>
              <div className={styles.decisions}>
                <Link href="/work/tt_tracker#schedules">
                  Class and faculty schedules ↗
                </Link>
                <Link href="/work/tt_tracker#rescheduling">
                  Rescheduling workflows ↗
                </Link>
              </div>
              <Link className={styles.cta} href="/work/tt_tracker">
                Explore project →
              </Link>
            </div>
            <figure>
              <Image
                src="/images/projects/tt_tracker/cover.svg"
                alt="TT_TRACKER Schedule Overview"
                width={1440}
                height={960}
                sizes="(max-width:800px) 90vw, 45vw"
              />
              <figcaption>
                TT_TRACKER Timetable Tracking and Management
              </figcaption>
            </figure>
          </article>
        )}
        <header className={styles.heading}>
          <span>02 / ALL PROJECTS</span>
          <h2>Projects and research administration.</h2>
        </header>
        <div className={styles.projects}>
          {projects.map((p) => (
            <article key={p.slug}>
              <h3>{p.name}</h3>
              <p>{p.tagline}</p>
              <span>{p.role}</span>
              <Link href={`/work/${p.slug}`}>Explore project ↗</Link>
            </article>
          ))}
        </div>
        <footer className={styles.footer}>
          <div>
            <span>03 / BACKGROUND</span>
            <h2>Learning by building.</h2>
            <p>
              Computer Science student at NIT Hamirpur focused on backend development,
              full-stack applications, and building reliable software.
            </p>
            <Link href="/stories/journey">How I got here ↗</Link>
            <Link href="/blog">Technical notes ↗</Link>
          </div>
          <div>
            <h2>Let’s talk.</h2>
            <a href={`mailto:${socials.email}`}>{socials.email} ↗</a>
            <a href="">View résumé ↗</a>
            <a href={socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
