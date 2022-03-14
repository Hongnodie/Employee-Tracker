DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;
CREATE TABLE department (
    id INT (10),
    name VARCHAR (50)
);
CREATE TABLE role (
    id INT (10),
    title VARCHAR (30),
    salary FLOAT (10),
    department_id INT (10)
);
CREATE TABLE employee (
    id INT (10),
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT (10),
    manager_id INT (10)
);