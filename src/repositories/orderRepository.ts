import {pool} from '../config/db';
import { Order } from '../models/orders';

export class OrderRepository{

    async  create(order:Order):Promise <Order>{
        const {user_id,total_price,status}=order;
        const query =`insert into orders (user_id,total_price,status) values ($1,$2,$3) returning *`;
        
        const result = await pool.query(query,[user_id,total_price,status ?? 'pending']);
        return result.rows[0];
        
        }
    async getAll():Promise<Order[]>{
            
                const query=`select * from orders order by id asc`;
                const result=await pool.query(query);
                return result.rows;

            }
    async getById(id:number):Promise<Order | null>{
                    
                const query =`select * from orders where id=$1`;
                const result=await pool.query(query,[id]);
                return result.rows[0] || null;
                
                
                }
     async update(id:number , body:{status:string}):Promise<Order |null>{
      const {status}=body;
      const validStatuses=['cancelled','pending','completed'];
               if(! validStatuses.includes(status)){throw new Error ('Invalid status value');}
      const recentOrder=await this.getById(id);
               if(!recentOrder) throw new Error("Order not available");

               if(recentOrder.status==='cancelled' || recentOrder.status==='completed' ){
               throw new Error("Cancelled or completed orders cannot be updated");
               }
          const query= `update orders set 
          status=$1
           where id =$2 returning *
        
          `;
          const  result =await pool.query(query,[status,id]);
          return result.rows[0] ||null;
        
          }

          async cancleOrder(id:number):Promise<Order |null>{
               const recentOrder=await this.getById(id);
               if(!recentOrder) throw new Error("Order not available");
               if(recentOrder.status==='cancelled' || recentOrder.status==='completed' ){
               throw new Error("Cancelled or completed orders cannot be cancelled");

               }
            const query= `update orders set 
            status='cancelled'
            where id =$1 returning *
        
          `;

          const  result =await pool.query(query,[id]);
          return result.rows[0] || null;

          }

            async search(search:string):Promise<Order[]>{
              const query=`select * from orders where status ilike $1 or cast(total_price as text) ilike $1 or cast(created_at as text) ilike $1 order by id asc`;
              const result=await pool.query(query,[`%${search}%`]);
               return result.rows;
            }
            


}
