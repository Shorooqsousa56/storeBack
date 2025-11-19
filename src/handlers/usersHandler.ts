import  { Response , Request } from "express";
import { UserRepository } from "../repositories/usersRepository";
import { errorHandler } from "../utils/errorHandler";

const userRep=new UserRepository();

export class userHandler{

    async createUser (req:Request,res:Response){
      try{
        const user=await userRep.create(req.body);
         res.status(201).json(user);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
            errorHandler(err,res);

        }


    }
     async getAllUsers (req:Request,res:Response){
      try{
        const user=await userRep.getAll();
         res.status(200).json(user);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
             errorHandler(err,res);
        }


    }
     async getUsersById (req:Request,res:Response){
      try{
        const id=parseInt(req.params.id);
        if (isNaN(id)) {
      return res.status(400).json({ message: 'id is required' });
    }
        const user=await userRep.getById(id);
        if(user==null){  return res.status(404).json({message:'user not found!'});
}
         res.status(200).json(user);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
              errorHandler(err,res);


        }


    }
     async getUsersByEmail (req:Request,res:Response){
      try{
        const email=req.query.email as string;
        if (!email) {
      return res.status(400).json({ message: 'email is required' });
       }
        const user=await userRep.getByEmail(email);
        if(user==null){ return res.status(404).json({message:'user not found!'});
}
         res.status(200).json(user);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
             errorHandler(err,res);


        }


    }

    async searchUsers(req:Request,res:Response){

        try{
            const search= req.query.q as string;
            if (!search)
        return res.status(400).json({ message: 'Search is required' });

            const users=await userRep.search(search);
            res.status(200).json(users);

        } catch(err:unknown){
            errorHandler(err,res);


        }

    }
    async deactiveUser(req:Request,res:Response){
       try{
        const id=parseInt(req.params.id);
        if (isNaN(id)) {
      return res.status(400).json({ message: 'id is required' });
    }

        const user=await userRep.deactivate(id);
        if(user==null){return res.status(404).json({message:'user not found!'});   }
         const { role: userRole, email: userEmail } = req.locals!.payload!;


         if(userRole==='customer'&&user.email!==userEmail){
            return res.status(404).json({message:'access denied'}); 
         }

          if(userRole==='admin'&& user.role==='admin' &&user.email!==userEmail){
            return res.status(404).json({message:'admin cannot deactivate other admins'}); 
         }


        
         res.status(200).json(user);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
            errorHandler(err,res);


        }

    }

    async updateEmail(req:Request,res:Response){
        try{
            const id=parseInt(req.params.id);
             if (isNaN(id)) {
      return res.status(400).json({ message: 'id is required' });
    }

            const {  id:userId  } = req.locals!.payload!;
             if(userId!==id) return res.status(404).json({ message: 'access denied cannot update email' });

            const {email}=req.body
           if (!email) {
             return res.status(400).json({ message: 'email is required' });}

             const user=await userRep.updateEmail(id,email);
              if (!user)
              return res.status(404).json({ message: 'User not found' });
             
            

             res.status(200).json(user);
             
        } catch(err:unknown){
            errorHandler(err,res);


        }

    }

    async updatePassword(req:Request,res:Response){
        try{
            const id=parseInt(req.params.id);
             if (isNaN(id)) {
      return res.status(400).json({ message: 'id is required' });
    }

    
              const {  id:userId  } = req.locals!.payload!;
             if(userId!==id) return res.status(404).json({ message: 'access denied cannot update password' });
            
            const {Password}=req.body
           if (!Password) {
             return res.status(400).json({ message: 'password is required' });}

             const user=await userRep.updatePassword(id,Password);
              if (!user)
              return res.status(404).json({ message: 'User not found' });


             res.status(200).json(user);
             
        } catch(err:unknown){
            errorHandler(err,res);


        }

    }

     async updateUser(req:Request,res:Response){
        try{
            const id=parseInt(req.params.id);
             if (isNaN(id)) {
      return res.status(400).json({ message: 'id is required' });
    }
      const {  id:userId  } = req.locals!.payload!;
             if(userId!==id) return res.status(404).json({ message: 'access denied cannot update user' });
            

             const user=await userRep.update(id,req.body);
              if (!user)
              return res.status(404).json({ message: 'User not found' });

            

             res.status(200).json(user);
             
        } catch(err:unknown){
            errorHandler(err,res);


        }

    }





}