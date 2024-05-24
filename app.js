const express = require("express");
const modules = require("./modules");
const app = express();
const cors = require("cors");
const db = require("./mongo").db();
const router = require("./routes/route");
require("dotenv").config();
app.use(cors());
app.use(express.json());
let swaggerJSDoc = require("swagger-jsdoc");
app.use(router);
let swaggerDefinition = {
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger",
  },
  host: "localhost:3000",
  basePath: "/",
};

// options for the swagger docs
let options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"],
};
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
const path = require("path");
const __dirname1 = path.resolve();
app.get("/swagger", function (req, res) {
  app.use(express.static(path.join(__dirname1, "./public/api_docs")));
  res.sendFile(path.join(__dirname + "/public/api_docs/index.html"));
});
// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);
app.listen(3000, () => {
  console.log("server started");
});
exports.app = app;
