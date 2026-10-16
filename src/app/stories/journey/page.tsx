/* ============================================================
   Story page: The long way around, How I got into software
   Tone: honest, matter-of-fact, quiet confidence.
   No drama. Just the sequence of decisions that led here.
   ============================================================ */

import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import styles from "../story.module.css";

export const dynamic = "force-static";

export const metadata = pageMetadata({ title: "How I got into software | Ankur Gupta", description: "Computer Science studies at NIT Hamirpur, building academic scheduling systems, and focusing on backend engineering.", path: "/stories/journey", card: "journey", article: true });

import { journeyChapters as chapters } from "@/lib/journey";

export default function JourneyPage() {
  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* Back link */}
        <Link href="/" className={styles.backLink}>
          ← Back
        </Link>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Background</span>
          <h1 className={styles.heading}>Learning by building.</h1>
          <p className={styles.lede}>
            Computer Science student at NIT Hamirpur focused on backend development,
            full-stack applications, and building reliable software through practical projects.
          </p>
        </header>

        {/* Timeline */}
        <div className={styles.timeline}>
          {chapters.map((chapter, i) => (
            <div key={i} className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.year}>{chapter.year}</span>
              </div>
              <div className={styles.chapterContent}>
                <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                <p className={styles.chapterBody}>{chapter.body}</p>
                {chapter.tags.length > 0 && (
                  <div className={styles.tags}>
                    {chapter.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <footer className={styles.closing}>
          <p>
            Learning through practical implementation and hands-on projects continues
            to shape my understanding of software systems, databases, and backend architecture.
          </p>
          <Link href="/work" className={styles.nextLink}>
            Explore projects →
          </Link>
        </footer>
      </div>
    </article>
  );
}
