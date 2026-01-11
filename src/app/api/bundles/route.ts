import { NextRequest, NextResponse } from "next/server";
import { BUNDLES, EXTENSIONS } from "@/lib/constants";

// GET /api/bundles - Get all bundles
export async function GET(request: NextRequest) {
    try {
        const bundlesWithExtensions = BUNDLES.map((bundle) => ({
            ...bundle,
            extensionDetails: EXTENSIONS.filter((ext) =>
                bundle.extensions.includes(ext.slug)
            ),
        }));

        return NextResponse.json({
            success: true,
            data: bundlesWithExtensions,
            total: bundlesWithExtensions.length,
        });
    } catch (error) {
        console.error("Error fetching bundles:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch bundles",
            },
            { status: 500 }
        );
    }
}
