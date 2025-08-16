# Replyify

Replyify helps you craft concise, on‑brand text for any purpose by letting you set a persona, tone, and goal. It’s not just for replies—you can write new messages, rewrite drafts, or tailor content to different audiences.

• Live demo: https://replyify-five.vercel.app

## What is Replyify?

Replyify is a small Next.js app that applies consistent voice and intent to your writing. You choose:

- Persona/Audience (e.g. customer, investor, friend)
- Tone (e.g. empathetic, formal, witty)
- Goal/Task (e.g. clarify, persuade, follow‑up)

Paste what you want to say (or a rough idea), pick the sliders, and generate a clean draft that matches your brand.

## Features

- Persona, tone, and goal controls to shape output
- Fast generation via Groq API
- Simple, accessible UI with keyboard‑friendly chips
- Stateless API endpoint you can call from elsewhere (`/api/generate`)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

Built with Next.js App Router, Tailwind, and the Groq API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Live deployment: https://replyify-five.vercel.app

Check out Next.js deployment docs if you want to deploy your own fork: https://nextjs.org/docs/app/building-your-application/deploying



## Development

- Install: `npm install`
- Dev server: `npm run dev` → http://localhost:3000
- Quality: `npm run lint`, `npm run lint:fix`, `npm run typecheck`, `npm run format`

## Environment

Create `.env.local` (not committed):

```
GROQ_API_KEY=...
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
GROQ_TIMEOUT_MS=120000
GROQ_MAX_TOKENS=512
GROQ_TEMPERATURE=0.7

# Optional, used for absolute metadata URLs (OG/Twitter)
NEXT_PUBLIC_SITE_URL=https://replyify-five.vercel.app
```

- `GROQ_*` variables are server-only and read in `src/lib/groq.ts` and API routes.
- `NEXT_PUBLIC_SITE_URL` is safe to expose; it sets `metadataBase` in `src/app/layout.tsx` for correct social preview URLs.

## API

- POST `POST /api/generate`
  - Body fields (strings; optional unless noted):
    - `rawInput` (required): what you want to write or rewrite
    - `persona`, `tone`, `goal`, `topic`, `context`, `system`
  - Returns: `{ text: string }`

## Tech Stack

- Next.js App Router (Node runtime)
- React + Tailwind CSS v4
- Groq API

## Notes

- Replyify focuses on voice and intent setting (persona/tone/goal). It works for replies, new messages, summaries, or rewrites—anything that benefits from consistent style.

## Cleanup Notes

- Removed unused `services/` indirection; use `@/lib/groq` directly.
- Default `public/*.svg` assets appear unused; safe to delete.
- Unused files removed: `src/components/ReplyForm.tsx`, `src/lib/hf.ts`, `src/services/*`.
- Prompt composition centralized in `src/lib/llm.ts`; `utils/buildPrompt.ts` is obsolete.

## License

MIT License. See [`LICENSE`](./LICENSE).
