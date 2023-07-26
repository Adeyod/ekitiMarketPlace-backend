const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// NEW USER REGISTRATION
const newUserReg = async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      throw new Error('User already exist');
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: 'Registration Successful. You can now login',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// USER LOGIN
const userLogin = async (req, res) => {
  try {
    // check if user exist
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      throw new Error('User not found');
    }
    // check if user status is active
    if (user.status !== 'active') {
      throw new Error('Account suspended. Contact Admin');
    }
    // compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error('Invalid Credential');
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: '1d',
    });
    // send success login
    res.send({
      success: true,
      message: 'User Logged in Successfully',
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      // message: "Users fetched successfully",
      message: res.message,
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER STATUS
const updateUserStatus = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  try {
    res.send({
      success: true,
      message: 'User status Update is Successful',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  newUserReg,
  userLogin,
  getCurrentUser,
  getAllUsers,
  updateUserStatus,
};
