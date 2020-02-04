//have a class with function to find all employees in the class 
const connection = require("../connection.js");

class Database {
    constructor(connection){
        this.connection = connection;
    }
    findAllEmployees() {    
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");  
    }
}

module.exports = new Database(connection);