-- DROP DATABASE IF EXISTS employee_tracker_db;

-- CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT NOT NULL
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) DEFAULT 'FirstName' NOT NULL,
last_name VARCHAR(30) DEFAULT 'LastName' NOT NULL,
role_id INT DEFAULT 1,
);