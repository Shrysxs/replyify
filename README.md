# 🎯 Replyify

**AI-powered context-aware text generation for any purpose**

Craft concise, on-brand content by setting persona, tone, and goal. Perfect for replies, new messages, rewrites, or tailoring content to different audiences.

🚀 **[Live Demo](https://replyify-five.vercel.app)** | 🐦 **[Follow @Shrysxs on X](https://x.com/Shrysxs)**

---

## ✨ What is Replyify?

Replyify is an intelligent Next.js application that transforms your rough ideas into polished, contextually-aware text. Simply:

1. **Input** your raw thoughts or draft
2. **Configure** persona, tone, and goal
3. **Generate** professional, on-brand content instantly

### 🎛️ Smart Controls
- **Persona**: Friend, customer, investor, hiring manager, classmate, general audience
- **Tone**: Witty, formal, casual, empathetic, assertive, minimal, wise, contrarian, playful
- **Goal**: Clarify, persuade, support, apologize, follow-up, close deal, network, ask for help

## 🚀 Features

- **🎯 Context-Aware Generation**: Not just replies—create any type of content
- **⚡ Lightning Fast**: Powered by Groq API for sub-second responses
- **🎨 Modern UI**: Clean, accessible interface with keyboard shortcuts
- **🔄 Humanize Function**: Make AI-generated text more natural and conversational
- **📋 One-Click Copy**: Instant clipboard integration
- **🌡️ Temperature Control**: Fine-tune creativity vs. focus (0-1 scale)
- **💾 Smart Caching**: LRU cache for faster repeated requests
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔌 API Ready**: Standalone `/api/generate` endpoint for integrations

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Runtime**: Node.js
- **Frontend**: React 19.1.0 + TypeScript 5
- **Styling**: Tailwind CSS v4
- **AI**: Groq API (Llama models)
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel Platform

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Groq API key ([Get one free](https://console.groq.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/Shrysxs/replyify.git
cd replyify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Groq API key

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create `.env.local` in the root directory:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional (with defaults)
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
GROQ_TIMEOUT_MS=120000
GROQ_MAX_TOKENS=512
GROQ_TEMPERATURE=0.7

# For production deployment
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📡 API Reference

### POST `/api/generate`

Generate contextually-aware text based on input and configuration.

#### Request Body
```json
{
  "rawInput": "Your message or idea here",
  "persona": "customer",
  "tone": "empathetic", 
  "goal": "support",
  "topic": "product feedback",
  "context": "Additional context",
  "temperature": 0.7
}
```

#### Response
```json
{
  "text": "Generated response text",
  "cached": false
}
```

#### Parameters
- `rawInput` (required): Your input text or ideas
- `persona` (optional): Target audience/persona
- `tone` (optional): Desired tone of voice
- `goal` (optional): Communication objective
- `topic` (optional): Subject matter context
- `context` (optional): Additional background information
- `temperature` (optional): Creativity level (0-1, default: 0.7)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/generate/          # API endpoint
│   ├── opengraph-image/       # Social media previews
│   ├── twitter-image/         # Twitter card images
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main application
├── components/
│   ├── prompt/                # Prompt configuration UI
│   └── ui/                    # Reusable UI components
├── config/
│   └── promptOptions.ts       # Persona/tone/goal definitions
├── lib/
│   ├── cache.ts               # LRU caching system
│   ├── groq.ts                # Groq API client
│   └── llm.ts                 # Text generation logic
└── types/
    └── global.d.ts            # TypeScript declarations
```

## 🎨 Available Options

### Personas
- **Friend**: Warm, informal, simple language
- **Customer**: Respectful, professional, acknowledges concerns
- **Investor**: Succinct, metrics-oriented, confident
- **Hiring Manager**: Clear, outcome-focused, highlights accountability
- **Classmate**: Casual, collaborative, suggests actions
- **General Audience**: Plain language, inclusive, avoids jargon

### Tones
- **Witty**: Light wordplay, clever but not snarky
- **Contrarian**: Politely challenges assumptions
- **Formal**: Complete sentences, precise vocabulary
- **Casual**: Conversational, contractions, friendly
- **Playful**: Upbeat, energetic, tasteful humor
- **Empathetic**: Acknowledges feelings, supportive
- **Assertive**: Direct, confident, clear asks
- **Minimal**: Ultra concise, only essentials
- **Wise**: Measured, reflective, principle-driven

### Goals
- **Clarify**: Ask precise questions or simplify
- **Persuade**: State position with reasons and call-to-action
- **Support**: Offer encouragement and resources
- **Disagree Politely**: Acknowledge then respectfully disagree
- **Apologize**: Own mistakes, state fixes
- **Ask for Help**: Clear need, context, specific ask
- **Follow-up**: Reference prior interaction, propose next steps
- **Close Deal**: Summarize value, address objections
- **Network**: Brief intro, clear purpose, low-friction ask

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shrysxs/replyify)

1. Click the deploy button above
2. Connect your GitHub account
3. Add your `GROQ_API_KEY` in environment variables
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # Run TypeScript compiler
npm run format       # Format code with Prettier
```

### Code Quality

This project maintains high code quality with:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Strict mode** enabled
- **Zero lint errors** policy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Groq](https://groq.com/) for lightning-fast AI inference
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Made with ❤️ by [@Shrysxs](https://x.com/Shrysxs)**

🚀 **[Try Replyify Now](https://replyify-five.vercel.app)** | 🐦 **[Follow on X](https://x.com/Shrysxs)** | ⭐ **[Star on GitHub](https://github.com/Shrysxs/replyify)**
