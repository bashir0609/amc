import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...formData } = body;

    // Prepare email content based on booking type
    let subject = "";
    let htmlContent = "";

    if (type === "mot") {
      subject = `New MOT Booking - ${formData.vehicleReg}`;
      htmlContent = `
        <h2>New MOT Booking Request</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3>Vehicle Information</h3>
        <p><strong>Registration:</strong> ${formData.vehicleReg}</p>
        <p><strong>Make:</strong> ${formData.vehicleMake}</p>
        <p><strong>Model:</strong> ${formData.vehicleModel}</p>
        
        <h3>Booking Details</h3>
        <p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
        
        ${formData.additionalNotes ? `<h3>Additional Notes</h3><p>${formData.additionalNotes}</p>` : ""}
      `;
    } else if (type === "appointment") {
      subject = `New Appointment Request - ${formData.serviceType}`;
      htmlContent = `
        <h2>New Appointment Request</h2>
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3>Service Details</h3>
        <p><strong>Service Type:</strong> ${formData.serviceType}</p>
        <p><strong>Vehicle Info:</strong> ${formData.vehicleInfo}</p>
        
        <h3>Appointment Details</h3>
        <p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
        
        ${formData.message ? `<h3>Message</h3><p>${formData.message}</p>` : ""}
      `;
    } else if (type === "contact") {
      subject = `New Contact Form Submission - ${formData.subject}`;
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        
        <h3>Message</h3>
        <p>${formData.message}</p>
      `;
    } else if (type === "repair-quote") {
      subject = `New Repair Quote Request`;
      htmlContent = `
        <h2>New Repair Quote Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Vehicle Info:</strong> ${formData.vehicleInfo}</p>
        
        <h3>Description</h3>
        <p>${formData.description}</p>
        
        <p><em>Note: Photo attachment handling would be implemented here</em></p>
      `;
    }

    // Send email using Resend
    const toEmails = (process.env.RESEND_TO || "info@automotcentre.com").split(",").map(e => e.trim());

    await resend.emails.send({
      from: process.env.RESEND_FROM || "Auto MOT Centre <noreply@updates.automotcentre.com>",
      to: toEmails,
      subject: subject,
      html: htmlContent,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Auto MOT Centre <noreply@updates.automotcentre.com>",
      to: [formData.email],
      subject: "Booking Confirmation - Auto MOT Centre",
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Dear ${formData.fullName || formData.name},</p>
        <p>We have received your ${type === "mot" ? "MOT booking" : type === "appointment" ? "appointment" : "enquiry"} request.</p>
        <p>Our team will contact you shortly to confirm the details.</p>
        
        <h3>Contact Information</h3>
        <p>Phone: +44 020 8553 9112</p>
        <p>Mobile: +44 07949 102483</p>
        <p>Address: 4 Rectory Rd, London, E12 6JA</p>
        
        <p>Best regards,<br>Auto MOT Centre Team</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
