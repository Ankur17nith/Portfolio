# Ankur Gupta | Portfolio

Personal portfolio of Ankur Gupta, a Computer Science student at NIT Hamirpur focused on backend development, built with Next.js (App Router) and a playable pixel-art room.

## Projects featured

| Project | What it is |
| :-- | :-- |
| [skillapt](https://github.com/Ankur17nith/skillapt) | Secure package manager for AI agent skills: CLI, registry API ([skillapt-registry](https://github.com/Ankur17nith/skillapt-registry)) and web portal ([skillapt-web](https://github.com/Ankur17nith/skillapt-web)) |
| [FATGS](https://github.com/Ankur17nith/FATGS) | Faculty Allocation and Timetable Generation System |
| [TT_TRACKER](https://github.com/itzzadi04/TT_TRACKER) | Academic timetable tracking and management |
| PRISMS | PhD Research & Institutional Scholars Management System (in development) |

Each project has a case study at `/work/<slug>`. Content lives in:

- `src/lib/data.ts`: project cards, tools and site config
- `src/lib/work-stories.ts`, `src/content/work/narratives.ts`, `src/components/WorkStories/EngineeringBrief.tsx`: case-study text
- `src/lib/work-media.ts` and `public/images/projects/<slug>/`: product interface screenshots

## Tech stack

Mirrors the skills on the [GitHub profile](https://github.com/Ankur17nith).

| Area | Tools |
| :-- | :-- |
| Languages | TypeScript, JavaScript, Python, C, C++ |
| Frontend | HTML, CSS, Tailwind CSS, Bootstrap, React, EJS |
| Backend | Node.js, Express.js, Cloudflare Workers |
| Database | MongoDB |
| Tools | Git, Docker, Linux, Postman, Figma |

This site itself uses Next.js 16, React 19, TypeScript, Framer Motion, Zustand, MongoDB (testimonials) and Playwright.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run test:buddy # unit tests
npm run test:game  # Playwright tests
```

# Testimonial workflow

The shareable form lives at `/testimonial`. Submissions are stored in the
`testimonials` collection with `status: "pending"` and never appear publicly by
default.

1. Copy `.env.example` to `.env.local` and add the MongoDB connection details.
2. Submit the `/testimonial` form.
3. In MongoDB Compass, open the `portfolio` database and the `testimonials`
   collection.
4. Change a reviewed document's `status` from `pending` to `approved`.

Only documents with both `status: "approved"` and `consent: true` appear on the
homepage on the next refresh. Set `status` to `rejected` or back to `pending`
to hide one again.
