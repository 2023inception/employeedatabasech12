const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Football23!",
  database: "employee_tracker",
});

const questions = [
  {
    type: 'list',
    message: 'options',
    name: 'selection',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role','delete department'],
  }
];

inquirer.prompt(questions)
  .then((data) => {
    if (data.selection === 'view all departments') {
      viewAlldepartments();
    } else if (data.selection === 'view all roles') {
      viewAllroles();
    } else if (data.selection === 'view all employees') {
      viewAllemployees();
    } else if (data.selection === 'add a department') {
      addAdepartment();
    } else if (data.selection === 'add a role') {
      addArole();
    } else if (data.selection === 'add an employee') {
      addAnemployee();
    } else if (data.selection === 'update an employee role') {
      updateAnEmployeeRole();
    }else if (data.selection === 'view department budget') {
      viewDepartmentBudget();
    }else if (data.selection === 'delete') {
      deleteDepartment();
    }
  });
//explain
  function viewAlldepartments() {
    connection.query("SELECT * FROM departments", (error, rows) => {
      if (error) throw error;
      console.table(rows);
    });
  }
  
  function viewAllroles() {
    connection.query("SELECT * FROM roles", (error, rows) => {
        if (error) throw error;
        console.table(rows);
      });
  }
  
  function viewAllemployees() {
    connection.query("SELECT * FROM employees", (error, rows) => {
        if (error) throw error;
        console.table(rows);
      });
  }
  
  function addAdepartment() {
    inquirer.prompt([
        {
          type: 'input',
          message: 'Enter department name:',
          name: 'departmentName',
        },
      ]).then((data) => {
        // Insert department data into the database
        connection.query(
          "INSERT INTO departments (name) VALUES (?)",
          [data.departmentName],
          (error, result) => {
            if (error) throw error;
            console.log(`Departments '${data.departmentName}' added successfully.`);
          }
        );
      });
    }
  
  function addArole() {
    inquirer.prompt([
        {
          type: 'input',
          message: 'Enter role title:',
          name: 'roleTitle',
        },
        {
          type: 'input',
          message: 'Enter role salary:',
          name: 'roleSalary',
        },
        {
          type: 'input',
          message: 'Enter department ID:',
          name: 'departmentID',
        },
      ]).then((data) => {
        // Insert role data into the database
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [data.roleTitle, data.roleSalary, data.departmentID],
          (error, result) => {
            if (error) throw error;
            console.log(`Role '${data.roleTitle}' added successfully.`);
          }
        );
      });
    }
  
  function addAnemployee() {
    inquirer.prompt([
        {
          type: 'input',
          message: 'Enter first name:',
          name: 'firstName',
        },
        {
          type: 'input',
          message: 'Enter last name:',
          name: 'lastName',
        },
        {
          type: 'input',
          message: 'Enter role ID:',
          name: 'roleID',
        },
        {
          type: 'input',
          message: 'Enter manager ID (optional):',
          name: 'managerID',
        },
      ]).then((data) => {
        // Insert employee data into the database
        connection.query(
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [data.firstName, data.lastName, data.roleID, data.managerID || null],
          (error, result) => {
            if (error) throw error;
            console.log(`Employees '${data.firstName} ${data.lastName}' added successfully.`);
          }
        );
      });
    }
  
  function updateAnEmployeeRole() {
    inquirer.prompt([
        {
          type: 'input',
          message: 'Enter employee ID:',
          name: 'employeeID',
        },
        {
          type: 'input',
          message: 'Enter new role ID:',
          name: 'newRoleID',
        },
      ]).then((data) => {
    
        connection.query(
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [data.newRoleID, data.employeeID],
          (error, result) => {
            if (error) throw error;
            console.log(`Employee's role updated successfully.`);
          }
        );
      });
    }

function viewDepartmentBudget() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter department ID:',
      name: 'departmentID',
    },
  ]).then((data) => {
    // Query the database to calculate the department budget
    connection.query(
      "SELECT SUM(salary) AS total_budget FROM roles WHERE department_id = ?",
      [data.departmentID],
      (error, result) => {
        if (error) throw error;
        console.log(`Total budget for Department ${data.departmentID}: $${result[0].total_budget}`);
      }
    );
  });
}

function deleteDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter department ID to delete:',
      name: 'departmentID',
    },
  ]).then((data) => {
    connection.query(
      "DELETE FROM departments WHERE id = ?", [data.departmentID],
      (error,result) => {
        if (error) throw error;
        console.log('department deleted')
      }
  );
  });
}


