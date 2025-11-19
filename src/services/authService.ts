import { User } from "../models/users";
import { isValidEmail } from "../utils/validEmail";
import { hashPassword } from "../utils/hashPassword";
import { confirmPassword } from "../utils/confirmPassword";
import { UserRepository } from "../repositories/usersRepository";
import { createToken } from "../utils/token";
import { removeToken } from "../utils/token";
export class AuthService{
private userRep=new UserRepository();
async signup(user:User): Promise<User>{
  
    if(!isValidEmail(user.email)) throw new Error("email is not valid");

    const existingUser= await this.userRep.getByEmail(user.email);
    if(existingUser)throw new Error("email already Exist");
    const hashed=hashPassword(user.password);
    user.password=hashed;
    const newUser=await this.userRep.create(user);
    return newUser;
}

async login(user:User){
 const recentUser=await this.userRep.getByEmail(user.email);
 if(!recentUser)throw new Error("invalid email");

 const validPassword=confirmPassword(user.password,recentUser.password);
 if(!validPassword)throw new Error("invalid password");
 
 const token=createToken(recentUser);
 return {
    message:"login successful",
    token,
 };

}

async logout(token:string){
    removeToken(token);
    return { message: 'Logged out successfully' };

}


}