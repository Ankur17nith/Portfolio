import { pageMetadata } from "@/lib/seo";
import { NotesIndex } from "@/components/Journal/JournalFrame";
export const metadata = pageMetadata({ title: "Projects & Engineering | Ankur Gupta", description: "Academic timetable systems and research administration software: FATGS, TT_TRACKER, and PRISMS.", path: "/work", card: "work" });
export default function WorkStoriesPage() {
  return <NotesIndex />;
}
