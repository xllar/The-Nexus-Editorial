import nodemailer from 'nodemailer';

// Email sending function for newsletters using Nodemailer with SMTP
export const sendNewsletter = async (to: string, url: string, subject: string, html: string) => {
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

    // Mail options
    const mailOptions = {
      from: `"NexusEditorial" <${process.env.SENDER_EMAIL_ADDRESS}>`, 
      to, 
      subject, 
      html, 
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
