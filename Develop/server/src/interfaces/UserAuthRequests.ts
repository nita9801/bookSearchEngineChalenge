import type { Request } from 'express';
import type IJwtPayload from './JWTPayLoads.js';

export default interface IUserAuthRequest extends Request { 
  user: IJwtPayload
}