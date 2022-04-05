// npm packages induce

// easy and fast way of applying mysql, examples provided here at https://www.npmjs.com/package/mysql2
const mysql = require("mysql2");

// Tool to handle questions and responses in node.js, readme instruction only at https://github.com/SBoudrias/Inquirer.js#readme
const inquirer = require("inquirer");

// Adds console.table method for convenience of selecting (reading), at https://www.npmjs.com/package/console.table
const cTable = require('console.table');

// routing to mysql database build up, supported by mysql2
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
            name: "primaryQuestion",
            type: "list",
            message: "What would you like to add?",
            choices: ["Employee", "Role", "Department"]
        }])
        .then((res) => {
            switch (res.primaryQuestion) {
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
                name: "id",
                type: "number",
                message: "What is the employee's id?"
            },
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
                type: "number",
                message: "What is the manager's id number?"
            }
        ])
       .then(function (res) {
            db.query('INSERT INTO employee SET ?',
                {
                    id: res.id,
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role_id,
                    manager_id: res.manager_id,
                },
                (err, res) => {
                    if (err) throw err;
                });
            startquestion();
            }
        )
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
            {
                name: "department_id",
                type: "number",
                message: "What is the id of department that this role belongs to?"
            },
        ])
        .then(function (res) {
            db.query('INSERT INTO role SET ?',
            {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            (err, res) => {
                if (err) throw err;
            });
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
        .then(function (res) {
            db.query('INSERT INTO department SET ?',
            {
                name: res.name
            },
            (err, res) => {
                if (err) throw err
            });
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
        // Name concat at https://stackoverflow.com/questions/20284528/how-to-concat-two-columns-into-one-with-the-existing-column-name-in-mysql
        let viewEmployeeQuery = `SELECT E.id, E.first_name, E.last_name, R.title AS role, D.name AS department, R.salary, CONCAT(ER.first_name, ' ', ER.last_name) AS manager_name
        FROM employee E 
        LEFT JOIN role R on E.role_id = R.id
        LEFT JOIN department D on D.id = R.department_id
        LEFT JOIN employee ER on E.manager_id = ER.id`;
        db.query(viewEmployeeQuery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
    
    function viewDepartment() {
        let viewDepartmentQuery = "SELECT id, name AS department_name FROM department";
        db.query(viewDepartmentQuery, function (err, res) {
            console.table(res);
            startquestion();
        })
    }
    
    function viewRole() {
        //Same id refernce solution https://stackoverflow.com/questions/35968229/selecting-records-with-the-same-name-give-duplicate-results
        let viewRoleQuery = `SELECT R.id, R.title AS role_title, D.name AS department, R.salary FROM role R LEFT JOIN department D on R.department_id = D.id`
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
                let role_id = targetRole.split(":")[0];
                db.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id], (err, success) => {
                    if (err) throw err;
                    console.log(`Your changes were successful`);
                    startquestion();
                })
            })
        })
    })
}