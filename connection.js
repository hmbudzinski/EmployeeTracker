const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2500573hmb",
    database: "employee_tracker_db"
  });
  
connection.connect(function(err) {
if (err) throw err;
// startApp();
});

connection.query = util.promisify(connection.query);

module.export = connection;
