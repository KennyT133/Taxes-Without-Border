const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")

dotenv.config({ path: './passwords.env'})

const application = express();

const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
application.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
application.use(express.urlencoded({ extended: false}));

//Parse JSON bodies (as sent by API clients)
application.use(express.json());
application.use(cookieParser());

application.set('view engine', 'hbs');

database.connect( (error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("MySQL Connected.")
    }
})

//define routes
application.use('/', require('./routes/pages'));
application.use('/auth/', require('./routes/auth'));

application.listen(5000, () =>  {
    console.log("Server started on Port 5000");
})