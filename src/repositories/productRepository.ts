import {pool} from '../config/db';
import { Product } from '../models/products';
export class ProductRepository{
    async  create(product:Product):Promise <Product>{
    const {name,description,price,stock_balance,picture}=product;
    const query =`insert into products (name,description,price,stock_balance,picture) values ($1,$2,$3,$4,$5) returning *`;
    
    const result = await pool.query(query,[name,description,price,stock_balance ?? 0,picture]);
    return result.rows[0];
    
    }

    async getAll():Promise<Product[]>{
    
        const query=`select * from products order by id asc`;
        const result=await pool.query(query);
        return result.rows;
    
    
    }

    async getById(id:number):Promise<Product | null>{
        
    const query =`select * from products where id=$1`;
    const result=await pool.query(query,[id]);
    return result.rows[0] || null;
    
    
    }

    async update(id:number , fields_updated:Partial<Product>):Promise<Product |null>{
        const {name,description,price,stock_balance,picture}=fields_updated;
      const query= `update products set 
      name=COALESCE($1, name),
     description=COALESCE($2, description),
       price = COALESCE($3, price),
       stock_balance=COALESCE($4, stock_balance),
       picture=COALESCE($5, picture)
       where id =$6 returning *
    
      `;
      const  result =await pool.query(query,[name,description,price,stock_balance,picture,id]);
      return result.rows[0] ||null;
    
      }
    
     
       async search(search:string):Promise<Product[]>{
          const query=`select * from products where name ilike $1 or description ilike $1  order by id asc`;
          const result=await pool.query(query,[`%${search}%`]);
           return result.rows;
        }
      






}
