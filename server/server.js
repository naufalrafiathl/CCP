const register = require('./controller/register.js')
const login = require('./controller/login.js')
const list = require('./controller/list.js')

require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const mysql = require("mysql");

app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}...`)
);
app.use(express.json());

const db = mysql.createPool({
  multipleStatements:true,
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

app.post("/register", function(req,res){
  register.register(req,res,db)
});

app.post("/login", function(req,res){
  login.login(req,res,db)
});

app.get("/get-list", function(req,res){
  list.getMovie(req,res,db)
}); 

app.post("/add-list", function(req,res){
  list.addMovie(req,res,db)
}); 