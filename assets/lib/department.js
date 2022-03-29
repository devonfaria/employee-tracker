// Department Constructor
const inquirer = require('inquirer');
const server = require('../../server');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emptracker_db'
  },
  console.log(`Connected to the emptracker_db database.`)
);

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
    console.log(data);
    db.query('INSERT INTO department SET ?', data, function (err, result) {
      console.log(`Added deparment named ${data.name}`);
    });
  })
  .then (() => {
    promptInit();
  });
};

module.exports = addDept();