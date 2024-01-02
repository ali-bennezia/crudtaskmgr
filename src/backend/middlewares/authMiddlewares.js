const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

const userModel = require("./../models/userModel");

exports.checkToken = async function (req, res, next) {
  if (!("authorization" in req.headers)) {
    res.set("WWW-Authenticate", 'Bearer realm="App"');
    return res.status(401).json("Unauthorized");
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.token = token;
    req.payload = payload;

    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(401).json("Unauthorized");
    }

    next();
  } catch (err) {
    res.set("WWW-Authenticate", 'Bearer realm="App"');
    return res.status(401).json("Unauthorized");
  }
};
