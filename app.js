// npm packages induce
const path = require("path")
const fs = require("fs")
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');

// routing to mysql database build up
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    startquestion();
});

function startquestion() {
    inquirer.prompt([
        {
            name: "addViewUpdate",
            type: "rawlist",
            message: "Which action would you like to take?",
            choices: ["Add", "View", "Update", "Exit"]
        }])
        .then((res) => {
            switch (res.addViewUpdate) {
                case "Add":
                    add();
                    break;
                case "View":
                    view();
                    break;
                case "Update":
                    updateRole();
                    break;
                case "Exit":
                    process.exit(0);
                default: console.log("Please choose from the list.")
            }
        })
}

function add() {
    inquirer.prompt([
        {
            name: "employeeRoleDepartment",
            type: "list",
            message: "What would you like to add?",
            choices: ["Employee", "Role", "Department"]
        }])
        .then((res) => {
            switch (res.employeeRoleDepartment) {
                case "Employee":
                    addEmployee();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Department":
                    addDepartment();
                    break;
                default: console.log("Please enter appropriate choice.")
            }
        }
    )

    function addEmployee() {
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            }, 
            {
                name: "manager_name",
                type: "input",
                message: "Who is the manager of this role?"
            },
        ])
        .then((res) => {
            let query = db.query(`INSERT INTO employee (first_name, last_name, manager_name) 
            VALUES (res.first_name, res.last_name, res.manager_name)`,
            (err, res) => {
                if (err) throw err
                console.log(res)
            })
            startquestion();
        })
    }

    function addRole() {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is title of the role?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is salary of the role?"
            },
        ])
        .then((res) => {
            let query = db.query(`INSERT INTO role (title, salary) 
            VALUES (res.title, res.salary)`,
            (err, res) => {
                if (err) throw err
                console.log(res)
            })
            startquestion();
        })
    }

    function addDepartment() {
        inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is name of the department?"
            }
        ])
        .then((res) => {
            let query = db.query(`INSERT INTO role (name) 
            VALUES (res.name)`,
            (err, res) => {
                if (err) throw err
                console.log(res)
            })
            startquestion();
        })
    }
}

function view() {
    inquirer.prompt([
        {
            name: "choiceView",
            type: "list",
            message: "What would you like to view?",
            choices: ["All Employees", "All Departments", "All Roles"]
        }]).then((res) => {
            switch (res.choiceView) {
                case "All Employees":
                    viewEmployee();
                    break;
                case "All Departments":
                    viewDepartment();
                    break;
                case "All Roles":
                    viewRole();
                    break;
                default: console.log("Please choose from the given list.")
            }
        }
    )
    
    function viewEmployee() {
        let viewquery = "SELECT id, first_name, last_name, title AS job_titles FROM role WHERE id=employee_role_id"; //, department FROM department WHERE id=employee_role_id, salary AS salaries FROM role WHERE id=employee_role_id, manager_name AS manager FROM employee
        db.query(viewquery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
    
    function viewDepartment() {


    }
    
    function viewRole() {

    }
}

function updateRole() {

}