import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { emails, companyName } = await req.json();

  if (!emails || !Array.isArray(emails) || emails.length === 0 || !companyName) {
    return NextResponse.json({ message: "Missing required fields: emails array and companyName are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const templatePath = path.join(process.cwd(), 'public', 'templates', 'sponsorship.html');
  
  try {
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const sendPromises = emails.map(email => {
      let htmlContent = htmlTemplate.replace(/{{companyName}}/g, companyName);

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Sponsorship Opportunity at ELVION Hackathon at RMD Sinhgad Technical Institute for ${companyName}`,
        html: htmlContent,
        cc: ['vivekjpatil1357@gmail.com']
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ message: "Emails sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ message: "Failed to send emails." }, { status: 500 });
  }
}
