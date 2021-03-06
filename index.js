// Importing node modules
require('console.table');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Initiating Express module
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to emptracker_db database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emptracker_db'
  },
  console.log(`Connected to the emptracker_db database.`)
);

// Displays the data table requested in console
const showDept = () => {
  db.query(`SELECT id AS dept_id, name FROM department`, function (err, results) {
    console.log('');
    console.table(results);
    promptInit();
  })
};

const showRole = () => {
  db.query(
    `SELECT title, role.id AS role_id, name AS dept_name, salary 
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;
    `, function (err, results) {
    console.log('');
    console.table(results);
    promptInit();
  })
};

const showEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary , name AS dept_name, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id 
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;
    `, function (err, results) {
    console.log('');
    console.table(results);
    promptInit();
  })
};

// Adding data to the tables in company database
const addDept = () => {
  const questionsDepartment = [
    {
      type: 'input',
      message: "What is the name of the department?",
      name: 'name',
    },
  ];
  inquirer
    .prompt(questionsDepartment)
    .then((data) => {
      db.query('INSERT INTO department SET ?', data, function (err, result) {
        console.log(`Added deparment named ${data.name}`);
        promptInit();
      });
    })
};

const addRole = () => {
  db.query('SELECT name, id AS value FROM department;', function (err, departments) {
    const questionsRole = [
      {
        type: 'input',
        message: "What is the name of the role",
        name: 'title',
      },
      {
        type: 'input',
        message: "What is the salary of the role?",
        name: 'salary',
      },
      {
        type: 'rawlist',
        message: "What department does the role belong to?",
        name: 'department_id',
        choices: departments
      },
    ];
    inquirer
      .prompt(questionsRole)
      .then((data) => {
        db.query('INSERT INTO role SET ?', data, function (err, result) {
          console.log(`Added role named ${data.title}`);
          promptInit();

        });
      })
  });
};


const addEmployee = () => {
  db.query('SELECT title AS name, id AS value FROM role;', function (err, roles) {
    const questionsEmployee = [
      {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first_name',
      },
      {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last_name',
      },
      {
        type: 'rawlist',
        message: "What is the employee's role?",
        name: 'role_id',
        choices: roles
      },
    ];
    inquirer
      .prompt(questionsEmployee)
      .then((data) => {
        let factor = data;
        db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;',
          function (err, employees) {
            let managerPrompt = [
              {
                type: 'rawlist',
                message: "Who is the employee's manager?",
                name: 'manager_id',
                choices: employees
              },
            ]
            inquirer
              .prompt(managerPrompt)
              .then((data) => {
                factor.manager_id = data.manager_id;
                return factor
              })
              .then((data) => {
                db.query('INSERT INTO employee SET ?', data, function (err, result) {
                  console.log(`Added employee named ${data.first_name} ${data.last_name}`);
                  promptInit();
                });
              })
          });
      });
  });
};

// Updates the role of a selected employee
const updateEmployee = () => {
  db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;', function (err, employees) {
    const whichEmployee = [
      {
        type: 'rawlist',
        message: "Which employee would you like to update?",
        name: 'id',
        choices: employees
      },
    ];
    inquirer
      .prompt(whichEmployee)
      .then((data) => {
        let factor = data;
        console.log('which employee: ', data);
        db.query('SELECT title AS name, id AS value FROM role;', function (err, roles) {
          const updateRole = [
            {
              type: 'rawlist',
              message: "What is the employee's new role?",
              name: 'role_id',
              choices: roles
            },
          ];
          inquirer
            .prompt(updateRole)
            .then((data) => {
              factor.role_id = data.role_id;
              return factor
            })
            .then((data) => {
              db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.role_id, data.id], function (err, result) {
                console.log(`Updated role id to ${data.role_id} at emp id ${data.id}`);
                promptInit();
              });
            })
        });
      });
  });
};

// Initializes main menu prompt and triggers action
function promptInit() {
  const questionsNew = [
    {
      type: 'rawlist',
      message: 'Would you like to do?',
      name: 'action',
      choices: [
        { name: 'View All Employees', value: 'view-emp' },
        { name: 'Add Employee', value: 'add-emp' },
        { name: 'Update Employee Role', value: 'upd-emp' },
        { name: 'View All Roles', value: 'view-role' },
        { name: 'Add Role', value: 'add-role' },
        { name: 'View All Departments', value: 'view-dept' },
        { name: 'Add Department', value: 'add-dept' },
        { name: 'Quit', value: 'quit' },
      ]
    },
  ];
  console.log('Welcome to the Employee Tracker. Please enter an action below.');
  inquirer
    .prompt(questionsNew)
    .then((data) => {
      switch (data.action) {
        case 'view-emp': return showEmployees();
        case 'add-emp': return addEmployee();
        case 'upd-emp': return updateEmployee();
        case 'view-role': return showRole();
        case 'add-role': return addRole();
        case 'view-dept': return showDept();
        case 'add-dept': return addDept();
        case 'quit': return console.log('Goodbye!');
      };
    })
    .catch((err) => { console.log(err) });
};


// Initiates program
promptInit();

// Creates default error when a request is not possible
app.use((req, res) => {
  res.status(404).end();
});

// Port connection
app.listen(PORT, () => {
  console.log(`Application launching on port http://localhost:${PORT}/`);
});

