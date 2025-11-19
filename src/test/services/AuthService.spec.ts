import '../helpers/reporter';

import {pool} from '../../config/db';
import {AuthService} from '../../services/authService';
import {User}from '../../models/users';

describe ('AuthService',()=>{
const authService=new AuthService();


 
  

  //sign up test

  //successfull sign up.
  it('should signup a new user successfully',async()=>{
    await pool.query('truncate table users restart identity cascade');
   const usertest:User ={

  "first_name": "shorooq",
  "email": "shorooq@gmail.com",
  "role":"admin",
  "password": "123456"};

  
  const user=await authService.signup(usertest);
  expect(user.email).toBe(usertest.email);
  expect(user.first_name).toBe(usertest.first_name);
  });

  //invalid email.
  it('should throw an error for duplicate email',async()=>{
     await pool.query('truncate table users restart identity cascade');
   const usertest:User ={
  "first_name": "shorooq",
  "email": "shorooq@gmail.com",
  "role":"admin",
  "password": "123456"};
      await authService.signup(usertest);

     await expectAsync(authService.signup(usertest)).toBeRejectedWithError("email already Exist");
  
  });
  it('should throw an error for invalid email',async()=>{
    await pool.query('truncate table users restart identity cascade');
   const usertest:User ={
  "first_name": "shorooq",
  "email": "shorooqgmail.com",
  "role":"admin",
  "password": "123456"};
     await expectAsync(authService.signup(usertest)).toBeRejectedWithError("email is not valid");
  
  });


  //login test

  //successfull login
  it('should login successfully and return token',async()=>{
  await pool.query('truncate table users restart identity cascade');
  const usertest:User ={
  "first_name": "shorooq",
  "email": "shorooq@gmail.com",
  "role":"admin",
  "password": "123456"};

  await authService.signup(usertest);

   
  const user=await authService.login({email:"shorooq@gmail.com",password:"123456"}as User);
  expect(user.token).toBeDefined();
  expect(user.message).toBe("login successful");
  });

  //login with invalid email
   it('should throw an error  for invalid email',async()=>{
     await pool.query('truncate table users restart identity cascade');
   const usertest:User ={
  "first_name": "shorooq",
  "email": "shorooq@gmail.com",
  "role":"admin",
  "password": "123456"};
  await authService.signup(usertest);
  await  expectAsync(authService.login({email:"sh@gmail.com",password:"123456"}as User)).toBeRejectedWithError("invalid email");
  });













})