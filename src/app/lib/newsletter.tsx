import nodemailer from 'nodemailer';

// Email sending function for newsletters using Nodemailer with SMTP
export const sendNewsletter = async (to: string, url: string, subject: string, html: string) => {
  try {
    // Create reusable transporter object using SMTP
    const smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Host from env
      port: parseInt(process.env.SMTP_PORT, 10) || 587, // Port from env
      secure: false, // Set 'true' for port 465
      auth: {
        user: process.env.SMTP_USER, // Username from env
        pass: process.env.SMTP_PASSWORD, // Password from env
      },
    });

    // Mail options
    const mailOptions = {
      from: `"The Newsroom" <${process.env.SENDER_EMAIL_ADDRESS}>`, // Sender address
      to, // Recipient email
      subject, // Subject line
      html, // HTML content
    };

    // Send email
    const result = await smtpTransport.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
