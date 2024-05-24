const express = require("express");
const modules = require("./modules");
const app = express();
const cors = require("cors");
const db = require("./mongo").db();
const router = require("./routes/route");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("server started");
});
exports.app = app;
