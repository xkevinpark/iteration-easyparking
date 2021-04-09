const request = require("supertest");
const fs = require("fs"); // self-added
const path = require("path");
// self-added
const server = "http://localhost:3000";

// for server.js lines29-32 for 'Initial Page Request'
describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });

  describe("/spot", () => {
    describe("GET", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/spot/viewAllSpots")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/spot/viewAvailableSpots")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/spot/viewUnavailableSpots")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/spot/viewSpot/1")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });
    xdescribe("POST", () => {
      // const queryStr = `INSERT INTO "public"."ParkingSpace" (status, locationid, expired_time) VALUES ('open', ${locationId}, '${coercedDate}')`;
      const currentTime = new Date();
      let coercedDate = currentTime.toISOString().split('T')[0]+' '+currentTime.toTimeString().split(' ')[0]
      let newData =
        {
          status: "open",
          expired_time: "2021-04-87T22:22:02.000Z", //"2021-04-08T22:22:02.000Z",
          locationId: 1,
        };
      it("responds with 200 status and application/json content type", () => {
        return (
          request(server)
            .post("/spot/newSpot")
            .send(newData) // NOT PASSING
            // .set("Accept", "application/json")
            // .expect("Content-Type", /application\/json/)
            .expect(200)
            .send((err) => {
              if (err) return done(err);
              done();
            })
        );
      });
    });
  });
  describe("/user", () => {
    describe("GET", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/user/profile/1@1.com")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });
  });
});
