import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Email Transporter Helper
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn("SMTP configuration is incomplete.");
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, address, message, oilQuantity, oilUnit, to } = req.body;
  
  console.log("--- New Contact Form Submission (Vercel) ---");
  console.log(`To: ${to}`);
  console.log(`Name: ${name}`);

  const emailTransporter = getTransporter();

  if (emailTransporter) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || `"Agapure Website" <${process.env.SMTP_USER}>`,
        to: to,
        subject: `New Inquiry from ${name} - Agapure`,
        text: `
--- New Contact Form Submission ---
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address || 'N/A'}
Oil Quantity: ${oilQuantity} ${oilUnit}
Message: ${message}
-----------------------------------
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #008000; border-bottom: 2px solid #008000; padding-bottom: 10px;">New Inquiry from Agapure Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address || 'N/A'}</p>
            <p><strong>Oil Quantity:</strong> ${oilQuantity} ${oilUnit}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <strong>Message:</strong><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
              This inquiry was sent from the Agapure website contact form.
            </p>
          </div>
        `,
      };

      await emailTransporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } else {
    return res.status(200).json({ success: true, message: "Email received (SMTP not configured on server)" });
  }
}
