import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "Not provided";
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Collect photo attachments
    const photoFiles = formData.getAll("photos") as File[];
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

    for (const file of photoFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isRepairQuote = type === "repair-quote" || attachments.length > 0;
    const emailSubject = isRepairQuote
      ? `New Repair Quote Request — ${name}`
      : `New Contact Message — ${subject}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1565c0; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">
            ${isRepairQuote ? "🔧 New Repair Quote Request" : "✉️ New Contact Message"}
          </h2>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #1565c0;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111827;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Subject</td><td style="padding: 8px 0; color: #111827;">${subject || "—"}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <h3 style="color: #374151; margin: 0 0 8px;">Message</h3>
          <p style="color: #4b5563; white-space: pre-wrap; margin: 0;">${message}</p>
          ${attachments.length > 0 ? `
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 14px;">📎 ${attachments.length} photo${attachments.length > 1 ? "s" : ""} attached to this email.</p>
          ` : ""}
        </div>
      </div>
    `;

    // Send to garage
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@automotcentre.com",
      to: process.env.SMTP_TO || "info@automotcentre.com",
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
      attachments,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@automotcentre.com",
      to: email,
      subject: "We received your message — Auto MOT Centre",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1565c0; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Thanks, ${name}!</h2>
          </div>
          <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #374151;">We&apos;ve received your ${isRepairQuote ? "repair quote request" : "message"} and will get back to you as soon as possible.</p>
            ${isRepairQuote ? `<p style="color: #374151;">We&apos;ll review the photos you sent and provide a free, no-obligation quote.</p>` : ""}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 14px;">📞 <a href="tel:+442085539112" style="color: #1565c0;">020 8553 9112</a> &nbsp;|&nbsp; 📍 4 Rectory Rd, London, E12 6JA</p>
            <p style="color: #6b7280; font-size: 14px;">Mon–Sat: 9am–6pm &nbsp;|&nbsp; Sun: 10am–4pm</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
