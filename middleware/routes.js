const express = require('express');
const {
  createResident,
  updateResident,
  deleteResidentById,
  getResidents,
} = require('../controllers/Resident.controller');
const {
  createTransaction,
  updateTransaction,
  deleteTransactionById,
  getTransactions,
} = require('../controllers/Transaction.controller');

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
router.get('/api/residents', getResidents);
router.patch('/api/residents/:id', updateResident);
router.delete('/api/residents/:id', deleteResidentById);

// GET /api/transactions
router.post('/api/transactions', createTransaction);
router.get('/api/transactions', getTransactions);
router.patch('/api/transactions/:id', updateTransaction);
router.delete('/api/transactions/:id', deleteTransactionById);

module.exports = router;