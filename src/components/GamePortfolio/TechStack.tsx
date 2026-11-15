"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Server,
  FileCode,
  FileCode2,
  Palette,
  LayoutGrid,
  Terminal,
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
  bootstrap: { icon: LayoutGrid, color: "#7952b3" },
  ejs: { icon: FileCode2, color: "#b4ca65" },
  linux: { icon: Terminal, color: "#fcc624" },
  postman: { icon: Send, color: "#ff6c37" },
  figma: { icon: FigmaIcon, color: "#a259ff" },
};

// [name, icon key, category, description]. Mirrors the skills on the GitHub profile README.
const stack = [
  ["TypeScript and JavaScript", "typescript", "Core language", "Type-safe web services, CLIs and asynchronous programming across the stack."],
  ["Python", "python", "Core language", "Scripting, automation and asset or data preparation tooling."],
  ["C and C++", "cpp", "Core language", "Programming fundamentals, object-oriented concepts, and problem solving."],
  ["React", "react", "Frontend", "Component-driven user interfaces and client state management."],
  ["HTML and CSS", "htmlcss", "Frontend", "Semantic markup, styling, layout structures, and responsive design."],
  ["Tailwind CSS", "tailwind", "Frontend", "Utility-first styling, used for the skillapt web portal."],
  ["Bootstrap", "bootstrap", "Frontend", "Component and grid framework for quick, responsive layouts."],
  ["EJS", "ejs", "Frontend", "Server-rendered templates for Express applications."],
  ["Node.js", "nodedotjs", "Backend runtime", "Server-side runtime for APIs, CLIs and background processing; the skillapt CLI targets Node 22."],
  ["Express.js", "express", "Backend framework", "RESTful routing, middleware, and request handling."],
  ["MongoDB and Mongoose", "mongodb", "Database", "Document data modeling, schemas, queries, and persistence."],
  ["Cloudflare Workers", "cloudflare", "Edge platform", "Hono on Workers with D1, R2 and Durable Objects for the skillapt registry."],
  ["Git and GitHub", "git", "Version control", "Version control, branching workflows, and code collaboration."],
  ["Docker", "docker", "Containers", "Containerized development and reproducible environments."],
  ["Linux", "linux", "Operating system", "Day-to-day command line, shell tooling and server environments."],
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
