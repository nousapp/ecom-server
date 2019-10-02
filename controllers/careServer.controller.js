const Resident = require('../models/Resident.model');


exports.createResident = async (req, res, next) => {
  try {
    const newResident = await Resident.insert(req.body);
    res.status(201).send(newResident);
  } catch (err) {
    next(err);
  }
};

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

exports.deleteResidentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const residents = await Resident.delete(id);
    res.send(residents);
  } catch (err) {
    next(err);
  }
};
