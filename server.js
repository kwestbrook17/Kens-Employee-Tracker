//const { createConnection } = require('mysql2/promise');
//const {inquirer} = require('inquirer');


import  {createConnection} from 'mysql2';
import inquirer from 'inquirer';

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aw25Ko;4wV',
    database: 'company_db',
  });
  db.connect(function(error){
    if (error) throw error;
  }) 

startApp()


// Function to start the application
async function startApp() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
        ],
      },
    ]);

    switch (answers.action) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the database connection when done
    await db.end();
  }
}

// Function to view all departments
function viewAllDepartments() {
  // Query the database to fetch departments and display as a formatted table
  const query = 'SELECT *  FROM departments';
  db.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);
    startApp();
    return;
  });
}

// Function to view all roles
function viewAllRoles() {
  // Query the database to fetch roles and display as a formatted table
  const query =
    'SELECT roles.role_id, roles.title, roles.salary, departments.department_name FROM roles INNER JOIN departments ON roles.departments_id = departments.departments_id';
  db.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);
    startApp();
  });
}

// Function to view all employees
function viewAllEmployees() {
  // Query the database to fetch employee data and display as a formatted table
  const query =
    'SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees INNER JOIN roles ON employees.role_id = roles.role_id INNER JOIN departments ON roles.department_id = departments.department_id LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id';
  db.query(query, (err, results) => {
    if (err) throw err;

    console.table(results);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO departments (department_name) VALUES (?)';
      db.query(query, [answers.departmentName], (err) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}

// Function to add a role
function addRole() {
  // Query the database to get department names for the choices in the prompt
  const departmentQuery = 'SELECT department_id, department_name FROM departments';
  db.query(departmentQuery, (err, departments) => {
    if (err) throw err;

    const departmentChoices = departments.map((department) => ({
      value: department.department_id,
      name: department.department_name,
    }));

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for the role:',
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(
          query,
          [answers.title, answers.salary, answers.departmentId],
          (err) => {
            if (err) throw err;
            console.log('Role added successfully!');
            startApp();
          }
        );
      });
  });
}

// Function to add an employee
function addEmployee() {
  // Query the database to get role titles for the choices in the prompt
  const roleQuery = 'SELECT role_id, title FROM roles';
  db.query(roleQuery, (err, roles) => {
    if (err) throw err;

    const roleChoices = roles.map((role) => ({
      value: role.role_id,
      name: role.title,
    }));

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:",
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the employee's manager ID (if applicable):",
        },
      ])
      .then((answers) => {
        const query =
          'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(
          query,
          [
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId || null,
          ],
          (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            startApp();
          }
        );
      });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  // Query the database to get a list of employees for the choices in the prompt
  const employeeQuery = 'SELECT employee_id, CONCAT(first_name, " ", last_name) AS full_name FROM employees';
  db.query(employeeQuery, (err, employees) => {
    if (err) throw err;

    const employeeChoices = employees.map((employee) => ({
      value: employee.employee_id,
      name: employee.full_name,
    }));

    // Query the database to get role titles for the choices in the prompt
    const roleQuery = 'SELECT role_id, title FROM roles';
    db.query(roleQuery, (err, roles) => {
      if (err) throw err;

      const roleChoices = roles.map((role) => ({
        value: role.role_id,
        name: role.title,
      }));

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          const query = 'UPDATE employees SET role_id = ? WHERE employee_id = ?';
          db.query(query, [answers.roleId, answers.employeeId], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');

          });
        });
    });
  });
}
