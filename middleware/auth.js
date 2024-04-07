const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ err_msg: "Invalid token", logged: "false" });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ err_msg: "Invalid token", logged: "false" });
  }
};

module.exports = { auth };
