import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, reg, date, notes, cart, total } = body;

    const itemsHtml = cart
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            <strong>${item.tyre.brand} ${item.tyre.model}</strong><br>
            <span style="font-size: 12px; color: #666;">${item.tyre.width}/${item.tyre.profile}R${item.tyre.rim} ${item.tyre.season}</span>
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">£${(item.tyre.price * item.qty).toFixed(2)}</td>
        </tr>
      `)
      .join("");

    const emailSubject = `New Tyre Order Enquiry — ${name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background: #1565c0; padding: 20px;">
          <h2 style="color: white; margin: 0;">🛒 New Tyre Enquiry</h2>
        </div>
        <div style="padding: 20px; background: #fff;">
          <h3 style="color: #374151; margin-top: 0;">Customer Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 4px 0; color: #6b7280; width: 140px;">Name:</td><td style="font-weight: bold; color: #111827;">${name}</td></tr>
            <tr><td style="padding: 4px 0; color: #6b7280;">Email:</td><td><a href="mailto:${email}" style="color: #1565c0;">${email}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #6b7280;">Phone:</td><td>${phone}</td></tr>
            <tr><td style="padding: 4px 0; color: #6b7280;">Vehicle Reg:</td><td style="font-family: monospace; background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${reg || "Not provided"}</td></tr>
            <tr><td style="padding: 4px 0; color: #6b7280;">Preferred Date:</td><td>${date || "Flexible"}</td></tr>
          </table>

          <h3 style="color: #374151;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f9fafb; text-align: left;">
                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Tyre</th>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">Qty</th>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Est. Total (excl. fitting)</td>
                <td style="padding: 12px; text-align: right; font-weight: bold; color: #1565c0;">£${Number(total).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          ${notes ? `
            <h3 style="color: #374151;">Additional Notes</h3>
            <p style="background: #f9fafb; padding: 12px; border-radius: 6px; color: #4b5563; margin: 0;">${notes}</p>
          ` : ""}
          
          <p style="color: #ef4444; font-size: 13px; margin-top: 20px;">* This is an enquiry, not a confirmed paid order. Please contact the customer to confirm stock and booking.</p>
        </div>
      </div>
    `;

    // Send using Resend
    const toEmails = (process.env.RESEND_TO || "info@automotcentre.com").split(",").map(e => e.trim());
    
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Auto MOT Centre <noreply@automotcentre.com>",
      to: toEmails,
      replyTo: email, 
      subject: emailSubject,
      html: htmlContent,
    });

    // Send confirmation to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Auto MOT Centre <noreply@automotcentre.com>",
      to: [email],
      subject: "We received your tyre enquiry — Auto MOT Centre",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background: #1565c0; padding: 20px;">
            <h2 style="color: white; margin: 0;">Thanks, ${name}!</h2>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="color: #374151;">We've received your enquiry for <strong>${cart.length} item(s)</strong>.</p>
            <p style="color: #374151;">One of our team will check stock availability and call you shortly at <strong>${phone}</strong> to confirm your booking.</p>
            
            <h3 style="color: #374151; font-size: 16px;">What you enquired about:</h3>
            <div style="background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; overflow: hidden;">
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
             </div>
             <p style="text-align: right; font-weight: bold; padding: 8px;">Est. Total: £${Number(total).toFixed(2)}</p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #6b7280; font-size: 14px;">📞 <a href="tel:+442085539112" style="color: #1565c0;">020 8553 9112</a> &nbsp;|&nbsp; 📍 4 Rectory Rd, London, E12 6JA</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Shop Enquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
