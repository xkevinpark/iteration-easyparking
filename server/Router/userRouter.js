const express = require('express');
const router = express.Router();
// Controllers
const userController = require('../Controllers/userController');
const spotController = require('../Controllers/spotController');
// Make a POST request to signup:
router.post('/signup', userController.bcrypt, userController.addUser, (req, res) => {
    // res.locals.users is the data in the query:
    res.status(200).send(res.locals.users);
});
// Make a POST request to login:
router.post('/login', userController.login, (req, res) => {
    res.status(200).send(res.locals.users);
})
// Make a GET request to retrieve the profile page:
// the : is for the params
router.get('/profile/:email', userController.profile, (req, res) => {
    res.status(200).send(res.locals.users);
})
// Make a PATCH 
router.patch('/profile/:email', userController.bcrypt, userController.updateInfo, (req, res) => {
    res.status(200).send(res.locals.users);
})
module.exports = router;