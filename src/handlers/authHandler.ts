import  { Response , Request } from "express";
import { errorHandler } from "../utils/errorHandler";
import { AuthService } from "../services/authService";

export class AuthHandler{
 private authService=new AuthService();

     signup = async (req:Request,res:Response)=>{
        try{
                    const order=await this.authService.signup(req.body);
                     res.status(201).json(order);
            
                    }
                    
                    //i use unknown instead of any because its more safe
                    catch(err:unknown){
                        errorHandler(err,res);
            
                    }
            

    }
    login=async  (req:Request,res:Response)=>{
        try{

           
            
        const result=await this.authService.login(req.body);
                     res.status(200).json(result);
            
                    }
                    
                    //i use unknown instead of any because its more safe
                    catch(err:unknown){
                        errorHandler(err,res);
            
                    }
            

    }
    logout=async  (req:Request,res:Response)=>{
        try{
                    const authHeader = req.headers.authorization!;
                    const token = authHeader.split(" ")[1];


                    const result=await this.authService.logout(token);
                     res.status(201).json(result);
            
                    }
                    
                    //i use unknown instead of any because its more safe
                    catch(err:unknown){
                        errorHandler(err,res);
            
                    }
            

    }

    
}


