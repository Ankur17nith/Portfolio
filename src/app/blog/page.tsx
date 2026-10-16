import { pageMetadata } from "@/lib/seo";
import { NotesIndex } from "@/components/Journal/JournalFrame";
export const metadata = pageMetadata({ title: "Field notes | Ankur Gupta", description: "Engineering decisions, product lessons and notes on backend systems, full-stack applications, and learning by building.", path: "/blog", card: "notes" });
export default function BlogPage() {
  return <NotesIndex />;
}
