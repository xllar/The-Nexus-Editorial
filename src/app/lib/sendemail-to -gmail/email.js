import nodemailer from 'nodemailer';

// Email sending function using SMTP with Nodemailer
export const sendEmail = async (to,url, subject, template) => {
  try {
    // Create reusable transporter object using SMTP
    const smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // SMTP host from env
      port: parseInt(process.env.SMTP_PORT, 10) || 587, // SMTP port (default 587)
      secure: false, // Use true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username from env
        pass: process.env.SMTP_PASSWORD, // SMTP password from env
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Newsroom" <${process.env.SENDER_EMAIL_ADDRESS}>`, // Sender address from env
      to, // Recipient email
      subject, // Email subject
      html: template(to, url), // HTML email content from template
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
