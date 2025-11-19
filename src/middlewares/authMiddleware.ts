import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";

export function authenticate(req:Request,res:Response,next:NextFunction){
const authHeader = req.headers.authorization;

if(!authHeader)return res.status(401).json({message:"not registered"});

const token = authHeader.split(" ")[1];
const decoded=verifyToken(token);

if(!decoded) 
return res.status(401).json({message:"invalid or expired token"});

req.locals = {
    token,
    payload: decoded
  };
  
next();

}

export function authorization(roles:string[]){
return (req:Request,res:Response,next:NextFunction)=>{
    try{
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];
    const decoded=verifyToken(token) as JwtPayload & { role: string; id: number; email: string };;
    if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
 
    }catch{
        return res.status(401).json({ message: "invalid token" });
    }
   

}

   

}