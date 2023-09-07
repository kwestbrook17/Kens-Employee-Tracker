-- Seed departments
INSERT INTO departments (id, name) VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

-- Seed roles
INSERT INTO roles (id, title, salary, departments_id) VALUES
(1, "Sales Lead", 100000, 1),
(2, "Sales Person", 80000, 1),
(3, "Lead Engineer", 150000, 2),
(4, "Software Engineer", 120000, 2),
(5, "Account Manager", 100000, 3),
(6, "Accountant", 130000, 3),
(7, "Legal Team Lead", 120000, 4),
(8, "Lawyer", 100000, 4);

-- Seed employees
INSERT INTO employees (id, first_name, last_name, roles_id, managers_id) VALUES
(1, 'John', 'Doe', 1, null),
(2, 'Mike', 'Chan', 2, 1),
(3, 'Ashley', 'Rodriguez', 3, null),
(4, 'Kevin', 'Tupik', 4, 3),
(5, 'Kenneth', 'Westbrook', 5, null),
(6, 'Lebron', 'James', 6, 5),
(7, 'Mike', 'Trout', 7, null),
(8, 'Kobe', 'Bryant', 8, 7);
