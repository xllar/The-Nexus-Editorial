// This function returns an email template as a string
export const storySubmissionTemplate = (name, url) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
    <header style="background: linear-gradient(to right, #2c3e50, #3498db); padding: 1rem; border-radius: 10px 10px 0 0; text-align: center;">
      <h1 style="color: #ecf0f1; font-size: 1.8em; margin: 0;">NexusEditorial</h1>
    </header>

    <div style="padding: 20px;">
      <h2 style="color: #2c3e50; text-align: center;">Story Submission Received</h2>
      <p style="font-size: 1.1em; color: #333;">
        Thank you, <strong>${name}</strong>, for your submission. We have received your story and will notify you once it is published.
      </p>
      <p style="font-size: 1em; color: #333;">
        You can view your submission <a href="${url}">here</a>.
      </p>
    </div>

    <footer style="background-color: #ecf0f1; padding: 1rem; text-align: center; border-radius: 0 0 10px 10px;">
      <p style="color: #2c3e50; font-size: 1em; margin: 0;">
        Best regards,<br /><strong>The NexusEditorial Team</strong>
      </p>
    </footer>
  </div>
`;
