import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = async ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization;
  let user = null;
  console.log('AUTH HEADER', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('TOKEN', token);
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      user = jwt.verify(token, secretKey) as JwtPayload;
      console.log('USER', user);
    } catch (err) {
      console.error(err);
    }
  }

  return { user };
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};