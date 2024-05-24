// const expect = require("chai").expect;
import { expect, use } from "chai";
import chaiHttp from "chai-http";
const chai = use(chaiHttp);
chai.request().post;

describe("API Routes", function () {
  describe("POST /register", function () {
    it("should register a new user", function (done) {
      chai
        .request("http://localhost:3000")
        .post("/register")
        .send({
          firstname: "Sandeep2",
          lastname: "Patel",
          email: "sandeep2.patel@example.com",
          password: "password123",
          pincode: 12345678,
          addr: "Varanasi",
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.text).to.equal("User registered successfully");
          done();
        });
    });
  });

  describe("GET /profile", function () {
    it("should get user data with valid token", function (done) {
      // Assuming you have a valid token
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwMmU2ZDI4OGNhOWQxMTk3ZDQ1YWMiLCJlbWFpbCI6InNhbmRlZXBAZ21haWwuY29tIiwiaWF0IjoxNzE2NTM1MjU0LCJleHAiOjE3MTY1Mzg4NTR9.AeGy3T4VU0DqIH91BmoKeYhqpvixyvjqeWA_OJQDheg";

      chai
        .request("http://localhost:3000")
        .get("/profile")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          // Add more assertions based on the expected response body
          done();
        });
    });
  });

  describe("POST /login", function () {
    it("should login with valid credentials", function (done) {
      chai
        .request("http://localhost:3000")
        .post("/login")
        .send({
          email: "sandeep.patel@example.com",
          password: "password123",
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          done();
        });
    });
  });

  describe("GET /logout", function () {
    it("should logout with valid token", function (done) {
      // Assuming you have a valid token
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwMmU2ZDI4OGNhOWQxMTk3ZDQ1YWMiLCJlbWFpbCI6InNhbmRlZXBAZ21haWwuY29tIiwiaWF0IjoxNzE2NTM1MjU0LCJleHAiOjE3MTY1Mzg4NTR9.AeGy3T4VU0DqIH91BmoKeYhqpvixyvjqeWA_OJQDheg";

      chai
        .request("http://localhost:3000")
        .get("/logout")
        .set("Authorization", `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("you are logout successfully");
          done();
        });
    });
  });
});
