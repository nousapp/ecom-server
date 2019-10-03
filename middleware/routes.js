const express = require('express');
const {
  getAllResidents,
  createResident,
  deleteResidentById,
} = require('../controllers/careServer.controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(`We're in the router`);
  res.send('Welcome to Care Solutions Server');
  next();
});

/* Care Server Routes*/
// GET /api/residents
router.get('/api/residents', getAllResidents);
router.post('/api/residents', createResident);
router.delete('/api/residents/:id', deleteResidentById);

module.exports = router;