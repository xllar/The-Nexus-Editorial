// newsletterTemplate.ts

export const newsletterTemplate = (content: string) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h1 style="color: #333;">Welcome to our Newsletter!</h1>
        <p style="color: #555;">
          Thank you for subscribing to our newsletter! You will now receive the latest updates.
        </p>
        <div>
          ${content}
        </div>
        <footer style="margin-top: 20px; color: #777;">
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The Newsroom Team</p>
        </footer>
      </div>
    `;
  };
  