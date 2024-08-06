export const resetPasswordTemplate = (to: string, url: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  color: #0c2d4e;
                  margin: 0;
              }
              .content {
                  margin-bottom: 20px;
              }
              .content h2 {
                  color: #0c2d4e;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #fff;
                  background-color: #0c2d4e;
                  text-decoration: none;
                  border-radius: 4px;
              }
              .footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 14px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Newsroom</h1>
              </div>
              <div class="content">
                  <p>Hello ${to},</p>
                  <p>We received a request to reset your password. Please click the link below to create a new password:</p>
                  <a href="${url}" class="button">Reset Your Password</a>
                  <p>If you didn’t request this, you can safely ignore this email.</p>
              </div>
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Newsroom. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  