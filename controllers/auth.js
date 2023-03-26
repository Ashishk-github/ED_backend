const jwt = require("jsonwebtoken");

const { config } = require("../config/config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.app.app_key);
    console.log(decoded);
    req.body.userId = decoded.userId;
    req.query.userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
