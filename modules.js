const { UserModel } = require("./model/components.model");

exports.login = async (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
};
exports.register = async (req, res) => {
  //   console.log("req.body=", req.body);
  const { firstname, lastname, email, password, pincode } = req.body;
  try {
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password,
      pincode,
    });
    const r = await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).send("Email or Username already exists");
    } else {
      res.status(500).send("Internal server error");
    }
  }
};

exports.getuserdata = async (req, res) => {
  const { email } = req.query; // Or you can get it from req.body if it's a POST request

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
