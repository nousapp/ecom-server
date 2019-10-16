const express = require('express');
const {
  createResident,
  updateResident,
  deleteResidentById,
  getAllResidents,
} = require('../controllers/Resident.controller');

const router = express.Router();

/* Care Server Routes*/
// Default routes
router.get('/', (req, res, next) => {
  console.log(`We're in the router`);
  res.send('Welcome to Care Solutions Server');
  next();
});

// GET /api/residents
router.post('/api/residents', createResident);
router.get('/api/residents', getAllResidents);
router.patch('/api/residents/:id', updateResident);
router.delete('/api/residents/:id', deleteResidentById);

module.exports = router;