import RepSubmissionForm from "@/components/rep-submission-form"

export default function Page() {
  return (
    <main className="container mx-auto max-w-2xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">Representative Submission</h1>
        <p className="text-sm text-muted-foreground">Please fill out the details below and submit the form.</p>
      </header>

      <RepSubmissionForm />
    </main>
  )
}
EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

EMAIL_USER=gkfit2025@gmail.com

EMAIL_PASS=rgcfqcxmtpkqwsti
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, date, time, packageName } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "gkfit2025@gmail.com",
        pass: "rgcfqcxmtpkqwsti",
      },
    });

    const mailOptions = {
      from: `"Eat and Cure" `,
      to: email,
      subject: "Booking Confirmation ✔",
      html: `
        <h1 style="color: green;">🎉 Booking Confirmed!</h1>
        <p>Your booking is successfully confirmed.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Thank you for choosing <strong>Eat and Cure</strong> ❤️</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Booking email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email sending failed" });
  }
}
