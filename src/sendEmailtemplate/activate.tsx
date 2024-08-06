
export const activateEmailTemplate = (to: string, url: string)=> {
  return `
    <p>Hello ${to},</p>
    <p>Thank you for signing up! Please click the link below to activate your account:</p>
    <a href="${url}">Activate Your Account</a>
    <p>If you didn't sign up for an account, you can ignore this email.</p>
  `;
};
