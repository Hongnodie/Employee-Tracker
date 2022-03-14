// npm packages induce
const path = require("path")
const fs = require("fs")
const mysql = require("mysql");
const inquirer = require("inquirer");

// routing build up
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);
  