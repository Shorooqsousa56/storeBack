import '../helpers/reporter';
import {pool} from '../../config/db';
import { OrderItemsRepository } from '../../repositories/orderItemsRepository';
import {User}from '../../models/users';
import { OrderItems } from '../../models/orderItems';
import { Product } from '../../models/products';
import { Order } from '../../models/orders';
import { OrderRepository } from '../../repositories/orderRepository';
import { ProductRepository } from '../../repositories/productRepository';


const productRep=new ProductRepository();
const orderItemRep=new OrderItemsRepository();
const orderRep=new OrderRepository();

describe("OrderItemsRepository",()=>{
    let  userId :number;
    let  orderId :number;
    let  productId :number;

   beforeAll(async()=>{
    await pool.query(`delete from order_items`);
    await pool.query(`delete from orders`);
       await pool.query(`delete from products`);

   await pool.query(`delete from users`);

   
         const user = await pool.query(`
      INSERT INTO users (first_name, email, password, active)
      VALUES ('test', 'test@test.com', '123456', true)
      RETURNING id
    `);
       userId = user.rows[0].id; 
 
        const order = await pool.query(`
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, 200, 'pending')
      RETURNING id
    `, [userId]);
    orderId = order.rows[0].id;


    const product = await pool.query(`
      INSERT INTO products (name, description, price, stock_balance, picture)
      VALUES ('Product A', 'Description', 100, 10, 'pic.jpg')
      RETURNING id
    `);
    productId = product.rows[0].id;

   })

   beforeEach(async()=>{
   await pool.query(`delete from order_items`);
   })
    afterAll(async ()=>{
              await pool.query(`delete from order_items`);
 await pool.query(`delete from orders`);
      await pool.query(`delete from users`);
      await pool.query(`delete from products`);
            


  });
   
 
   
 
  const testItem:OrderItems=
  {
  "order_id": 0,
  "product_id": 0,
  "quantity": 3,
  "price": 50
}
 

  //testing create
  it("should create a new order item",async ()=>{
        testItem.order_id = orderId;
    testItem.product_id = productId;

   const item=await orderItemRep.create(testItem);
   expect(item).toBeDefined();
   expect(item.quantity).toBe(3);
    expect(Number(item.price)).toBe(50);



  });

  //testing update

  it("should throw error if item already exists in order",async ()=>{
     testItem.order_id = orderId;
    testItem.product_id = productId;

   const item=await orderItemRep.create(testItem);
    await expectAsync(orderItemRep.create(testItem)).toBeRejectedWithError("item already exist in this order");

  });

  //testing deactivate
   it("should update order item ",async ()=>{
     testItem.order_id = orderId;
    testItem.product_id = productId;

   const item=await orderItemRep.create(testItem);
   const updateItem=await orderItemRep.update(item.id!,{quantity:5,price:200});
   expect(updateItem!.quantity).toBe(5);
       expect(Number(updateItem!.price)).toBe(200);


  });


  

})


