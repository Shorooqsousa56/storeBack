import { userHandler } from "../handlers/usersHandler";
import  express  from "express";
import { authenticate, authorization } from "../middlewares/authMiddleware";
export const userRoute=express.Router();
const userhandler=new userHandler();

userRoute.get('/customer',authenticate,authorization(["admin"]),userhandler.getAllUsers);
userRoute.get('/Email',authenticate,authorization(["admin"]),userhandler.getUsersByEmail);
userRoute.get('/search',authenticate,authorization(["admin"]),userhandler.searchUsers);

userRoute.get('/:id',authenticate,authorization(["admin"]),userhandler.getUsersById);
userRoute.patch('/:id/deactive',authenticate,authorization(["admin","customer"]),userhandler.deactiveUser);
userRoute.patch('/:id/Email',authenticate,authorization(["admin","customer"]),userhandler.updateEmail);
userRoute.patch('/:id/Password',authenticate,authorization(["admin","customer"]),userhandler.updatePassword);
userRoute.patch('/:id',authenticate,authorization(["admin","customer"]),userhandler.updateUser);






