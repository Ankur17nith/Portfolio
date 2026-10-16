"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getExperienceYears } from "@/lib/experience";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { SECTION_IDS } from "@/lib/constants";
import { useThemeStore } from "@/store/useThemeStore";
import styles from "./Hero.module.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: "700", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export function Hero() {
  const [years, setYears] = useState(getExperienceYears);
  useEffect(() => {
    const update = () => setYears(getExperienceYears());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const theme = useThemeStore((state) => state.theme);
  const goTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section id={SECTION_IDS.hero} className={`${styles.hero} ${body.className}`}>
      <div className={styles.stage}>
        <h1 className={`${styles.name} ${display.className}`} aria-label="Ankur Gupta">
          {["ANKUR", "GUPTA"].map((word, wordIndex) => (
            <span className={styles.word} key={word} aria-hidden="true">
              {[...word].map((letter, i) => <span className={styles.letter} key={i} style={{ animationDelay: `${80 + (i + wordIndex * 5) * 45}ms` }}>{letter}</span>)}
            </span>
          ))}
        </h1>
        <div className={styles.intro}>
          <span className={styles.smallLabel}>Backend Developer</span>
          <p>The backend<br />behind a<br /><em>better product.</em></p>
          <span className={styles.description}>Computer Science student at NIT Hamirpur<br />focused on backend development.</span>
        </div>
        <div className={styles.portrait}>
          <Image src="/game/sprites/v2/00.png" alt="Ankur Gupta" width={192} height={272} priority className={styles.photo} />
        </div>
        <div className={styles.invitation}>
          <p>Computer Science Student<br />at <strong>NIT Hamirpur.</strong><br />Building reliable software.</p>
          <a className={styles.workLink} href="#work" onClick={goTo(SECTION_IDS.work)}><span>Explore project</span><span className={styles.arrow} aria-hidden="true">↘</span></a>
          <a className={styles.contactLink} href="#contact" onClick={goTo(SECTION_IDS.contact)}>Say hello <span aria-hidden="true">↗</span></a>
          <a className={styles.resumeLink} href="" onClick={(e) => e.preventDefault()}>View résumé <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className={styles.bottomline}>
        <p>Always learning.<br />Usually building.</p>
        <p className={styles.experience}><strong suppressHydrationWarning>{years}+ years</strong><span>building full-stack products,<br />backend systems & AI integrations.</span></p>
        <a href="#work" onClick={goTo(SECTION_IDS.work)} className={styles.scroll}>Scroll to discover <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
