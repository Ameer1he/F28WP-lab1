const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const { error } = require('console');
const { promisify } = require('util');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    email: process.env.DATABASE_EMAIL,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
            return res.render('register', { 
                message: 'User registerd'
             });
        }
        if (result.length > 0) {
            return res.render('register', { 
                message: 'This email is already in use' 
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', { 
                message: 'Passwords do not match'
             });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log(result);
                return res.render('register', {
                    message: 'User registered'
                });
        }
            res.send('Form submitted');
        });
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password){
            return res.status(400).render('login', {
                message: 'Please enter a email and password'
        })
    }

    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, result) => {
        console.log(result);
        if (!result || ! (await bcrypt.compare(password, result[0].password))) {
            res.status(401).render('login', {
                message: 'Wrong email or password'
            })
        } else {
            const id = result[0].id
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("The token is : " + token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/profile")
        }
    })
    } catch (error) {
        console.log(error);
}}

exports.logout = async(req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
    });
    res.status(200).redirect('/');
}

exports.isLoggedIn = async (req, res, next) => {
    if( req.cookie.jwt) {
        try {
            const decoded = await promisify (jwt.verify)(req.cookie.jwt, 
                process.env.JWT_SECRET
                );
                console.log(decoded);

                db.query('SELECT * FROM user WHERE id = ?', [decoded.id], async (error, result) => {
                    console.log(result);

                    if(!result) {
                        return next();
                    }

                    req.user = result[0];
                    console.log("user is")
                    console.log(req.user);
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

exports.profile = async (req, res )=> {
    if (!req.user) {
        return res.redirect('/login');
    }

    const userId = req.user.id;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Internal Server Error' });
        }

        if (!results || results.length === 0) {
            return res.status(404).render('error', { error: 'User not found' });
        }

        const user = results[0];

        res.render('profile', { user });
    });
};
