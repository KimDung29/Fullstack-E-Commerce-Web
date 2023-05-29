
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { VerifyErrors } from 'jsonwebtoken';
import createError from "../utils/createError";

export interface CustomRequest extends Request {
  userId?: string;
  isSeller?: string;
}

export const verifyToken =(req:CustomRequest, res: Response, next: NextFunction) => {

  // check authorization  
  const token = req.cookies.accessToken;
  if(!token) next(createError(401,'You are not authenticated!'))

  jwt.verify(token, process.env.JSON_KEY as string, (err:VerifyErrors | null, payload:any) => {
   if(err) next(createError(403, 'Token is not valid!'))
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    
    next()
  });
}