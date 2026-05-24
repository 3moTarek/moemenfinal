import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  const emailUser = process.env.EMAIL_USER;
  const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

  if (!emailUser || !emailAppPassword) {
    throw new Error("Email environment variables are missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailAppPassword,
    },
  });

  await transporter.verify();

  await transporter.sendMail({
    from: `"Brown Shop" <${emailUser}>`,
    to: email,
    subject: "Your Brown Shop OTP Code",
    text: `Your OTP code is ${otp}. This code expires in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Brown Shop Verification</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });
}