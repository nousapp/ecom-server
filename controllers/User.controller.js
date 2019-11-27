const User = require('../models/User.model');

// Register
exports.registerUser = async (req, res, next) => {
  try {
    const newUser = await User.registerUser(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

// Login
exports.loginUser = async (req, res, next) => {
  try {
    const newUser = await User.loginUser(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

// Read
exports.getUsers = async ({ query }, res, next) => {
  try {
    // 1.get data from Users model
    const users = await User.select(query);
    // 2. send that out
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.update(id, req.body);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.delete(id);
    res.send(users);
  } catch (err) {
    next(err);
  }
};
