const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");
let roles = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2500573hmb",
    database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startApp();
    empRoles();
});

const startApp = () => {
    inquirer.prompt([{
        type: "rawlist",
        name: "start",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Remove Employee",
            "Exit"
        ],
    }]).then(({ start }) => {
        switch (start) {
            case "View All Employees":
                viewAll();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
};

const empRoles = () => {
    connection.query("SELECT id, title, salary, department_id FROM role", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            roles.push({
                title: res[i].title,
                id: res[i].id
            })
        }
    })
};


const addEmployee = () => {

    connection.query("SELECT id, first_name, last_name, role_id FROM employee", function(err, res) {
        connection.query("SELECT id, title FROM roles", function(err, res) {
            inquirer.prompt([{
                        message: "What is your employee's first name?",
                        name: "first_name",
                        type: "input"
                    },
                    {
                        message: "What is your employee's last name?",
                        name: "last_name",
                        type: "input"
                    },
                    {
                        message: "What is your employee's role?",
                        name: "title",
                        type: "list",
                        choices: roles.map(x => x.title)
                    }
                ])
                .then((res) => {
                    for (var i = 0; i < roles.length; i++) {
                        // console.log("RESPONSE", roles.indexOf([i]));
                    }
                    connection.query("INSERT INTO employee SET ?, ?, ?", [
                        { first_name: res.first_name },
                        { last_name: res.last_name },
                        { role_id: i }
                    ], function(err, res) {
                        if (err) throw err;
                        startApp();
                    });
                });
        });
    });
};

const removeEmployee = () => {
    inquirer.prompt([{
        message: "What is the employee ID of the employee you want to remove?",
        name: "id",
        type: "input"
    }, ]).then(function(answers) {
        let query = "DELETE FROM employee WHERE id = ? ";
        connection.query(query, [answers.id], function(err, res) {
            if (err) throw err;
        });
        startApp();
    })
};

const viewAll = () => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.role_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        const table = consoleTable.getTable(res);
        console.log(table);

        startApp();
    });
};