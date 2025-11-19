import  express  from "express";
import { OrderItemsHandler } from "../handlers/orderItemsHandler";
import { authorization } from "../middlewares/authMiddleware";


export const orderItemsRoute=express.Router();
const orderItemshandler=new OrderItemsHandler();
orderItemsRoute.post('/',authorization(["admin","customer"]),orderItemshandler.createOrderItem);
orderItemsRoute.get('/',authorization(["admin","customer"]),orderItemshandler.getAllOrderItems);
orderItemsRoute.get('/:id',authorization(["admin","customer"]),orderItemshandler.getOrderItemsById);
orderItemsRoute.get('/order/:id',authorization(["admin","customer"]),orderItemshandler.getItemsByOrder);
orderItemsRoute.patch('/order/:id',authorization(["admin","customer"]),orderItemshandler.updateOrderItems);




