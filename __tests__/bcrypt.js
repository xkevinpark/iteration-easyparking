const request = require("supertest");
const path = require('path');
const bcrypt = require ('bcrypt');
const server = "http://localhost:3000";
const db = require('../server/Models/ParkingSpotModels');

describe('Bcrypting passwords', () => {
//  const query = `SELECT * FROM "public"."Users" WHERE email = '${email}';`
  it('Passwords should not be stored in plaintext', (done) => {
    request(server)
      .post('/user/signup')
      .send({"firstName": "David", "lastName": "Suh", "email": "08test@test.com", "password" : "password3", "idRole" : 1})
      .then((res) => {
        // use query to get actual data from database
        const query = `SELECT password FROM "public"."Users" WHERE email = '08test@test.com'`
        db.query(query).then(data => {
          console.log("PASSWORD QUERY DATA IS: ", data.rows[0].password) //data.rows
          expect(data.rows[0].password).not.toEqual('password3')
          done()
        })
      });
    });

  it('Passwords be bcrypted', (done) => {
    request(server)
      .post('/user/signup')
      .send({"firstName": "David", "lastName": "Suh", "email": "09test@test.com", "password" : "password3", "idRole" : 1})
      .then((res) => {
        // use query to get actual data from database
        const query = `SELECT password FROM "public"."Users" WHERE email = '09test@test.com'`
        db.query(query).then(data => {
          console.log("PASSWORD QUERY DATA IS: ", data.rows[0].password) //data.rows
          expect(bcrypt.compareSync('password3', data.rows[0].password)).toBeTruthy();
          done()
        })
      });
  });
});


