import '../helpers/reporter';
import {pool} from '../../config/db';
import { ProductRepository } from '../../repositories/productRepository';
import { Product } from '../../models/products';
const productRep=new ProductRepository();

describe("productRepository",()=>{
   beforeAll(async()=>{
   await pool.query(`delete from products`);
   })

   beforeEach(async()=>{
   await pool.query(`delete from products`);
   })
   
 
  const testProduct:Product=
  {
  "name": "lap",
  "description": "Some description",
  "price": 120,
  "stock_balance": 50,
  "picture": "https://example.com/image.jpg"
}

  

  //testing create
  it("should create a new product",async ()=>{
   const product=await productRep.create(testProduct);
   expect(product).toBeDefined();
   expect(product.name).toBe(testProduct.name);
  });

  //testing update

  it("should update product",async ()=>{
   const product=await productRep.create(testProduct);
   const updateProduct=await productRep.update(product.id!,{name:"updated name",price:2000.00});
   expect(updateProduct!.name).toBe("updated name");
   expect(Number(updateProduct!.price)).toBe(2000.00);



  });

  //testing delete
   it("should delete product",async ()=>{
   const product=await productRep.create(testProduct);
   const deleteUser=await productRep.delete(product.id!);
   const afterDeleteUser=await productRep.getById(product.id!);
   expect(afterDeleteUser).toBeNull();

  });


  

})


