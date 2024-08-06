import jwt from 'jsonwebtoken';

export const createActivationToken = (payload: object): string => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: '15m',
  });
};

export const CreateResetToken =(payload:any):string => {
  return jwt.sign(payload, process.env.RESET_TOKEN_SECRET as string,{
    expiresIn:'15mins'
  })
}
