import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from "../models/users";
dotenv.config();

const secretKey=process.env.SECRET_KEY as string;
const blacklist =new Set<string>();

export function createToken(user:User):string{
    const payload={
        id:user.id,
        email:user.email,
        role:user.role
    }
    const token=jwt.sign(payload,secretKey,{expiresIn:"1h"});
    return token;

}

export function verifyToken(token:string): { role: string; id: number; email: string }|null{
    if (blacklist.has(token)) return null;
    try{    const decoded=jwt.verify(token,secretKey);
        return decoded as { role: string; id: number; email: string };;
    }catch{return null;}


}

export function removeToken(token:string):void{
    blacklist.add(token);
}