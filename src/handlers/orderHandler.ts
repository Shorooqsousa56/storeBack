import  { Response , Request } from "express";
import { OrderRepository } from "../repositories/orderRepository";
import { errorHandler } from "../utils/errorHandler";

const orderRep=new OrderRepository();

export class OrderHandler{

    async createOrder (req:Request,res:Response){
          try{
            const order=await orderRep.create(req.body);
             res.status(500).json(order);
    
            }
            
            //i use unknown instead of any because its more safe
            catch(err:unknown){
                errorHandler(err,res);
    
            }
    
    
        }

         async getAllOrders(req:Request,res:Response){
                  try{
                    const order=await orderRep.getAll();
                     res.status(200).json(order);
            
                    }
                     catch(err:unknown){
                     errorHandler(err,res);
        
                }}

                 async getAllOrderById (req:Request,res:Response){
                              try{
                                const id=parseInt(req.params.id);
                                if (isNaN(id)) {
                              return res.status(400).json({ message: 'id is required' });
                            }
                                const order=await orderRep.getById(id);
                                if(order==null){ res.status(404).json({message:'order not found!'});
                        }
                                 res.status(200).json(order);
                        
                                }
                                
                                //i use unknown instead of any because its more safe
                                catch(err:unknown){
                                   errorHandler(err,res);
                        
                                }
                        
                        
                            }

                               async updateOrder(req:Request,res:Response){
                                            try{
                                                const id=parseInt(req.params.id);
                                                 if (isNaN(id)) {
                                          return res.status(400).json({ message: 'id is required' });
                                        }
                                                
                                    
                                                 const order=await orderRep.update(id,req.body);
                                                  if (!order)
                                                  return res.status(404).json({ message: 'order not found' });
                                    
                                                 res.status(200).json(order);
                                                 
                                            } catch(err:unknown){
                                                errorHandler(err,res);
                                    
                                            }
                                    
                                        }

                       async cancelledProduct(req:Request,res:Response){
                                       try{
                                           const id=parseInt(req.params.id);
                                            if (isNaN(id)) {
                                     return res.status(400).json({ message: 'id is required' });
                                   }
                                           
                               
                                            const order=await orderRep.cancleOrder(id);
                                             if (!order)
                                             return res.status(404).json({ message: 'order not found' });
                               
                                            res.status(200).json({ message: 'order cancelled successfully', cancelled: order });
                                            
                                       } catch(err:unknown){
                                            errorHandler(err,res);
                               
                                       }
                               
                                   }

                                   async searchOrders(req:Request,res:Response){
                                               
                                                       try{
                                                           const search= req.query.q as string;
                                                           if (!search)
                                                       return res.status(400).json({ message: 'Search is required' });
                                               
                                                           const orders=await orderRep.search(search);
                                                           res.status(200).json(orders);
                                               
                                                       } catch(err:unknown){
                                                           errorHandler(err,res);
                                               
                                                       }
                                               
                                                   }




}

