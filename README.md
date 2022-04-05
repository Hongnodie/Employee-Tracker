# Employee-Tracker  ![Project License Badge](https://img.shields.io/badge/license-MIT-brightgreen)

  ## Description

  This is a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Screenshot](#screenshot)
  * [License](#license)
  * [Contributing](#contributing)
  * [Questions](#questions)

  ***

  ## Installation

  If you would prefer to run this page on your local machine simply clone the repo and run the command `npm i` in your terminal. This will download all the dependencies you need to run the project. Alternatively, each dependancies can be installed one after another as:

  ```
  npm install mysql2
  npm install inquirer
  npm install console.table --save
  ```

  [Employee-Tracker Instruction](https://drive.google.com/file/d/1r_QTvatfvBzdx9O4peyzioPRIwdILydC/view) <br>
  
  Available also at https://watch.screencastify.com/v/8lh3Ujn0YT4elGl9caij

  ## Usage

  <details>
  <summary>User Story</summary>

  AS a business owner <br>
  I want to be able to view and manage the departments, roles, and employees in my company <br>
  SO that I can organize and plan my business. <br>
  </details>

  <details>
  <summary>Acceptance Criteria</summary>
  <br>
    GIVEN a command-line application that accepts user input <br>
    WHEN I start the application <br>
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role <br>

    WHEN I choose to view all departments <br>
    THEN I am presented with a formatted table showing department names and department ids <br>
    WHEN I choose to view all roles <br>
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role <br>
    WHEN I choose to view all employees <br>
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to <br>

    WHEN I choose to add a department <br>
    THEN I am prompted to enter the name of the department and that department is added to the database
    WHEN I choose to add a role <br>
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    WHEN I choose to add an employee <br>
    THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    
    WHEN I choose to update an employee role <br>
    THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
  </details>

  <details>
  <summary>Other Demanded Sources</summary>
  [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries <br>
  [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line <br>
  [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.
  </details>

  <details>
  <summary>Instructions on coding</summary>
  [SQL tutorial](https://www.dofactory.com/sql)-Easy and clear documentation by third party <br>
  [Join 3 Tables (or More) in SQL](https://www.dofactory.com/sql/join-3-tables)-How to Join 3 Tables (or More) in SQL <br>
  </details>

  #### Demo
  ![Demo](./asset/Demo.png)

  ## Screenshot

  ![Screenshot of app](./asset/Employee-Tracker_Screenshot.png | width=100)

  [See code package at Github](https://github.com/Hongnodie/Employee-Tracker.git)
  
  ## License
  <details>
  
  <summary>MIT License</summary>
  
  > Copyright (c) [2022] [Hongnodie]
  > 
  > __Permission is hereby granted, free of charge, to any person obtaining a copy__
  > __of this software and associated documentation files (the "Software"), to deal__
  > __in the Software without restriction, including without limitation the rights__
  > __to use, copy, modify, merge, publish, distribute, sublicense, and/or sell__
  > __copies of the Software, and to permit persons to whom the Software is__
  > __furnished to do so, subject to the following conditions:__
  > 
  > The above copyright notice and this permission notice shall be included in all
  > copies or substantial portions of the Software.
  > 
  > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  > IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  > FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  > AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  > LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  > OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  > SOFTWARE.    
  </details>

  ## Contributing

  This is built by Hongnodie. 
  
  ## Questions?

  If you have any questions about the project you can reach out to me via email or GitHub with the information below. 

  >Email: 92ganhong@gmail.com 

  >GitHub : [Hongnodie](https://github.com/Hongnodie)