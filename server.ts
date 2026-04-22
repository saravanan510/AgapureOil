import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Transporter Helper (Lazy Initialization)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn("SMTP configuration is incomplete. Emails will only be logged to console.");
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, address, message, oilQuantity, oilUnit, to } = req.body;
    
    console.log("--- New Contact Form Submission ---");
    console.log(`To: ${to}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Address: ${address || 'N/A'}`);
    console.log(`Oil Quantity: ${oilQuantity} ${oilUnit}`);
    console.log(`Message: ${message}`);
    console.log("-----------------------------------");

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
        console.log("Email sent successfully!");
        return res.status(200).json({ success: true, message: "Email sent successfully" });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Failed to send email" });
      }
    } else {
      // Fallback if SMTP is not configured
      console.log("SMTP not configured. Email logged above.");
      return res.status(200).json({ success: true, message: "Email received (logged to server console)" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
