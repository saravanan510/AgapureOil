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
      console.warn(
        "SMTP configuration is incomplete. Emails will only be logged to console.",
      );
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
      // Increase timeout for slow connections
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });
  }
  return transporter;
}

// Verify connection on startup to catch errors early
async function verifySMTP() {
  const t = getTransporter();
  if (t) {
    try {
      await t.verify();
      console.log("SMTP Connection verified successfully");
    } catch (error) {
      console.error("SMTP Verification failed:", error);
    }
  }
}
verifySMTP();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const {
      name,
      email,
      phone,
      address,
      message,
      productName,
      productVariant,
      to,
    } = req.body;

    console.log("--- New Contact Form Submission Received ---");
    console.log("Full Body Content:", JSON.stringify(req.body, null, 2));
    console.log(`To: ${to}`);
    console.log(`Name: ${name}`);
    console.log(`Product: ${productName || "Not Selected"}`);
    console.log(`Size/Variant: ${productVariant || "Not Selected"}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Address: ${address || "N/A"}`);
    console.log(`Message: ${message || "(Empty message)"}`);
    console.log("-----------------------------------");

    const emailTransporter = getTransporter();

    if (emailTransporter) {
      try {
        const mailOptions = {
          from:
            process.env.SMTP_FROM_EMAIL ||
            `"Agapure Website" <${process.env.SMTP_USER}>`,
          to: to,
          subject: `New Inquiry from ${name} - Agapure`,
          text: `
--- New Contact Form Submission ---
Name: ${name}
Product Selected: ${productName || "N/A"}
Size/Variant: ${productVariant || "N/A"}
Email: ${email}
Phone: ${phone}
Address: ${address || "N/A"}
Message: ${message || "No message provided"}
-----------------------------------
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
              <h2 style="color: #008000; border-bottom: 2px solid #008000; padding-bottom: 10px;">New Inquiry from Agapure Website</h2>
              <div style="margin-bottom: 15px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Product Selected:</strong> <span style="color: #d11; font-weight: bold;">${productName || "N/A"}</span></p>
                <p><strong>Size/Variant:</strong> <span style="color: #d11; font-weight: bold;">${productVariant || "N/A"}</span></p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address || "N/A"}</p>
              </div>
              
              <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #008000; border-radius: 5px;">
                <strong style="display: block; margin-bottom: 10px; font-size: 16px;">Message From Customer:</strong>
                <div style="white-space: pre-wrap; font-style: italic; color: #555;">
                  ${(message || "No message provided").replace(/\n/g, "<br/>")}
                </div>
              </div>
              
              <p style="margin-top: 30px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 15px;">
                This inquiry was generated from the Agapure official website contact form.
              </p>
            </div>
          `,
        };

        await emailTransporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        return res
          .status(200)
          .json({ success: true, message: "Email sent successfully" });
      } catch (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to send email" });
      }
    } else {
      // Fallback if SMTP is not configured
      console.log("SMTP not configured. Email logged above.");
      return res
        .status(200)
        .json({
          success: true,
          message: "Email received (logged to server console)",
        });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
