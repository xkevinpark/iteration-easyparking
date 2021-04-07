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
          .get("/spot")
          .expect("Content-Type", /json/)
          .expect(200);
      });
    });
  });

  describe("/user", () => {
    describe("GET", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/user")
          .expect("Content-Type", /json/)
          .expect(200);
      });
    });
  });
});
