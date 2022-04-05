DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR (50)
);
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL (10),
    department_id INT (10)
);
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT (10),
    manager_id INT (10)
);
-- The IDENTITY keyword creates an autonumber column that automatically increments the Id when a new record is added, should not be commented in the codes
-- PRIMARY KEY