import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, template) => {
  try {
    const smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"NexusEditorial" <${process.env.SENDER_EMAIL_ADDRESS}>`,
      to,
      subject,
      html: template(),
    };

    const result = await smtpTransport.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
