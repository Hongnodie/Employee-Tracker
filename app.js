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
      database: 'tracker_db',
      port: 3306, // Port of localhost; self-defined; if not 3306
    },
    console.log(`Connected to the tracker_db database.`)    // confirmation of connected
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
                    updateEmployeeRole();
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
                name: "role_id",
                type: "number",
                message: "What is the employee's role id number?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the manager's id number?"
            },
            {
                name: "id",
                type: "number",
                message: "What is the employee's id?"
            },
        ])
        //update mysql table and display in console.table
        .then(function (res) {
            console.table(res)
            let query = connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role_id,
                    manager_id: res.manager_id,
                    id: res.id

                },
                function (err, res) {
                    if (err) throw err
                    console.log(res)
                })
        startquestion();
        })
    }

    function addRole() {
        inquirer.prompt([
            {
                name: "ID_PK",
                type: "number",
                message: "What is the ID of the role?"
            },
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
            {
                name: "department_id",
                type: "number",
                message: "What is the id of department that this role belongs to?"
            },
        ])
        .then((res) => {
            let query = db.query("INSERT INTO role SET ?",
            {
                ID_PK: res.ID_PK,
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
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
                name: "ID_PK",
                type: "number",
                message: "What is the department ID?"
            },
            {
                name: "name",
                type: "input",
                message: "What is name of the department?"
            }
        ])
        .then((res) => {
            let query = db.query("INSERT INTO role SET ?",
            {
                ID_PK: res.ID_PK,
                    name: res.name,
            },
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
        let viewEmployeeQuery = "SELECT id, first_name, last_name, title AS role, name AS department, salary, manager_name AS manager FROM employee E LEFT JOIN role R on E.role_id = R.ID_PK JOIN department D on D.ID_PK = R.ID_PK";
        db.query(viewEmployeeQuery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
    
    function viewDepartment() {
        let viewDepartmentQuery = "SELECT ID_PK, name AS department_name FROM department";
        db.query(viewDepartmentQuery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
    
    function viewRole() {
        let viewRoleQuery = "SELECT ID_PK, title AS role_title, name AS department, salary FROM role R LEFT JOIN department D on D.ID_PK = R.department_id";
        db.query(viewRoleQuery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
}

function updateEmployeeRole() {
    db.query("SELECT id, first_name, last_name from employee", (err, employeeRes) => {
        if (err) throw err;
        // transform the data to be used in inquirer
        const organizedEmployeeData = employeeRes.map(({ id, first_name, last_name }) => `${id}: ${first_name} ${last_name}`)
        db.query("SELECT id, title from role", (err, roleRes) => {
            if (err) throw err;
            const organizedRoleData = roleRes.map(({ id, title }) => `${id}: ${title}`);
            // evidence collected above
            // start the investigation below
            inquirer.prompt([
                {
                    // identify dwight
                    type: "list",
                    choices: organizedEmployeeData,
                    name: "targetEmp",
                    message: "Whose role needs to change?"
                }, {
                    // whats the new role we wanna give him? -- what are all the roles available?
                    type: "list",
                    choices: organizedRoleData,
                    name: "targetRole",
                    message: "What is their new role?"
                }
            ]).then(({ targetEmp, targetRole }) => {
                let id = targetEmp.split(":")[0]; // targetEmp = "6: Dwifht Shrute"
                let role_ID = targetRole.split(":")[0];
                db.query("UPDATE employee SET role_ID = ? WHERE id = ?", [role_ID, id], (err, success) => {
                    if (err) throw err;
                    console.log(`Your changes were successful`);
                    startquestion();
                })
            })
        })
    })
}