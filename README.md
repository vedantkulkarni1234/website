# HexStrike AI - The Hacker's Arsenal

<div align="center">
  <img src="public/logo.svg" alt="HexStrike AI" width="120" />
  
  **Elite Browser Extensions for Bug Bounty Hunters**
  
  [Live Demo](https://hexstrike.ai) • [Documentation](https://docs.hexstrike.ai) • [Discord](https://discord.gg/hexstrike)
</div>

---

## 🚀 Overview

HexStrike AI is a premium e-commerce platform showcasing 17+ professional browser extensions designed specifically for bug bounty hunters, penetration testers, and security researchers.

### Key Features

- 🎨 **Immersive 3D Experience** - React Three Fiber powered hero with impossible geometry
- ⚡ **High Performance** - Next.js 14+ with Turbopack for blazing fast builds
- 🔐 **Secure Payments** - Stripe integration with webhook handling
- 🔑 **GitHub OAuth** - Seamless authentication for the hacker community
- 🛒 **Full E-commerce** - Cart, checkout, license management
- 📱 **Fully Responsive** - Mobile-first cyberpunk design

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| 3D Graphics | React Three Fiber, Three.js |
| Animation | GSAP, Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (GitHub OAuth) |
| Payments | Stripe |
| State | Zustand |
| Deployment | Vercel |

---

## 📦 Extensions

1. **JS Recon Radar** - Deep JavaScript intelligence gathering
2. **ParamHawk** - Cross-page parameter tracking
3. **AuthFlow Visualizer** - Authentication flow mapping
4. **Response Anomaly Detector** - Intelligent response analysis
5. **Scope Guardian** - Program scope management
6. **DOM Sink Tracker** - Real-time sink detection
7. **Smart Diff Engine** - Intelligent response comparison
8. **Request Mutator Lab** - Request manipulation workshop
9. **Hunter's Second Brain** - Knowledge management
10. **Tech Stack Profiler** - Technology detection
11. **API Schema Reconstructor** - Automatic API documentation
12. **Blind Interaction Tracker** - OOB interaction monitoring
13. **Access Control Matrix** - Permission mapping
14. **Report Generator Pro** - Professional reports
15. **WebSocket Analyzer** - Real-time traffic analysis
16. **Recon Aggregator** - Intelligence correlation
17. **Workflow Orchestrator** - Automation suite

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- GitHub OAuth app

### Installation

```bash
# Clone the repository
git clone https://github.com/hexstrike/hexstrike-ai.git
cd hexstrike-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Initialize database
npx prisma migrate dev

# Seed initial data
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GITHUB_ID="..."
GITHUB_SECRET="..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── extensions/      # Extensions pages
│   ├── pricing/         # Pricing page
│   └── ...
├── components/
│   ├── 3d/              # Three.js components
│   ├── sections/        # Page sections
│   └── ui/              # UI components
├── lib/                 # Utilities & config
└── store/               # Zustand stores
```

---

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Void | `#0a0a0a` | Background |
| Cyan | `#00ffff` | Primary accent |
| Purple | `#8b5cf6` | Secondary accent |
| Matrix | `#00ff41` | Success/positive |
| Danger | `#ff3333` | Errors/warnings |

### Typography

- **Headings**: Space Grotesk
- **Code/Terminal**: JetBrains Mono

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
docker build -t hexstrike-ai .
docker run -p 3000:3000 hexstrike-ai
```

---

## 📄 License

© 2024 HexStrike Labs. All rights reserved.

---

<div align="center">
  <b>Built with ❤️ for the Security Research Community</b>
</div>
