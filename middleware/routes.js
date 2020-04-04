const express = require('express');
const {
  createResident,
  updateResident,
  deleteResidentById,
  getResidents,
} = require('../controllers/Resident.controller');
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUserById,
  getUsers,
} = require('../controllers/User.controller');

const router = express.Router();

/* Care Server Routes*/
// Default routes
router.get('/', (req, res, next) => {
  res.send('Welcome to Care Solutions Server');
  next();
});

// GET /api/residents
router.post('/api/residents', createResident);
router.get('/api/residents', getResidents);
router.patch('/api/residents/:id', updateResident);
router.delete('/api/residents/:id', deleteResidentById);

// GET /api/users
router.post('/api/users', registerUser);
router.post('/api/users/login', loginUser);
router.get('/api/users', getUsers);
router.patch('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUserById);

module.exports = router;