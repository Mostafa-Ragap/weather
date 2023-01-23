const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { generateToken } = require("../middleware/generateToken");

const createUser = (role) => async (req, res, next) => {
  const { name, password, email, phone, location } = req.body;

  let checkUser = await User.findOne({ email });
  if (checkUser)
    return res.status(400).json({
      message: "this email already used .. ",
    });
  const user = await User.create({
    name,
    password,
    email,
    phone,
    location,
    role,
  });

  res.status(200).json({
    message: "created successfully ",
    user,
  });
};

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ message: "invalid in your password or email" });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword)
    return res
      .status(400)
      .json({ message: "invalid in your password or email" });

  const token = await generateToken(user._id);
  console.log(token);
  res.status(200).json({ user, token });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.json({ users });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).send({ message: "this user is not Found" });
  res.json({ user });
});

module.exports = { createUser, login, getAllUsers, getUserById };
