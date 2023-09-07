DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);


-- Role Table
CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  departments_id INT,
  FOREIGN KEY (departments_id) REFERENCES departments(id)
);

-- Employee Table
CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INT,
  managers_id INT,
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (managers_id) REFERENCES employees(id)
);
