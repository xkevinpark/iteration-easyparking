const { response } = require('express');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./Models/ParkingSpotModels.js');

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

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
})

app.listen(PORT, () => { console.log(`Listening on port' ${PORT}...`)});