// const expect = require("chai").expect;
import { expect, use } from "chai";
import chaiHttp from "chai-http";
const chai = use(chaiHttp);
chai.request().post;
// import { request } from "request";
// const request = require("request");
// import { request } from "chai";
describe("API Routes", function () {
  // describe("POST /register", function () {
  //   it("should register a new user", function (done) {
  //     chai.request().post(
  //       {
  //         url: "http://localhost:3000/register",
  //         json: {
  //           firstname: "sandeep",
  //           lastname: "patel",
  //           email: "sandeep@gmail.com",
  //           pincode: 111111,
  //           addr: "varanasi",
  //           password: "rdtgyedt",
  //         },
  //       },
  //       function (error, response, body) {
  //         console.log("resssss", response);
  //         console.log("eeeeeerrrr", error);
  //         expect(response.statusCode).to.equal(201);
  //         expect(body).to.equal("User registered successfully");
  //         done();
  //       }
  //     );
  //   });
  // });

  describe("GET /profile", function () {
    it("should get user data with valid token", function (done) {
      // Assuming you have a valid token
      const token = "your_valid_token_here";

      chai.request().get(
        {
          url: "http://localhost:3000/profile",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          // Add more assertions based on the expected response body
          done();
        }
      );
    });
  });

  // describe("POST /login", function () {
  //   it("should login with valid credentials", function (done) {
  //     chai.request.post(
  //       {
  //         url: "http://localhost:3000/login",
  //         json: {
  //           email: "john.doe@example.com",
  //           password: "password123",
  //         },
  //       },
  //       function (error, response, body) {
  //         expect(response.statusCode).to.equal(200);
  //         expect(body).to.have.property("token");
  //         // Add more assertions based on the expected response body
  //         done();
  //       }
  //     );
  //   });
  // });

  // describe("GET /logout", function () {
  //   it("should logout with valid token", function (done) {
  //     // Assuming you have a valid token
  //     const token = "your_valid_token_here";

  //     chai.request.get(
  //       {
  //         url: "http://localhost:3000/logout",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //       function (error, response, body) {
  //         expect(response.statusCode).to.equal(200);
  //         expect(body).to.equal("you are logout successfully");
  //         // Add more assertions based on the expected response body
  //         done();
  //       }
  //     );
  //   });
  // });
});
