const db = require('../Models/ParkingSpotModels');

const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../Controllers/userController');
const spotController = require('../Controllers/spotController');


// View all parking spaces
router.get('/viewAllSpots', spotController.viewAllSpots, (req, res) => {
  res.status(200).json(res.locals.allSpots)
})

// View available parking spaces
router.get('/viewAvailableSpots', spotController.viewAvailableSpots, (req, res) => {
  res.status(200).json(res.locals.availableSpots)
})


// View unavailable parking spaces
router.get('/viewUnavailableSpots', spotController.viewUnavailableSpots, (req, res) => {
  res.status(200).json(res.locals.unavailableSpots)
})

// View all parking spaces
router.get('/viewSpot/:id', spotController.viewSpotById, (req, res) => {
  res.status(200).json(res.locals.spot);
})

// Create new parking space
router.post('/newSpot', spotController.createNewSpot, (req, res) => {
  res.status(200).json(res.locals.newSpot)
})

// Check's in parking space user is going to use
router.patch('/checkin', spotController.checkin, (req, res) => {
  res.status(200).json({msg : "It worked"})
})

// Check's out (frees) parking space user is going to use
router.patch('/checkout', spotController.checkout, (req, res) => {
  res.status(200).json({msg : "It worked"})
})

// Delete parking space
router.delete('/deleteSpot', spotController.deleteSpot, (req, res) => {
  res.status(200).json('Delete Successful')
})


// Test Area
router.get('/test', (req, res,) => {
  // Store description in constants from req.body
  const {locationId} = req.body

  // Coerced Date to work with SQL Timestamp type 
  const d = new Date() + 1000; 
  // let coercedDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0]
  
  // Set default status and expired_time to "open" and date.now. 
  const queryStr = `INSERT INTO "public"."ParkingSpace" (status, id_user, locationid, expired_time) VALUES ('closed', 2, 1, '2021-04-03 18:56:43')`;
  db.query(queryStr)
  .then(data => {
    console.log(data)
    // res.locals.newSpot = data.rows
    res.json({})
    // next();
  })
  .catch(err => console.log(err))

})


module.exports = router;