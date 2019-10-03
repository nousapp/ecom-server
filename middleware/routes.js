const express = require('express');
const {
  createResident,
  getAllResidents,
  updateResident,
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
router.post('/api/residents', createResident);
router.get('/api/residents', getAllResidents);
router.patch('/api/snippets/:id', updateResident);
router.delete('/api/residents/:id', deleteResidentById);

module.exports = router;