const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
let globalName;
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    const FinalTotalPrice = 0;
    const { name, email, password, passwordConfirm } = req.body;
    globalName = req.body.name;
    database.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email has been registered previously.'
            })
        
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match.'
            });
        }
        else if(password.length == 0 || name.length == 0 || email.length == 0){
            return res.render('register',{
                    message: 'Please fill out the form.'
            })
              
            
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        
        database.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword, FinalTotalPrice:FinalTotalPrice }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });
            }
        })
    });
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please enter an email/password.'
            })
        }

        database.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'The email/password combination is incorrect.'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");

            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //1.) Verify the Token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log(decoded);

            //2.) Check if the user still exists
            database.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
                console.log(result);

                if(!result) {
                    return next();
                }

                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
}
exports.save = async (req,res) =>{
    const saveFinalPrice = req.body.saveFinalPrice;
    
    database.query("UPDATE users SET  ?  ", {FinalTotalPrice:saveFinalPrice},(error, results) =>{
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            return res.redirect("/mainWeb");
        }
    } )
}
exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now + 2*1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}
