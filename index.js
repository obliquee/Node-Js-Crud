const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb',
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
  if(!err){
    console.log('DB connection succeded');
  }else{
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  }
});

const port = process.env.PORT || 8080;
app.listen(port,()=>console.log('Listernting on port: ' + port));

//Get all Employees
app.get('/employees',(req,res) => {
    mysqlConnection.query('Select * from employee',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
           // console.log(rows[0].EmpId);
        }else{
            console.log(err);
        }
})
});

//Get a Employees
app.get('/employees/:id',(req,res) => {
    console.log(req.params.id);
    mysqlConnection.query('Select * from employee where EmpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
           // console.log(rows[0].EmpId);
        }else{
            console.log(err);
        }
})
});

//Delete a Employees
app.delete('/employees/:id',(req,res) => {
  console.log(req.params.id);
  mysqlConnection.query('Delete  from employee where EmpId = ?',[req.params.id],(err,rows,fields)=>{
      if(!err){
        res.send('Deleted Success');
         // res.send(rows);
         // console.log(rows[0].EmpId);
      }else{
          console.log(err);
      }
})
});

//Insert a Employees
app.post('/employees',(req,res) => {
  console.log(req.params.id);
  let emp = req.body;
  var sql = "SET @EmpId = ?; SET @Name = ?; SET @EmpCode = ? ; SET @Salary = ?; \
      CALL EmployeeAddOrEdit(@EmpId,@Name,@EmpCode,@Salary)";
  mysqlConnection.query(sql,[emp.EmpId,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
      if(!err){
          res.send(rows);
         // console.log(rows[0].EmpId);
      }else{
          console.log(err);
      }
})
});