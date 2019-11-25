DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INTEGER (10) auto_increment NOT NULL,
  name VARCHAR (100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (10,4) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  primary key (id)
);

Insert INTO products
(name,department_name,price,stock_quantity)
 VALUES('Apple','Fruits',1.00,100), ('Pear','Fruits',1.00, 50),('The Office, Collection', 'Electronics', 50.00,10),('Mortal Kombat 11','Electronics',80.00,50),('Real Magic Broom','Mysterious',.05,1),('Mirror','Beauty',10.00,10),('Lion King','Entertainment','10.00','5'),('Eye Shadow','Beauty',10.00,25),('Sing-a-long Machine','Entertainment',1000.00,5),('Antique Lamp','Mysterious',.01,1);

SELECT * FROM products;
