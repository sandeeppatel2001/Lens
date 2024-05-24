const jwt = require("jsonwebtoken");
const secretKey = "SandeepSecretKey";
// Middleware to verify the JWT token
const expiredtoken = require("../modules").expiredtoken;
const verifyToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(403)
      .send(
        "A token is required for authentication. Please GIve token which you got during login."
      );
  }
  let token; // Get the token part after 'Bearer '
  let spl = req.headers["authorization"].split(" ");
  if (spl.length >= 2) token = spl[1]; // Get the token part after 'Bearer '
  else token = spl[0];
  console.log("tokkken", token);
  if (expiredtoken.includes(token)) {
    return res.status(401).send("Invalid token please login");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded, "for token=", token);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send(`Invalid Token: ${err}`);
  }

  return next();
};

module.exports = verifyToken;
