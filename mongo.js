exports.db = async () => {
  const mongoose = require("mongoose");
  try {
    const res = await mongoose.connect(process.env.URL);
    console.log("connection done ");
  } catch (error) {
    console.log(error);
  }
};
