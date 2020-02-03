const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2500573hmb",
    database: "employee_tracker_db"
  });
  
connection.connect(function(err) {
if (err) throw err;
startApp();
});


const startApp = () => {
    inquirer.prompt([
        {
            type: "rawlist",
            message: "Who would you like to do?",
            choices: [
                "View All Employees", 
                "View All Employees by Department", 
                "View all Employees by Manager", 
                "Add Employee", 
                "Remove Employee", 
                "Update Employee Role", 
                "View All Roles",
                "Exit"],
            name: "action",
        }
      ]).then(function(response) {
        switch(response.action){
            case "View All Employees":
            viewAll();
            break;

            case "View All Employees by Department":
            byDepartment();
            break;

        //   if (response.action === "View all Employees by Manager")
        //   byManager();
        //   if (response.action === "Add Employee")
        //   addEmployee();
        //   if (response.action === "Remove Employee")
        //   removeEmployee();
        //   if (response.action === "Update Employee Role")
        //   updateRole();
        //   if (response.action === "View All Roles")
        //   viewAllRoles();
        //   if (response.action === "Exit")
        //   exit();
        }
      });
};

const viewAll = () => {
        var query = "SELECT * FROM employee INNER JOIN role";
        connection.query(query, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.table(response);
          }
          startApp();
        });      
};

const byDepartment = () => {
    inquirer.prompt(
        {
            type: "rawlist",
            message: "Which department would you like to view?",
            choices: [
                "Sales", 
                "Legal", 
                "Engineering"],
            name: "action",
        })
        .then(function(answer) {
            console.log(answer.action);
            connection.query("SELECT * FROM department WHERE ?", { action: answer.action }, function(err, res) {
              console.log("Department: ", answer.action);
              startApp();
            });
          });
};

    // byManager();
    // addEmployee();
    // removeEmployee();
    // updateRole();
    // viewAllRoles();
    // exit();
