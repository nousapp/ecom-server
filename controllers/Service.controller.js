
// Create
exports.createService = async (req, res, next) => {
  try {
    res.status(201).send('CREATE SERVICE!!!!');
  } catch (err) {
    next(err);
  }
};

// Read
exports.getServices = async ({ query }, res, next) => {
  try {
    res.status(201).send('READ SERVICE!!!!');
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateService = async (req, res, next) => {
  try {
    res.status(201).send('UPDATE SERVICE!!!!');
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteServiceById = async (req, res, next) => {
  try {
    res.status(201).send('DELETE SERVICE!!!!');
  } catch (err) {
    next(err);
  }
};
