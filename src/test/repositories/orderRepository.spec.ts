import '../helpers/reporter';
import {pool} from '../../config/db';
import { OrderRepository } from '../../repositories/orderRepository';
import { Order } from '../../models/orders';
import { User } from '../../models/users';
const orderRep=new OrderRepository();

describe("orderRepository",()=>{
  let  userId :number;
   beforeAll(async()=>{
   await pool.query(`delete from orders`);
      await pool.query(`delete from users`);

    

   

   })

   beforeEach(async()=>{
   await pool.query(`delete from orders`);
         await pool.query(`delete from users`);


         const user = await pool.query(`
      INSERT INTO users (first_name, email, password, active)
      VALUES ('test', 'test@test.com', '123456', true)
      RETURNING id
    `);
       userId = user.rows[0].id; 
   })

  
   afterAll(async ()=>{
 await pool.query(`delete from orders`);
      await pool.query(`delete from users`);

  });
   
 
  const testOrder:Order={
  "user_id": 0,
  "total_price": 150.50,
  "status": "pending"
}

  //testing create
  it("should create a new order",async ()=>{
    testOrder.user_id = userId;

   const order=await orderRep.create(testOrder);
   expect(order).toBeDefined();
   expect(order.status).toBe("pending");

  });

  //testing update

  it("should update order status",async ()=>{

    testOrder.user_id = userId;
   const order=await orderRep.create(testOrder);
   const updateOrder=await orderRep.update(order.id!,{status:"completed"});
   expect(updateOrder!.status).toBe("completed");

  });

  //testing update cancelled or completed
   it("should not update completed or cancelled orders user",async ()=>{
        testOrder.user_id = userId;

   const order=await orderRep.create(testOrder);
   const updateOrder=await orderRep.cancleOrder(order.id!);
  
     await expectAsync(orderRep.update(order.id!,{status:"pending"})).toBeRejectedWithError("Cancelled or completed orders cannot be updated");
  

  });

   //testing get all
   it("should return all orders",async ()=>{
    testOrder.user_id = userId;

    await orderRep.create(testOrder);
    await orderRep.create(testOrder);

     const orders=await orderRep.getAll();
     expect(orders.length).toBe(2);

  });

  //testing get by id
   it("should return order by id",async ()=>{
    testOrder.user_id = userId;

    const order=await orderRep.create(testOrder);
     const result=await orderRep.getById(order.id!);
   expect(result!.id).toBe(order.id);

  });

   //testing search
   it("should search order by status or created or price",async ()=>{
    testOrder.user_id = userId;

    await orderRep.create(testOrder);
     const result=await orderRep.search("pending");
   expect(result.length).toBeGreaterThan(0);

  });

  



  

})


