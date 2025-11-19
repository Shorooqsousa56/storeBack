# Storefront Backend Project

A Node.js + Express RESTful API for managing users, products, orders, and order items with PostgreSQL as the database.  
Includes authentication using JWT and password encryption with bcrypt.

# setup and database connection

# 1- Clone the repository

git clone https://github.com/Shorooqsousa56/storeBack.git

# 2- Install dependencies

npm install

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
