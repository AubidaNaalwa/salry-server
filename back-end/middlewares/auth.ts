import jwt from "jsonwebtoken"
import type {Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'
dotenv.config()

export interface AuthRequest extends Request {
  user?: string
}
const config = process.env;

const verifyToken = (req: AuthRequest, res:Response, next:NextFunction) => {
  const token = req.cookies?.token;
  if (!token || !config.TOKEN_KEY) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    if(typeof decoded === 'string' ) { 
      req.user = decoded;
    }else { 
      req.user = decoded.email;
    }
    if(!req.user) { 
      return res.status(403).send("A token is required for authentication");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default  verifyToken;