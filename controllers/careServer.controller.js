const Resident = require('../models/Resident.model');

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
