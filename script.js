const inquirer = require("inquirer");
require("console.table");
const db = require("./db/db.js");

startApp();

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

async function viewAll (){
    // const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
    // console.table(connection.query(query)); 

    const employees = await 
    db.findAllEmployees();

    console.log("\n");  
    console.table(employees);

    // loadMainPrompts();
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
