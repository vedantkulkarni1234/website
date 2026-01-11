import { NextRequest, NextResponse } from "next/server";
import { EXTENSIONS } from "@/lib/constants";

// GET /api/extensions - Get all extensions
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");
        const limit = searchParams.get("limit");

        let result = [...EXTENSIONS];

        // Filter by category
        if (category) {
            result = result.filter(
                (ext) => ext.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter featured
        if (featured === "true") {
            result = result.filter((ext) => ext.featured);
        }

        // Limit results
        if (limit) {
            result = result.slice(0, parseInt(limit));
        }

        return NextResponse.json({
            success: true,
            data: result,
            total: result.length,
        });
    } catch (error) {
        console.error("Error fetching extensions:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch extensions",
            },
            { status: 500 }
        );
    }
}
