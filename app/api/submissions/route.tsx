// app/api/submitAppointment/route.ts
        import { NextResponse } from "next/server";
        import { Resend } from "resend";

        export async function POST(req: Request) {
        const body = await req.json().catch(() => ({} as any));
        console.log("[v0] Submission received:", body);

        const {
            repName,
            companyName,
            phoneNumber,
            mailId, // recipient email
            doctorName,
            date,
        } = body || {};

        // 1. Validation
        if (!mailId || typeof mailId !== "string") {
            return NextResponse.json(
            { ok: false, error: "Email (Mail ID) is required." },
            { status: 400 }
            );
        }

        const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailId);
        if (!emailLike) {
            return NextResponse.json(
            { ok: false, error: "Please provide a valid email address." },
            { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.warn("[v0] Missing RESEND_API_KEY env var. Skipping email send.");
            return NextResponse.json(
            {
                ok: false,
                error: "Email service not configured. Add RESEND_API_KEY in Project Settings.",
            },
            { status: 500 }
            );
        }

        // 2. Send email via Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
            await resend.emails.send({
            from: "Appointments <onboarding@resend.dev>", // replace with verified domain later
            to: [mailId],
            subject: "🎉 Appointment Confirmed",
            html: `
                <h2 style="color: green;">✅ Your Appointment is Confirmed!</h2>
                <p>Dear ${repName || "User"},</p>
                <p>Your appointment has been successfully registered.</p>
                <ul>
                <li><strong>Company:</strong> ${companyName || "N/A"}</li>
                <li><strong>Doctor:</strong> ${doctorName || "N/A"}</li>
                <li><strong>Date:</strong> ${date || "N/A"}</li>
                <li><strong>Phone:</strong> ${phoneNumber || "N/A"}</li>
                </ul>
                <p>Thank you for choosing <strong>Eat and Cure</strong> ❤️</p>
            `,
            });

            // 3. Response after success
            return NextResponse.json({
            ok: true,
            message: "Appointment submitted and email sent successfully.",
    ok: true,
            message: "Appointment submitted and email sent successfully.",
            });
        } catch (err) {
            console.error("[v0] Email send failed:", (err as Error).message);
            return NextResponse.json(
            { ok: false, error: "Failed to send confirmation email." },
            { status: 500 }
            );
        }
