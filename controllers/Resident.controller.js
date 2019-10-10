const Resident = require('../models/Resident.model');

// Create
exports.createResident = async (req, res, next) => {
  try {
    const newResident = await Resident.insert(req.body);
    res.status(201).send(newResident);
  } catch (err) {
    next(err);
  }
};

// Read
exports.getAllResidents = async ({ query }, res, next) => {
  try {
    // 1.get data from Residents model
    const residents = await Resident.select(query);
    // 2. send that out
    res.send(residents);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateResident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const residents = await Resident.update(id, req.body);
    res.send(residents);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteResidentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const residents = await Resident.delete(id);
    res.send(residents);
  } catch (err) {
    next(err);
  }
};
