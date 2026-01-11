# 🏗️ HexStrike AI - Technical Architecture

## Vision Statement
**"The Hacker's Arsenal"** - An immersive, dimension-breaking e-commerce experience that showcases bug bounty tools through impossible 3D geometry, paradoxical animations, and cyberpunk aesthetics.

---

## 🎨 Creative Concept

### Visual Identity
- **Theme**: Escher-inspired impossible architecture meets cyberpunk terminal aesthetics
- **Hero Experience**: Portal warp effect with floating impossible geometry
- **Navigation**: Glitch transitions with dimension-breaking effects
- **Cards**: 3D impossible cubes that morph and reveal product details
- **Colors**: Deep void blacks, electric cyan, neon purple, matrix green

### Mood Board Description
1. **Penrose Triangles** floating in digital void
2. **Infinite staircases** as navigation metaphor
3. **Portal effects** transitioning between sections
4. **Terminal/Matrix** rain effects as background
5. **Glitch aesthetics** on hover and transitions
6. **Holographic cards** with depth parallax

---

## 🔧 Technical Stack

### Frontend
```
├── Framework: Next.js 14 (App Router)
├── 3D Engine: React Three Fiber + Three.js
├── Animation: GSAP + Framer Motion
├── Styling: Tailwind CSS + Custom CSS
├── State: Zustand
├── Forms: React Hook Form + Zod
└── Icons: Lucide React + Custom SVGs
```

### Backend
```
├── Runtime: Node.js 20+
├── Framework: Next.js API Routes
├── Database: PostgreSQL (Prisma ORM)
├── Auth: NextAuth.js (GitHub OAuth + JWT)
├── Payments: Stripe
├── File Storage: AWS S3 / Cloudflare R2
└── Email: Resend
```

### DevOps
```
├── Hosting: Vercel
├── Database: Neon / Supabase
├── CDN: Cloudflare
├── Monitoring: Vercel Analytics
└── CI/CD: GitHub Actions
```

---

## 📁 Project Structure

```
hexstrike-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth group routes
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── callback/
│   │   ├── (main)/            # Main site routes
│   │   │   ├── page.tsx       # Hero landing
│   │   │   ├── extensions/    # Product catalog
│   │   │   ├── pricing/       # Pricing & bundles
│   │   │   ├── docs/          # Documentation
│   │   │   └── blog/          # Blog section
│   │   ├── (dashboard)/       # User dashboard
│   │   │   ├── dashboard/
│   │   │   ├── downloads/
│   │   │   ├── licenses/
│   │   │   └── settings/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   ├── extensions/
│   │   │   ├── purchases/
│   │   │   ├── stripe/
│   │   │   └── downloads/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── 3d/                # Three.js components
│   │   │   ├── HeroScene.tsx
│   │   │   ├── PenroseTriangle.tsx
│   │   │   ├── ImpossibleCube.tsx
│   │   │   ├── PortalEffect.tsx
│   │   │   ├── InfiniteStaircase.tsx
│   │   │   ├── MatrixRain.tsx
│   │   │   └── FloatingGeometry.tsx
│   │   ├── ui/               # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── GlitchText.tsx
│   │   │   ├── Terminal.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Extensions.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Features.tsx
│   │   └── layouts/          # Layout components
│   │       ├── MainLayout.tsx
│   │       └── DashboardLayout.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── stripe.ts         # Stripe config
│   │   ├── auth.ts           # Auth config
│   │   ├── utils.ts          # Utilities
│   │   └── constants.ts      # Constants
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useScrollTrigger.ts
│   │   ├── useParallax.ts
│   │   └── use3DScene.ts
│   │
│   ├── store/                # Zustand stores
│   │   ├── cartStore.ts
│   │   └── uiStore.ts
│   │
│   └── types/                # TypeScript types
│       ├── extension.ts
│       ├── user.ts
│       └── purchase.ts
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
│
├── public/
│   ├── fonts/
│   ├── images/
│   ├── models/               # 3D models (.glb)
│   └── sounds/               # Audio effects
│
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗄️ Database Schema

### Core Entities

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  githubId      String?   @unique
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  purchases     Purchase[]
  licenses      License[]
  sessions      Session[]
}

model Extension {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  tagline       String
  description   String    @db.Text
  features      String[]
  category      Category
  price         Float
  salePrice     Float?
  icon          String
  screenshots   String[]
  video         String?
  downloadUrl   String
  version       String
  compatibility String[]  // ["chrome", "edge"]
  featured      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  purchases     Purchase[]
  licenses      License[]
  bundleItems   BundleItem[]
}

model Bundle {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  description   String
  price         Float
  originalPrice Float
  featured      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  items         BundleItem[]
  purchases     Purchase[]
}

model BundleItem {
  id          String    @id @default(cuid())
  bundleId    String
  extensionId String
  
  bundle      Bundle    @relation(fields: [bundleId], references: [id])
  extension   Extension @relation(fields: [extensionId], references: [id])
}

model Purchase {
  id            String    @id @default(cuid())
  userId        String
  extensionId   String?
  bundleId      String?
  stripePaymentId String  @unique
  amount        Float
  currency      String    @default("USD")
  status        PaymentStatus @default(COMPLETED)
  createdAt     DateTime  @default(now())
  
  user          User      @relation(fields: [userId], references: [id])
  extension     Extension? @relation(fields: [extensionId], references: [id])
  bundle        Bundle?   @relation(fields: [bundleId], references: [id])
  license       License?
}

model License {
  id            String    @id @default(cuid())
  key           String    @unique
  userId        String
  extensionId   String
  purchaseId    String    @unique
  activations   Int       @default(0)
  maxActivations Int      @default(3)
  expiresAt     DateTime?
  createdAt     DateTime  @default(now())
  
  user          User      @relation(fields: [userId], references: [id])
  extension     Extension @relation(fields: [extensionId], references: [id])
  purchase      Purchase  @relation(fields: [purchaseId], references: [id])
}

model Session {
  id            String    @id @default(cuid())
  userId        String
  token         String    @unique
  expiresAt     DateTime
  createdAt     DateTime  @default(now())
  
  user          User      @relation(fields: [userId], references: [id])
}

model BlogPost {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  excerpt       String
  content       String    @db.Text
  coverImage    String
  author        String
  tags          String[]
  published     Boolean   @default(false)
  publishedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  USER
  ADMIN
}

enum Category {
  RECON
  ANALYSIS
  TRACKING
  REPORTING
  AUTOMATION
  UTILITIES
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/github          # GitHub OAuth
POST   /api/auth/logout          # Logout
GET    /api/auth/session         # Get session
```

