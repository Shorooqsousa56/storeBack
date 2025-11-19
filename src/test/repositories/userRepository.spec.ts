import '../helpers/reporter';
import {pool} from '../../config/db';
import { UserRepository } from '../../repositories/usersRepository';
import {User}from '../../models/users';

const userRep=new UserRepository();

describe("userRepository",()=>{
   beforeAll(async()=>{
   await pool.query(`delete from users`);
   })

   beforeEach(async()=>{
   await pool.query(`delete from users`);
   })
   
 
  const testUser:User={
  "first_name": "shorooq",
   "last_name": "shorooq",
  "email": "shorooq@gmail.com",
  "role":"admin",
  "password": "123456",
  "active":true,
  "created_at":new Date(),
  }

  //testing create
  it("should create a new user",async ()=>{
   const user=await userRep.create(testUser);
   expect(user).toBeDefined();
   expect(user.email).toBe("shorooq@gmail.com");

  });

  //testing update

  it("should update email",async ()=>{
   const user=await userRep.create(testUser);
   const updateUser=await userRep.updateEmail(user.id!,"new@gmail.com");
   expect(updateUser!.email).toBe("new@gmail.com");

  });

  //testing deactivate
   it("should deactive user",async ()=>{
   const user=await userRep.create(testUser);
   const updateUser=await userRep.deactivate(user.id!);
   expect(updateUser!.active).toBe(false);

  });


  

})


