import { ProjectShowcase } from "./ProjectShowcase";
import { ThemeControl } from "./ThemeControl";
import { GithubActivity } from "./GithubActivity";
import type { PublicTestimonial } from "@/lib/testimonials";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, FileText } from "lucide-react";
import { GamePortfolio } from "./GamePortfolio";
import { SmoothScroll } from "./SmoothScroll";
import { TechStack } from "./TechStack";
import { experience, socials } from "@/lib/data";
import { notes } from "@/components/Journal/JournalFrame";
import styles from "./Portfolio.module.css";

export function Portfolio({}: { testimonials?: PublicTestimonial[] } = {}) {
  return (
    <div className={styles.site}>
      <SmoothScroll />
      <header className={styles.nav}>
        <a href="#home" className={styles.brand} aria-label="AG· Home">
          <Image
            src="/ag-logo-light.svg"
            alt="AG·"
            width={28}
            height={28}
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: 8,
              borderRadius: 4,
            }}
          />
          AG<span>·</span>
        </a>
        <nav aria-label="Portfolio navigation">
          {["Projects", "Skills", "About", "Notes", "Contact"].map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>
        <ThemeControl />
        <a href="" className={styles.resume}>
          Résumé <ArrowUpRight size={13} />
        </a>
      </header>
      <main id="main-content" className={styles.page}>
        <section id="home" className={styles.hero}>
          <div className={styles.room}>
            <div className={styles.roomLabel}>
              <span>
                <i /> A LITTLE OF WHERE IT STARTED
              </span>
              <span>01 — THE ROOM</span>
            </div>
            <GamePortfolio compact />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.hello}>
              <p className={styles.eyebrow}>HELLO, I’M</p>
              <h1>
                Ankur Gupta<span>.</span>
              </h1>
              <p className={styles.lead}>
                Backend <span>Developer.</span>
              </p>
            </div>
            <div className={styles.heroAside}>
              <a href="#projects" className={styles.currentWork}>
                <span /> Computer Science Student at NIT Hamirpur <ArrowUpRight size={13} />
              </a>
              <p className={styles.introduction}>
                The backend behind a better product.
                <br />
                I&apos;m a Computer Science student at NIT Hamirpur focused on backend
                development, full-stack applications, and building reliable
                software through practical projects.
              </p>
              <div className={styles.actions}>
                <a href="#projects">
                  See my work <span>↓</span>
                </a>
                <a href="">
                  <FileText size={15} /> Résumé
                </a>
                <div className={styles.heroSocials}>
                  <a
                    href={socials.github}
                    aria-label="Ankur on GitHub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={`mailto:${socials.email}`}
                    aria-label="Email Ankur"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.hiringStrip}>
            <span>
              <i /> Open to opportunities
            </span>
            <span>NIT Hamirpur, India · UTC+5:30</span>
          </div>
        </section>

        {experience.length > 0 && (
          <section id="work" className={styles.section}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>01 / ENGINEERING IN PRACTICE</span>
                <h2>Work experience.</h2>
              </div>
              <p></p>
            </div>
          </section>
        )}

        <section id="skills" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>01 / THE TOOLKIT</span>
              <h2>Tech I work with.</h2>
            </div>
            <p>Tools behind the work.</p>
          </div>
          <TechStack />
        </section>

        <div id="work" />
        <ProjectShowcase />

        <section id="notes" className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>03 / NOTES FROM THE DESK</span>
              <h2>Written along the way.</h2>
            </div>
            <Link href="/blog">All notes ↗</Link>
          </div>
          <div className={styles.notes}>
            {notes.map((n, i) => (
              <Link href={n.href} key={n.href}>
                <span className={styles.noteNumber}>0{i + 1}</span>
                <div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className={`${styles.section} ${styles.about}`}>
          <div
            className={styles.originScene}
            role="img"
            aria-label="Animated pixel character coding on a laptop"
          >
            <div className={styles.storyBoy} />
          </div>
          <div className={styles.originCopy}>
            <span className={styles.eyebrow}>A LITTLE BACKGROUND</span>
            <h2>Learning by building.</h2>
            <p>
              I&apos;m Ankur Gupta, a Computer Science student at the National
              Institute of Technology Hamirpur. I&apos;m interested in backend
              engineering, full-stack development, databases, and understanding
              how software systems work beyond the user interface.
            </p>
            <p>
              I enjoy learning through practical implementation and building
              applications that solve real problems. My projects include FATGS,
              TT_TRACKER, and PRISMS, which reflect my interest in academic
              scheduling, timetable management, and research administration
              software.
            </p>
            <p>
              I&apos;m continuing to strengthen my programming fundamentals,
              backend development skills, and understanding of software
              architecture through hands-on projects.
            </p>
            <Link href="/stories/journey">
              The longer story <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        <GithubActivity />

        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <div>
            <span className={styles.eyebrow}>04 / THE NEXT CONVERSATION</span>
            <h2>Let&apos;s build something useful.</h2>
            <p>
              Computer Science student at NIT Hamirpur focused on backend
              development.
            </p>
            <p>Based in Hamirpur, India (UTC+5:30).</p>
          </div>
          <a href={`mailto:${socials.email}`}>
            <Mail size={18} /> Say hello <ArrowUpRight size={17} />
          </a>
        </section>

        <footer className={styles.footer}>
          <span>
            Ankur Gupta <span className={styles.pixelStar}>·</span> Backend Developer.
          </span>
          <div>
            <a href={socials.github} target="_blank" rel="noreferrer">
              <Github size={14} /> GitHub
            </a>
            <a href="">
              Résumé ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
