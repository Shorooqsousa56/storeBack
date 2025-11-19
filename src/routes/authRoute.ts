import { AuthHandler } from "../handlers/authHandler";
import { authenticate } from "../middlewares/authMiddleware";
import  express  from "express";

export const authRoute=express.Router();
const authhandler=new AuthHandler();


authRoute.post('/signup',authhandler.signup);
authRoute.post('/login',authhandler.login);
authRoute.post('/logout',authenticate,authhandler.logout);




