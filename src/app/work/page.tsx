import { pageMetadata } from "@/lib/seo";
import { NotesIndex } from "@/components/Journal/JournalFrame";
export const metadata = pageMetadata({ title: "Projects & Engineering | Ankur Gupta", description: "Developer tooling and academic software: skillapt, FATGS, TT_TRACKER, and PRISMS.", path: "/work", card: "work" });
export default function WorkStoriesPage() {
  return <NotesIndex />;
}
