const { response } = require('express');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./Models/ParkingSpotModels.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');
dotenv.config()

// Controllers
const userController = require('./Controllers/userController');
const spotController = require('./Controllers/spotController');

// Routes
const spotRouter = require('./Router/spotRouter');
const userRouter = require('./Router/userRouter');

//Establish Port and Server (Why is "new" keyword not needed?)
const PORT = 3000;
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static file build route
app.use('/build', express.static(path.join(__dirname, '../build')));

//Enable Cors
app.use(cors());

// Initial Page Request
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'))
});

// Re-direct to route handlers:
app.use('/spot', spotRouter);
app.use('/user', userRouter);


// initialize passport
app.use(passport.initialize());

const verifyCallBackGoogle = (accessToken, refreshToken, profile, done) => {
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const userEmail = profile.emails[0].value;
  const userPassword = profile.id;
  console.log(userEmail);
  console.log(userPassword);

  // create googleUser, containing {idRole: 1, firstName, lastName, email: profile.emails[0].value, password: profile.id}
  const googleUser = { idRole: 1, firstName: firstName, lastName: lastName, email: userEmail, password: userPassword };
  const selectStr = `SELECT * FROM "public"."Users" WHERE email = $1`


  // check if user is on database 
  // query check SELECT * from "Users" WHERE email = profile.emails[0].value
  db.query(selectStr, [userEmail])
    .then(currentUser => {
      console.log('query succesfully come back');
      // if (the return is empty)
      console.log(currentUser.rows);
      console.log(currentUser.rows[0]);
      if (!currentUser.rows[0]) {
        // send fetch POST request to user/sign up
        console.log('start creating');
        () => {
          fetch(`/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(googleUser),
          }).catch(err => console.log(err));
          // .then(response => response.json())
          // .then(data => {
          //   console.log('user got added?')
          //   history.push('/');
          // })
        }


        // send fetch request to user/login to validate user & password using userController.login
        //  () => {
        //        fetch(`/user/login`, {
        //          method: "POST",
        //          headers: { "Content-Type": "application/json" },
        //          body: JSON.stringify(googleUser),
        //        })
        //          .then(response => response.json())
        //          .then(data => {
        //            console.log("signin: ", user);
        //            setUser(data);
        //            history.push({
        //              pathname: `/search-spots`
        //            });
        //          })
        //      }
      }
    })
  // 


}





// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  verifyCallBackGoogle
));


// serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// // deserialize
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// GET /auth/google
// 1
app.get('/auth/google', (req, res, next) => {
  console.log('the route is hitting');
  next();
},
  passport.authenticate('google', { scope: ['profile', 'email', 'phone'] })
);

// GET /auth/google/callback after Google user has logged in
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    console.log('2');
    res.redirect('/search-spots');
  });

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
})

app.listen(PORT, () => { console.log(`Listening on port' ${PORT}...`) });