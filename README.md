# Storefront Backend Project

A Node.js + Express RESTful API for managing users, products, orders, and order items with PostgreSQL as the database.  
Includes authentication using JWT and password encryption with bcrypt.

# setup and database connection

# 1- Clone the repository

git clone https://github.com/Shorooqsousa56/storeBack.git

# 2- Install dependencies

npm install

# Dependencies

bcrypt ^6.0.0

body-parser ^1.20.3

db-migrate ^0.11.14

db-migrate-pg ^1.5.2

dotenv ^17.2.3

express ^4.21.2

jsonwebtoken ^9.0.2

pg ^8.16.3

typescript ^4.9.5

# Dev Dependencies

@types/bcrypt ^6.0.0

@types/express ^4.17.24

@types/jasmine ^3.10.18

@types/jsonwebtoken ^9.0.10

@types/pg ^7.14.11

cross-env ^10.1.0

dotenv-cli ^11.0.0

jasmine ^3.99.0

jasmine-spec-reporter ^6.0.0

jasmine-ts ^0.3.3

ts-node ^9.1.1

tsc-watch ^4.6.2

supertest: ^7.1.4

@types/supertest: ^6.0.3

# 3- Setup environment variables

create .env file

NODE_ENV=dev
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=store_front_db
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
SALT_ROUNDS=10
PEPPER=f1a3b5c9d8e2f7a1b4c6d8e0f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9
SECRET_KEY=your_secret_key

# 4- Run PostgreSQL in Docker

docker exec -it storefrontproj-postgres-1 psql -U your_db_user -d store_front_db

# run migration

npm migrate

# Running the Server & API Documentation

# 1- Run the Node.js Backend

npm build
npm start

# Testing

npm migratetest

npm test
