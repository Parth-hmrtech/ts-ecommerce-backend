// src/utils/emailService.ts
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '../.env' }); // optional if already configured at root

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('EMAIL_USER or EMAIL_PASS is not set in the environment variables.');
}

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (newPassword: string, email: string): Promise<void> => {
  console.log("Sending password reset email...");

  const mailOptions = {
    from: `"Your Ecommerce Password" <${EMAIL_USER}>`,
    to: email,
    subject: 'Your New Password',
    text: `Your password has been reset. Your new password is: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email.');
  }
};

export {
  sendEmail
};
