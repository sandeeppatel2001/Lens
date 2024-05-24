const jwt = require("jsonwebtoken");
const secretKey = "SandeepSecretKey";
// Middleware to verify the JWT token
const expiredtoken = require("../modules").expiredtoken;
const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"]; // Get the token part after 'Bearer '
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  token = token.split(" ")[1]; // Get the token part after 'Bearer '

  if (expiredtoken.includes(token)) {
    return res.status(401).send("Invalid token please login");
  }
  console.log(token);
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
