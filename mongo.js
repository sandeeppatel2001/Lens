exports.db = async () => {
  require("dotenv").config();
  const mongoose = require("mongoose");
  try {
    // console.log("envvvvvvvv", process.env.URL);
    const res = await mongoose.connect(process.env.URL).then(() => {
      console.log("DB connection done");
    });
  } catch (error) {
    console.log(error);
  }
};