### Extensions
```
GET    /api/extensions           # List all extensions
GET    /api/extensions/:slug     # Get single extension
GET    /api/extensions/featured  # Get featured extensions
```

### Bundles
```
GET    /api/bundles              # List all bundles
GET    /api/bundles/:slug        # Get single bundle
```

### Purchases
```
POST   /api/purchases/checkout   # Create Stripe checkout
GET    /api/purchases            # Get user purchases
GET    /api/purchases/:id        # Get single purchase
```

### Downloads
```
GET    /api/downloads/:licenseKey  # Download extension
POST   /api/downloads/activate     # Activate license
```

### Stripe Webhooks
```
POST   /api/stripe/webhook       # Handle Stripe events
```

---

## 🎭 Component Tree

```
App
├── MainLayout
│   ├── Navigation (3D morphing logo, glitch menu)
│   ├── MatrixRain (background)
│   └── Footer (terminal style)
│
├── HeroSection
│   ├── Canvas (R3F)
│   │   ├── PenroseTriangle (rotating)
│   │   ├── ImpossibleCube (morphing)
│   │   ├── PortalEffect (center)
│   │   └── ParticleField (ambient)
│   ├── GlitchText (headline)
│   ├── TerminalDemo (typing effect)
│   └── CTAButtons (glow effect)
│
├── ExtensionsGrid
│   ├── FilterBar (terminal style)
│   └── ExtensionCard[] (3D flip, holographic)
│       ├── ImpossibleFrame
│       ├── ProductInfo
│       └── QuickActions
│
├── PricingSection
│   ├── InfiniteStaircase (3D background)
│   ├── PricingCard[] (floating, parallax)
│   │   ├── GlowBorder
│   │   ├── FeatureList
│   │   └── PurchaseButton
│   └── BundleShowcase
│
├── TestimonialsSection
│   ├── RotatingPortal
│   └── TestimonialCard[] (floating in void)
│
└── DashboardLayout
    ├── Sidebar (terminal navigation)
    ├── DashboardHome
    ├── DownloadsPanel
    ├── LicensesManager
    └── SettingsPanel
```

---

## 🎬 Animation Specifications

### Page Transitions
- **Portal Warp**: Elements warp through central portal
- **Glitch Dissolve**: Text scrambles then reforms
- **Dimension Shift**: 3D space rotation between pages

### Scroll Animations
- **Parallax Depth**: Multi-layer depth scrolling
- **Reveal Morph**: Elements morph from impossible shapes
- **Text Glitch**: Type-on with random character scramble

