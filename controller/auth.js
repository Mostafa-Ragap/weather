const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.auth = asyncHandler(async (req, res, next) => {
  let token;
  // 1 check if  auth sent in headers
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  // 2 verify token
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (!decoded)
      return res
        .status(401)
        .json({ message: "invalid  your token or expired" });
  }
  // check user in database
  const checkUser = await User.findById(decoded._id);
  if (!checkUser)
    return res
      .status(401)
      .json({ message: "you are not authinticated to access this data" });
  req.user = checkUser;
  next();
});

exports.allowedTo = (...role) =>
  asyncHandler(async (req, res, next) => {
    if (!role.includes(req.user.role))
      return res
        .status(401)
        .json({ message: "you not have permission to access here " });
    else {
      next();
    }
  });
