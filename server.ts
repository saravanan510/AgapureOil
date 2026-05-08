import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });
  }
  return transporter;
}

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
  const PORT = 3002;

  app.use(express.json());

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

    console.log("--- New Contact Form Submission ---");
    console.log(JSON.stringify(req.body, null, 2));

    const emailTransporter = getTransporter();

    if (emailTransporter) {
      try {
        await emailTransporter.sendMail({
          from:
            process.env.SMTP_FROM_EMAIL ||
            `"Agapure Website" <${process.env.SMTP_USER}>`,
          to,
          subject: `New Inquiry from ${name} - Agapure`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
              <h2 style="color: #008000; border-bottom: 2px solid #008000; padding-bottom: 10px;">New Inquiry from Agapure Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Product:</strong> ${productName || "N/A"}</p>
              <p><strong>Variant:</strong> ${productVariant || "N/A"}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Address:</strong> ${address || "N/A"}</p>
              <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #008000;">
                <strong>Message:</strong><br/>
                <div style="white-space: pre-wrap; font-style: italic; color: #555;">
                  ${(message || "No message provided").replace(/\n/g, "<br/>")}
                </div>
              </div>
            </div>
          `,
        });
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
      return res
        .status(200)
        .json({ success: true, message: "Email received (logged to console)" });
    }
  });

  // Always serve production build
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
