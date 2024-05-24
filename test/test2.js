import("chai").then((chai) => {
  const chaiHttp = require("chai-http");
  const { app } = require("../app"); // Ensure you export `app` from your main app file
  const { UserModel } = require("../model/components.model");
  const { expiredtoken } = require("../modules");
  console.log("ssssssssssssssssssssssssssssss");
  chai.use(chaiHttp);
  const { expect } = chai;
  describe("API Routes", () => {
    // Before each test, clear the database and expiredtoken array
    beforeEach(async () => {
      console.log("ssssrrrrrrrrrrrrrr");
      await UserModel.deleteMany({});
      expiredtoken.length = 0;
    });

    describe("POST /register", () => {
      it("should register a new user", (done) => {
        console.log("///register");
        chai
          .request(app)
          .post("/register")
          .send({
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            password: "password123",
            pincode: 123456,
          })
          .end((err, res) => {
            console.log("reeees", res);
            console.log("eeeerrrr", err);
            expect(res).to.have.status(201);
            expect(res).to.have.status(res.status);
            expect(res.text).to.equal("User registered successfully");
            done();
          });
      });

      it("should not register a user with existing email", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          chai
            .request(app)
            .post("/register")
            .send({
              firstname: "Jane",
              lastname: "Doe",
              email: "john.doe@example.com",
              password: "password456",
              pincode: 654321,
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.text).to.equal("Email or Username already exists");
              done();
            });
        });
      });
    });

    describe("POST /login", () => {
      it("should login a registered user", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          chai
            .request(app)
            .post("/login")
            .send({
              email: "john.doe@example.com",
              password: "password123",
            })
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("token");
              done();
            });
        });
      });

      it("should not login with wrong password", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          chai
            .request(app)
            .post("/login")
            .send({
              email: "john.doe@example.com",
              password: "wrongpassword",
            })
            .end((err, res) => {
              expect(res).to.have.status(401);
              expect(res.text).to.equal("Invalid email or password");
              done();
            });
        });
      });
    });

    describe("GET /profile", () => {
      it("should return user data for valid token", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            "SandeepSecretKey",
            { expiresIn: "1h" }
          );

          chai
            .request(app)
            .get("/profile")
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                "email",
                "john.doe@example.com"
              );
              done();
            });
        });
      });

      it("should return 401 for invalid token", (done) => {
        chai
          .request(app)
          .get("/profile")
          .set("Authorization", "Bearer invalidtoken")
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
    });

    describe("GET /logout", () => {
      it("should logout user and invalidate token", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            "SandeepSecretKey",
            { expiresIn: "1h" }
          );

          chai
            .request(app)
            .get("/logout")
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.text).to.equal("you are logout successfully");
              expect(expiredtoken).to.include(token);
              done();
            });
        });
      });

      it("should not allow access with invalidated token", (done) => {
        const user = new UserModel({
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          pincode: 123456,
        });

        user.save().then(() => {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            "SandeepSecretKey",
            { expiresIn: "1h" }
          );

          chai
            .request(app)
            .get("/logout")
            .set("Authorization", `Bearer ${token}`)
            .end(() => {
              chai
                .request(app)
                .get("/profile")
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  expect(res).to.have.status(401);
                  done();
                });
            });
        });
      });
    });
  });
});
