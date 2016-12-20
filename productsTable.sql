use bamazon;

CREATE TABLE products3 (

item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price FLOAT(11),
stock_quantity INTEGER(11)
);

INSERT INTO products3
(product_name, department_name, price, stock_quantity)
VALUES 
("Lord of the Flies","Books", 11.99, 654),
("Cool Water Cologne","Beauty", 11.99, 654),
("Eucerin","Health", 11.99, 654),
("Ipad 2","Technology", 350, 45),
("Samsung Galaxy note 4","Technology", 299, 54),
("Yamaha F335 Acoustic Guitar","Music", 179.99, 64),
("Guitar Case","Music", 21.99, 894),
("Laptop Case","Technology", 15.99, 324),
("Cordless Mouse","Technology", 14.99, 6534),
("Rugged Hiking Boot","Sporting Goods", 39.99, 214);

SHOW TABLE products3;