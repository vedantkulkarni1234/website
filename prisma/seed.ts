import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const extensions = [
    {
        slug: "js-recon-radar",
        name: "JS Recon Radar",
        tagline: "Deep JavaScript Intelligence Gathering",
        description:
            "Continuously scans and analyzes JavaScript files to extract endpoints, secrets, API keys, and hidden functionality. Uses advanced static analysis to uncover what others miss.",
        features: [
            "Real-time JS file interception and parsing",
            "Automatic endpoint and API route extraction",
            "Secret and API key detection",
            "Source map analysis for hidden code",
            "Webpack chunk bruteforcing",
            "Ghost endpoint discovery",
        ],
        category: "RECON",
        price: 29.99,
        icon: "📡",
        color: "#00ffff",
        compatibility: ["chrome", "edge"],
        version: "2.1.0",
        featured: true,
        downloadUrl: "/downloads/js-recon-radar-v2.1.0.crx",
    },
    {
        slug: "paramhawk",
        name: "ParamHawk",
        tagline: "Cross-Page Parameter Tracking & Analysis",
        description:
            "Tracks every parameter across your entire browsing session. Identifies reflection points, hidden parameters, and potential injection vectors automatically.",
        features: [
            "Cross-page parameter tracking",
            "Automatic reflection detection",
            "Hidden parameter discovery",
            "Parameter mutation testing",
            "Correlation with known vulnerabilities",
            "Export to Burp/ZAP",
        ],
        category: "TRACKING",
        price: 24.99,
        icon: "🦅",
        color: "#8b5cf6",
        compatibility: ["chrome", "edge"],
        version: "1.8.0",
        featured: true,
        downloadUrl: "/downloads/paramhawk-v1.8.0.crx",
    },
    {
        slug: "authflow-visualizer",
        name: "AuthFlow Visualizer",
        tagline: "Authentication Flow Mapping & Diff",
        description:
            "Automatically builds visual flowcharts of authentication systems. Compare flows between different user roles to identify privilege escalation vectors.",
        features: [
            "Automatic auth flow diagramming",
            "Multi-role flow comparison",
            "Token lifecycle tracking",
            "Session management analysis",
            "OAuth/OIDC flow detection",
            "Misconfiguration alerts",
        ],
        category: "ANALYSIS",
        price: 34.99,
        icon: "🔐",
        color: "#00ff41",
        compatibility: ["chrome", "edge"],
        version: "2.0.0",
        featured: true,
        downloadUrl: "/downloads/authflow-visualizer-v2.0.0.crx",
    },
    // Add remaining extensions...
];

const bundles = [
    {
        slug: "starter-pack",
        name: "Starter Pack",
        description: "Essential tools to kickstart your bug bounty journey",
        price: 59.99,
        originalPrice: 74.97,
        savings: 20,
        color: "cyan",
        popular: false,
        extensions: ["js-recon-radar", "paramhawk", "scope-guardian"],
    },
    {
        slug: "pro-hunter",
        name: "Pro Hunter Bundle",
        description: "Complete toolkit for serious bug bounty professionals",
        price: 149.99,
        originalPrice: 239.92,
        savings: 38,
        color: "purple",
        popular: true,
        extensions: [
            "js-recon-radar",
            "paramhawk",
            "authflow-visualizer",
            "response-anomaly-detector",
            "dom-sink-tracker",
            "smart-diff-engine",
            "request-mutator-lab",
            "tech-stack-profiler",
        ],
    },
    {
        slug: "elite-arsenal",
        name: "Elite Arsenal",
        description: "The complete HexStrike collection. Every tool, unlimited power.",
        price: 299.99,
        originalPrice: 497.83,
        savings: 40,
        color: "matrix",
        popular: false,
        extensions: extensions.map((e) => e.slug),
    },
];

async function seed() {
    console.log("🌱 Starting database seed...");

    // Clean existing data
    console.log("Cleaning existing data...");
    await prisma.bundleItem.deleteMany();
    await prisma.license.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.bundle.deleteMany();
    await prisma.extension.deleteMany();

    // Seed extensions
    console.log("Seeding extensions...");
    for (const ext of extensions) {
        await prisma.extension.create({
            data: {
                ...ext,
                category: ext.category as any,
                screenshots: [],
            },
        });
    }
    console.log(`✓ Created ${extensions.length} extensions`);

    // Seed bundles
    console.log("Seeding bundles...");
    for (const bundle of bundles) {
        const { extensions: bundleExtensions, ...bundleData } = bundle;

        const createdBundle = await prisma.bundle.create({
            data: bundleData,
        });

        // Create bundle items
        for (const extSlug of bundleExtensions) {
            const ext = await prisma.extension.findUnique({
                where: { slug: extSlug },
            });

            if (ext) {
                await prisma.bundleItem.create({
                    data: {
                        bundleId: createdBundle.id,
                        extensionId: ext.id,
                    },
                });
            }
        }
    }
    console.log(`✓ Created ${bundles.length} bundles`);

    console.log("✅ Database seed completed!");
}

seed()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
