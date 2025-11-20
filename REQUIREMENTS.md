# API Requirements

# Project Requirements & API Documentation

## Database Schema

### **users**

- id: SERIAL PRIMARY KEY
- first_name: VARCHAR NOT NULL
- last_name: VARCHAR NULLABLE
- email: VARCHAR NOT NULL UNIQUE
- password: VARCHAR NOT NULL (bcrypt encrypted)
- role: VARCHAR DEFAULT 'customer'
- active: BOOLEAN DEFAULT TRUE
- created_at: TIMESTAMP DEFAULT NOW()

### **products**

- id: SERIAL PRIMARY KEY
- name: VARCHAR NOT NULL
- description: TEXT
- price: NUMERIC(10,2) NOT NULL
- stock_balance: INTEGER DEFAULT 0
- created_at: TIMESTAMP DEFAULT NOW()
- updated_at: TIMESTAMP DEFAULT NOW()

### **orders**

- id: SERIAL PRIMARY KEY
- user_id: INTEGER REFERENCES users(id)
- total_price: NUMERIC(10,2) NOT NULL
- status: VARCHAR(50) DEFAULT 'pending'
- created_at: TIMESTAMP DEFAULT NOW()

### **order_items**

- id: SERIAL PRIMARY KEY
- order_id: INTEGER REFERENCES orders(id)
- product_id: INTEGER REFERENCES products(id)
- quantity: INTEGER NOT NULL DEFAULT 1
- price: NUMERIC(10,2) NOT NULL

---

## API Routes

### Users

| Method | Endpoint              | Description                          | Access |
| ------ | --------------------- | ------------------------------------ | ------ |
| POST   | `/auth/signup`        | Signup new user                      | Public |
| POST   | `/auth/login`         | Login user                           | Public |
| POST   | `/auth/logout`        | Logout user                          | Public |
| GET    | `/users/customer`     | Get all customers                    | Admin  |
| GET    | `/users/:id`          | Get user by ID                       | Admin  |
| GET    | `/users/Email?email=` | Get user by email                    | Admin  |
| GET    | `/users/search?q=`    | Search user by name/email            | Admin  |
| PATCH  | `/users/:id/deactive` | Deactivate user                      | Both   |
| PATCH  | `/users/:id/Email`    | Update email                         | Both   |
| PATCH  | `/users/:id/Password` | Update password                      | Both   |
| PATCH  | `/users/:id`          | Update first_name, last_name, active | Both   |

### Products

| Method | Endpoint           | Description        | Access |
| ------ | ------------------ | ------------------ | ------ |
| POST   | `/products`        | Create new product | Admin  |
| GET    | `/products`        | Get all products   | Both   |
| GET    | `/products/:id`    | Get product by ID  | Both   |
| GET    | `/products/search` | Search products    | Both   |
| PATCH  | `/products/:id`    | Update product     | Admin  |

### Orders

| Method | Endpoint             | Description           | Access |
| ------ | -------------------- | --------------------- | ------ |
| POST   | `/orders`            | Create new order      | Both   |
| GET    | `/orders`            | Get all orders        | Both   |
| GET    | `/orders/:id`        | Get order by ID       | Both   |
| PATCH  | `/orders/:id`        | Update order (status) | Both   |
| PATCH  | `/orders/:id/cancle` | Cancel order          | Both   |
| GET    | `/orders/search`     | Search orders         | Both   |

### Order Items

| Method | Endpoint                | Description                   | Access |
| ------ | ----------------------- | ----------------------------- | ------ |
| POST   | `/orderItems`           | Create order item             | Both   |
| GET    | `/orderItems`           | Get all order items           | Both   |
| GET    | `/orderItems/:id`       | Get order item by ID          | Both   |
| PATCH  | `/orderItems/order/:id` | Update quantity/price of item | Both   |
| GET    | `/orderItems/order/:id` | Get all items for an order    | Both   |
