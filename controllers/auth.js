const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "xube8c93e9ebx8bec99--r2g7---ce8bw8xb8becyrvcbehbuebx");
    console.log(decoded)
    req.body.userId = decoded.userId;
    req.query.userId = decoded.userId;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;