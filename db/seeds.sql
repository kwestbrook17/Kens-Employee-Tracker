-- Seed departments
INSERT INTO departments (id, name) VALUES
(1, "Software Engineer"),
(2, "Account Manager"),
(3, "Accountant");

-- Seed roles
INSERT INTO roles (id, title, salary, departments_id) VALUES
(1, "Software Engineer", 12000, 1),
(2, "Account Manager", 10000, 2),
(3, "Accountant", 13000, 3);

  

-- Seed employees
INSERT INTO employees (id, first_name, last_name, roles_id, manager_id) VALUES
(1, 'John', 'Doe', 3, null) ,
(2, 'Joe', 'Brown', 2, 1);