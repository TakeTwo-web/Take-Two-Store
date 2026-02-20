CREATE DATABASE take_two;
USE take_two;

CREATE TABLE products(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price INT,
  image VARCHAR(255)
);

CREATE TABLE orders(
  id INT AUTO_INCREMENT PRIMARY KEY,
  items TEXT,
  total INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
