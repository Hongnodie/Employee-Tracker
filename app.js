// npm packages induce
const path = require("path")
const fs = require("fs")
const mysql = require("mysql2");
const inquirer = require("inquirer");

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
            message: "To build up employee database, which action would you like to take?",
            choices: ["Add", "View", "Update"]
        }])
        .then((res) => {
            switch (res.addViewUpdate) {
                case "Add":
                    addRole();
                    break;
                case "View":
                    viewRole();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                default: console.log("Please choose from the list.")
            }
        })
}