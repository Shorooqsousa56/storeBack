import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const PEPPER=process.env.PEPPER;
const SALT=Number(process.env.SALT_ROUNDS ?? 10);

export  function hashPassword(password:string):string{

    const passwordHashed=bcrypt.hashSync(password+PEPPER,
    SALT);
    return  passwordHashed;


}