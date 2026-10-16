"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Server,
  FileCode,
  Palette,
  Send,
  Figma as FigmaIcon,
  type LucideIcon,
} from "lucide-react";
import styles from "./Portfolio.module.css";

const toolIcons: Record<string, { icon: LucideIcon; color: string }> = {
  cpp: { icon: Code2, color: "#659ad2" },
  express: { icon: Server, color: "#82aaff" },
  htmlcss: { icon: FileCode, color: "#e34f26" },
  tailwind: { icon: Palette, color: "#38bdf8" },
  postman: { icon: Send, color: "#ff6c37" },
  figma: { icon: FigmaIcon, color: "#a259ff" },
};

const stack = [
  ["C and C++", "cpp", "Core language", "Programming fundamentals, object-oriented concepts, and problem solving."],
  ["JavaScript and TypeScript", "typescript", "Core language", "Asynchronous programming, type safety, and web services."],
  ["React", "react", "Frontend", "Component-driven user interfaces and client state management."],
  ["Node.js", "nodedotjs", "Backend runtime", "Server-side runtime for APIs and background processing."],
  ["Express.js", "express", "Backend framework", "RESTful routing, middleware, and request handling."],
  ["MongoDB and Mongoose", "mongodb", "Database", "Document data modeling, schemas, queries, and persistence."],
  ["HTML and CSS", "htmlcss", "Frontend", "Semantic markup, styling, layout structures, and responsive design."],
  ["Tailwind CSS", "tailwind", "Frontend", "Utility-first CSS framework for clean responsive UI styling."],
  ["Git and GitHub", "git", "Version control", "Version control, branching workflows, and code collaboration."],
  ["Postman", "postman", "API testing", "API testing, endpoint validation, and HTTP request inspection."],
  ["Figma", "figma", "Design tool", "User interface wireframing, layout inspection, and visual planning."],
];

export function TechStack() {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.stack}>
      <div className={styles.stackGrid} aria-label="Technology skills">
        {stack.map(([name, icon], i) => {
          const tool = toolIcons[icon];
          const Icon = tool?.icon;
          return (
            <button
              key={name}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-controls="skill-description"
            >
              {Icon ? (
                <Icon
                  size={27}
                  strokeWidth={1.7}
                  color={tool.color}
                  aria-hidden="true"
                />
              ) : (
                <Image
                  src={`/icons/stack/${icon}.svg`}
                  width={27}
                  height={27}
                  alt=""
                />
              )}
              <span>{name}</span>
            </button>
          );
        })}
      </div>
      <div
        id="skill-description"
        className={styles.skillDescription}
        aria-live="polite"
      >
        <span className={styles.skillLevel}>◆ {stack[selected][2]}</span>
        <strong>{stack[selected][0]}</strong>
        <span>{stack[selected][3]}</span>
      </div>
    </div>
  );
}
