const inquirer=require('inquirer');
const mysql=require('mysql2');
const fs=require('fs');

const connection = mysql.createConnection({
host:"localhost",
user:"root",
password:"Football23!",
database:"employee_tracker",
});

const questions =[
    {
        type:'list',
        message: 'options',
        name:'selection',
        choices:['view all departments','view all roles','view all employees','add a department','add a role','add an employee','update an employee role'],
    }
]
inquirer.prompt(questions)
.then((data)=> {
if(data.selection==='view all departments'){
 viewAlldepartments()
}
})
function viewAlldepartments(){
    connection.query("SELECT * FROM department",(error, rows)=>{
        if (error) throw error
        console.table(rows)
    })
}