### Hover Effects
- **Holographic Shift**: Color spectrum shift
- **3D Float**: Element lifts with shadow
- **Glitch Pulse**: Rapid offset glitch frames

### Loading States
- **Matrix Boot**: Terminal boot sequence
- **Geometry Assembly**: Shapes assemble from particles

---

## 🔐 Security Considerations

1. **Authentication**
   - GitHub OAuth for primary auth
   - JWT tokens with short expiry
   - HTTP-only secure cookies
   - CSRF protection

2. **API Security**
   - Rate limiting
   - Input validation (Zod)
   - SQL injection prevention (Prisma)
   - XSS prevention

3. **Payments**
   - Stripe Checkout (PCI compliant)
   - Webhook signature verification
   - Idempotency keys

4. **Downloads**
   - Signed URLs (time-limited)
   - License verification
   - Device fingerprinting

---

## 📦 Extensions Data

```typescript
const extensions = [
  {
    slug: "js-recon-radar",
    name: "JS Recon Radar",
    tagline: "Deep JavaScript Intelligence Gathering",
    category: "RECON",
    price: 29.99
  },
  {
    slug: "paramhawk",
    name: "ParamHawk",
    tagline: "Cross-Page Parameter Tracking & Analysis",
    category: "TRACKING",
    price: 24.99
  },
  {
    slug: "authflow-visualizer",
    name: "AuthFlow Visualizer",
    tagline: "Authentication Flow Mapping & Diff",
    category: "ANALYSIS",
    price: 34.99
  },
  {
    slug: "response-anomaly-detector",
    name: "Response Anomaly Detector (RAD)",
    tagline: "Intelligent Response Pattern Analysis",
    category: "ANALYSIS",
    price: 29.99
  },
  {
    slug: "scope-guardian",
    name: "Scope Guardian + Program Intel Hub",
    tagline: "Program Scope Management & Intelligence",
    category: "UTILITIES",
    price: 19.99
  },
  {
    slug: "dom-sink-tracker",
    name: "DOM Sink Tracker",
    tagline: "Real-time DOM Sink Detection",
    category: "TRACKING",
    price: 27.99
  },
  {
    slug: "smart-diff-engine",
    name: "Smart Diff Engine",
    tagline: "Intelligent Response Comparison",
    category: "ANALYSIS",
    price: 24.99
  },
  {
    slug: "request-mutator-lab",
    name: "Request Mutator Lab",
    tagline: "Request Manipulation Workshop",
    category: "ANALYSIS",
    price: 32.99
  },
  {
    slug: "hunters-second-brain",
    name: "Hunter's Second Brain",
    tagline: "Knowledge Management for Hunters",
    category: "UTILITIES",
    price: 29.99
  },
  {
    slug: "tech-stack-profiler",
    name: "Tech Stack Deep Profiler",
    tagline: "Comprehensive Technology Detection",
    category: "RECON",
    price: 26.99
  },
  {
    slug: "api-schema-reconstructor",
    name: "API Schema Reconstructor",
    tagline: "Automatic API Documentation",
    category: "RECON",
    price: 34.99
  },
  {
    slug: "blind-interaction-tracker",
    name: "Blind Interaction Tracker (BIT)",
    tagline: "Out-of-Band Interaction Monitoring",
    category: "TRACKING",
    price: 32.99
  },
  {
    slug: "access-control-matrix",
    name: "Access Control Matrix Builder",
    tagline: "Permission Mapping & Analysis",
    category: "ANALYSIS",
    price: 29.99
  },
  {
    slug: "report-generator-pro",
    name: "Report Generator Pro",
    tagline: "Professional Report Automation",
    category: "REPORTING",
    price: 24.99
  },
  {
    slug: "websocket-analyzer",
    name: "WebSocket & Real-Time Traffic Analyzer",
    tagline: "Real-Time Protocol Analysis",
    category: "ANALYSIS",
    price: 29.99
  },
  {
    slug: "recon-aggregator",
    name: "Recon Aggregator & Auto-Correlator",
    tagline: "Intelligence Correlation Engine",
    category: "RECON",
    price: 34.99
  },
  {
    slug: "workflow-orchestrator",
    name: "Workflow Orchestrator & Hotkey Commander",
    tagline: "Automation & Efficiency Suite",
    category: "AUTOMATION",
    price: 27.99
  }
];
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Seed data populated
- [ ] Stripe webhooks configured
- [ ] OAuth callbacks set
- [ ] CDN caching configured
- [ ] SSL certificates valid
- [ ] Error monitoring active
- [ ] Analytics enabled
- [ ] Backup strategy implemented

---

*Architecture v1.0 - HexStrike AI*
