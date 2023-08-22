const inquirer=require('mysql12');
const fs=require('fs');

const connection = mysql.createConnection({
host:
user:
password:
database:
});

const
const questions =[
    {
        type:'list',
        message: 'options',
        choices:['view all departments','view all roles','view all employees','add a department','add a role','add an employee','update an employee role'],
    }
]