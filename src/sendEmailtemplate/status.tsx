export const approvalEmailTemplate = (name: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
    <header style="background: linear-gradient(to right, #2c3e50, #3498db); padding: 1rem; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="color: #ecf0f1; font-size: 1.8em; margin: 0;">NexusEditorial</h1>
    </header>

    <div style="padding: 20px;">
      <h2 style="color: #2c3e50; text-align: center;">Congratulations, ${name}!</h2>
      <p style="font-size: 1.1em; color: #333;">
        We're thrilled to let you know that your story has        been approved and is now live on NexusEditorial! Thank you for your amazing contribution.
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="YOUR_STORY_URL" style="padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 4px; font-size: 1.1em;">
          View Your Story
        </a>
      </div>
    </div>

    <footer style="background-color: #ecf0f1; padding: 1rem; text-align: center; border-radius: 0 0 10px 10px;">
      <p style="color: #2c3e50; font-size: 1em; margin: 0;">
        Best regards,<br /><strong>The NexusEditorial Team</strong>
      </p>
    </footer>
  </div>
`;

export const declineEmailTemplate = (name: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
    <header style="background: linear-gradient(to right, #2c3e50, #3498db); padding: 1rem; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="color: #ecf0f1; font-size: 1.8em; margin: 0;">NexusEditorial</h1>
    </header>

    <div style="padding: 20px;">
      <h2 style="color: #2c3e50; text-align: center;">Hello ${name},</h2>
      <p style="font-size: 1.1em; color: #333;">
        Thank you for submitting your story to NexusEditorial. Unfortunately, after careful consideration, we have decided not to publish it at this time.
      </p>
      <p style="font-size: 1.1em; color: #333;">
        We encourage you to keep writing and submit again in the future. Thank you for your understanding.
      </p>
    </div>

    <footer style="background-color: #ecf0f1; padding: 1rem; text-align: center; border-radius: 0 0 10px 10px;">
      <p style="color: #2c3e50; font-size: 1em; margin: 0;">
        Best regards,<br /><strong>The NexusEditorial Team</strong>
      </p>
    </footer>
  </div>
`;
