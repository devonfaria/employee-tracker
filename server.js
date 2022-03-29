// Adding node modules
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const cTable = require('console.table');
const fs = require('fs');
const path = require('path');

// Pulling in functions for constructor classes and prompts
// const index = require('./assets/js/index');

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

// Constructor functions for table objects
const Employee = require('./assets/lib/employee');
const Department = require('./assets/lib/department');
const Role = require('./assets/lib/role');

// Questions for terminal prompts
const questionsDepartment = [
  {
    type: 'input',
    message: "What is the name of the department?",
    name: 'name',
  },
];

const questionsRole = [
  {
    type: 'input',
    message: "What is the name of the role",
    name: 'name',
  },
  {
    type: 'input',
    message: "What is the salary of the role?",
    name: 'salary',
  },
  {
    type: 'rawlist',
    message: "What department does the role belong to?",
    name: 'department',
    choices: [
      {name: 'Executive Management', value: 'exec'},
      {name: 'Accounting', value: 'acc'},
      {name: 'Web Development', value: 'web-dev'},
      {name: 'Data Science', value: 'data-sci'},
    ]
  },
];

const questionsEmployee = [
  {
    type: 'input',
    message: "What is the employee's first name?",
    name: 'first',
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'last',
  },
  {
    type: 'list',
    message: "What is the employee's role?",
    name: 'role',
    choices: [
      {name: 'CEO', value: 'ceo'},
      {name: 'CFO', value: 'cfo'},
      {name: 'Accountant', value: 'acc'},
      {name: 'Web Developer', value: 'web-dev'},
    ]
  },
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

// THIS IS A SAMPLE OF HANDLING THE NEW OBJECT FROM PROMPTS MAY USE LATER
// function promptIntern() {
//   inquirer
//   .prompt(questionsIntern)
//     .then ((data) => {
//       const newIntern = new Intern (data.name, data.id, data.email, data.school);
//       employees.push(newIntern);
//     }).then(()=>{addEmployee()})
//     .catch((err) => {console.log(err)});
// };

// Displays the data table requested in Inquirer
const showDept = () => {
  db.query(`SELECT id AS dept_id, name FROM department`, function (err, results) {
    console.table(results);
  })
  promptInit();
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

// `SELECT reviews.id, content, name AS movie_name 
//     FROM reviews
//     LEFT JOIN movies
//     ON reviews.movie_id = movies.id`

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

// Initial questions prompt
async function promptInit() {
  await inquirer
  .prompt(questionsNew)
    .then ((data) => {
      console.log(`Line 163: `, data);
      switch (data.action) {
        case 'view-emp': 
        showEmployees();
        return showEmployees();
        case 'add-emp': return;
        case 'upd-emp': return;
        case 'view-role': return showRole();
        case 'add-role': return;
        case 'view-dept': return showDept();
        case 'add-dept': return;
        case 'quit': return;
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
