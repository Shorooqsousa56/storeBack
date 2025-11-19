import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const PEPPER=process.env.PEPPER;

export function confirmPassword(plainPassword:string,hashedPassword:string):boolean{
return bcrypt.compareSync(plainPassword+PEPPER, hashedPassword);

}

