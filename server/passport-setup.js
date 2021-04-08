// const passport = require ('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport.use(new GoogleStrategy({
//     clientID: '599244323160-409i864jcpsgh9s6s7kef0qug4r3i5ae.apps.googleusercontent.com',
//     clientSecret: 'JXqu-mb7F09uXzNwKTpPET10',
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     //
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));