import { NextRequest, NextResponse } from "next/server";
import { EXTENSIONS } from "@/lib/constants";

// GET /api/extensions/[slug] - Get single extension
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const extension = EXTENSIONS.find((ext) => ext.slug === slug);

        if (!extension) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Extension not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: extension,
        });
    } catch (error) {
        console.error("Error fetching extension:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch extension",
            },
            { status: 500 }
        );
    }
}
