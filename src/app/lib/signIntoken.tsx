import jwt from 'jsonwebtoken';
/**
 * Generates an authentication token.
 *
 * @param {Object} payload - The data to be included in the token.
 * @returns {string} - The signed JWT.

export const generateAuthToken = (payload:any) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h', // Authentication token expiration time
  });
};
 */