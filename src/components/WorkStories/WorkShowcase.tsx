import Image from "next/image";
import Link from "next/link";
import type { WorkStory } from "@/lib/work-stories";
import styles from "./WorkStories.module.css";

export function WorkShowcase({ story, index }: { story: WorkStory; index: number }) {
  const overview = story.features.slice(0, 6);
  return <article id={`project-${story.slug}`} data-project={story.slug} data-work-experience className={styles.showcase} data-tone={story.slug}>
    <header className={styles.masthead}>
      <span>0{index + 1} / Featured Project</span><span>{story.period}</span>
    </header>
    <div className={styles.intro}>
      <div><p className={styles.company}>{story.name}</p><h3>{story.heading}</h3></div>
      <div className={styles.introCopy}><p className={styles.role}>{story.role}</p><p>{story.introduction}</p></div>
    </div>
    <Link href={`/work/${story.slug}`} className={styles.visual} aria-label={`Explore the ${story.name} project`}>
      <Image src={story.image} alt={`${story.name} product interface`} width={1600} height={900} sizes="(max-width: 767px) 92vw, 1200px" className={styles.screen} />
      <span className={styles.visualLink}>Inside {story.name} <span aria-hidden="true">↗</span></span>
    </Link>
    <p className={styles.caption}>{story.caption}</p>
    <div className={styles.proof}>{story.proof.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
    <div className={styles.ownership}><span>What I built</span><p>{story.ownership}</p></div>
    <div className={styles.features}>{overview.map((feature, i) => <Link href={`/work/${story.slug}#${feature.id}`} key={feature.id} className={styles.feature}>
      <span className={styles.featureIndex}>0{i + 1}<span aria-hidden="true">↗</span></span>
      <h4>{feature.title}</h4><p>{feature.outcome}</p>
    </Link>)}</div>
    <footer className={styles.showcaseFooter}><p>{story.tagline}</p><Link className={styles.cta} href={`/work/${story.slug}`}>Explore project <span aria-hidden="true">↗</span></Link></footer>
  </article>;
}
