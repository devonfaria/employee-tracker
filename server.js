// Adding node modules
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const cTable = require('console.table');
const fs = require('fs');
const path = require('path');

// Declaring express as pur application server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));4

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emptracker_db'
  },
  console.log(`Connected to the emptracker_db database.`)
);

let list = [];
const testManager = (data) => {
  list = data;
}


const updateEmployee = [
  {
    type: 'input',
    message: "Who is the employee's manager?",
    name: 'manager',
    choices: [
      {name: 'Devon Faria', value: 'df'},
      {name: 'Deb Sparr', value: 'ds'},
      {name: 'Rebecca Hill', value: 'rh'},
      {name: 'Greg Hyde', value: 'gh'},
    ]
  },
];

// Asks if you would like to perform another action
const questionsNew = [
  {
  type: 'rawlist',
  message: 'Would you like to do?',
  name: 'action',
  choices: [
    {name: 'View All Employees', value: 'view-emp'},
    {name: 'Add Employee', value: 'add-emp'},
    {name: 'Update Employee Role', value: 'upd-emp'},
    {name: 'View All Roles', value: 'view-role'},
    {name: 'Add Role', value: 'add-role'},
    {name: 'View All Departments', value: 'view-dept'},
    {name: 'Add Department', value: 'add-dept'},
    {name: 'Quit', value: 'quit'},
  ]
  },
];

// Displays the data table requested in Inquirer
async function showDept() {
  db.query(`SELECT id AS dept_id, name FROM department`, function (err, results) {
    return console.table(results);
  })
  return
  // promptInit();
};

const showRole = () => {
  db.query(
    `SELECT title, role.id AS role_id, name AS dept_name, salary 
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;
    `, function (err, results) {
    console.table(results);
  })
  promptInit();
};

const showEmployees = () => {
  db.query(
    `SELECT employee.id AS emp_id, first_name, last_name, title, salary 
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id;
    `, function (err, results) {
    console.table(results);
  })
  promptInit();
};

// Adding data to the tables in database
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
  .then ((data) => {
    db.query('INSERT INTO department SET ?', data, function (err, result) {
      console.log(`Added deparment named ${data.name}`);
    });
  })
  .then (() => {
    promptInit();
  });
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
    .then ((data) => {
      db.query('INSERT INTO role SET ?', data, function (err, result) {
        console.log(`Added role named ${data.title}`);
      });
    })
    .then (() => {
      promptInit();
    });
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
        type: 'list',
        message: "What is the employee's role?",
        name: 'role_id',
        choices: roles
      },
    ];
    inquirer
    .prompt(questionsEmployee)
    .then ((data) => {
      let factor = data;
      db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;', 
      function (err, employees) {
        let managerPrompt = [
          {
            type: 'list',
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
          });
      })
    .then (() => {
      promptInit();
    });
    });
});
})};

// Initial questions prompt
function promptInit() {
  console.log('Welcome to the Employee Tracker. Please enter an action below.');
  inquirer
  .prompt(questionsNew)
    .then ((data) => {
      switch (data.action) {
        case 'view-emp': return showEmployees();
        case 'add-emp': return addEmployee();
        case 'upd-emp': return;
        case 'view-role': return showRole();
        case 'add-role': return addRole();
        case 'view-dept': return showDept().then(promptInit());
        case 'add-dept': return addDept();
        case 'quit': return console.log('Goodbye!');
      };
    })
    .catch((err) => {console.log(err)});
};


// Initiates program
promptInit();

// Creates default error when a request is not possible
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Application launching on port http://localhost:${PORT}/`);
});

