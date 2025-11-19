import {pool} from '../config/db';
import { User } from '../models/users';
import { hashPassword } from '../utils/hashPassword';
import { isValidEmail } from '../utils/validEmail';

export class UserRepository{


async  create(user:User):Promise <User>{
const {first_name,last_name, email, password, role, active, created_at}=user;
const query =`insert into users (first_name,last_name, email, password, role, active, created_at) values ($1,$2,$3,$4,$5,$6,$7) returning *`;

const result = await pool.query(query,[first_name,last_name||null,email,password,role||'customer',active ?? true,created_at||new Date()]);
return result.rows[0];

}

async getAll():Promise<User[]>{

    const query=`select * from users where role='customer' order by id asc`;
    const result=await pool.query(query);
    return result.rows;


}

async getById(id:number):Promise<User | null>{
    
const query =`select * from users where id=$1`;
const result=await pool.query(query,[id]);
return result.rows[0] || null;
}

async getByEmail(email: string): Promise<User | null> {
    const query = 'select * from users where email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }


  //in this store users can't delete their account they can deactivate it .
  async deactivate (id:number):Promise<User | null>{
     const query=`update users set active=false where id=$1 returning *`;
     const result=await pool.query(query,[id]);
     return result.rows[0] || null;

  }

  async search(search:string):Promise<User[]>{
    const query=`select * from users where first_name ilike $1 or last_name ilike $1 or email ilike $1 order by id asc`;
    const result=await pool.query(query,[`%${search}%`]);
     return result.rows;
  }

  async update(id:number , fields_updated:Partial<User>):Promise<User |null>{
    const {first_name,last_name,active}=fields_updated;
  const query= `update users set 
  first_name=COALESCE($1, first_name),
  last_name=COALESCE($2, last_name),
   active = COALESCE($3, active)
   where id =$4 returning *

  `;
  const  result =await pool.query(query,[first_name,last_name,active,id]);
  return result.rows[0] ||null;

  }


  async updatePassword(id: number, password: string): Promise<User | null> {
  const hashedPassword = hashPassword(password);
  const query = 'update users set password = $1 where id = $2 returning *';
  const result = await pool.query(query, [hashedPassword, id]);
  return result.rows[0] || null;
 }  

 async updateEmail(id: number, email: string): Promise<User | null> {
  if (!isValidEmail(email)) throw new Error("Email is not valid");
  const checkEmail='select * from users where email=$1';
  const checkResult=await pool.query(checkEmail,[email]);
  if(checkResult.rows.length>0)throw new Error("email already exists");
  
  const query = 'update users set email = $1 where id = $2 returning *';
  const result = await pool.query(query, [email, id]);
  return result.rows[0] || null;
 }
    



}
