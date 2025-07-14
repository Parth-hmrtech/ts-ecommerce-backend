// src/utils/emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Transporter } from 'nodemailer';

dotenv.config();
dotenv.config({ path: '../.env' });

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('EMAIL_USER or EMAIL_PASS is not defined in the environment variables.');
}

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendOrderAcceptedEmail = async (toEmail: string, orderId: string): Promise<void> => {
  const mailOptions = {
    from: EMAIL_USER,
    to: toEmail,
    subject: `Your order from Ecommerce has been accepted`,
    text: `Hello,\n\nYour order with ID ${orderId} has been accepted.\n\nThank you for shopping with us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order accepted email sent to ${toEmail}`);
  } catch (error) {
    console.error('Failed to send order email:', error);
    throw new Error('Email could not be sent');
  }
};

export {
  sendOrderAcceptedEmail,
};
