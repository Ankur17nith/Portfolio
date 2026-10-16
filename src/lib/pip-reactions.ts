import type { PipMood, PipNudge } from "./pip-behavior";

const lines: Record<string, [string, PipMood]> = {
  welcome: ["Hey! Take a look around. I’m here if you need anything.", "wave"],
  systems: ["Backend development, scheduling systems, and full-stack applications. This is where Ankur can help.", "curious"],
  work: ["Explore the three featured projects: FATGS, TT_TRACKER, and PRISMS.", "celebrate"],
  about: ["A little more about the person behind the projects.", "curious"],
  tools: ["The toolkit. Picked for the job, not just the logo.", "curious"],
  "work-stories": ["Notes from the build. Real technical details and systems modeling.", "reading"],
  testimonials: ["Public notes and project feedback.", "wave"],
  contact: ["Made it to the hello corner. No fancy introduction needed.", "wave"],
  fatgs: ["FATGS organizes complex academic timetable scheduling and faculty allocation.", "curious"],
  tt_tracker: ["TT_TRACKER provides dynamic class-wise and faculty-wise timetable tracking with room availability.", "celebrate"],
  prisms: ["PRISMS supports PhD research administration, starting with the thesis submission module.", "curious"],
  fast: ["Wheee. I’m keeping up, just about.", "scrolling"],
  top: ["Back to the beginning. Round two?", "wave"],
  bottom: ["That’s the end of the page. I’m still here if you have a question.", "celebrate"],
  details: ["Opening the hood. Here’s how the pieces fit together.", "curious"],
  resume: ["The short version, neatly packed.", "celebrate"],
  email: ["I’ll leave you two to it. Say hello from me.", "wave"],
  github: ["Off to the code. Mind the rabbit holes.", "curious"],
  linkedin: ["Taking the conversation over. See you here after.", "wave"],
  copy: ["A little something to take with you.", "celebrate"],
  return: ["Oh, hey. You’re back!", "wave"],
  idle: ["Take your time. I’m just hanging out here.", "idle"],
  dark: ["Snow weather. I brought my tiny earmuffs.", "wave"],
  light: ["A little sunshine. That’s nice.", "celebrate"],
  reading: ["I’ll read along. Ask me if a bit needs unpacking.", "reading"],
  "story:fatgs:schema": ["Modeling courses, faculty, rooms, and slots into consistent scheduling entities.", "reading"],
  "story:fatgs:constraints": ["Preventing faculty overlap and room clashes through scheduling logic.", "curious"],
  "story:tt_tracker:rescheduling": ["Handling class rescheduling, cancellations, and room reassignments dynamically.", "reading"],
  "story:prisms:submission": ["Digital thesis submission module with institutional Gmail authentication.", "reading"],
  halfway: ["Halfway down. I’m keeping your place.", "reading"],
};
export function reactionFor(key: string): PipNudge | null {
  const line = lines[key];
  return line ? { text: line[0], mood: line[1], mode: "reaction", prompt: "", label: "" } : null;
}

/** Local speech has its own clock. It never consumes or waits for an AI quota. */
export function createReactionGate() {
  const seen = new Map<string, number>();
  let last = -Infinity, mutedUntil = 0;
  return {
    dismiss(now: number) { mutedUntil = now + 20000; },
    allow(key: string, now: number, action = false) {
      if (now < mutedUntil || now - last < (action ? 1200 : 12000) || now - (seen.get(key) ?? -Infinity) < 45000) return false;
      seen.set(key, now); last = now; return true;
    },
  };
}
