import  express  from "express";
import { OrderHandler } from "../handlers/orderHandler";
import { authorization } from "../middlewares/authMiddleware";

export const orderRoute=express.Router();
const orderhandler=new OrderHandler();



orderRoute.post('/',authorization(["admin","customer"]),orderhandler.createOrder);
orderRoute.get('/',authorization(["admin","customer"]),orderhandler.getAllOrders);
orderRoute.get('/search',authorization(["admin","customer"]),orderhandler.searchOrders);
orderRoute.get('/:id',authorization(["admin","customer"]),orderhandler.getAllOrderById);
orderRoute.patch('/:id',authorization(["admin","customer"]),orderhandler.updateOrder);
orderRoute.patch('/:id/cancle',authorization(["admin","customer"]),orderhandler.cancelledProduct);

