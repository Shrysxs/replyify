# Replyify

Turn any message into a concise, on‑brand reply—fast.

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

Built with Next.js App Router, Tailwind, and the Groq API (OpenAI-compatible Chat Completions).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Codebase Map

- __`src/app/`__ – App Router pages and API routes
  - __`app/page.tsx`__ – Main UI with `PromptConfigurator` and generate action
  - __`app/layout.tsx`__ – App shell, fonts, and global CSS
  - __`app/api/generate/route.ts`__ – Builds prompt and calls Groq
  - __`app/api/reply/route.ts`__ – Generic prompt+context endpoint

- __`src/components/`__ – UI components
  - __`components/prompt/PromptConfigurator.tsx`__ – Controls for persona/tone/goal/input
  - __`components/prompt/OptionsGroup.tsx`__ – Reusable option selector
  - __`components/ui/Chip.tsx`__ – Selectable chip component

- __`src/config/`__ – Static configuration
  - __`config/promptOptions.ts`__ – Options and types for prompt config

- __`src/lib/`__ – Server-side integrations
  - __`lib/groq.ts`__ – Groq API client (OpenAI-compatible Chat Completions)
  - __`lib/llm.ts`__ – Unified service: system prompt, model selection, formatting

- __`src/utils/`__ – Pure utilities (intentionally minimal)

- __Root config__
  - __`next.config.ts`__, __`tsconfig.json`__, __`eslint.config.mjs`__, __`postcss.config.mjs`__, __`.prettierrc`__

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
NEXT_PUBLIC_SITE_URL=https://replyify.app
```

- `GROQ_*` variables are server-only and read in `src/lib/groq.ts` and API routes.
- `NEXT_PUBLIC_SITE_URL` is safe to expose; it sets `metadataBase` in `src/app/layout.tsx` for correct social preview URLs.

## Cleanup Notes

- Removed unused `services/` indirection; use `@/lib/groq` directly.
- Unused packages removed: `openai`, `dotenv`.
- Default `public/*.svg` assets appear unused; safe to delete.
- Unused files removed: `src/components/ReplyForm.tsx`, `src/lib/hf.ts`, `src/services/*`.
- Prompt composition centralized in `src/lib/llm.ts`; `utils/buildPrompt.ts` is obsolete.
