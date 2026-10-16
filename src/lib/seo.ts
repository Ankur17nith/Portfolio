import type { Metadata } from "next";
import { siteConfig } from "./data";

export const shareImage = "/og";
export const shareAlt = "Ankur Gupta — The backend behind a better product. Backend Developer, Computer Science student at NIT Hamirpur.";

export function pageMetadata({ title, description, path, card, article = false }: {
  title: string; description: string; path: string; card?: string; article?: boolean;
}): Metadata {
  const image = card ? `/og?post=${encodeURIComponent(card)}&v=5` : shareImage;
  const url = new URL(path, siteConfig.url).href;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, locale: "en_US", type: article ? "article" : "website", images: [{ url: image, width: 1200, height: 630, alt: card ? `${title} — Ankur Gupta’s engineering notes` : shareAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: card ? title : shareAlt }] },
  };
}
