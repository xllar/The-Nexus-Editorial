import nodemailer from 'nodemailer';

// Email sending function using SMTP with Nodemailer
export const sendEmail = async (to,url, subject, template) => {
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
      html: template(to, url), 
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
