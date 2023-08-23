USE employee_tracker;

-- Seed Departments
INSERT INTO departments(name) VALUES
('sales'),
('accounting'),
('software'),
('marketing'),
('human resources');

-- Seed roles 
INSERT INTO roles(title, salary, department_id) VALUES 
('Sales Associate', 60000.00, 1),
('Sales Manager', 100000.00, 1),
('Accounting Clerk', 720000.00, 2),
('Accounting Manager', 160000.00, 2),
('Fullstack Web Developer', 80000.00, 3),
('Senior Software Engineer', 200000, 3),
('Digital Marketing Specialist', 1850000.00, 4),
('Marketing Director', 155000, 4);

-- Seed employees 
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, NULL),
('Emily', 'Williams', 4, 3),
('David', 'Brown', 5, NULL),
('Sarah', 'Jones', 6, 5),
('Alex', 'Lee', 7, NULL),
('Olivia', 'Wilson', 8, 7);



