DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;
CREATE TABLE department (
    id INT (10),
    name VARCHAR (50),
    PRIMARY KEY (`id`)
);
CREATE TABLE role (
    id INT (10),
    title VARCHAR (30),
    salary FLOAT (10),
    department_id INT (10),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    PRIMARY KEY (`id`) 
);
CREATE TABLE employee (
    id INT (10),
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT (10),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_name VARCHAR (30),
    manager_id INT (10),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (`id`)
);