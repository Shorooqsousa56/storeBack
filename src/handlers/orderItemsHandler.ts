import  { Response , Request } from "express";
import { OrderItemsRepository } from "../repositories/orderItemsRepository";
import { errorHandler } from "../utils/errorHandler";
import { OrderRepository } from "../repositories/orderRepository";

const orderItemsRep=new OrderItemsRepository();
const orderRep=new OrderRepository();

export class OrderItemsHandler{

 async createOrderItem (req:Request,res:Response){
          try{
            const orderItem=await orderItemsRep.create(req.body);

            const order=await orderRep.getById(orderItem.order_id);
            if(!order){
               return res.status(404).json({message:"order not found"});
            }
            if(order.status==="cancelled"||order.status==="completed"){
               return res.status(400).json({message:"cannot add items to a cancelled or completed order"});
            }
             res.status(401).json(orderItem);
    
            }
            
            //i use unknown instead of any because its more safe
            catch(err:unknown){
                errorHandler(err,res);
    
            }
    
    
        }

        
                 async getAllOrderItems(req:Request,res:Response){
                          try{
                            const orderItems=await orderItemsRep.getAll();
                             res.status(200).json(orderItems);
                    
                            }
                             catch(err:unknown){
                             errorHandler(err,res);
                
                        }}

                 async getOrderItemsById (req:Request,res:Response){
                         try{
                            const id=parseInt(req.params.id);
                               if (isNaN(id)) {
                           return res.status(400).json({ message: 'id is required' });
                           }
                               const orderItems=await orderItemsRep.getById(id);
                            if(orderItems==null){ res.status(404).json({message:'order items not found!'});
                      }
                             res.status(200).json(orderItems);
                                                
                               }
                                                        
                              //i use unknown instead of any because its more safe
                              catch(err:unknown){
                                 errorHandler(err,res);              
                              }
                                                
                                                
                           }

                            async getItemsByOrder (req:Request,res:Response){
                         try{
                            const order_id=parseInt(req.params.id);
                               if (isNaN(order_id)) {
                           return res.status(400).json({ message: 'order_id is required' });
                           }
                               const orderItems=await orderItemsRep.getByOrder(order_id);
                            if(!orderItems || orderItems.length === 0){return res.status(404).json({message:'order items not found!'});
                      }


                             res.status(200).json(orderItems);
                                                
                               }
                                                        
                              //i use unknown instead of any because its more safe
                              catch(err:unknown){
                                 errorHandler(err,res);
                                                
                              }
                                                
                                                
                           }

                            async updateOrderItems(req:Request,res:Response){
                                           try{
                                               const id=parseInt(req.params.id);
                                                if (isNaN(id)) {
                                         return res.status(400).json({ message: 'id is required' });
                                       }
                                               
                                   
                                                const orderItems=await orderItemsRep.update(id,req.body);
                                                 if (!orderItems)
                                                 return res.status(404).json({ message: 'order item not found' });
                                   
                                                res.status(200).json(orderItems);
                                                
                                           } catch(err:unknown){
                                               errorHandler(err,res);
                                   
                                           }
                                   
                                       }
                        


}