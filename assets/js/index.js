// Linking required modules and dependencies
const inquirer = require('inquirer');
const fs = require('fs');

// Constructor functions for staff
const Employee = require('../lib/employee');
const Department = require('../lib/department');
const Role = require('../lib/role');

// Empty arrays to collect entered staff member information
// let employees = [];
// let cards = '';

// Questions for terminal prompts, split by employee type
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


// Asks if you would like to add another employee
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

function promptIntern() {
  inquirer
  .prompt(questionsIntern)
    .then ((data) => {
      const newIntern = new Intern (data.name, data.id, data.email, data.school);
      employees.push(newIntern);
    }).then(()=>{addEmployee()})
    .catch((err) => {console.log(err)});
};

// Displays the data type requested in Inquirer
const showData = (data) => {
  db.query(`SELECT * FROM ?`, `${data}`, function (err, results) {
    console.log(results);
  })
};

// Initial questions prompt
function promptInit() {
  inquirer
  .prompt(questionsNew)
    .then ((data) => {
      console.log(data);
      switch (data.action) {
        case 'view-emp': return showData(employee);
        case 'add-emp': return;
        case 'upd-emp': return;
        case 'view-role': return showData(role);
        case 'add-role': return;
        case 'view-dept': return showData(department);
        case 'add-dept': return;
        case 'quit': return;
      };
    })
    .catch((err) => {console.log(err)});
};


// Initiates program
promptInit();