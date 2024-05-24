const { UserModel } = require("./model/components.model");
const secretKey = "SandeepSecretKey";
const expiredtoken = [];
exports.expiredtoken = expiredtoken;
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Internal server error: ${err}`);
  }
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
      console.log(err);
      res.status(500).send(`Internal server error ${err}`);
    }
  }
};

exports.getuserdata = async (req, res) => {
  const email = req.user.email;

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
    res.status(500).send(`Internal server error: ${err}`);
  }
};

exports.logout = async (req, res) => {
  const email = req.user.email;
  const token = req.headers["authorization"].split(" ")[1];
  expiredtoken.push(token);
  res.send("you are logout successfully");
};
