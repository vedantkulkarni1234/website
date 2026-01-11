import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    details: result.error.issues,
                },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = result.data;

        // TODO: Store in database
        // TODO: Send email notification
        // For now, just log it
        console.log("Contact form submission:", { name, email, subject, message });

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            message: "Your message has been received. We'll get back to you soon!",
        });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to process your request. Please try again.",
            },
            { status: 500 }
        );
    }
}
