const express = require ("express");
const mysql = require ("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'})

const userDB = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

userDB.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'./public');//Takes two parameters
userDB.use(express.static(publicDirectory));
userDB.use(express.urlencoded({extended:false}));
userDB.use(express.json());
userDB.use(cookieParser());

db.connect((error)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log("My SQL Connected")
  }
});

//Define ROutes
userDB.use('/',require('./routes/pages'));
userDB.use('/auth',require('./routes/auth'));

userDB.listen(8000,()=>{
  console.log("Server started on Port 8000");
});


