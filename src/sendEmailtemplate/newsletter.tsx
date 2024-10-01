export const newsletterTemplate = (content: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
      <header style="background: linear-gradient(to right, #2c3e50, #3498db); padding: 1rem; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: #ecf0f1; font-size: 1.8em; margin: 0;">NexusEditorial</h1>
      </header>

      <div style="padding: 20px;">
        <h2 style="color: #2c3e50;">Welcome to our Newsletter!</h2>
        <p style="font-size: 1.1em; color: #333;">
          Thank you for subscribing to our newsletter! You will now receive the latest updates.
        </p>
        <div style="margin-top: 20px;">
          ${content}
        </div>
      </div>

      <footer style="background-color: #ecf0f1; padding: 1rem; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="color: #2c3e50; font-size: 1em; margin: 0;">
          Best regards,<br /><strong>The NexusEditorial Team</strong>
        </p>
      </footer>
    </div>
  `;
};
