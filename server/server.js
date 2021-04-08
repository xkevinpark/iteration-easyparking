const { response } = require('express');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./Models/ParkingSpotModels.js');
const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require ('dotenv');
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
app.use(express.urlencoded({extended: true}));

// initialize passport?
// app.use(passport.initialize());


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

// This was a test to check the database connection:

// app.get('/test', (req, res) => {
//   console.log(db);
//   let query = 'SELECT * FROM "public"."Roles"';
  // db.query(query)
    // .then( data => {
    //   console.log(data);
    //   res.json(data);
    // })
    // .catch(err => {
    //   // console.log(err);
    // })
  // db.query(query, [], (err, response) => {
  //   if (err) console.log(err);
  //     else res.json(response.rows);
  // })
// });

// 

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
  // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(null, false);
    // });
    return done(null, profile);
  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google', (req, res, next) => {
  console.log ('the route is hitting');
  next();
 },
   passport.authenticate('google', { scope: ['profile', 'email', 'phone'] })

  // passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
  // passport.authenticate('google', { scope: [' https://www.googleapis.com/oauth2/v3/userinfo'] })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/giberish' }),
  function(req, res) {
    res.redirect('/search-spots');
});


// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
})

app.listen(PORT, () => { console.log(`Listening on port' ${PORT}...`)});