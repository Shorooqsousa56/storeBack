/* creating users table  */
CREATE TABLE users (id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100),
email VARCHAR(150) UNIQUE NOT NULL ,
password VARCHAR(100) NOT NULL,
role VARCHAR(100) DEFAULT 'customer',
active BOOLEAN DEFAULT TRUE ,
created_at TIMESTAMP DEFAULT NOW()
 )