import {pool} from '../config/db';
import { OrderItems } from '../models/orderItems';
import { OrderRepository } from './orderRepository';

const orderRep=new OrderRepository();

export class OrderItemsRepository{

 async  create(orderItem:OrderItems):Promise <OrderItems>{


        const {order_id,product_id,quantity,price}=orderItem;
               const allOrderItem=`select * from order_items where order_id=$1 and product_id=$2`;
               const isExist=await pool.query(allOrderItem,[order_id,product_id]);
               if(isExist.rows.length > 0){throw new Error("item already exist in this order")};
        const query =`insert into order_items (order_id,product_id,quantity,price) values ($1,$2,$3,$4) returning *`;
        
        const result = await pool.query(query,[order_id,product_id,quantity,price]);
        return result.rows[0];
        
        }
    async getAll():Promise<OrderItems[]>{
                
                    const query=`select * from order_items order by id asc`;
                    const result=await pool.query(query);
                    return result.rows;
    
                }

       async getById(id:number):Promise<OrderItems | null>{
                          
                      const query =`select * from order_items where id=$1`;
                      const result=await pool.query(query,[id]);
                      return result.rows[0] || null;
                      
                      
                      }  

        async getByOrder(order_id:number):Promise<OrderItems[]>{
                      const query =`select * from order_items where order_id=$1`;
                      const result=await pool.query(query,[order_id]);
                      return result.rows;
                      }               
                      
          async update(id:number , fields_updated:Partial<OrderItems>):Promise<OrderItems |null>{
              const recentOrderItem=await this.getById(id);
              if(!recentOrderItem) throw new Error("Order item not available");

              const recentOrder=await  orderRep.getById(recentOrderItem.order_id);
              if(!recentOrder)throw new Error("order not found");

              if(recentOrder.status!=='pending')throw new Error("Cannot update items of completed or cancelled orders");
              const {quantity,price}=fields_updated;
              const query=`update order_items set 
            quantity=COALESCE($1, quantity),
            price=COALESCE($2, price)
            where id =$3 returning *`;    
              const  result =await pool.query(query,[quantity,price,id]);
              return result.rows[0] || null;

                    } 


}