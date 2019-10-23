const Service = require('../models/Service.model');

// Create
exports.createService = async (req, res, next) => {
  try {
    const newService = await Service.insert(req.body);
    res.status(201).send(newService);
  } catch (err) {
    next(err);
  }
};

// Read
exports.getServices = async ({ query }, res, next) => {
  try {
    // 1.get data from Services model
    const services = await Service.select(query);
    // 2. send that out
    res.send(services);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const services = await Service.update(id, req.body);
    res.send(services);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const services = await Service.delete(id);
    res.send(services);
  } catch (err) {
    next(err);
  }
};
