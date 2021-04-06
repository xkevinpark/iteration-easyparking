const db = require('../Models/ParkingSpotModels');
const bcrypt = require ('bcrypt');
const userController = {};
// Create a userController as middleware to pass it userRouter:
userController.addUser = (req, res, next) => {
    // safety feature: VALUES ($1, $2, $3, $4, $5) 
    // sanitizes i.e. saves from hackers...
    const query = `INSERT INTO "public"."Users" (first_name, last_name, email, password, id_role)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    // Deconstruct column names from req.body:
    const {
        firstName,
        lastName,
        email,
        idRole
    } = req.body;
    const values = [
        firstName,
        lastName,
        email,
        res.locals.bcrypt, // this is the resulting hash after passing our password through bcrypt
        idRole
    ];
    db.query(query, values)
        .then(data => { 
            res.locals.users = data.rows;
            return next();
        })
        .catch( err => next({
            log: 'error',
            status: 500, 
            message: { err }
        }));
}
// bcrypt middleware:
userController.bcrypt = (req, res, next) => {
    // deconstruct password from the req.body
    const { password } = req.body;
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in database here
        if (err) {
            console.error(err);
            return;
          }
        //   console.log(hash);
        res.locals.bcrypt = hash;
        next();
    });
}
// login middleware: purpose is to check if the inputted password matches the password used when the user signed up
userController.login = (req, res, next) => {
    const { email, password } = req.body;
    // Retrieve the hash (original password) of the user's stored password from the database:
    const hash = `SELECT password FROM "public"."Users" WHERE email = '${email}';`;
    db.query(hash)
        .then(data => { 
            if (data.rows.length === 0) {
                res.status(400).json("Invalid: Email & password combination not found!");
            }
            res.locals.hash = data.rows[0].password;
            compare();
        });
    const inputtedPassword = password;
    const compare = () => bcrypt.compare(inputtedPassword, res.locals.hash, (err, result) => {
        if (result) {
            const query = `SELECT id, id_role, email, first_name FROM "public"."Users" WHERE email = '${email}';`;
            db.query(query)
            .then(data => { 
                res.locals.users = data.rows;
                return next();
            })
            .catch( err => next({
                log: 'error',
                status: 500,
                message: { err }
            }));
        } else return res.json('Email & password combination not found!');
    })
}
userController.profile = (req, res, next) => {
    const email = req.params.email;
   console.log(req.params);
    const query = `SELECT * FROM "public"."Users" WHERE email = '${email}';`;
    db.query(query)
        .then(data => { 
            // console.log(data);
            res.locals.users = data.rows[0];
            next();
        });
}

userController.updateInfo = (req, res, next) => {
    const email = req.params.email;
    const { firstName, lastName} = req.body;
    console.log('testing bcrypt: 1', res.locals.bcrypt);
    const query =   `UPDATE "public"."Users" 
                    SET first_name = '${firstName}', last_name = '${lastName}', password = '${res.locals.bcrypt}' 
                    WHERE email = '${email}' 
                    RETURNING *;`;
    db.query(query)
    .then(data => {
        console.log('data: ', data);
        res.locals.users = data.rows[0];
        return next();
    })
}

module.exports = userController;
