const Resident = require('../models/Resident.model');

exports.getAllResidents = async (req, res, next) => {
  try {
    // 1.get data from Residents model
    const residents = await Resident.select();
    // 2. send that out
    res.send(residents);
  } catch (err) {
    next(err);
  }
};
