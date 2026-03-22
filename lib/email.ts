import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendSupportEmail(subject: string, html: string, attachments: { filename: string; path: string }[] = []) {
  if (!process.env.SMTP_USER) return;
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'support@studyassist.ru',
    subject,
    html,
    attachments
  });
}

export async function sendUserEmail(to: string, subject: string, html: string) {
  if (!process.env.SMTP_USER) return;
  await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html });
}
